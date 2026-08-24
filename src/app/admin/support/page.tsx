'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  File,
  ListFilter,
  Search,
  Eye,
  Send,
  Paperclip,
  Bookmark,
  Archive,
  User,
  Clock,
  CheckCircle,
  AlertOctagon,
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { tickets as initialTickets, type Ticket, statuses, priorities, admins } from './data';

const statusStyles = {
  Open: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Closed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const priorityStyles = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-blue-500',
};

function ViewTicketDialog({ ticket, isOpen, onOpenChange, onStatusChange, isClient }: { ticket: Ticket | null; isOpen: boolean; onOpenChange: (open: boolean) => void; onStatusChange: (ticketId: string, status: Ticket['status']) => void; isClient: boolean; }) {
    const { toast } = useToast();

    if (!ticket) return null;

    const handleReply = () => {
        toast({
            title: "Reply Sent",
            description: "Your reply has been sent to the user and added to the conversation."
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className='truncate pr-8'>{ticket.subject}</DialogTitle>
                    <DialogDescription>
                        Ticket ID: <span className="font-mono">{ticket.id}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-3 gap-6 flex-1 overflow-hidden">
                    <div className="md:col-span-2 flex flex-col h-full">
                         <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Conversation History</h4>
                         <ScrollArea className="flex-1 -mx-4">
                            <div className="px-4 space-y-6">
                                {ticket.conversation.map((msg, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <Avatar className="h-8 w-8 border">
                                            <AvatarFallback>{msg.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="w-full">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-sm">{msg.author}</p>
                                                <p className="text-xs text-muted-foreground">{isClient ? formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true }) : '...'}</p>
                                            </div>
                                             <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground mt-1 bg-muted p-3 rounded-md">
                                                <p>{msg.message}</p>
                                             </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </ScrollArea>
                         <div className="mt-4 space-y-4">
                             <Textarea placeholder="Type your reply here..." className="min-h-24" />
                             <div className="flex justify-between items-center">
                                <Button variant="outline" size="icon"><Paperclip className="h-4 w-4"/></Button>
                                <Button onClick={handleReply}><Send className="mr-2 h-4 w-4"/> Send Reply</Button>
                             </div>
                         </div>
                    </div>
                     <div className="md:col-span-1 space-y-6 border-l -ml-2 pl-6">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm text-muted-foreground">Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="font-medium">Status</span>
                                 <Select value={ticket.status} onValueChange={(value) => onStatusChange(ticket.id, value as Ticket['status'])}>
                                    <SelectTrigger className="h-8 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.slice(1).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <span className="font-medium">Priority</span>
                                <Badge variant="outline" className="flex w-fit items-center gap-1.5"><div className={cn("h-2 w-2 rounded-full", priorityStyles[ticket.priority])}></div>{ticket.priority}</Badge>
                                <span className="font-medium">User</span>
                                <span>{ticket.user.name}</span>
                                <span className="font-medium">Plan</span>
                                <Badge variant="outline">{ticket.user.plan}</Badge>
                            </div>
                        </div>
                        <Separator />
                         <div className="space-y-2">
                             <h4 className="font-semibold text-sm text-muted-foreground">Internal Notes</h4>
                             <Textarea placeholder="Add a note for the team..." className="text-xs" />
                             <Button variant="secondary" size="sm" className="w-full">Add Note</Button>
                         </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Main Page Component
export default function AdminSupportPage() {
  const { toast } = useToast();

  const [tickets, setTickets] = React.useState(initialTickets);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [priorityFilter, setPriorityFilter] = React.useState('All');
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  // Modal States
  const [modalState, setModalState] = React.useState({ view: false });
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null);

  // Hydration fix
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  const filteredTickets = React.useMemo(() => {
    return tickets
      .filter(t => statusFilter === 'All' || t.status === statusFilter)
      .filter(t => priorityFilter === 'All' || t.priority === priorityFilter)
      .filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const openModal = (modal: keyof typeof modalState, ticket: Ticket | null = null) => {
    setOpenMenuId(null);
    setSelectedTicket(ticket);
    setModalState(prev => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: keyof typeof modalState) => {
    setModalState(prev => ({ ...prev, [modal]: false }));
    setSelectedTicket(null);
  };
  
  const handleStatusChange = (ticketId: string, status: Ticket['status']) => {
      setTickets(prev => prev.map(t => t.id === ticketId ? {...t, status} : t));
      toast({ title: "Status Updated", description: `Ticket #${ticketId} has been set to ${status}.`});
  };

  const handlePriorityChange = (ticketId: string, priority: Ticket['priority']) => {
      setTickets(prev => prev.map(t => t.id === ticketId ? {...t, priority} : t));
      toast({ title: "Priority Updated", description: `Ticket #${ticketId} priority set to ${priority}.`});
  };
  
  const handleAssign = (ticketId: string, admin: string) => {
      setTickets(prev => prev.map(t => t.id === ticketId ? {...t, assignedTo: admin} : t));
      toast({ title: "Ticket Assigned", description: `Ticket #${ticketId} has been assigned to ${admin}.`});
  };

  const kpiCards = [
    { title: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length },
    { title: 'Pending Tickets', value: tickets.filter(t => t.status === 'Pending').length },
    { title: 'High Priority', value: tickets.filter(t => t.priority === 'High' && t.status !== 'Closed').length },
    { title: 'Avg. Response Time', value: '2.5h' },
  ];

  return (
    <>
      <ViewTicketDialog ticket={selectedTicket} isOpen={modalState.view} onOpenChange={() => closeModal('view')} onStatusChange={handleStatusChange} isClient={isClient} />
      
      <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
                Support Tickets
            </h1>
            <p className="text-muted-foreground">
                Manage user queries, issues, and requests efficiently.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {kpiCards.map(card => (
                <Card key={card.title}>
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
              <CardTitle>All Tickets</CardTitle>
              <CardDescription>
                Review and manage all incoming support requests.
              </CardDescription>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by subject..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-auto"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                   <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-auto"><SelectValue placeholder="Priority" /></SelectTrigger>
                    <SelectContent>{priorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length > 0 ? filteredTickets.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="font-medium max-w-xs truncate">{t.subject}</div>
                        <div className="text-xs text-muted-foreground font-mono">{t.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">{t.user.name}</div>
                        <div className="text-xs text-muted-foreground">{t.user.plan}</div>
                      </TableCell>
                      <TableCell>
                          {isClient ? (
                              <>
                                  <div className="text-sm">{format(new Date(t.timestamp), 'PPP')}</div>
                                  <div className="text-xs text-muted-foreground">{format(new Date(t.timestamp), 'p')}</div>
                              </>
                          ) : (
                              <div className="text-sm">...</div>
                          )}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn('font-normal', statusStyles[t.status])}>{t.status}</Badge>
                      </TableCell>
                      <TableCell>
                         <Badge variant="outline" className="flex w-fit items-center gap-1.5">
                            <div className={cn("h-2 w-2 rounded-full", priorityStyles[t.priority])}></div>
                            {t.priority}
                         </Badge>
                      </TableCell>
                      <TableCell>{t.assignedTo}</TableCell>
                      <TableCell className="text-right">
                         <DropdownMenu open={openMenuId === t.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? t.id : null)}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => openModal('view', t)}><Eye className="mr-2 h-4 w-4" />View Ticket</DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {statuses.slice(1).map(s => <DropdownMenuItem key={s} onSelect={() => handleStatusChange(t.id, s as Ticket['status'])}>{s}</DropdownMenuItem>)}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Assign To</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {admins.map(a => <DropdownMenuItem key={a} onSelect={() => handleAssign(t.id, a)}>{a}</DropdownMenuItem>)}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={7} className="h-24 text-center">No tickets found.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
             <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{filteredTickets.length}</strong> of <strong>{tickets.length}</strong> tickets.
                </div>
            </CardFooter>
          </Card>
      </div>
    </>
  );
}
