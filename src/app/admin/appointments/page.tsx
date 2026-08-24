'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  File,
  ListFilter,
  Search,
  Eye,
  Calendar as CalendarIcon,
  Trash2,
  Clock,
  Video,
  Hospital,
  User,
  Briefcase,
  Info,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format, subDays } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { appointments, Appointment, statuses, urgencies, consultationTypes } from './data';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from "react-day-picker"


const statusStyles = {
  Upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
};

const urgencyStyles = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-blue-500',
}

function ViewDetailsDialog({ appointment, isOpen, onOpenChange }: { appointment: Appointment | null; isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
    if (!appointment) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                    <DialogDescription>
                        Summary for Appointment ID: <span className="font-mono">{appointment.id}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4" /> Patient Information</h4>
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={appointment.user.avatar} />
                                <AvatarFallback>{appointment.user.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">{appointment.user.name}</div>
                                <div className="text-sm text-muted-foreground">{appointment.user.email}</div>
                            </div>
                        </div>
                    </div>

                    <Separator />
                    
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground"><Briefcase className="h-4 w-4" /> Doctor Information</h4>
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={appointment.doctor.avatar} />
                                <AvatarFallback>{appointment.doctor.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">{appointment.doctor.name}</div>
                                <div className="text-sm text-muted-foreground">{appointment.doctor.specialty}</div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                         <h4 className="font-semibold text-sm flex items-center gap-2 text-muted-foreground"><Info className="h-4 w-4" /> Appointment Details</h4>
                         <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pl-6">
                            <div className="flex items-center gap-2 font-medium">Date:</div>
                            <div>{format(new Date(appointment.date), 'PPP')}</div>
                            
                            <div className="flex items-center gap-2 font-medium">Time:</div>
                            <div>{appointment.time}</div>

                            <div className="flex items-center gap-2 font-medium">Mode:</div>
                            <div>
                                <Badge variant="outline" className="flex w-fit items-center gap-1.5">
                                    {appointment.mode === 'Online' ? <Video className="h-3 w-3" /> : <Hospital className="h-3 w-3" />}
                                    {appointment.mode}
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2 font-medium">Urgency:</div>
                            <div>
                                <Badge variant="outline" className="flex w-fit items-center gap-1.5">
                                    <div className={cn("h-2 w-2 rounded-full", urgencyStyles[appointment.urgency])}></div>
                                    {appointment.urgency}
                                </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 font-medium">Status:</div>
                            <div>
                                <Badge className={cn('font-normal', statusStyles[appointment.status])}>{appointment.status}</Badge>
                            </div>
                         </div>
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function RescheduleDialog({ appointment, isOpen, onOpenChange, onConfirm }: { appointment: Appointment | null; isOpen: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; }) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00'];
    const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

    if (!appointment) return null;
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Reschedule Appointment</DialogTitle>
                    <DialogDescription>
                        Select a new date and time for the appointment with {appointment.doctor.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 grid md:grid-cols-2 gap-6 items-start">
                    <div className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label>Select a new time slot:</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map(time => (
                                <Button key={time} variant={selectedTime === time ? 'default' : 'outline'} onClick={() => setSelectedTime(time)}>{time}</Button>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={onConfirm} disabled={!date || !selectedTime}>Confirm Reschedule</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


function ConfirmationDialog({ title, description, isOpen, onOpenChange, onConfirm, confirmVariant = 'default' }: { title: string; description: string; isOpen: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; confirmVariant?: 'default' | 'destructive' }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className={buttonVariants({ variant: confirmVariant })}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function ExportDialog({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
    const { toast } = useToast();
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 30),
        to: new Date(),
    });

    const handleExport = () => {
        if (!date?.from) {
             toast({ title: "Please select a date range.", variant: "destructive" });
             return;
        }
        toast({
            title: "Exporting Report",
            description: `Appointments from ${format(date.from, 'PPP')}${date.to ? ` to ${format(date.to, 'PPP')}` : ''} are being exported.`
        });
        onOpenChange(false);
    }
    
    return (
         <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 sm:max-w-2xl">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Select date range</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </div>
                <DialogFooter className="p-6 bg-muted/50 sm:justify-end justify-center">
                    <Button onClick={handleExport}>Apply & Download</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Main Page Component
export default function AdminAppointmentsPage() {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [urgencyFilter, setUrgencyFilter] = React.useState('All');
  const [consultationTypeFilter, setConsultationTypeFilter] = React.useState('All');

  // Modal States
  const [modalState, setModalState] = React.useState({
    view: false,
    reschedule: false,
    cancel: false,
    flag: false,
  });
  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [isExportOpen, setIsExportOpen] = React.useState(false);


  const filteredAppointments = React.useMemo(() => {
    return appointments
      .filter(t => statusFilter === 'All' || t.status === statusFilter)
      .filter(t => urgencyFilter === 'All' || t.urgency === urgencyFilter)
      .filter(t => consultationTypeFilter === 'All' || t.mode === consultationTypeFilter)
      .filter(t => {
        const term = searchTerm.toLowerCase();
        return t.user.name.toLowerCase().includes(term) || t.doctor.name.toLowerCase().includes(term) || t.id.toLowerCase().includes(term);
      });
  }, [searchTerm, statusFilter, urgencyFilter, consultationTypeFilter]);

  const openModal = (modal: keyof typeof modalState, appointment: Appointment | null = null) => {
      setOpenMenuId(null);
      setSelectedAppointment(appointment);
      setModalState(prev => ({...prev, [modal]: true}));
  }
  
  const closeModal = (modal: keyof typeof modalState) => {
      setModalState(prev => ({...prev, [modal]: false}));
      setSelectedAppointment(null);
  }
  
  const handleReschedule = () => {
    if (!selectedAppointment) return;
    toast({
        title: "Appointment Rescheduled",
        description: `Appointment ${selectedAppointment.id} has been successfully rescheduled.`
    });
    closeModal('reschedule');
  };

  const handleCancel = () => {
      if (!selectedAppointment) return;
      toast({ title: "Appointment Cancelled", description: `Appointment ${selectedAppointment.id} has been cancelled.`, variant: 'destructive'});
      closeModal('cancel');
  };

  const handleFlag = () => {
      if (!selectedAppointment) return;
      toast({ title: "Appointment Flagged", description: `Appointment ${selectedAppointment.id} has been flagged for review.` });
      closeModal('flag');
  };

  const kpiCards = [
    { title: 'Total Appointments (Today)', value: '42' },
    { title: 'High Urgency', value: '5' },
    { title: 'Pending Approvals', value: '8' },
  ]

  return (
    <>
      <ViewDetailsDialog appointment={selectedAppointment} isOpen={modalState.view} onOpenChange={() => closeModal('view')} />
      <RescheduleDialog appointment={selectedAppointment} isOpen={modalState.reschedule} onOpenChange={() => closeModal('reschedule')} onConfirm={handleReschedule} />
      <ConfirmationDialog title="Cancel Appointment?" description={`Are you sure you want to cancel appointment ${selectedAppointment?.id}?`} isOpen={modalState.cancel} onOpenChange={() => closeModal('cancel')} onConfirm={handleCancel} confirmVariant="destructive" />
      <ConfirmationDialog title="Flag Appointment?" description={`Are you sure you want to flag appointment ${selectedAppointment?.id} for review?`} isOpen={modalState.flag} onOpenChange={() => closeModal('flag')} onConfirm={handleFlag} />
      <ExportDialog isOpen={isExportOpen} onOpenChange={setIsExportOpen} />

      <div className="grid gap-4 md:grid-cols-3 md:gap-8 mb-8">
        {kpiCards.map(card => (
            <Card key={card.title} className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <CardDescription>
            Monitor, manage, and audit all medical appointments.
          </CardDescription>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, doctor, or ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-auto"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
               <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-auto"><SelectValue placeholder="Filter by urgency" /></SelectTrigger>
                <SelectContent>{urgencies.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
              </Select>
               <Select value={consultationTypeFilter} onValueChange={setConsultationTypeFilter}>
                <SelectTrigger className="w-auto"><SelectValue placeholder="Filter by type" /></SelectTrigger>
                <SelectContent>{consultationTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-10 gap-1" onClick={() => setIsExportOpen(true)}>
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appointment ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length > 0 ? filteredAppointments.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8"><AvatarImage src={t.user.avatar} /><AvatarFallback>{t.user.name.substring(0,2)}</AvatarFallback></Avatar>
                        <div>
                            <div className="font-medium text-sm">{t.user.name}</div>
                            <div className="text-xs text-muted-foreground">{t.user.email}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                        <div className="font-medium text-sm">{t.doctor.name}</div>
                        <div className="text-xs text-muted-foreground">{t.doctor.specialty}</div>
                    </div>
                  </TableCell>
                   <TableCell>
                       <div>
                           <div className="text-sm">{format(new Date(t.date), 'PPP')}</div>
                           <div className="text-xs text-muted-foreground">{t.time}</div>
                       </div>
                    </TableCell>
                   <TableCell>
                       <Badge variant="outline" className="flex w-fit items-center gap-1.5">
                          {t.mode === 'Online' ? <Video className="h-3 w-3" /> : <Hospital className="h-3 w-3" />}
                          {t.mode}
                       </Badge>
                   </TableCell>
                  <TableCell>
                     <Badge variant="outline" className="flex w-fit items-center gap-1.5">
                        <div className={cn("h-2 w-2 rounded-full", urgencyStyles[t.urgency])}></div>
                        {t.urgency}
                     </Badge>
                  </TableCell>
                   <TableCell>
                     <Badge className={cn('font-normal', statusStyles[t.status])}>{t.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu open={openMenuId === t.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? t.id : null)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => openModal('view', t)}><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => openModal('reschedule', t)}><CalendarIcon className="mr-2 h-4 w-4" />Reschedule</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => openModal('cancel', t)} className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">No appointments found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>{filteredAppointments.length}</strong> of <strong>{appointments.length}</strong> appointments.
            </div>
        </CardFooter>
      </Card>
    </>
  );
}
