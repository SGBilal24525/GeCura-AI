'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  File,
  ListFilter,
  Search,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  HelpCircle,
  Clapperboard,
  Database,
  FileText,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { contentData, type ContentItem, contentTypes, statuses } from './data';


const statusStyles = {
  Published: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Archived: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const typeIcons: { [key: string]: React.ReactNode } = {
    'Library': <BookOpen className="h-4 w-4" />,
    'FAQ': <HelpCircle className="h-4 w-4" />,
    'Tutorial': <Clapperboard className="h-4 w-4" />,
    'Reference': <Database className="h-4 w-4" />,
    'System': <FileText className="h-4 w-4" />,
}

// Sub-components for Modals/Dialogs

function AddEditContentDialog({ contentItem, isOpen, onOpenChange, onSave }: { contentItem: ContentItem | null; isOpen: boolean; onOpenChange: (open: boolean) => void; onSave: (data: Partial<ContentItem>) => void; }) {
    const [title, setTitle] = React.useState('');
    const [type, setType] = React.useState('Library');
    const [visibility, setVisibility] = React.useState('Free');
    const [content, setContent] = React.useState('');
    const [isExamRelevant, setIsExamRelevant] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            if (contentItem) {
                setTitle(contentItem.title);
                setType(contentItem.type);
                setVisibility(contentItem.visibility);
                setContent(contentItem.content);
                setIsExamRelevant(contentItem.isExamRelevant || false);
            } else {
                // Reset for new item
                setTitle('');
                setType('Library');
                setVisibility('Free');
                setContent('');
                setIsExamRelevant(false);
            }
        }
    }, [contentItem, isOpen]);

    const handleSave = () => {
        const savedData: Partial<ContentItem> = {
            id: contentItem?.id,
            title,
            type,
            visibility,
            content,
            isExamRelevant,
            lastUpdated: new Date().toISOString()
        };
        onSave(savedData);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{contentItem ? 'Edit Content' : 'Add New Content'}</DialogTitle>
                    <DialogDescription>
                        Manage content details, visibility, and categorization.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Main Content</Label>
                        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="min-h-48" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                            <Label htmlFor="type">Content Type</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                <SelectContent>
                                    {contentTypes.slice(1).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visibility">Visibility</Label>
                             <Select value={visibility} onValueChange={setVisibility}>
                                <SelectTrigger><SelectValue placeholder="Select visibility" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Free">Free</SelectItem>
                                    <SelectItem value="Standard">Standard</SelectItem>
                                    <SelectItem value="Premium">Premium</SelectItem>
                                    <SelectItem value="Admin-only">Admin-only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="exam-relevance" className="font-medium">Exam Relevance</Label>
                            <p className="text-xs text-muted-foreground">Mark if this content is highly relevant for exams.</p>
                        </div>
                        <Switch id="exam-relevance" checked={isExamRelevant} onCheckedChange={setIsExamRelevant} />
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Content</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


function ConfirmationDialog({ title, description, isOpen, onOpenChange, onConfirm }: { title: string; description: string; isOpen: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className={"bg-destructive text-destructive-foreground hover:bg-destructive/90"}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

// Main Page Component
export default function AdminContentPage() {
  const { toast } = useToast();

  const [content, setContent] = React.useState<ContentItem[]>(contentData);
  const [activeTab, setActiveTab] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  // Modal States
  const [modalState, setModalState] = React.useState({
    addEdit: false,
    confirmDelete: false,
  });
  const [selectedContent, setSelectedContent] = React.useState<ContentItem | null>(null);

  const filteredContent = React.useMemo(() => {
    return content
      .filter(item => activeTab === 'All' || item.type === activeTab)
      .filter(item => statusFilter === 'All' || item.status === statusFilter)
      .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [content, activeTab, statusFilter, searchTerm]);

  const openModal = (modal: keyof typeof modalState, contentItem: ContentItem | null = null) => {
    setOpenMenuId(null);
    setSelectedContent(contentItem);
    setModalState(prev => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: keyof typeof modalState) => {
    setModalState(prev => ({ ...prev, [modal]: false }));
    setSelectedContent(null);
  };
  
  const handleSaveContent = (data: Partial<ContentItem>) => {
    if (data.id) { // Edit
        setContent(prev => prev.map(c => c.id === data.id ? {...c, ...data} as ContentItem : c));
        toast({ title: 'Content Updated', description: `"${data.title}" has been saved.`});
    } else { // Add
        const newItem: ContentItem = {
            id: `content_${Math.random().toString(36).substr(2, 9)}`,
            title: data.title!,
            type: data.type!,
            category: 'General',
            status: 'Draft',
            lastUpdated: new Date().toISOString(),
            visibility: data.visibility || 'Free',
            content: data.content || '',
            isExamRelevant: data.isExamRelevant || false,
        };
        setContent(prev => [newItem, ...prev]);
        toast({ title: 'Content Added', description: `"${newItem.title}" has been created as a draft.`});
    }
    closeModal('addEdit');
  };

  const handleDelete = () => {
    if (!selectedContent) return;
    setContent(prev => prev.filter(c => c.id !== selectedContent.id));
    toast({ title: 'Content Deleted', description: `"${selectedContent.title}" has been deleted.`, variant: 'destructive'});
    closeModal('confirmDelete');
  };

  return (
    <>
      <AddEditContentDialog
        contentItem={selectedContent}
        isOpen={modalState.addEdit}
        onOpenChange={() => closeModal('addEdit')}
        onSave={handleSaveContent}
      />
      <ConfirmationDialog
        title="Are you sure?"
        description={`This will permanently delete "${selectedContent?.title}". This action cannot be undone.`}
        isOpen={modalState.confirmDelete}
        onOpenChange={() => closeModal('confirmDelete')}
        onConfirm={handleDelete}
      />

      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>
            Manage learning materials, FAQs, tutorials, and AI reference data.
          </CardDescription>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-10 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
              </Button>
              <Button size="sm" className="h-10 gap-1" onClick={() => openModal('addEdit')}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Content</span>
              </Button>
            </div>
          </div>
           <Tabs value={activeTab} onValueChange={setActiveTab} className="pt-4">
            <TabsList>
              {contentTypes.map(type => <TabsTrigger key={type} value={type}>{type}</TabsTrigger>)}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.length > 0 ? filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                        {typeIcons[item.type] || <FileText className="h-4 w-4" />}
                        {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                     <Badge className={cn('font-normal', statusStyles[item.status as keyof typeof statusStyles])}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{format(new Date(item.lastUpdated), 'PPP')}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu open={openMenuId === item.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? item.id : null)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => { /* View logic */ }}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem onSelect={() => openModal('addEdit', item)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => openModal('confirmDelete', item)} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No content found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>{filteredContent.length}</strong> of <strong>{content.length}</strong> content items.
            </div>
        </CardFooter>
      </Card>
    </>
  );
}
