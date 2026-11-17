import { config } from 'dotenv';
config();

import '@/ai/flows/normal-learning.ts';
import '@/ai/flows/concept-builder.ts';
import '@/ai/flows/exam-mode.ts';
import '@/ai/flows/mistake-finder.ts';
import '@/ai/flows/document-question-answering.ts';
import '@/ai/flows/ai-doctor-consultation.ts';
import '@/ai/flows/analyze-medical-question-images.ts';
import '@/ai/flows/image-based-medical-analysis.ts';
import '@/ai/flows/analyze-prescription-image.ts';
import '@/ai/flows/structured-text-output.ts';
import '@/ai/flows/support-chat.ts';
import '@/ai/flows/concept-visualizer.ts';
