export type Ticket = {
  id: string;
  subject: string;
  user: {
    name: string;
    email: string;
    plan: 'Free' | 'Standard' | 'Premium' | 'Admin';
  };
  timestamp: string; // ISO string
  status: 'Open' | 'Pending' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  conversation: Array<{
      author: string;
      message: string;
      timestamp: string;
  }>
};

export const tickets: Ticket[] = [
  {
    id: 'tkt_1',
    subject: 'Issue with AI Doctor response',
    user: { name: 'Olivia Martin', email: 'olivia.martin@email.com', plan: 'Premium' },
    timestamp: '2024-07-22T10:30:00.000Z',
    status: 'Open',
    priority: 'High',
    assignedTo: 'Alex',
    conversation: [
        { author: 'Olivia Martin', message: 'I asked the AI Doctor about a persistent cough, and it gave me a very generic answer that didn\'t seem to consider the duration I mentioned. I am a bit concerned about the quality of the advice.', timestamp: '2024-07-22T10:30:00.000Z' }
    ]
  },
  {
    id: 'tkt_2',
    subject: 'Billing question about yearly plan',
    user: { name: 'Jackson Lee', email: 'jackson.lee@email.com', plan: 'Standard' },
    timestamp: '2024-07-21T14:00:00.000Z',
    status: 'Pending',
    priority: 'Medium',
    assignedTo: 'Jane',
    conversation: [
        { author: 'Jackson Lee', message: 'Hi, I just upgraded to the yearly Standard plan. Can you confirm if the charge is correct? It seems higher than expected.', timestamp: '2024-07-21T14:00:00.000Z' },
        { author: 'Jane', message: 'Hello Jackson, I\'m looking into your billing details now. I will get back to you shortly.', timestamp: '2024-07-21T14:05:00.000Z' }
    ]
  },
  {
    id: 'tkt_3',
    subject: 'Cannot upload image in Smart Answer',
    user: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', plan: 'Standard' },
    timestamp: '2024-07-20T09:00:00.000Z',
    status: 'Closed',
    priority: 'High',
    assignedTo: 'Alex',
    conversation: [
        { author: 'Isabella Nguyen', message: 'I am trying to upload an image of a question from my textbook, but it keeps giving me an error. The file is a JPG and it is not very large.', timestamp: '2024-07-20T09:00:00.000Z' },
        { author: 'Alex', message: 'Hi Isabella, we had a temporary issue with image uploads which is now resolved. Could you please try again? Apologies for the inconvenience.', timestamp: '2024-07-20T09:15:00.000Z' },
        { author: 'Isabella Nguyen', message: 'It works now! Thank you.', timestamp: '2024-07-20T09:20:00.000Z' },
    ]
  },
  {
    id: 'tkt_4',
    subject: 'Feedback on Learning Module',
    user: { name: 'William Kim', email: 'will.kim@email.com', plan: 'Free' },
    timestamp: '2024-07-19T11:00:00.000Z',
    status: 'Open',
    priority: 'Low',
    assignedTo: 'Unassigned',
    conversation: [
        { author: 'William Kim', message: 'Just wanted to say that the Concept Builder feature would be amazing. The normal learning is great, but a deeper dive would be very helpful for my studies.', timestamp: '2024-07-19T11:00:00.000Z' }
    ]
  },
];

export const statuses = ['All', 'Open', 'Pending', 'Closed'];
export const priorities = ['All', 'Low', 'Medium', 'High'];
export const admins = ['All', 'Alex', 'Jane', 'Unassigned'];
