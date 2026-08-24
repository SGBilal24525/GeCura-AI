'use server';
/**
 * @fileOverview An AI flow for building concepts from the ground up.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConceptBuilderInputSchema = z.object({
  question: z.string().describe('The medical concept the student wants to build.'),
});
type ConceptBuilderInput = z.infer<typeof ConceptBuilderInputSchema>;

const ConceptBuilderOutputSchema = z.object({
  ultraSimpleExplanation: z.string().describe('A very brief, simple-to-understand definition using an analogy.'),
  properMedicalExplanation: z.string().describe('A detailed medical explanation using proper terminology.'),
  stepByStepConceptFlow: z.string().describe('A logical, point-wise breakdown of the concept.'),
  chemicalBiologicalDetails: z.string().optional().describe('Relevant chemical formulas, biological pathways, or genetic information.'),
  clinicalValue: z.string().describe('Why this concept is important in a clinical setting.'),
});
type ConceptBuilderOutput = z.infer<typeof ConceptBuilderOutputSchema>;

export async function conceptBuilder(input: ConceptBuilderInput): Promise<ConceptBuilderOutput> {
  return conceptBuilderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conceptBuilderPrompt',
  input: {schema: ConceptBuilderInputSchema},
  output: {schema: ConceptBuilderOutputSchema},
  prompt: `You are an AI Professor explaining a concept for a medical student. Your goal is to BUILD a concept in the student's mind.

  Student's Topic: {{{question}}}

  **Your Task:**
  Generate a response that resolves the user's concept by explaining it in detail through the following 5 points.

  **Required Output Structure (Mandatory):**

  1.  **ultraSimpleExplanation:** Use an analogy or very simple terms to explain the core idea for a non-medical person.
  2.  **properMedicalExplanation:** Give the formal, detailed medical explanation with proper terminology.
  3.  **stepByStepConceptFlow:** Break down the process into a logical, numbered sequence.
  4.  **chemicalBiologicalDetails:** If relevant (e.g., for pharmacology or biochemistry), include specific pathways, formulas, or molecular details.
  5.  **clinicalValue:** Explain why a doctor needs to know this concept for patient diagnosis, treatment, or care.

  **Strictly Blocked Items:**
  - DO NOT include tests or MCQs.
  - DO NOT ask follow-up questions.
  - The output must be in the specified JSON format.`,
});

const conceptBuilderFlow = ai.defineFlow(
  {
    name: 'conceptBuilderFlow',
    inputSchema: ConceptBuilderInputSchema,
    outputSchema: ConceptBuilderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
