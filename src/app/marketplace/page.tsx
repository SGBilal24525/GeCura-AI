'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ShieldCheck } from 'lucide-react';
import { products, categories, Product } from './data';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-square bg-secondary">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={product.image.hint}
        />
      </div>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-lg truncate" title={product.name}>{product.name}</h3>
        <p className="text-sm text-muted-foreground">by {product.seller}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-xl">{product.price}</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MarketplacePage() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === 'All' || product.category === filter;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Medical Marketplace
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Browse and purchase from a wide range of medical products supplied by
          our network of verified sellers.
        </p>
      </div>

      <Card className="mb-8 p-4 bg-secondary/30 border-primary/20 border">
        <div className="flex items-center gap-4">
          <ShieldCheck className="h-10 w-10 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-semibold">All Sellers are Verified</h3>
            <p className="text-sm text-muted-foreground">
              We manually verify every seller&apos;s legal documents to ensure a safe
              and trustworthy marketplace.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="w-full md:w-auto">
          <div className="flex items-center gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                onClick={() => setFilter(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center col-span-full py-16">
          <h3 className="text-2xl font-semibold">No products found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
