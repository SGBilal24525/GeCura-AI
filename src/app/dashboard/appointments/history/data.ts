
import { Doctor, doctors } from '../data';

export type Appointment = {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  mode: 'online' | 'clinic';
};

export const appointments: Appointment[] = [
  {
    id: '1',
    doctor: doctors.find(d => d.id === '3')!,
    date: '2024-08-15',
    time: '10:30 AM',
    status: 'Confirmed',
    mode: 'online',
  },
  {
    id: '2',
    doctor: doctors.find(d => d.id === '1')!,
    date: '2024-08-12',
    time: '02:00 PM',
    status: 'Completed',
    mode: 'clinic',
  },
  {
    id: '3',
    doctor: doctors.find(d => d.id === '2')!,
    date: '2024-09-01',
    time: '11:00 AM',
    status: 'Pending',
    mode: 'clinic',
  },
  {
    id: '4',
    doctor: doctors.find(d => d.id === '6')!,
    date: '2024-07-28',
    time: '04:00 PM',
    status: 'Cancelled',
    mode: 'online',
  }
];
