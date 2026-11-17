'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { appointments, Appointment } from './data';
import { MoreVertical, History, Video, Hospital, Calendar, Clock, Info } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

const statusStyles = {
  Confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};


// Details Modal Component
function AppointmentDetailsModal({ appointment, isOpen, onOpenChange }: { appointment: Appointment | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    if (!appointment) return null;
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                    <DialogDescription>
                        Summary of your appointment on {format(new Date(appointment.date), 'PPP')}.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="flex items-center gap-4">
                        <Image src={appointment.doctor.image} alt={appointment.doctor.name} width={64} height={64} className="rounded-full" />
                        <div>
                            <h3 className="font-semibold text-lg">{appointment.doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.doctor.specialty}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div><span className="font-medium">Date:</span> {format(new Date(appointment.date), 'PPP')}</div>
                        </div>
                        <div className="flex items-center gap-2">
                             <Clock className="h-4 w-4 text-muted-foreground" />
                            <div><span className="font-medium">Time:</span> {appointment.time}</div>
                        </div>
                         <div className="flex items-center gap-2">
                           {appointment.mode === 'online' ? <Video className="h-4 w-4 text-muted-foreground" /> : <Hospital className="h-4 w-4 text-muted-foreground" />}
                           <div><span className="font-medium">Mode:</span> <span className="capitalize">{appointment.mode}</span></div>
                        </div>
                         <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-muted-foreground" />
                             <div><span className="font-medium">Status:</span> <Badge className={cn('font-normal text-xs', statusStyles[appointment.status])}>{appointment.status}</Badge></div>
                        </div>
                    </div>
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Reschedule Modal Component
function RescheduleModal({ appointment, isOpen, onOpenChange }: { appointment: Appointment | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
    
    if (!appointment) return null;
    
    const handleReschedule = () => {
         if (!selectedTime || !selectedDate) {
            toast({ title: "Please select a new date and time.", variant: 'destructive' });
            return;
        }
        toast({
            title: "Reschedule Request Sent",
            description: `Your request to reschedule for ${format(selectedDate, 'PPP')} at ${selectedTime} has been sent.`
        });
        onOpenChange(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Reschedule Appointment</DialogTitle>
                    <DialogDescription>Select a new date and time for your appointment with {appointment.doctor.name}.</DialogDescription>
                </DialogHeader>
                <div className="py-4 grid md:grid-cols-2 gap-6 items-start">
                     <div className="space-y-3">
                        <h5 className="font-medium text-sm">Select a New Date</h5>
                         <div className="flex justify-center">
                            <CalendarComponent
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                         <h5 className="font-medium text-sm">Select a New Time</h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {timeSlots.map(time => (
                                <Button key={time} variant={selectedTime === time ? 'default' : 'outline'} onClick={() => setSelectedTime(time)}>{time}</Button>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleReschedule} disabled={!selectedTime || !selectedDate}>
                        Send Reschedule Request
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Cancel Alert Component
function CancelAlert({ isOpen, onOpenChange, onConfirm }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onConfirm: () => void }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will cancel your appointment request. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Go Back</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className={buttonVariants({ variant: "destructive" })}>Yes, Cancel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


export default function AppointmentHistoryPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleViewDetails = (appointment: Appointment) => {
    setOpenMenuId(null);
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  }
  
  const handleReschedule = (appointment: Appointment) => {
    setOpenMenuId(null);
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
  }
  
  const handleCancelRequest = (appointment: Appointment) => {
    setOpenMenuId(null);
    setSelectedAppointment(appointment);
    setIsCancelAlertOpen(true);
  }

  const confirmCancel = () => {
      // In a real app, you would make an API call here.
      toast({
          title: "Appointment Cancelled",
          description: `Your request for an appointment with ${selectedAppointment?.doctor.name} has been cancelled.`
      });
      // Here you would also update the state to reflect the change.
      setIsCancelAlertOpen(false);
      setSelectedAppointment(null);
  }


  return (
    <>
      <AppointmentDetailsModal appointment={selectedAppointment} isOpen={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen} />
      <RescheduleModal appointment={selectedAppointment} isOpen={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen} />
      <CancelAlert isOpen={isCancelAlertOpen} onOpenChange={setIsCancelAlertOpen} onConfirm={confirmCancel} />

      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Appointment History
            </h1>
            <p className="text-muted-foreground">
              View and manage your past and upcoming appointments.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/appointments">Book New Appointment</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Appointments</CardTitle>
            <CardDescription>
              A log of all your appointment requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={appt.doctor.image}
                          alt={appt.doctor.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium">{appt.doctor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {appt.doctor.specialty}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                          <p>{new Date(appt.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          <p className="text-xs text-muted-foreground">{appt.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                          {appt.mode === 'online' ? <Video className="h-3 w-3" /> : <Hospital className="h-3 w-3" />}
                          <span className="capitalize">{appt.mode}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('font-normal', statusStyles[appt.status])}>
                        {appt.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu open={openMenuId === appt.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? appt.id : null)}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => handleViewDetails(appt)}>View Details</DropdownMenuItem>
                          {appt.status === 'Confirmed' && <DropdownMenuItem onSelect={() => handleReschedule(appt)}>Reschedule</DropdownMenuItem>}
                          {appt.status === 'Pending' && <DropdownMenuItem onSelect={() => handleCancelRequest(appt)} className="text-destructive focus:text-destructive">Cancel Request</DropdownMenuItem>}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
