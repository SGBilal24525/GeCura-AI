import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Product = {
  id: string;
  name: string;
  category: string;
  seller: string;
  price: string;
  image: {
    url: string;
    alt: string;
    hint: string;
  };
};

export const categories = [
  'All',
  'Oral Medicines',
  'Topicals',
  'Supplements',
  'Medical Devices',
  'Surgical Instruments',
  'Consumables',
];

const getImage = (id: string) => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  return {
    url: img?.imageUrl || `https://picsum.photos/seed/${id}/400/400`,
    alt: img?.description || 'Product image',
    hint: img?.imageHint || 'product',
  };
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Amoxicillin 500mg Capsules',
    category: 'Oral Medicines',
    seller: 'Sultan Pharma',
    price: '$25.99',
    image: getImage('product-1'),
  },
  {
    id: '2',
    name: 'Digital Forehead Thermometer',
    category: 'Medical Devices',
    seller: 'Gepard Tech',
    price: '$19.50',
    image: getImage('product-2'),
  },
  {
    id: '3',
    name: 'Vitamin D3 5000 IU Supplements',
    category: 'Supplements',
    seller: 'Healthy Living Inc.',
    price: '$15.00',
    image: getImage('product-3'),
  },
  {
    id: '4',
    name: 'Professional Stethoscope',
    category: 'Medical Devices',
    seller: 'MediTools Co.',
    price: '$89.99',
    image: getImage('product-4'),
  },
  {
    id: '5',
    name: 'Nitrile Examination Gloves (100 pcs)',
    category: 'Consumables',
    seller: 'SafeGuard Medical',
    price: '$12.75',
    image: getImage('product-5'),
  },
  {
    id: '6',
    name: 'Adhesive Fabric Bandages (50 pcs)',
    category: 'Consumables',
    seller: 'Sultan Pharma',
    price: '$5.50',
    image: getImage('product-6'),
  },
  {
    id: '7',
    name: 'Antiseptic Liquid 500ml',
    category: 'Topicals',
    seller: 'SafeGuard Medical',
    price: '$8.99',
    image: getImage('product-7'),
  },
  {
    id: '8',
    name: 'Automatic Blood Pressure Monitor',
    category: 'Medical Devices',
    seller: 'Gepard Tech',
    price: '$45.00',
    image: getImage('product-8'),
  },
];
