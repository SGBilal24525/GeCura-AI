
export type ActivityItem = {
  id: string;
  type: 'Learning' | 'Smart Answer' | 'AI Doctor' | 'Saved' | 'Removed';
  title: string;
  description: string;
  timestamp: string; // ISO date string
  sourceFeature: string;
};

export const activityData: ActivityItem[] = [
    {
        id: '1',
        type: 'Learning',
        title: 'Asked about "Mechanism of Action of Metformin"',
        description: 'You started a new learning session on this topic.',
        timestamp: new Date().toISOString(),
        sourceFeature: 'Learning Module'
    },
    {
        id: '2',
        type: 'Smart Answer',
        title: 'Analyzed an image of a medical question',
        description: 'The AI identified and answered a question about the Krebs Cycle.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        sourceFeature: 'Smart Answer'
    },
    {
        id: '3',
        type: 'AI Doctor',
        title: 'Started an AI Doctor consultation',
        description: 'You described symptoms of a "mild headache".',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        sourceFeature: 'AI Doctor'
    },
    {
        id: '4',
        type: 'Saved',
        title: 'Saved "Mechanism of Action of Metformin"',
        description: 'You saved this item to your Library.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        sourceFeature: 'Library'
    },
    {
        id: '5',
        type: 'Smart Answer',
        title: 'Analyzed a medicine box',
        description: 'AI identified "Panadol Extra" and provided details.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        sourceFeature: 'Smart Answer'
    },
    {
        id: '6',
        type: 'Learning',
        title: 'Started "Exam Mode" on Cardiology',
        description: 'You took a 10-question quiz on Cardiology.',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
        sourceFeature: 'Learning Module'
    },
     {
        id: '7',
        type: 'Removed',
        title: 'Unsaved an item from your Library',
        description: 'You removed an old consultation note.',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
        sourceFeature: 'Library'
    },
    {
        id: '8',
        type: 'AI Doctor',
        title: 'Consulted AI Doctor about "skin rash"',
        description: 'AI provided guidance and recommended seeing a Dermatologist.',
        timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), // 40 days ago
        sourceFeature: 'AI Doctor'
    }
];
