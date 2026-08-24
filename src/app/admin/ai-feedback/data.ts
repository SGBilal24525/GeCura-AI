export type FeedbackItem = {
  id: string;
  user: {
    name: string;
    email: string;
    plan: 'Free' | 'Standard' | 'Premium' | 'Admin';
  };
  feature: 'Learning' | 'Smart Answer' | 'AI Doctor';
  type: 'Positive' | 'Negative' | 'Idea' | 'Flagged';
  comment: string;
  aiResponseSnippet: string;
  fullAiResponse: string;
  userQuery: string;
  timestamp: string;
  status: 'Open' | 'Reviewed' | 'Escalated' | 'Resolved';
  rating?: number;
};

export const feedbackData: FeedbackItem[] = [
  {
    id: 'fb_1',
    user: { name: 'Olivia Martin', email: 'olivia.martin@email.com', plan: 'Premium' },
    feature: 'AI Doctor',
    type: 'Flagged',
    comment: 'The advice seemed a bit generic and didn\'t consider the duration of my symptoms properly. It felt a bit risky.',
    aiResponseSnippet: 'Based on your symptoms of a headache, it is likely nothing serious. Consider taking an over-the-counter painkiller...',
    fullAiResponse: 'Based on your symptoms of a headache, it is likely nothing serious. Consider taking an over-the-counter painkiller and getting some rest. If symptoms persist for more than 48 hours, consult a doctor.',
    userQuery: 'I have a persistent headache for 3 days and I am feeling dizzy.',
    timestamp: '2024-07-22T10:30:00.000Z',
    status: 'Open',
    rating: 2,
  },
  {
    id: 'fb_2',
    user: { name: 'Jackson Lee', email: 'jackson.lee@email.com', plan: 'Standard' },
    feature: 'Smart Answer',
    type: 'Positive',
    comment: 'This was amazing! It correctly identified the medicine from a blurry photo and gave me all the details I needed.',
    aiResponseSnippet: 'The medicine has been identified as Amoxicillin 500mg. It is a penicillin-type antibiotic used to treat a wide variety of bacterial infections...',
    fullAiResponse: 'The medicine has been identified as Amoxicillin 500mg. It is a penicillin-type antibiotic used to treat a wide variety of bacterial infections. It works by stopping the growth of bacteria. This antibiotic treats only bacterial infections. It will not work for viral infections (such as common cold, flu).',
    userQuery: '[Image of Amoxicillin box]',
    timestamp: '2024-07-21T14:00:00.000Z',
    status: 'Resolved',
    rating: 5,
  },
  {
    id: 'fb_3',
    user: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', plan: 'Free' },
    feature: 'Learning',
    type: 'Idea',
    comment: 'Could you add a feature to generate flashcards from the explanations? That would be super helpful for studying.',
    aiResponseSnippet: 'The Krebs cycle, also known as the citric acid cycle, is a series of chemical reactions used by all aerobic organisms to release stored energy...',
    fullAiResponse: 'The Krebs cycle, also known as the citric acid cycle, is a series of chemical reactions used by all aerobic organisms to release stored energy through the oxidation of acetyl-CoA derived from carbohydrates, fats, and proteins into adenosine triphosphate (ATP) and carbon dioxide.',
    userQuery: 'Explain the Krebs cycle',
    timestamp: '2024-07-20T09:00:00.000Z',
    status: 'Reviewed',
  },
  {
    id: 'fb_4',
    user: { name: 'William Kim', email: 'will.kim@email.com', plan: 'Premium' },
    feature: 'AI Doctor',
    type: 'Negative',
    comment: 'The AI kept repeating the same question about my symptoms even after I answered it.',
    aiResponseSnippet: 'I understand you have a cough. Can you tell me how long you\'ve had this cough?',
    fullAiResponse: 'I understand you have a cough. Can you tell me how long you\'ve had this cough?',
    userQuery: 'I have had a dry cough for about 5 days now.',
    timestamp: '2024-07-19T11:00:00.000Z',
    status: 'Open',
    rating: 2,
  },
   {
    id: 'fb_5',
    user: { name: 'Admin Review', email: 'system@curaai.com', plan: 'Admin' },
    feature: 'Learning',
    type: 'Flagged',
    comment: 'System-flagged for potentially providing an overly complex answer for a "simple" explanation mode.',
    aiResponseSnippet: 'The pathophysiology of myocardial infarction involves the rupture of an atherosclerotic plaque with subsequent thrombus formation...',
    fullAiResponse: 'The pathophysiology of myocardial infarction involves the rupture of an atherosclerotic plaque with subsequent thrombus formation, leading to acute coronary artery occlusion. This results in a cessation of blood flow to the myocardial tissue, causing ischemia and, if prolonged, irreversible necrosis of the myocardium.',
    userQuery: 'What is a heart attack?',
    timestamp: '2024-07-18T18:00:00.000Z',
    status: 'Escalated',
  },
];

export const feedbackTypes = ['All', 'Positive', 'Negative', 'Idea', 'Flagged'];
export const features = ['All', 'Learning', 'Smart Answer', 'AI Doctor'];
export const statuses = ['All', 'Open', 'Reviewed', 'Escalated', 'Resolved'];
