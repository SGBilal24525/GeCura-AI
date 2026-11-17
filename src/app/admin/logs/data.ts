export type LogItem = {
  id: string;
  timestamp: string; // ISO string
  user: {
    name: string;
    role: 'Admin' | 'User' | 'System';
  };
  action: 'Login' | 'Update' | 'Create' | 'Delete' | 'Payment' | 'Security';
  target: string; // e.g., 'User: Olivia Martin', 'Plan: Premium', 'AI Rule: Triage Nurse'
  status: 'Success' | 'Failed' | 'Warning';
  ipAddress: string;
  description: string;
};

export const logs: LogItem[] = [
  {
    id: 'log_1',
    timestamp: '2024-07-22T14:30:00.000Z',
    user: { name: 'sgbilal33845@gmail.com', role: 'Admin' },
    action: 'Update',
    target: 'AI Rule: Triage Nurse',
    status: 'Success',
    ipAddress: '192.168.1.1',
    description: 'Admin updated the maximum follow-up questions from 3 to 2 for the AI Doctor.',
  },
  {
    id: 'log_2',
    timestamp: '2024-07-22T14:25:00.000Z',
    user: { name: 'olivia.martin@email.com', role: 'User' },
    action: 'Payment',
    target: 'Subscription: Premium',
    status: 'Success',
    ipAddress: '203.0.113.25',
    description: 'User successfully subscribed to the Premium plan.',
  },
  {
    id: 'log_3',
    timestamp: '2024-07-22T14:20:00.000Z',
    user: { name: 'jackson.lee@email.com', role: 'User' },
    action: 'Login',
    target: 'User Account',
    status: 'Failed',
    ipAddress: '198.51.100.10',
    description: 'Failed login attempt for user jackson.lee@email.com.',
  },
    {
    id: 'log_4',
    timestamp: '2024-07-21T18:00:00.000Z',
    user: { name: 'system', role: 'System' },
    action: 'Security',
    target: 'System',
    status: 'Warning',
    ipAddress: 'N/A',
    description: 'High number of failed login attempts detected from IP 198.51.100.10.',
  },
  {
    id: 'log_5',
    timestamp: '2024-07-21T16:45:00.000Z',
    user: { name: 'sgbilal33845@gmail.com', role: 'Admin' },
    action: 'Delete',
    target: 'User: temp_user@test.com',
    status: 'Success',
    ipAddress: '192.168.1.1',
    description: 'Admin deleted a temporary user account.',
  },
    {
    id: 'log_6',
    timestamp: '2024-07-20T10:00:00.000Z',
    user: { name: 'isabella.nguyen@email.com', role: 'User' },
    action: 'Update',
    target: 'Profile Settings',
    status: 'Success',
    ipAddress: '10.0.0.5',
    description: 'User updated their profile name.',
  },
];

export const logActions = ['All', 'Login', 'Update', 'Create', 'Delete', 'Payment', 'Security'];
export const logStatuses = ['All', 'Success', 'Failed', 'Warning'];
