export type Appointment = {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  doctor: {
    name: string;
    specialty: string;
    avatar: string;
  };
  date: string; // ISO string
  time: string;
  mode: 'Online' | 'Clinic';
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'Pending';
};

export const appointments: Appointment[] = [
  {
    id: 'appt_1',
    user: { name: 'Olivia Martin', email: 'olivia.martin@email.com', avatar: 'https://i.pravatar.cc/150?img=1' },
    doctor: { name: 'Dr. John Doe', specialty: 'Cardiologist', avatar: 'https://i.pravatar.cc/150?img=12' },
    date: '2024-08-15T10:30:00.000Z',
    time: '10:30 AM',
    mode: 'Online',
    urgency: 'Medium',
    status: 'Upcoming',
  },
  {
    id: 'appt_2',
    user: { name: 'Jackson Lee', email: 'jackson.lee@email.com', avatar: 'https://i.pravatar.cc/150?img=2' },
    doctor: { name: 'Dr. Sameer Ahmed', specialty: 'General Physician', avatar: 'https://i.pravatar.cc/150?img=3' },
    date: '2024-07-22T14:00:00.000Z',
    time: '02:00 PM',
    mode: 'Clinic',
    urgency: 'Low',
    status: 'Completed',
  },
  {
    id: 'appt_3',
    user: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', avatar: 'https://i.pravatar.cc/150?img=3' },
    doctor: { name: 'Dr. Emily White', specialty: 'Pediatrician', avatar: 'https://i.pravatar.cc/150?img=4' },
    date: '2024-08-20T09:00:00.000Z',
    time: '09:00 AM',
    mode: 'Clinic',
    urgency: 'High',
    status: 'Pending',
  },
  {
    id: 'appt_4',
    user: { name: 'William Kim', email: 'will.kim@email.com', avatar: 'https://i.pravatar.cc/150?img=4' },
    doctor: { name: 'Dr. Jane Smith', specialty: 'Dermatologist', avatar: 'https://i.pravatar.cc/150?img=5' },
    date: '2024-07-18T11:00:00.000Z',
    time: '11:00 AM',
    mode: 'Online',
    urgency: 'Low',
    status: 'Cancelled',
  },
    {
    id: 'appt_5',
    user: { name: 'Sofia Davis', email: 'sofia.davis@email.com', avatar: 'https://i.pravatar.cc/150?img=5' },
    doctor: { name: 'Dr. Michael Brown', specialty: 'Neurologist', avatar: 'https://i.pravatar.cc/150?img=8' },
    date: '2024-09-01T16:00:00.000Z',
    time: '04:00 PM',
    mode: 'Online',
    urgency: 'High',
    status: 'Upcoming',
  },
];

export const statuses = ['All', 'Upcoming', 'Completed', 'Cancelled', 'Pending'];
export const urgencies = ['All', 'Low', 'Medium', 'High'];
export const consultationTypes = ['All', 'Online', 'Clinic'];
