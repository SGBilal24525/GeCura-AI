
'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  File,
  Search,
  Eye,
  Trash2,
  Send,
  Edit,
  Mail,
  Bell,
  PanelTop,
  Calendar,
  Clock,
  Users,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { announcements as initialAnnouncements, type Announcement } from './data';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';


// Helper for status styles
const statusStyles: { [key: string]: string } = {
  Draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Sent: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

// Helper for delivery mode icons
const deliveryModeIcons: { [key: string]: React.ReactNode } = {
  'Push': <Bell className="h-3 w-3" />,
  'Email': <Mail className="h-3 w-3" />,
  'In-App': <PanelTop className="h-3 w-3" />,
};


function AddEditAnnouncementDialog({
    announcement,
    isOpen,
    onOpenChange,
    onSave
}: {
    announcement: Announcement | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: Partial<Announcement>) => void;
}) {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [targetAudience, setTargetAudience] = React.useState('All');
    const [deliveryModes, setDeliveryModes] = React.useState<string[]>([]);
    const [scheduledDate, setScheduledDate] = React.useState('');

    React.useEffect(() => {
        if (isOpen) {
            setTitle(announcement?.title || '');
            setContent(announcement?.content || '');
            setTargetAudience(announcement?.targetAudience || 'All');
            setDeliveryModes(announcement?.deliveryMode || []);
            setScheduledDate(announcement?.scheduledDate ? format(new Date(announcement.scheduledDate), "yyyy-MM-dd'T'HH:mm") : '');
        }
    }, [announcement, isOpen]);

    const handleSave = () => {
        onSave({
            id: announcement?.id,
            title,
            content,
            targetAudience: targetAudience as Announcement['targetAudience'],
            deliveryMode: deliveryModes as Announcement['deliveryMode'],
            scheduledDate: scheduledDate ? new Date(scheduledDate).toISOString() : null,
            status: scheduledDate ? 'Scheduled' : 'Draft'
        });
        onOpenChange(false);
    };

    const handleModeChange = (mode: string, checked: boolean) => {
        if (checked) {
            setDeliveryModes(prev => [...prev, mode]);
        } else {
            setDeliveryModes(prev => prev.filter(m => m !== mode));
        }
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{announcement ? 'Edit Announcement' : 'Create New Announcement'}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="min-h-32"/>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label>Target Audience</Label>
                            <Select value={targetAudience} onValueChange={setTargetAudience}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Users</SelectItem>
                                    <SelectItem value="Free">Free</SelectItem>
                                    <SelectItem value="Standard">Standard</SelectItem>
                                    <SelectItem value="Premium">Premium</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Delivery Mode</Label>
                            <div className="flex gap-4 pt-2">
                                {Object.keys(deliveryModeIcons).map(mode => (
                                    <div key={mode} className="flex items-center gap-2">
                                        <Checkbox id={`mode-${mode}`} checked={deliveryModes.includes(mode)} onCheckedChange={(checked) => handleModeChange(mode, checked as boolean)} />
                                        <Label htmlFor={`mode-${mode}`} className="flex items-center gap-1 font-normal">{deliveryModeIcons[mode]}{mode}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="schedule">Schedule (optional)</Label>
                        <Input id="schedule" type="datetime-local" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Main Page Component
export default function AdminAnnouncementsPage() {
    const { toast } = useToast();
    const [announcements, setAnnouncements] = React.useState(initialAnnouncements);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('All');
    
    const [selectedAnnouncement, setSelectedAnnouncement] = React.useState<Announcement | null>(null);
    const [isAddEditDialogOpen, setIsAddEditDialogOpen] = React.useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

    // Hydration fix
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const filteredAnnouncements = React.useMemo(() => {
        return announcements
            .filter(a => statusFilter === 'All' || a.status === statusFilter)
            .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [announcements, statusFilter, searchTerm]);

    const openDialog = (type: 'add' | 'edit' | 'delete', announcement: Announcement | null = null) => {
        setSelectedAnnouncement(announcement);
        if (type === 'add' || type === 'edit') setIsAddEditDialogOpen(true);
        if (type === 'delete') setIsDeleteDialogOpen(true);
    };

    const handleSave = (data: Partial<Announcement>) => {
        if (data.id) { // Edit
            setAnnouncements(prev => prev.map(a => a.id === data.id ? { ...a, ...data } as Announcement : a));
            toast({ title: 'Announcement Updated' });
        } else { // Add
            const newAnnouncement = {
                id: `ann_${Date.now()}`,
                sentDate: null,
                ...data,
            } as Announcement;
            setAnnouncements(prev => [newAnnouncement, ...prev]);
            toast({ title: 'Announcement Created' });
        }
    };
    
    const handleDelete = () => {
        if (!selectedAnnouncement) return;
        setAnnouncements(prev => prev.filter(a => a.id !== selectedAnnouncement.id));
        toast({ title: 'Announcement Deleted', variant: 'destructive' });
        setIsDeleteDialogOpen(false);
    };

    const handleSendNow = (announcement: Announcement) => {
        setAnnouncements(prev => prev.map(a => a.id === announcement.id ? {...a, status: 'Sent', sentDate: new Date().toISOString()} : a));
        toast({ title: "Announcement Sent!", description: `"${announcement.title}" has been sent.`});
    };

    const kpiData = {
        total: announcements.length,
        scheduled: announcements.filter(a => a.status === 'Scheduled').length,
        engagement: '12.5%',
        active: announcements.filter(a => a.status === 'Sent').length,
    }
    
    return (
        <>
            <AddEditAnnouncementDialog announcement={selectedAnnouncement} isOpen={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen} onSave={handleSave} />
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete this announcement.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-headline">Announcements</h1>
                        <p className="text-muted-foreground">Send updates, feature news, and alerts to your users.</p>
                    </div>
                     <Button onClick={() => openDialog('add')}><PlusCircle className="mr-2 h-4 w-4"/> Create New</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Sent</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.active}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Scheduled</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.scheduled}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Engagement Rate</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.engagement}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Announcements</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{kpiData.total}</p></CardContent></Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Announcements List</CardTitle>
                        <div className="flex items-center justify-between pt-4">
                             <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search by title..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All Statuses</SelectItem>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                                        <SelectItem value="Sent">Sent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Target</TableHead>
                                    <TableHead>Delivery</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAnnouncements.map(announcement => (
                                    <TableRow key={announcement.id}>
                                        <TableCell className="font-medium max-w-xs truncate">{announcement.title}</TableCell>
                                        <TableCell><Badge variant="outline">{announcement.targetAudience}</Badge></TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {announcement.deliveryMode.map(mode => (
                                                    <Badge key={mode} variant="secondary" className="flex items-center gap-1">
                                                        {deliveryModeIcons[mode]}
                                                        {mode}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs">
                                            {announcement.scheduledDate ? (isClient ? format(new Date(announcement.scheduledDate), 'PPP p') : '...') : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={statusStyles[announcement.status]}>{announcement.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu open={openMenuId === announcement.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? announcement.id : null)}>
                                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onSelect={() => openDialog('edit', announcement)}>Edit</DropdownMenuItem>
                                                    {announcement.status !== 'Sent' && <DropdownMenuItem onSelect={() => handleSendNow(announcement)}>Send Now</DropdownMenuItem>}
                                                    <DropdownMenuItem onSelect={() => openDialog('delete', announcement)} className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
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
    )
}
