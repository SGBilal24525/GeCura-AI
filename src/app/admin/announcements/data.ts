export type Announcement = {
  id: string;
  title: string;
  targetAudience: 'All' | 'Free' | 'Standard' | 'Premium';
  deliveryMode: ('Push' | 'Email' | 'In-App')[];
  status: 'Draft' | 'Scheduled' | 'Sent';
  scheduledDate: string | null; // ISO string
  sentDate: string | null; // ISO string
  content: string;
};

export const announcements: Announcement[] = [
  {
    id: 'ann_1',
    title: 'New Feature: AI Doctor Consultations',
    targetAudience: 'Premium',
    deliveryMode: ['In-App', 'Email'],
    status: 'Sent',
    scheduledDate: '2024-07-25T10:00:00.000Z',
    sentDate: '2024-07-25T10:00:00.000Z',
    content: 'We are thrilled to announce the launch of our new AI Doctor feature, exclusively for Premium users! Start a conversation today to get real-time guidance on your symptoms.',
  },
  {
    id: 'ann_2',
    title: 'Scheduled Maintenance Downtime',
    targetAudience: 'All',
    deliveryMode: ['In-App'],
    status: 'Sent',
    scheduledDate: '2024-07-20T22:00:00.000Z',
    sentDate: '2024-07-20T22:00:00.000Z',
    content: 'CuraAI will be undergoing scheduled maintenance on July 21st from 2:00 AM to 3:00 AM UTC. The platform may be temporarily unavailable during this time. We apologize for any inconvenience.',
  },
  {
    id: 'ann_3',
    title: 'Summer Sale: 50% Off Lifetime Plans!',
    targetAudience: 'All',
    deliveryMode: ['Email', 'Push'],
    status: 'Scheduled',
    scheduledDate: '2024-08-01T12:00:00.000Z',
    sentDate: null,
    content: 'For a limited time, get 50% off on our Lifetime Standard and Premium plans. Pay once, and get access forever! This offer ends August 15th.',
  },
  {
    id: 'ann_4',
    title: 'Improvements to Smart Image Analysis',
    targetAudience: 'Standard',
    deliveryMode: ['In-App'],
    status: 'Draft',
    scheduledDate: null,
    sentDate: null,
    content: 'We have updated our AI models for Smart Image Analysis, resulting in faster and more accurate results for textbook questions and medicine boxes.',
  },
  {
    id: 'ann_5',
    title: 'Welcome to CuraAI!',
    targetAudience: 'Free',
    deliveryMode: ['Email'],
    status: 'Sent',
    scheduledDate: '2024-07-18T18:00:00.000Z',
    sentDate: '2024-07-18T18:00:00.000Z',
    content: 'Welcome to CuraAI! We\'re excited to have you on board. Start exploring our AI-powered learning features today.',
  },
];
