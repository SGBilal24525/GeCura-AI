'use client';

import { useState, useEffect, ReactNode, useMemo } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { allItems, SavedItem } from '../library/data';
import {
  Search,
  Bookmark,
  Trash2,
  BookOpen,
  ScanLine,
  Stethoscope,
  Pill,
  Loader2,
  AlertCircle,
} from 'lucide-react';
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
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


const sourceMetadata: { [key: string]: { icon: ReactNode, color: string, textColor: string } } = {
    Learning: { icon: <BookOpen className="h-4 w-4" />, color: 'bg-blue-100 dark:bg-blue-900/50', textColor: 'text-blue-800 dark:text-blue-200' },
    'Smart Answer': { icon: <ScanLine className="h-4 w-4" />, color: 'bg-green-100 dark:bg-green-900/50', textColor: 'text-green-800 dark:text-green-200' },
    'AI Doctor': { icon: <Stethoscope className="h-4 w-4" />, color: 'bg-red-100 dark:bg-red-900/50', textColor: 'text-red-800 dark:text-red-200' },
    Medicines: { icon: <Pill className="h-4 w-4" />, color: 'bg-purple-100 dark:bg-purple-900/50', textColor: 'text-purple-800 dark:text-purple-200' },
    Default: { icon: <BookOpen className="h-4 w-4" />, color: 'bg-gray-100 dark:bg-gray-700', textColor: 'text-gray-800 dark:text-gray-200' },
};


function SavedDetailModal({ item, isOpen, onOpenChange }: { item: SavedItem | null; isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{item.title}</DialogTitle>
          <DialogDescription>Saved on {item.savedDate} from {item.source}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] my-4">
            <div className="prose prose-sm dark:prose-invert max-w-none pr-6 whitespace-pre-wrap">
                {item.content}
            </div>
        </ScrollArea>
        <DialogFooter className="flex justify-between items-center w-full">
            <p className="text-xs text-muted-foreground">Saved from CuraAI</p>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SavedItemCard({ item, onSelect, onRemove }: { item: SavedItem; onSelect: () => void, onRemove: () => void }) {
    const metadata = sourceMetadata[item.source] || sourceMetadata.Default;
    return (
        <Card className="flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary border">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <Badge variant="secondary" className={`flex items-center gap-1.5 ${metadata.color} ${metadata.textColor}`}>
                        {metadata.icon}
                        <span>{item.source}</span>
                    </Badge>
                     <p className="text-xs text-muted-foreground">{item.savedDate}</p>
                </div>
                <CardTitle className="pt-2 font-headline text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">{item.preview}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={onRemove}>
                    <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={onSelect}>View</Button>
            </CardFooter>
        </Card>
    )
}

function EmptyState() {
    return (
        <div className="col-span-full flex flex-col items-center justify-center text-center py-24 border-2 border-dashed rounded-lg">
            <Bookmark className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-2xl font-semibold">You haven’t saved anything yet.</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
                Save important answers from Learning, Smart Answer, or AI Doctor to access them here instantly.
            </p>
        </div>
    )
}

export default function SavedItemsPage() {
  const { toast } = useToast();
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [items, setItems] = useState<SavedItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Recent');
  
  const [selectedItem, setSelectedItem] = useState<SavedItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<SavedItem | null>(null);

  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
    setItems(allItems); // Using allItems as the base for saved items
    setIsLoading(false);
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let planItems = items;
    if (plan === 'free') {
        planItems = items.slice(0, 3);
    } else if (plan === 'standard') {
        planItems = items.filter(item => ['Learning', 'Smart Answer', 'Medicines'].includes(item.source));
    }
      
    const filtered = planItems.filter(item => {
      const matchesSearch = searchTerm === '' || 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.preview.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = sourceFilter === 'All' || item.source === sourceFilter;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
        if (sortOrder === 'Recent') {
            return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
        }
        return new Date(a.savedDate).getTime() - new Date(b.savedDate).getTime();
    });
  }, [items, searchTerm, sourceFilter, sortOrder, plan]);

  const handleSelect = (item: SavedItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  const handleRemoveRequest = (item: SavedItem) => {
      setItemToRemove(item);
  }

  const handleConfirmRemove = () => {
    if (!itemToRemove) return;
    setItems(currentItems => currentItems.filter(i => i.id !== itemToRemove.id));
    toast({
        title: "Item Unsaved",
        description: `"${itemToRemove.title}" has been removed from your saved items.`
    });
    setItemToRemove(null);
  }

  const sources = ['All', ...new Set(allItems.map(i => i.source))];
  const sortOptions = ['Recent', 'Oldest'];

  if (isLoading) {
      return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <>
      <SavedDetailModal item={selectedItem} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      <AlertDialog open={!!itemToRemove} onOpenChange={() => setItemToRemove(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This will remove "{itemToRemove?.title}" from your saved items. This action can't be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Yes, Remove
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <Bookmark /> Saved
          </h1>
          <p className="text-muted-foreground">
            Quick access to your important answers.
          </p>
        </div>
        
        {plan === 'free' && items.length > 3 && (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Free Plan Limit</AlertTitle>
                <AlertDescription>
                    You can save up to 3 items on the free plan. <a href="/pricing" className="font-semibold underline">Upgrade</a> to save unlimited items.
                </AlertDescription>
            </Alert>
        )}

        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                        placeholder="Search saved items..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Select value={sourceFilter} onValueChange={setSourceFilter}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by source" />
                            </SelectTrigger>
                            <SelectContent>
                                {sources.map(source => (
                                    <SelectItem key={source} value={source}>{source}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={sortOrder} onValueChange={setSortOrder}>
                            <SelectTrigger className="w-full md:w-[150px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {filteredAndSortedItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAndSortedItems.map(item => (
                            <SavedItemCard key={item.id} item={item} onSelect={() => handleSelect(item)} onRemove={() => handleRemoveRequest(item)} />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </CardContent>
        </Card>
      </div>
    </>
  );
}
