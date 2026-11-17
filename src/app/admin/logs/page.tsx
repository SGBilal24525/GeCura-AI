'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  File,
  Search,
  Eye,
  LogIn,
  Edit,
  Trash2,
  DollarSign,
  Shield,
  Clock,
  User,
  GitBranch,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { logs, type LogItem, logActions, logStatuses } from './data';

const actionMetadata: { [key: string]: { icon: React.ReactNode, color: string } } = {
    Login: { icon: <LogIn />, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
    Update: { icon: <Edit />, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
    Create: { icon: <File />, color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
    Delete: { icon: <Trash2 />, color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
    Payment: { icon: <DollarSign />, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' },
    Security: { icon: <Shield />, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' },
};

const statusStyles = {
  Success: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Failed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  Warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
};


function ViewLogDialog({ log, isOpen, onOpenChange }: { log: LogItem | null; isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
    if (!log) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {actionMetadata[log.action]?.icon} Log Details
                    </DialogTitle>
                     <DialogDescription>ID: <span className="font-mono">{log.id}</span></DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="grid gap-3 text-sm">
                        <div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-2"><Clock/> Timestamp</span> <span>{format(new Date(log.timestamp), 'PPP p')}</span></div>
                        <Separator />
                        <div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-2"><User/> Actor</span> <span>{log.user.name} ({log.user.role})</span></div>
                         <Separator />
                        <div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-2"><GitBranch/> Action</span> <Badge className={cn('font-normal', actionMetadata[log.action]?.color)}>{log.action}</Badge></div>
                        <Separator />
                        <div className="flex justify-between items-center"><span className="text-muted-foreground">Target</span> <span>{log.target}</span></div>
                        <Separator />
                         <div className="flex justify-between items-center"><span className="text-muted-foreground">Status</span> <Badge className={cn('font-normal', statusStyles[log.status])}>{log.status}</Badge></div>
                         <Separator />
                        <div className="flex justify-between items-center"><span className="text-muted-foreground">IP Address</span> <span className="font-mono">{log.ipAddress}</span></div>
                    </div>
                    <Separator />
                     <div>
                        <h4 className="font-semibold text-sm mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{log.description}</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Main Page Component
export default function AdminLogsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [actionFilter, setActionFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');

  const [selectedLog, setSelectedLog] = React.useState<LogItem | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => { setIsClient(true) }, []);

  const filteredLogs = React.useMemo(() => {
    return logs
      .filter(l => actionFilter === 'All' || l.action === actionFilter)
      .filter(l => statusFilter === 'All' || l.status === statusFilter)
      .filter(l => {
        const term = searchTerm.toLowerCase();
        return l.user.name.toLowerCase().includes(term) || l.target.toLowerCase().includes(term) || l.description.toLowerCase().includes(term);
      });
  }, [searchTerm, actionFilter, statusFilter]);

  const openModal = (log: LogItem) => {
      setSelectedLog(log);
      setIsModalOpen(true);
  }

  const kpiCards = [
    { title: 'Total Actions Logged', value: logs.length },
    { title: 'Admin Actions Today', value: logs.filter(l => l.user.role === 'Admin' && new Date(l.timestamp).toDateString() === new Date().toDateString()).length },
    { title: 'Failed Actions (24h)', value: logs.filter(l => l.status === 'Failed').length },
    { title: 'Security Warnings', value: logs.filter(l => l.status === 'Warning').length },
  ]

  return (
    <>
      <ViewLogDialog log={selectedLog} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      
       <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Audit Logs</h1>
                <p className="text-muted-foreground">Track all admin, user, and system activity for accountability.</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiCards.map(card => (
                    <Card key={card.title}><CardHeader><CardTitle className="text-sm font-medium">{card.title}</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{card.value}</p></CardContent></Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Log Entries</CardTitle>
                    <CardDescription>A detailed record of all actions performed on the platform.</CardDescription>
                     <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2">
                             <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search by user, target, or description..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            </div>
                             <Select value={actionFilter} onValueChange={setActionFilter}>
                                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                                <SelectContent>{logActions.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                                <SelectContent>{logStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <Button size="sm" variant="outline" className="h-10 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Actor</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell className="text-xs">
                                {isClient ? <>{format(new Date(log.timestamp), 'PPP')}<br/>{format(new Date(log.timestamp), 'p')}</> : '...'}
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{log.user.name}</div>
                                <div className="text-xs text-muted-foreground">{log.user.role}</div>
                            </TableCell>
                            <TableCell>
                                <Badge className={cn('font-normal', actionMetadata[log.action]?.color)}>
                                    {log.action}
                                </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{log.target}</TableCell>
                            <TableCell>
                                <Badge className={cn('font-normal', statusStyles[log.status])}>
                                    {log.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onSelect={() => openModal(log)}>View Details</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        )) : (
                           <TableRow><TableCell colSpan={6} className="h-24 text-center">No logs found.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
                </CardContent>
                 <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>{filteredLogs.length}</strong> of <strong>{logs.length}</strong> logs.
                    </div>
                </CardFooter>
            </Card>
      </div>
    </>
  );
}
