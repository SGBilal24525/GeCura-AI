'use server';
/**
 * @fileOverview An AI flow for generating exams.
 *
 * - examMode - A function that generates a multiple-choice quiz on a given topic and difficulty.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExamModeInputSchema = z.object({
  topic: z.string().describe('The medical topic for the exam.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the exam.'),
});
type ExamModeInput = z.infer<typeof ExamModeInputSchema>;

const ExamModeOutputSchema = z.object({
  questions: z.array(z.object({
    question: z.string().describe('The MCQ question text.'),
    options: z.array(z.string()).describe('An array of 4 possible answers.'),
    correctAnswer: z.string().describe('The correct answer from the options array.'),
    explanation: z.string().describe('A brief explanation for why the correct answer is right.'),
  })).describe('An array of 10-15 multiple-choice questions related to the topic.'),
});
type ExamModeOutput = z.infer<typeof ExamModeOutputSchema>;

export async function examMode(input: ExamModeInput): Promise<ExamModeOutput> {
  return examModeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'examModePrompt',
  input: {schema: ExamModeInputSchema},
  output: {schema: ExamModeOutputSchema},
  prompt: `You are an AI Exam Generator for medical students. Your task is to create a multiple-choice question (MCQ) test.

  **Topic:** {{{topic}}}
  **Difficulty:** {{{difficulty}}}

  **Your Task:**
  Generate a test with 10-15 questions related to the given topic and difficulty level.

  - For 'Easy' difficulty, focus on basic definitions and core facts.
  - For 'Medium' difficulty, include clinical scenarios and mechanism of action questions.
  - For 'Hard' difficulty, create complex, multi-step clinical problems, differential diagnosis questions, or questions on rare conditions.

  For each question, you MUST provide:
  1. The question itself.
  2. Four distinct options.
  3. The single correct answer.
  4. A concise explanation for the correct answer.

  The output must be in the specified JSON format.`,
});

const examModeFlow = ai.defineFlow(
  {
    name: 'examModeFlow',
    inputSchema: ExamModeInputSchema,
    outputSchema: ExamModeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
