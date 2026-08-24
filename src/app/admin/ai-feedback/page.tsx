'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  File,
  Search,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Calendar,
  MessageSquare,
  Eye,
  Settings,
  Shield,
  Star,
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
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { feedbackData, type FeedbackItem, feedbackTypes, features, statuses } from './data';
import { Textarea } from '@/components/ui/textarea';


const typeMetadata: { [key: string]: { icon: React.ReactNode, color: string } } = {
    Positive: { icon: <ThumbsUp className="h-4 w-4" />, color: 'text-green-600' },
    Negative: { icon: <ThumbsDown className="h-4 w-4" />, color: 'text-amber-600' },
    Idea: { icon: <Lightbulb className="h-4 w-4" />, color: 'text-blue-600' },
    Flagged: { icon: <Flag className="h-4 w-4" />, color: 'text-destructive' },
};

const statusStyles = {
  Open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Reviewed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  Escalated: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Resolved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};


function ConfirmationDialog({ title, description, isOpen, onOpenChange, onConfirm, confirmText = 'Confirm' }: { title: string; description: string; isOpen: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; confirmText?: string; }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function ViewDetailsDialog({ item, isOpen, onOpenChange }: { item: FeedbackItem | null; isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
    if (!item) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Feedback Details</DialogTitle>
                    <DialogDescription>Reviewing feedback ID: <span className="font-mono">{item.id}</span></DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg">User Feedback</h4>
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8"><AvatarFallback>{item.user.name.substring(0,2)}</AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-medium text-sm">{item.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.user.email}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline">{item.user.plan}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm italic">"{item.comment}"</p>
                                {item.rating && <div className="flex items-center gap-1 mt-2">Rating: {Array.from({length: 5}).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < item.rating! ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />)}</div>}
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="text-base">User's Original Query</CardTitle></CardHeader>
                            <CardContent><p className="text-sm font-mono bg-muted p-2 rounded-md">{item.userQuery}</p></CardContent>
                        </Card>
                    </div>
                    <div className="space-y-4">
                         <h4 className="font-semibold text-lg">AI Response</h4>
                        <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-base">AI's Full Response</CardTitle></CardHeader>
                            <CardContent>
                                <ScrollArea className="h-64">
                                <p className="text-sm whitespace-pre-wrap">{item.fullAiResponse}</p>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function FeedbackTable({ items, onAction, isClient, openMenuId, setOpenMenuId }: { items: FeedbackItem[]; onAction: (action: 'view' | 'resolve' | 'escalate', item: FeedbackItem) => void; isClient: boolean; openMenuId: string | null; setOpenMenuId: (id: string | null) => void; }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Feature</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length > 0 ? items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <div className="font-medium">{item.user.name}</div>
                            <div className="text-xs text-muted-foreground">{item.user.plan}</div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{item.comment}</TableCell>
                        <TableCell><Badge variant="outline">{item.feature}</Badge></TableCell>
                        <TableCell>
                            <div className={cn("flex items-center gap-1.5", typeMetadata[item.type]?.color)}>
                                {typeMetadata[item.type]?.icon}
                                {item.type}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className={statusStyles[item.status]}>{item.status}</Badge>
                        </TableCell>
                        <TableCell title={isClient ? format(new Date(item.timestamp), 'PPP p') : ''}>
                            {isClient ? formatDistanceToNow(new Date(item.timestamp), { addSuffix: true }) : '...'}
                        </TableCell>
                        <TableCell className="text-right">
                             <DropdownMenu open={openMenuId === item.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? item.id : null)}>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onSelect={() => onAction('view', item)}>View Details</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => onAction('resolve', item)}>Mark as Resolved</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => onAction('escalate', item)}>Escalate for Review</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )) : (
                     <TableRow><TableCell colSpan={7} className="h-24 text-center">No feedback found for the selected filters.</TableCell></TableRow>
                )}
            </TableBody>
        </Table>
    );
}

// Main Page Component
export default function AdminAiFeedbackPage() {
    const { toast } = useToast();
    const [feedback, setFeedback] = React.useState(feedbackData);
    
    // Filters
    const [featureFilter, setFeatureFilter] = React.useState('All');
    const [typeFilter, setTypeFilter] = React.useState('All');
    const [dateRangeFilter, setDateRangeFilter] = React.useState('all');

    // Dialogs
    const [selectedItem, setSelectedItem] = React.useState<FeedbackItem | null>(null);
    const [dialogState, setDialogState] = React.useState({ view: false, resolve: false, escalate: false });
    const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);


    // Hydration fix
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
        setIsClient(true);
    }, []);
    
    const handleAction = (action: 'view' | 'resolve' | 'escalate', item: FeedbackItem) => {
        setOpenMenuId(null);
        setSelectedItem(item);
        setDialogState(prev => ({...prev, [action]: true}));
    }

    const closeDialog = (dialog: keyof typeof dialogState) => {
        setDialogState(prev => ({...prev, [dialog]: false}));
        setSelectedItem(null);
    }
    
    const handleConfirmAction = (action: 'Resolved' | 'Escalated') => {
        if (!selectedItem) return;
        setFeedback(prev => prev.map(fb => fb.id === selectedItem.id ? {...fb, status: action} : fb));
        toast({ title: `Feedback ${action}`, description: `Item #${selectedItem.id} has been marked as ${action.toLowerCase()}.` });
        closeDialog(action === 'Resolved' ? 'resolve' : 'escalate');
    }
    
    const filteredFeedback = React.useMemo(() => {
        return feedback
            .filter(item => featureFilter === 'All' || item.feature === featureFilter)
            .filter(item => typeFilter === 'All' || item.type === typeFilter)
            // Date range filter logic would go here
    }, [feedback, featureFilter, typeFilter, dateRangeFilter]);
    
    const kpiData = {
        total: feedback.length,
        positivePercent: Math.round(feedback.filter(f => f.type === 'Positive').length / feedback.length * 100),
        flaggedCount: feedback.filter(f => f.type === 'Flagged' && f.status !== 'Resolved').length,
        avgRating: (feedback.reduce((acc, f) => acc + (f.rating || 0), 0) / feedback.filter(f => f.rating).length).toFixed(1)
    }

    return (
        <>
            <ViewDetailsDialog item={selectedItem} isOpen={dialogState.view} onOpenChange={() => closeDialog('view')} />
            <ConfirmationDialog title="Mark as Resolved?" description={`Are you sure you want to mark feedback #${selectedItem?.id} as resolved?`} isOpen={dialogState.resolve} onOpenChange={() => closeDialog('resolve')} onConfirm={() => handleConfirmAction('Resolved')} confirmText="Resolve" />
            <ConfirmationDialog title="Escalate for Rule Change?" description={`This will flag feedback #${selectedItem?.id} for a manual AI rule review.`} isOpen={dialogState.escalate} onOpenChange={() => closeDialog('escalate')} onConfirm={() => handleConfirmAction('Escalated')} confirmText="Escalate" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">AI Feedback & Quality Control</h1>
                    <p className="text-muted-foreground">Monitor, review, and improve AI responses based on user feedback.</p>
                </div>
                
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card><CardHeader><CardTitle>Total Feedback</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.total}</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Positive Feedback</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.positivePercent}%</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Flagged Responses</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.flaggedCount}</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Average Rating</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.avgRating} / 5</p></CardContent></Card>
                 </div>
                 
                 <Card>
                    <CardHeader>
                        <CardTitle>Feedback Queue</CardTitle>
                        <CardDescription>Review and manage all incoming user feedback.</CardDescription>
                         <div className="flex items-center justify-between pt-4">
                            <Tabs defaultValue="all-feedback" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
                                    <TabsTrigger value="all-feedback">All Feedback</TabsTrigger>
                                    <TabsTrigger value="flagged">Flagged for Review</TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <div className="flex items-center gap-2">
                                <Select value={featureFilter} onValueChange={setFeatureFilter}>
                                    <SelectTrigger className="w-[150px]"><SelectValue placeholder="Feature" /></SelectTrigger>
                                    <SelectContent>{features.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                                </Select>
                                 <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger className="w-[150px]"><SelectValue placeholder="Type" /></SelectTrigger>
                                    <SelectContent>{feedbackTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                </Select>
                                 <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                                    <SelectTrigger className="w-[150px]"><Calendar className="mr-2 h-4 w-4" /><SelectValue placeholder="Date" /></SelectTrigger>
                                    <SelectContent><SelectItem value="all">All Time</SelectItem></SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <FeedbackTable items={filteredFeedback} onAction={handleAction} isClient={isClient} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />
                    </CardContent>
                     <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>{filteredFeedback.length}</strong> of <strong>{feedback.length}</strong> feedback items.
                        </div>
                    </CardFooter>
                 </Card>
            </div>
        </>
    );
}
