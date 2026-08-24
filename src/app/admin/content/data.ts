export type ContentItem = {
  id: string;
  title: string;
  type: 'Library' | 'FAQ' | 'Tutorial' | 'Reference' | 'System';
  category: string;
  status: 'Published' | 'Draft' | 'Archived';
  lastUpdated: string; // ISO date string
  visibility: 'Free' | 'Standard' | 'Premium' | 'Admin-only';
  content: string;
  isExamRelevant?: boolean;
};

export const contentTypes = ['All', 'Library', 'FAQ', 'Tutorial', 'Reference', 'System'];
export const statuses = ['All', 'Published', 'Draft', 'Archived'];

export const contentData: ContentItem[] = [
  {
    id: '1',
    title: 'How does the Renin-Angiotensin System work?',
    type: 'Library',
    category: 'Cardiology',
    status: 'Published',
    lastUpdated: '2024-07-21T10:00:00.000Z',
    visibility: 'Free',
    content: 'The Renin-Angiotensin-Aldosterone System (RAAS) is a critical hormone system that regulates blood pressure and fluid balance...',
    isExamRelevant: true,
  },
  {
    id: '2',
    title: 'How do I upgrade my plan?',
    type: 'FAQ',
    category: 'Billing',
    status: 'Published',
    lastUpdated: '2024-07-20T11:00:00.000Z',
    visibility: 'Free',
    content: 'You can upgrade your plan at any time from the "Billing" section in your dashboard. Simply select the plan you wish to upgrade to and follow the payment instructions.',
  },
  {
    id: '3',
    title: 'Getting Started with the AI Doctor',
    type: 'Tutorial',
    category: 'Getting Started',
    status: 'Published',
    lastUpdated: '2024-07-19T09:00:00.000Z',
    visibility: 'Premium',
    content: 'This tutorial walks you through starting your first consultation with the AI Doctor...',
  },
  {
    id: '4',
    title: 'Mechanism of Action of Metformin',
    type: 'Reference',
    category: 'Pharmacology',
    status: 'Draft',
    lastUpdated: '2024-07-18T14:00:00.000Z',
    visibility: 'Standard',
    content: 'Metformin decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity...',
    isExamRelevant: true,
  },
  {
    id: '5',
    title: 'AI Prompt: Triage Nurse Persona',
    type: 'System',
    category: 'AI Configuration',
    status: 'Archived',
    lastUpdated: '2024-07-15T18:00:00.000Z',
    visibility: 'Admin-only',
    content: 'You are an AI Triage Nurse. Your persona is professional, clinical, and empathetic...',
  },
];
