import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyBhNU38_g7ovmZ6CjQPBbH28MdXpETWFvE',
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
