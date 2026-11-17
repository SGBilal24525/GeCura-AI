'use server';
/**
 * @fileOverview An AI flow for finding mistakes in a user's explanation.
 *
 * - mistakeFinder - A function that analyzes a user's explanation, highlights mistakes, and provides the correct concept.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MistakeFinderInputSchema = z.object({
  explanation: z.string().describe("The user's explanation or logic to be analyzed for mistakes."),
});
type MistakeFinderInput = z.infer<typeof MistakeFinderInputSchema>;

const MistakeFinderOutputSchema = z.object({
  feedback: z.string().describe("A detailed analysis of the user's explanation, highlighting specific mistakes and misconceptions."),
  correctedExplanation: z.string().describe("A complete and correct version of the explanation."),
  keyConcepts: z.string().describe("A summary of the key concepts the user should review to avoid similar mistakes in the future."),
});
type MistakeFinderOutput = z.infer<typeof MistakeFinderOutputSchema>;

export async function mistakeFinder(input: MistakeFinderInput): Promise<MistakeFinderOutput> {
  return mistakeFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mistakeFinderPrompt',
  input: {schema: MistakeFinderInputSchema},
  output: {schema: MistakeFinderOutputSchema},
  prompt: `You are an AI Medical Tutor specializing in identifying and correcting conceptual errors. A student has provided their understanding of a topic, and your job is to find the mistakes.

  **Student's Explanation:**
  {{{explanation}}}

  **Your Task:**
  Analyze the student's explanation and provide corrective feedback.

  **Required Output Structure:**

  1.  **Feedback on Your Explanation:** Politely and clearly point out the specific mistakes or logical fallacies in the student's explanation. Quote their mistakes where possible.
  2.  **Corrected Explanation:** Provide a complete, accurate, and well-structured explanation of the concept.
  3.  **Key Concepts to Review:** List the core concepts or principles the student should focus on to build a stronger understanding and avoid these mistakes in the future.

  The output must be in the specified JSON format.`,
});

const mistakeFinderFlow = ai.defineFlow(
  {
    name: 'mistakeFinderFlow',
    inputSchema: MistakeFinderInputSchema,
    outputSchema: MistakeFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
