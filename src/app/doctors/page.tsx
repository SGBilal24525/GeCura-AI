
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { doctors, specialties, Doctor } from './data';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Stethoscope, Star, CheckCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative aspect-square w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
          <Image
            src={doctor.image}
            alt={`Dr. ${doctor.name}`}
            fill
            className="rounded-full object-cover border-4 border-background shadow-md"
          />
        </div>
        <div className="flex-1">
            <div className="flex items-start justify-between">
                <h3 className="font-bold text-lg font-headline">{doctor.name}</h3>
                 <Badge variant="outline" className="flex items-center gap-1 text-primary border-primary">
                    <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
            </div>
            <p className="text-sm text-primary font-semibold">{doctor.specialty}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {doctor.location}</p>

            <div className="flex items-center gap-1 mt-2">
                {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < doctor.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/50'}`} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
            </div>

            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{doctor.bio}</p>
            
            <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">Book Appointment</Button>
                <Button size="sm" variant="outline" className="flex-1">View Profile</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DoctorsPageContent() {
  const searchParams = useSearchParams();
  const initialSpecialty = searchParams.get('specialty') || 'All';
  
  const [city, setCity] = useState('All');
  const [specialty, setSpecialty] = useState(initialSpecialty);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter((doctor) => {
      const matchesCity = city === 'All' || doctor.location.toLowerCase().includes(city.toLowerCase());
      const matchesSpecialty = specialty === 'All' || doctor.specialty === specialty;
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCity && matchesSpecialty && matchesSearch;
  });

  const cities = ['All', ...new Set(doctors.map(d => d.location.split(',')[1].trim()))];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Find Your Doctor
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Search for verified medical professionals and book your appointment.
        </p>
      </div>

      <Card className="mb-8 p-4 bg-card shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search by doctor's name..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                    {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Specialty" />
                </SelectTrigger>
                <SelectContent>
                    {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
      </Card>

      <div className="space-y-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center col-span-full py-16">
          <h3 className="text-2xl font-semibold">No Doctors Found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default function DoctorsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DoctorsPageContent />
        </Suspense>
    )
}
