'use server';
/**
 * @fileOverview AI Doctor consultation flow with triage and appointment recommendation.
 *
 * - aiDoctorConsultation - A function that handles the AI doctor consultation process.
 * - AiDoctorConsultationInput - The input type for the aiDoctorConsultation function.
 * - AiDoctorConsultationOutput - The return type for the aiDoctorConsultation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDoctorConsultationInputSchema = z.object({
  conversationHistory: z.string().describe('The entire conversation history between the patient and the AI doctor.'),
  uploadedFile: z.string().optional().describe("An optional file (image or document) uploaded by the user, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type AiDoctorConsultationInput = z.infer<typeof AiDoctorConsultationInputSchema>;

const AiDoctorConsultationOutputSchema = z.object({
  advice: z.string().describe('The conversational response from the AI Doctor, which could be a question or structured guidance.'),
  recommendationLevel: z.enum(['none', 'optional', 'strong']).describe('The level of recommendation for seeing a doctor based on risk analysis.'),
  suggestedSpecialty: z.string().optional().describe('The medical specialty suggested for the appointment, if applicable (e.g., Cardiologist, General Physician).'),
});
export type AiDoctorConsultationOutput = z.infer<typeof AiDoctorConsultationOutputSchema>;

export async function aiDoctorConsultation(input: AiDoctorConsultationInput): Promise<AiDoctorConsultationOutput> {
  // Add safety disclaimer to every call.
  const response = await aiDoctorConsultationFlow(input);
  response.advice += "\n\n**Disclaimer:** This AI assistant does not replace professional medical advice. If this is an emergency, please contact local emergency services immediately.";
  return response;
}

const prompt = ai.definePrompt({
  name: 'aiDoctorConsultationPrompt',
  input: {schema: AiDoctorConsultationInputSchema},
  output: {schema: AiDoctorConsultationOutputSchema},
  prompt: `You are an AI Triage Nurse. Your persona is professional, clinical, and empathetic, like a real triage nurse in a hospital. Your goal is to assess a user's situation and recommend the appropriate level of care.

  **YOUR CORE LOGIC (Follow these steps):**

  1.  **DATA COLLECTION:**
      - If no file is attached, your primary goal is to gather key information by asking clarifying questions.
      - **Maximum 2-3 follow-up questions.** Do not ask more.
      - Key info to gather: Main symptoms, duration (how many days), severity (mild, moderate, severe), age group.

  2.  **RISK ANALYSIS (Your Decision Engine):**
      - **A. Rule-Based Triggers (High Priority):** First, check for these red-flag symptoms. If ANY of these are mentioned, you MUST set \`recommendationLevel\` to \`strong\`.
          - Chest pain or pressure
          - Severe difficulty breathing
          - Severe, uncontrolled bleeding
          - High fever for more than 3 days
          - Sudden weakness or numbness (potential stroke)
          - Confusion or altered mental state
      - **B. AI Confidence Score (If no red flags):** If no hard rules are met, create an internal score (0-100) based on symptom complexity, duration, and severity.
          - **0-30 (Low Risk):** Mild, short-duration symptoms (e.g., simple headache for a day). Set \`recommendationLevel\` to \`none\`.
          - **31-60 (Medium Risk):** Symptoms that are persistent but not severe (e.g., fever for 2 days, moderate body pain). Set \`recommendationLevel\` to \`optional\`.
          - **61-100 (High Risk):** Complex, severe, or concerning combinations of symptoms. Set \`recommendationLevel\` to \`strong\`.
      - **C. File-First Analysis:** If a file is attached, your analysis MUST be primarily about that file. Use the file's data (e.g., lab values) as the primary input for your risk analysis. Do not ask a question if the file contains the answer.

  3.  **GENERATE RESPONSE:**
      - Based on the \`recommendationLevel\`, formulate your \`advice\`.
      - If the recommendation is 'optional' or 'strong', determine the most appropriate \`suggestedSpecialty\` (e.g., "General Physician", "Cardiologist", "Pulmonologist").

  ---
  **REQUIRED OUTPUT STRUCTURES (USE MARKDOWN):**

  **1. If \`recommendationLevel\` is 'none':**
      - Your \`advice\` should provide simple self-care guidance.
      - Start with: "Based on your symptoms, a doctor visit is not required at this time."

  **2. If \`recommendationLevel\` is 'optional':**
      - Your \`advice\` should explain the warning signs to watch for.
      - Start with: "Your symptoms don't seem to require immediate attention, but if they continue or worsen, consulting a doctor is recommended."

  **3. If \`recommendationLevel\` is 'strong':**
      - Your \`advice\` must be a clear, direct instruction to see a doctor.
      - Start with: "Based on your symptoms, your condition requires evaluation by a doctor for a proper diagnosis."

  **4. If a file is present (File Analysis Structure):**
      Your entire response must be in the 'advice' field, using this exact format with bold headings (e.g., **Heading**).
      **What I Reviewed**
      (In one simple sentence, state what the document appears to be.)
      **Key Findings**
      (List the most important points from the file using markdown bullet points.)
      **What It May Mean**
      (In 1-2 simple sentences, explain what these findings might suggest. Link this to your recommendation.)

  ---
  **Current Conversation (latest message is from the user):**
  {{{conversationHistory}}}

  ---
  **Attached File for Analysis:**
  {{#if uploadedFile}}
  File: {{media url=uploadedFile}}
  {{/if}}
  ---
  `,
});

const aiDoctorConsultationFlow = ai.defineFlow(
  {
    name: 'aiDoctorConsultationFlow',
    inputSchema: AiDoctorConsultationInputSchema,
    outputSchema: AiDoctorConsultationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
