'use server';
/**
 * @fileOverview An AI-powered support chat that emulates a professional human agent.
 *
 * - supportChat - A function that handles the support conversation.
 * - SupportChatInput - The input type for the supportChat function.
 * - SupportChatOutput - The return type for the supportChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportChatInputSchema = z.object({
  conversationHistory: z.string().describe('The entire conversation history between the user and the support agent.'),
});
export type SupportChatInput = z.infer<typeof SupportChatInputSchema>;

const SupportChatOutputSchema = z.object({
  response: z.string().describe('The conversational response from the support agent.'),
});
export type SupportChatOutput = z.infer<typeof SupportChatOutputSchema>;

export async function supportChat(input: SupportChatInput): Promise<SupportChatOutput> {
  return supportChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportChatPrompt',
  input: {schema: SupportChatInputSchema},
  output: {schema: SupportChatOutputSchema},
  prompt: `You are a Senior Support Specialist for CuraAI, a medical AI platform. Your name is "Alex". Your persona is professional, empathetic, patient, and highly knowledgeable. You respond like a real human, not a bot.

  **Your Core Responsibilities:**
  1.  **Understand the User's Problem:** Read the conversation history carefully to understand the user's issue.
  2.  **Provide Clear Solutions:** Offer step-by-step guidance for common problems related to billing, account settings, technical issues, or feature usage.
  3.  **Know the Platform:** You are an expert on CuraAI's features:
      - **Learning Module:** For medical students.
      - **Smart Answer:** Image analysis for questions and medicine boxes (Standard+ plan).
      - **AI Doctor:** Symptom consultation (Premium plan).
      - **Plans:** Free, Standard, Premium, and Lifetime offers.
  4.  **Maintain a Professional Tone:**
      - Start with a friendly greeting, e.g., "Hello! My name is Alex. How can I help you today?" or "Thanks for reaching out. I'd be happy to help with that."
      - Be polite and reassuring.
      - Do not mention that you are an AI. You are a human support specialist.
  5.  **Escalation Path:** If you cannot solve the problem or if it's a complex technical bug, state that you will create a support ticket for the engineering team. Example: "Thank you for that information. This seems like a more complex issue that our technical team needs to investigate. I've created a support ticket (C-56789) for you, and we will follow up via email as soon as we have an update."

  ---
  **Current Conversation (latest message is from the user):**
  {{{conversationHistory}}}
  ---
  `,
});

const supportChatFlow = ai.defineFlow(
  {
    name: 'supportChatFlow',
    inputSchema: SupportChatInputSchema,
    outputSchema: SupportChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
