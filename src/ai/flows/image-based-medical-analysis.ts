'use server';

/**
 * @fileOverview A medical vision system that analyzes medicine box images.
 *
 * - analyzeMedicineBoxImage - A function that handles the medicine box image analysis process.
 * - AnalyzeMedicineBoxImageInput - The input type for the analyzeMedicineBoxImage function.
 * - AnalyzeMedicineBoxImageOutput - The return type for the analyzeMedicineBoxImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMedicineBoxImageInputSchema = z.object({
  medicineBoxPhotoDataUri: z
    .string()
    .describe(
      "A photo of a medicine box, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeMedicineBoxImageInput = z.infer<typeof AnalyzeMedicineBoxImageInputSchema>;

const AnalyzeMedicineBoxImageOutputSchema = z.object({
  isMedicineBox: z.boolean().describe('A boolean indicating if the image is a medicine box or not.'),
  validationMessage: z.string().optional().describe('A message explaining why the image is not valid, if applicable.'),
  medicineIdentity: z.string().optional().describe('The name and brand of the medicine.'),
  activeIngredients: z.string().optional().describe('The active chemical ingredients in the medicine.'),
  medicalUsage: z.string().optional().describe('What the medicine is clinically used for.'),
  dosageGuidance: z.string().optional().describe('General dosage guidance. This is not a prescription.'),
  mechanismOfAction: z.string().optional().describe('How the medicine works in the body.'),
  sideEffectsAndPrecautions: z.string().optional().describe('A list of potential side effects and important precautions.'),
  educationalNotes: z.string().optional().describe('Additional educational notes, context, or interesting facts about the medicine.'),
});
export type AnalyzeMedicineBoxImageOutput = z.infer<typeof AnalyzeMedicineBoxImageOutputSchema>;

export async function analyzeMedicineBoxImage(
  input: AnalyzeMedicineBoxImageInput
): Promise<AnalyzeMedicineBoxImageOutput> {
  return analyzeMedicineBoxImageFlow(input);
}

const analyzeMedicineBoxImagePrompt = ai.definePrompt({
  name: 'analyzeMedicineBoxImagePrompt',
  input: {schema: AnalyzeMedicineBoxImageInputSchema},
  output: {schema: AnalyzeMedicineBoxImageOutputSchema},
  prompt: `You are a medical vision reasoning engine behaving like a digital pharmacist. Your primary goal is to analyze an image of a medicine box and provide structured, educational information.

  Here is the image provided by the user: {{media url=medicineBoxPhotoDataUri}}

  **Your AI Workflow:**
  1.  **Image Validation:** First, determine if the uploaded image is actually a picture of a medicine box or packaging.
      - If it IS a medicine box, set \`isMedicineBox\` to \`true\` and proceed to the next step.
      - If it is NOT a medicine box, set \`isMedicineBox\` to \`false\`, provide a helpful message in \`validationMessage\` (e.g., "This does not appear to be a medicine box. Please upload a clear photo of the medicine packaging."), and leave all other fields empty. Do not proceed further.
  2.  **Visual Understanding:** If the image is valid, perform OCR to detect all text on the box, including the name, composition, and manufacturer.
  3.  **Medical Reasoning:** Cross-reference the detected information with reliable medical databases to verify the details.
  4.  **Structured Output Generation:** Populate all the fields in the output schema with accurate information.

  **CRITICAL SAFETY RULE:** Your tone must be strictly educational. If the image is a valid medicine box, conclude the 'sideEffectsAndPrecautions' field with a strong, capitalized sentence: "THIS IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE. CONSULT A DOCTOR BEFORE TAKING ANY MEDICATION."`,
});

const analyzeMedicineBoxImageFlow = ai.defineFlow(
  {
    name: 'analyzeMedicineBoxImageFlow',
    inputSchema: AnalyzeMedicineBoxImageInputSchema,
    outputSchema: AnalyzeMedicineBoxImageOutputSchema,
  },
  async input => {
    const {output} = await analyzeMedicineBoxImagePrompt(input);
    return output!;
  }
);
