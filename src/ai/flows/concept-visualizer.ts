'use server';
/**
 * @fileOverview An AI flow for visualizing medical concepts.
 *
 * - conceptVisualizer - A function that converts a medical topic into a series of visual explanations.
 * - ConceptVisualizerInput - The input type for the conceptVisualizer function.
 * - ConceptVisualizerOutput - The return type for the conceptVisualizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConceptVisualizerInputSchema = z.object({
  topic: z.string().describe('The complex medical topic or question to be visualized.'),
});
export type ConceptVisualizerInput = z.infer<typeof ConceptVisualizerInputSchema>;

const VisualSchema = z.object({
    title: z.string().describe('The title of the visual, e.g., "Inflammation Pathway Flowchart".'),
    type: z.enum(['flowchart', 'block-diagram', 'comparison', 'labeled-visual']).describe('The type of visual representation.'),
    explanation: z.string().describe('A detailed, markdown-formatted explanation that accompanies the visual. This should include simple language and highlight key medical terms.'),
});

const ConceptVisualizerOutputSchema = z.object({
  visuals: z.array(VisualSchema).describe('An array of visual explanations, each with a title, type, and detailed description.'),
});
export type ConceptVisualizerOutput = z.infer<typeof ConceptVisualizerOutputSchema>;


export async function conceptVisualizer(input: ConceptVisualizerInput): Promise<ConceptVisualizerOutput> {
  return conceptVisualizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conceptVisualizerPrompt',
  input: {schema: ConceptVisualizerInputSchema},
  output: {schema: ConceptVisualizerOutputSchema},
  prompt: `You are a Visual Medical Educator AI. Your task is to take a complex medical topic and transform it into a series of simple, structured visual explanations. You will not generate images, but rather describe the visuals in a structured JSON format.

  **Topic to Visualize:**
  {{{topic}}}

  **Your Thought Process (Follow these steps):**

  1.  **Deconstruct the Concept:** Break the topic down into logical parts (e.g., Definition, Process, Interaction, Outcome).
  2.  **Determine Visual Type:** For each part, decide the best type of visual to explain it. Is it a step-by-step process? A cause-and-effect relationship? A comparison? Choose from 'flowchart', 'block-diagram', 'comparison', or 'labeled-visual'.
  3.  **Generate Visual Content:** For each visual you decide on, create a title and a detailed explanation.
      -   The **title** should be descriptive (e.g., "Visual 1: How Aspirin Blocks COX Enzymes").
      -   The **explanation** must be in simple language, using analogies where possible. Use markdown for structure (like bullet points). Highlight key medical terms.

  **Example Task:**
  -   **Input Topic:** "How Aspirin Works"
  -   **AI Decision:**
      1.  First, explain inflammation (flowchart).
      2.  Second, show how Aspirin interferes (block-diagram).
      3.  Third, show the result (comparison).
  -   **AI Output (JSON):**
      \`\`\`json
      {
        "visuals": [
          {
            "title": "Visual 1: The Inflammation Pathway",
            "type": "flowchart",
            "explanation": "- An injury occurs.\\n- The body produces chemicals called **Prostaglandins**.\\n- These chemicals cause pain and swelling."
          },
          {
            "title": "Visual 2: Aspirin's Intervention",
            "type": "block-diagram",
            "explanation": "- **Aspirin** is taken.\\n- It blocks an enzyme called **COX (Cyclooxygenase)**.\\n- Because COX is blocked, the body cannot produce Prostaglandins."
          },
          {
            "title": "Visual 3: The Result (Comparison)",
            "type": "comparison",
            "explanation": "- **Without Aspirin:** Pain and swelling continue.\\n- **With Aspirin:** Pain and swelling are reduced."
          }
        ]
      }
      \`\`\`

  Now, apply this process to the user's topic. Generate the structured JSON output.
  `,
});

const conceptVisualizerFlow = ai.defineFlow(
  {
    name: 'conceptVisualizerFlow',
    inputSchema: ConceptVisualizerInputSchema,
    outputSchema: ConceptVisualizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
