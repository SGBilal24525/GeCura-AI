'use server';
/**
 * @fileOverview A professional learning AI flow for simple questions.
 *
 * - normalLearning - A function that provides a simple, factual answer to a medical question.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NormalLearningInputSchema = z.object({
  question: z.string().describe('The medical topic or question to be explained.'),
});
type NormalLearningInput = z.infer<typeof NormalLearningInputSchema>;

const NormalLearningOutputSchema = z.object({
  definition: z.string().describe("A clear, simple definition of the topic."),
  useInBody: z.string().describe("How this concept is used or found in the human body."),
  shortExplanation: z.string().describe("A brief, easy-to-understand explanation."),
});
type NormalLearningOutput = z.infer<typeof NormalLearningOutputSchema>;

export async function normalLearning(input: NormalLearningInput): Promise<NormalLearningOutput> {
  return normalLearningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'normalLearningPrompt',
  input: {schema: NormalLearningInputSchema},
  output: {schema: NormalLearningOutputSchema},
  prompt: `You are an AI Medical Teacher. A student has asked a question in 'Normal Learning' mode.
  Your task is to provide a simple, factual answer. Do not add any extra information, tests, or conceptual breakdowns.

  Student's Question: {{{question}}}

  **Required Output Structure:**
  1.  **definition:** Provide a clear, one-to-two sentence definition of the topic.
  2.  **useInBody:** Explain its function or relevance within the human body in simple terms.
  3.  **shortExplanation:** Give a short paragraph explaining the core idea.

  **Strict Limitations:**
  - DO NOT include any multiple-choice questions (MCQs).
  - DO NOT ask the student any follow-up questions.
  - DO NOT provide a deep conceptual analysis.
  - The output must be in the specified JSON format.`,
});

const normalLearningFlow = ai.defineFlow(
  {
    name: 'normalLearningFlow',
    inputSchema: NormalLearningInputSchema,
    outputSchema: NormalLearningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
