'use server';

/**
 * @fileOverview A medical reasoning engine that analyzes images of questions.
 *
 * - analyzeMedicalQuestionImage - A function that handles the image analysis process.
 * - AnalyzeMedicalQuestionImageInput - The input type for the analyzeMedicalQuestionImage function.
 * - AnalyzeMedicalQuestionImageOutput - The return type for the analyzeMedicalQuestionImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMedicalQuestionImageInputSchema = z.object({
  questionImage: z
    .string()
    .describe(
      "An image of a handwritten or printed medical question, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeMedicalQuestionImageInput = z.infer<
  typeof AnalyzeMedicalQuestionImageInputSchema
>;

const AnalyzeMedicalQuestionImageOutputSchema = z.object({
  isMedicalQuestion: z.boolean().describe('A boolean indicating if the image contains a medical question.'),
  validationMessage: z.string().optional().describe('A message explaining why the image is not valid, if applicable.'),
  detectedQuestion: z.string().optional().describe('The question detected in the image, to confirm understanding.'),
  easyExplanation: z.string().optional().describe('A simple, easy-to-understand answer.'),
  medicalExplanation: z.string().optional().describe('A detailed, medically accurate explanation.'),
  stepByStepBreakdown: z.string().optional().describe('A logical, step-by-step breakdown of the answer.'),
  chemicalScientificDetails: z.string().optional().describe('Any relevant chemical formulas, scientific details, or equations.'),
  examReadyNotes: z.string().optional().describe('Concise, high-yield notes suitable for exam preparation.'),
});
export type AnalyzeMedicalQuestionImageOutput = z.infer<
  typeof AnalyzeMedicalQuestionImageOutputSchema
>;

export async function analyzeMedicalQuestionImage(
  input: AnalyzeMedicalQuestionImageInput
): Promise<AnalyzeMedicalQuestionImageOutput> {
  return analyzeMedicalQuestionImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMedicalQuestionImagePrompt',
  input: {schema: AnalyzeMedicalQuestionImageInputSchema},
  output: {schema: AnalyzeMedicalQuestionImageOutputSchema},
  prompt: `You are a medical reasoning engine. Your goal is not just to read text from an image, but to understand its medical intent, context, and complexity.

  A user has uploaded an image.
  Image: {{media url=questionImage}}

  **Your AI Workflow:**
  1.  **Image Validation:** First, examine the image to determine if it contains a medical question (handwritten or printed).
      - If it IS a medical question, set \`isMedicalQuestion\` to \`true\` and proceed.
      - If it is NOT a medical question, set \`isMedicalQuestion\` to \`false\`, set \`validationMessage\` to "This image does not seem to contain a medical question. Please upload an image of a question from a textbook, exam paper, or your notes.", and leave all other fields empty. Do not proceed further.
  2.  **Visual Understanding & Context Detection:** If the image is valid, perform OCR. Analyze handwriting, symbols, and context to understand if it's a theoretical question, a clinical problem, an MCQ, etc. Handle low-quality or partial images gracefully.
  3.  **Medical Reasoning & Structured Output:** Apply medical logic to formulate the answer and populate all the relevant fields in the output schema.`,
});

const analyzeMedicalQuestionImageFlow = ai.defineFlow(
  {
    name: 'analyzeMedicalQuestionImageFlow',
    inputSchema: AnalyzeMedicalQuestionImageInputSchema,
    outputSchema: AnalyzeMedicalQuestionImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
