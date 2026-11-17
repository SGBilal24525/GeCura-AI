export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
};

export const specialties = [
  'All',
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Oncologist',
  'Pulmonologist',
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    location: 'MedCity General Hospital, MedCity',
    rating: 5,
    reviews: 142,
    image: 'https://i.pravatar.cc/150?img=12',
    bio: 'Dr. Doe is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. He is a fellow of the American College of Cardiology.'
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    specialty: 'Dermatologist',
    location: 'Skin Health Clinic, MedCity',
    rating: 4,
    reviews: 98,
    image: 'https://i.pravatar.cc/150?img=5',
    bio: 'Dr. Smith specializes in cosmetic and medical dermatology. She is known for her patient-centric approach and expertise in treating rare skin disorders.'
  },
  {
    id: '3',
    name: 'Dr. Sameer Ahmed',
    specialty: 'General Physician',
    location: 'CuraAI Partner Clinic, Healthville',
    rating: 5,
    reviews: 210,
    image: 'https://i.pravatar.cc/150?img=3',
    bio: 'A compassionate general physician with a focus on preventive care and holistic wellness. Dr. Ahmed is a trusted family doctor for hundreds of families.'
  },
  {
    id: '4',
    name: 'Dr. Emily White',
    specialty: 'Pediatrician',
    location: 'KidsCare Hospital, Healthville',
    rating: 5,
    reviews: 180,
    image: 'https://i.pravatar.cc/150?img=4',
    bio: 'Dr. White has a passion for pediatric care, with a special interest in developmental milestones and childhood nutrition. Kids love her friendly demeanor.'
  },
  {
    id: '5',
    name: 'Dr. Michael Brown',
    specialty: 'Neurologist',
    location: 'MedCity General Hospital, MedCity',
    rating: 4,
    reviews: 75,
    image: 'https://i.pravatar.cc/150?img=8',
    bio: 'Specializing in movement disorders and epilepsy, Dr. Brown uses cutting-edge diagnostic tools to provide accurate diagnoses and treatment plans.'
  },
    {
    id: '6',
    name: 'Dr. Sarah Wilson',
    specialty: 'General Physician',
    location: 'Downtown Medical Center, MedCity',
    rating: 4,
    reviews: 155,
    image: 'https://i.pravatar.cc/150?img=1',
    bio: 'Dr. Wilson is a dedicated General Physician with a focus on managing chronic diseases like diabetes and hypertension. She believes in strong doctor-patient relationships.'
  }
];
