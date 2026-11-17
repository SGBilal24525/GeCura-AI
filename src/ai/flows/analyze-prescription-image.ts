'use server';

/**
 * @fileOverview A medical vision system that analyzes prescription images to extract medicine names.
 *
 * - analyzePrescriptionImage - A function that handles the prescription image analysis process.
 * - AnalyzePrescriptionImageInput - The input type for the analyzePrescriptionImage function.
 * - AnalyzePrescriptionImageOutput - The return type for the analyzePrescriptionImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePrescriptionImageInputSchema = z.object({
  prescriptionImage: z
    .string()
    .describe(
      "A photo of a medical prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePrescriptionImageInput = z.infer<typeof AnalyzePrescriptionImageInputSchema>;

const AnalyzePrescriptionImageOutputSchema = z.object({
  isPrescription: z.boolean().describe('A boolean indicating if the image is a medical prescription.'),
  validationMessage: z.string().optional().describe('A message explaining why the image is not valid, if applicable.'),
  medicines: z.array(z.string()).optional().describe('A list of medicine names extracted from the prescription.'),
});
export type AnalyzePrescriptionImageOutput = z.infer<typeof AnalyzePrescriptionImageOutputSchema>;

export async function analyzePrescriptionImage(
  input: AnalyzePrescriptionImageInput
): Promise<AnalyzePrescriptionImageOutput> {
  return analyzePrescriptionImageFlow(input);
}

const analyzePrescriptionImagePrompt = ai.definePrompt({
  name: 'analyzePrescriptionImagePrompt',
  input: {schema: AnalyzePrescriptionImageInputSchema},
  output: {schema: AnalyzePrescriptionImageOutputSchema},
  prompt: `You are a specialized medical vision system. Your only task is to analyze an image of a medical prescription, especially those with doctors' handwriting, and extract the names of the medicines listed on it.

  Here is the image provided: {{media url=prescriptionImage}}

  **Your AI Workflow:**
  1.  **Image Validation:** First, determine if the uploaded image is a medical prescription.
      - If it IS a prescription, set \`isPrescription\` to \`true\` and proceed.
      - If it is NOT a prescription, set \`isPrescription\` to \`false\`, set \`validationMessage\` to "This image does not look like a medical prescription. Please upload a clear photo of a prescription.", and do not proceed.
  2.  **Handwriting Analysis & Medicine Extraction:** If the image is valid, perform advanced OCR optimized for medical handwriting. Your primary goal is to identify and extract only the names of the prescribed medicines. Use your medical knowledge base to identify drug names, even if they are misspelled or partially illegible. Ignore dosages, frequencies, patient names, doctor names, and any other information.
  3.  **Structured Output Generation:** Return a structured object. If you cannot identify any medicines, return an empty array for the 'medicines' field.

  **CRITICAL RULE:** Do not include any other information besides the medicine names.
  `,
});

const analyzePrescriptionImageFlow = ai.defineFlow(
  {
    name: 'analyzePrescriptionImageFlow',
    inputSchema: AnalyzePrescriptionImageInputSchema,
    outputSchema: AnalyzePrescriptionImageOutputSchema,
  },
  async input => {
    const {output} = await analyzePrescriptionImagePrompt(input);
    return output!;
  }
);
