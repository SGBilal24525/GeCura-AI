'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { doctors, specialties, cities, Doctor } from './data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Hospital, Star, Briefcase, CalendarClock, Info, Loader2, CheckCircle, MapPin, History, Upload, FileText, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

function DoctorCard({ doctor, onSelect }: { doctor: Doctor; onSelect: (doctor: Doctor) => void; }) {
  return (
     <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="flex h-full flex-col p-4">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={doctor.image}
              alt={`Dr. ${doctor.name}`}
              fill
              className="rounded-full border-4 border-background object-cover shadow-md"
            />
             <div className="absolute bottom-0 right-1 rounded-full border-2 border-background bg-green-500 p-0.5">
                <CheckCircle className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-headline text-xl font-bold">{doctor.name}</h3>
            <p className="text-sm font-semibold text-primary">{doctor.specialty}</p>
             <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{doctor.experience} years</span>
                 <span className="text-muted-foreground/50">|</span>
                <Star className="h-4 w-4 text-amber-400" />
                <span>{doctor.rating} ({doctor.reviews})</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col justify-between space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3">{doctor.bio}</p>
            <Button className="mt-auto w-full" onClick={() => onSelect(doctor)}>
                View Profile & Book
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DoctorDetailModal({ doctor, isOpen, onOpenChange, plan }: { doctor: Doctor | null, isOpen: boolean, onOpenChange: (open: boolean) => void, plan: string }) {
    const { toast } = useToast();
    const canRequest = plan === 'premium';
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [notes, setNotes] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

    useEffect(() => {
        if (isOpen) {
            setSelectedDate(new Date());
            setSelectedTime(null);
            setNotes('');
            setFile(null);
        }
    }, [isOpen, doctor]);

    if (!doctor) return null;

    const handleRequest = () => {
        if (!selectedTime) {
            toast({ title: "Please select a time slot.", variant: 'destructive' });
            return;
        }

        toast({
            title: "Appointment Request Sent",
            description: `Your request for ${doctor.name} on ${selectedDate ? format(selectedDate, 'PPP') : ''} at ${selectedTime} has been sent. You will be notified upon confirmation.`
        })
        onOpenChange(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                 <DialogHeader className="flex sm:flex-row flex-col items-start sm:items-center gap-4">
                     <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-background object-cover shadow-md"
                    />
                    <div className='text-left'>
                        <DialogTitle className="font-headline text-2xl">{doctor.name}</DialogTitle>
                        <DialogDescription>{doctor.specialty} - {doctor.experience} years experience</DialogDescription>
                         <div className="flex items-center gap-4 mt-2">
                            {doctor.consultationTypes.map(type => (
                                <Badge key={type} variant="secondary" className="flex items-center gap-1.5">
                                    {type === 'online' ? <Video className="h-3 w-3" /> : <Hospital className="h-3 w-3" />}
                                    <span className="capitalize">{type}</span>
                                </Badge>
                            ))}
                        </div>
                    </div>
                </DialogHeader>
                <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-primary">About {doctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor.bio}</p>
                        <div className="flex items-center gap-2 pt-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{doctor.location}</span>
                        </div>
                    </div>
                    
                    <Separator />
                    
                    {canRequest ? (
                         <div className="space-y-6">
                            <h4 className="font-semibold text-primary">Request an Appointment</h4>
                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                <div className="space-y-3">
                                    <h5 className="font-medium text-sm">1. Select a Date</h5>
                                     <div className="flex justify-center">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            className="rounded-md border"
                                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                     <h5 className="font-medium text-sm">2. Select a Time</h5>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {timeSlots.map(time => (
                                            <Button key={time} variant={selectedTime === time ? 'default' : 'outline'} onClick={() => setSelectedTime(time)} disabled={!canRequest}>{time}</Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h5 className="font-medium text-sm">3. Notes for the doctor (optional)</h5>
                                <Textarea placeholder="Share any relevant details about your condition..." value={notes} onChange={(e) => setNotes(e.target.value)} disabled={!canRequest} />
                            </div>
                            <div className="space-y-3">
                                <h5 className="font-medium text-sm">4. Upload reports (optional)</h5>
                                <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} disabled={!canRequest} />
                            </div>
                        </div>
                    ) : (
                        <Card className="bg-amber-100 dark:bg-amber-900/20 border-amber-400">
                             <CardHeader>
                                <CardTitle className="text-amber-800 dark:text-amber-300">Upgrade to Book Appointments</CardTitle>
                                <CardDescription className="text-amber-700 dark:text-amber-400">To request an appointment, please upgrade to our Premium plan.</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button asChild variant="default" className="bg-amber-500 hover:bg-amber-600">
                                    <Link href="/pricing">View Premium Plans</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button onClick={handleRequest} disabled={!canRequest || !selectedTime} className="w-full sm:w-auto">
                        {canRequest ? 'Request Appointment' : 'Upgrade to Book'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function AiRecommendationBanner({ specialty, urgency }: { specialty: string; urgency: string | null }) {
  if (!specialty || !urgency || urgency === 'none') return null;

  const urgencyMap = {
    'strong': { text: 'High', color: 'bg-red-500' },
    'optional': { text: 'Medium', color: 'bg-amber-500' },
  };
  const urgencyInfo = urgencyMap[urgency as keyof typeof urgencyMap];

  return (
    <Alert className="bg-primary/5 border-primary/20 mb-6">
      <Info className="h-4 w-4" />
      <div className="flex justify-between items-center w-full">
        <div>
          <AlertTitle>AI Recommendation</AlertTitle>
          <AlertDescription>
              Based on your symptoms, we suggest consulting a <span className="font-semibold">{specialty}</span>.
          </AlertDescription>
        </div>
        {urgencyInfo && (
            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <span className="text-sm font-medium">Urgency:</span>
                <Badge className={cn("text-white", urgencyInfo.color)}>{urgencyInfo.text}</Badge>
            </div>
        )}
      </div>
    </Alert>
  );
}


function AppointmentsPageContent() {
  const searchParams = useSearchParams();
  const initialSpecialty = searchParams.get('specialty') || 'All';
  const initialUrgency = searchParams.get('urgency');
  
  const [city, setCity] = useState('All');
  const [specialty, setSpecialty] = useState(initialSpecialty);
  const [availability, setAvailability] = useState('all');
  const [consultationType, setConsultationType] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan');
    setPlan(storedPlan || 'free');
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
      const matchesCity = city === 'All' || doctor.location.includes(city);
      const matchesSpecialty = specialty === 'All' || doctor.specialty === specialty;
      const matchesAvailability = availability === 'all' || doctor.availability === availability;
      const matchesConsultationType = consultationType === 'all' || doctor.consultationTypes.includes(consultationType as 'online' | 'clinic');
      return matchesCity && matchesSpecialty && matchesAvailability && matchesConsultationType;
  });

  const handleSelectDoctor = (doctor: Doctor) => {
      setSelectedDoctor(doctor);
      setIsModalOpen(true);
  }

  if (plan === null) {
      return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <>
      <DoctorDetailModal doctor={selectedDoctor} isOpen={isModalOpen} onOpenChange={setIsModalOpen} plan={plan} />

      <div className="space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Find a Doctor</h1>
                <p className="text-muted-foreground">Search and consult verified medical professionals.</p>
            </div>
             <Button asChild variant="outline">
                <Link href="/dashboard/appointments/history">
                    <History className="mr-2 h-4 w-4" />
                    My Appointments
                </Link>
            </Button>
        </div>
        
        <AiRecommendationBanner specialty={initialSpecialty} urgency={initialUrgency} />

        <Card className="p-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger><SelectValue placeholder="Select Specialty" /></SelectTrigger>
                  <SelectContent>
                      {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
              </Select>
              <Select value={city} onValueChange={setCity}>
                  <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
                  <SelectContent>
                      {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
              </Select>
              <Select value={consultationType} onValueChange={setConsultationType}>
                  <SelectTrigger><SelectValue placeholder="Consultation Type" /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="clinic">In-Clinic</SelectItem>
                  </SelectContent>
              </Select>
              <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger><SelectValue placeholder="Availability" /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="all">Any Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                  </SelectContent>
              </Select>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onSelect={handleSelectDoctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center col-span-full py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-2xl font-semibold">No Doctors Found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search filters.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function AppointmentsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <AppointmentsPageContent />
        </Suspense>
    )
}
