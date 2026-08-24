'use server';

/**
 * @fileOverview A system for structuring raw medical text.
 *
 * - structuredTextOutput - A function that reformats unstructured text into a clean, professional document.
 * - StructuredTextOutputInput - The input type for the structuredTextOutput function.
 * - StructuredTextOutputOutput - The return type for the structuredTextOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StructuredTextOutputInputSchema = z.object({
  rawText: z.string().describe('The unstructured, raw medical text to be reformatted.'),
});
export type StructuredTextOutputInput = z.infer<typeof StructuredTextOutputInputSchema>;

const StructuredTextOutputOutputSchema = z.object({
  structuredText: z.string().describe('The professionally formatted and structured version of the text.'),
});
export type StructuredTextOutputOutput = z.infer<typeof StructuredTextOutputOutputSchema>;

export async function structuredTextOutput(
  input: StructuredTextOutputInput
): Promise<StructuredTextOutputOutput> {
  return structuredTextOutputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'structuredTextOutputPrompt',
  input: {schema: StructuredTextOutputInputSchema},
  output: {schema: StructuredTextOutputOutputSchema},
  prompt: `You are a Structured Medical Output Engine. Your sole purpose is to take raw, unstructured, or messy medical text and reformat it into a professional, clean, and highly readable document.

  **User's Raw Text:**
  {{{rawText}}}

  **Your Task:**
  1.  Analyze the provided text to understand its underlying structure and meaning (e.g., is it a case report, study notes, a diagnostic summary?).
  2.  Re-write the content into a perfectly structured format.
  3.  Use clear, bold headings for different sections.
  4.  Use bullet points or numbered lists for itemization.
  5.  Correct any obvious spelling or grammatical errors to improve professionalism, but do not change the core medical information.
  6.  The final output should be something a doctor could present in a meeting or a student could use for high-quality study notes.

  Return the final formatted text in the 'structuredText' field.`,
});

const structuredTextOutputFlow = ai.defineFlow(
  {
    name: 'structuredTextOutputFlow',
    inputSchema: StructuredTextOutputInputSchema,
    outputSchema: StructuredTextOutputOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
