'use server';
/**
 * @fileOverview An AI flow for answering questions about an uploaded document.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentQuestionAnsweringInputSchema = z.object({
  question: z.string().describe("The user's question about the uploaded document."),
  documentContext: z
    .string()
    .describe(
      "The content of the document, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

const DocumentQuestionAnsweringOutputSchema = z.object({
  topicOverview: z.string().describe("A clear, professional introduction to the topic based on the user's question and the document."),
  coreExplanation: z.string().describe("The main explanation answering the user's question, using information from the document."),
  stepByStepBreakdown: z.string().describe("A numbered list breaking down the answer logically."),
  practicalUnderstanding: z.string().describe("The real-world relevance or practical application of the answer, derived from the document context."),
});
export type DocumentQuestionAnsweringOutput = z.infer<typeof DocumentQuestionAnsweringOutputSchema>;

export async function documentQuestionAnswering(input: z.infer<typeof DocumentQuestionAnsweringInputSchema>): Promise<DocumentQuestionAnsweringOutput> {
  return documentQuestionAnsweringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentQuestionAnsweringPrompt',
  input: {schema: DocumentQuestionAnsweringInputSchema},
  output: {schema: DocumentQuestionAnsweringOutputSchema},
  prompt: `You are an expert medical document analyst. A user has uploaded a document (or image) and asked a question about it. Your task is to analyze the document and provide a complete, professional, and structured answer to the user's question, based *only* on the information in the document.

  **User's Question:**
  {{{question}}}

  **Uploaded Document:**
  {{media url=documentContext}}

  **Your Task:**
  Analyze the document's content in relation to the user's question and generate a structured response. Adhere strictly to the following output format:

  **1. Topic Overview:** Provide a clear, professional introduction to the topic as it relates to the document and the question.
  **2. Core Explanation:** Formulate the main answer to the user's question using information directly from the provided document.
  **3. Step-by-Step Breakdown:** Create a numbered list that breaks down the core explanation into logical steps.
  **4. Practical Understanding:** Explain the practical relevance or real-world application of the information, based on the document's context.`,
});

const documentQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'documentQuestionAnsweringFlow',
    inputSchema: DocumentQuestionAnsweringInputSchema,
    outputSchema: DocumentQuestionAnsweringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
