'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  File,
  ListFilter,
  Search,
  Eye,
  RefreshCw,
  XCircle,
  CheckCircle,
  ArrowDown,
  User,
  Package,
  DollarSign,
  CreditCard,
  Calendar as CalendarIcon,
  AlertTriangle,
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format, subDays } from 'date-fns';
import { DateRange } from "react-day-picker"
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock Data
const initialTransactions = [
  {
    id: 'txn_1',
    user: { name: 'Olivia Martin', email: 'olivia.martin@email.com' },
    plan: 'Premium',
    amount: 19.99,
    status: 'Paid',
    method: 'Visa **** 4242',
    date: '2024-07-22T10:00:00.000Z',
  },
  {
    id: 'txn_2',
    user: { name: 'Jackson Lee', email: 'jackson.lee@email.com' },
    plan: 'Standard',
    amount: 4.99,
    status: 'Paid',
    method: 'Mastercard **** 5555',
    date: '2024-07-21T11:00:00.000Z',
  },
  {
    id: 'txn_3',
    user: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com' },
    plan: 'Premium',
    amount: 19.99,
    status: 'Failed',
    method: 'Visa **** 1234',
    date: '2024-07-20T09:00:00.000Z',
  },
  {
    id: 'txn_4',
    user: { name: 'William Kim', email: 'will.kim@email.com' },
    plan: 'Premium',
    amount: 19.99,
    status: 'Refunded',
    method: 'Visa **** 4242',
    date: '2024-07-18T14:00:00.000Z',
  },
    {
    id: 'txn_5',
    user: { name: 'Sofia Davis', email: 'sofia.davis@email.com' },
    plan: 'Lifetime Standard',
    amount: 49.99,
    status: 'Paid',
    method: 'PayPal',
    date: '2024-07-15T18:00:00.000Z',
  },
];

type Transaction = typeof initialTransactions[0];

const statusStyles = {
  Paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Failed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  Refunded: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
};

// Sub-components for Modals/Dialogs

function ViewTransactionDialog({ transaction, isOpen, onOpenChange, onDownload }: { transaction: Transaction | null; isOpen: boolean; onOpenChange: (open: boolean) => void; onDownload: (t: Transaction) => void; }) {
    if (!transaction) return null;
    
    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                    <DialogDescription>
                        Summary of transaction <span className="font-mono">{transaction.id}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarFallback>{getInitials(transaction.user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold">{transaction.user.name}</div>
                            <div className="text-sm text-muted-foreground">{transaction.user.email}</div>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid gap-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><Package /> Plan</span>
                            <span>{transaction.plan}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><DollarSign /> Amount</span>
                            <span className="font-semibold">${transaction.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-muted-foreground flex items-center gap-2"><CheckCircle /> Status</span>
                           <Badge className={cn('font-normal', statusStyles[transaction.status as keyof typeof statusStyles])}>{transaction.status}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><CreditCard /> Method</span>
                            <span>{transaction.method}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><CalendarIcon /> Date</span>
                            <span>{format(new Date(transaction.date), 'PPP p')}</span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button onClick={() => transaction && onDownload(transaction)}><ArrowDown className="mr-2 h-4 w-4"/>Download Invoice</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function RefundDialog({ transaction, isOpen, onOpenChange, onConfirm }: { transaction: Transaction | null; isOpen: boolean; onOpenChange: (open: boolean) => void; onConfirm: (reason: string) => void; }) {
    const [reason, setReason] = React.useState('');
    if (!transaction) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex justify-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>
                    </div>
                    <AlertDialogTitle className="text-center">Confirm Refund</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        You are about to refund a payment. This action is irreversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4 space-y-4">
                    <div className="p-4 bg-muted rounded-md border text-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">User:</span>
                            <span className="font-medium">{transaction.user.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Transaction ID:</span>
                            <span className="font-mono text-xs">{transaction.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-bold text-lg text-destructive">-${transaction.amount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="refund-reason">Reason for Refund (Optional)</Label>
                        <Input id="refund-reason" placeholder="e.g., Customer request" value={reason} onChange={(e) => setReason(e.target.value)} />
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setReason('')}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onConfirm(reason)} className={buttonVariants({ variant: 'destructive' })}>
                        <RefreshCw className="mr-2 h-4 w-4"/>
                        Confirm Refund
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function ConfirmationDialog({ title, description, isOpen, onOpenChange, onConfirm, confirmVariant = 'default' }: { title: string; description: string; isOpen: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; confirmVariant?: 'default' | 'destructive' }) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className={buttonVariants({ variant: confirmVariant })}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function ExportDialog({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void; }) {
    const { toast } = useToast();
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 30),
        to: new Date(),
    });

    const handleExport = () => {
        if (!date?.from) {
             toast({ title: "Please select a date range.", variant: "destructive" });
             return;
        }
        toast({
            title: "Exporting Report",
            description: `Transactions from ${format(date.from, 'PPP')}${date.to ? ` to ${format(date.to, 'PPP')}` : ''} are being exported.`
        });
        onOpenChange(false);
    }
    
    return (
         <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 sm:max-w-2xl">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Select date range</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </div>
                <DialogFooter className="p-6 bg-muted/50 sm:justify-end justify-center">
                    <Button onClick={handleExport}>Apply & Download</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Main Page Component
export default function AdminBillingPage() {
  const { toast } = useToast();

  const [transactions, setTransactions] = React.useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [planFilter, setPlanFilter] = React.useState('all');

  // Modal States
  const [modalState, setModalState] = React.useState({
    view: false,
    refund: false,
    verify: false,
    cancel: false,
    export: false,
  });
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  const filteredTransactions = React.useMemo(() => {
    return transactions
      .filter(t => statusFilter === 'all' || t.status.toLowerCase() === statusFilter)
      .filter(t => planFilter === 'all' || t.plan === planFilter)
      .filter(t => {
        const term = searchTerm.toLowerCase();
        return t.user.name.toLowerCase().includes(term) || t.user.email.toLowerCase().includes(term) || t.id.toLowerCase().includes(term);
      });
  }, [transactions, searchTerm, statusFilter, planFilter]);

  const openModal = (modal: keyof typeof modalState, transaction: Transaction | null = null) => {
      setOpenMenuId(null);
      setSelectedTransaction(transaction);
      setModalState(prev => ({...prev, [modal]: true}));
  }
  
  const closeModal = (modal: keyof typeof modalState) => {
      setModalState(prev => ({...prev, [modal]: false}));
      if (modal !== 'export') {
        setSelectedTransaction(null);
      }
  }
  
  const handleRefund = (reason: string) => {
    if (!selectedTransaction) return;
    toast({
        title: "Refund Processed",
        description: `Transaction ${selectedTransaction.id} for $${selectedTransaction.amount.toFixed(2)} has been refunded. Reason: ${reason || 'N/A'}`
    });
    // Update transaction status in a real app
    closeModal('refund');
  };

  const handleVerify = () => {
      if (!selectedTransaction) return;
      toast({ title: "Payment Verified", description: `Transaction ${selectedTransaction.id} marked as paid.` });
      closeModal('verify');
  };

  const handleCancel = () => {
      if (!selectedTransaction) return;
      toast({ title: "Subscription Cancelled", description: `Subscription for ${selectedTransaction.user.name} has been cancelled.` });
      closeModal('cancel');
  };

  const handleDownloadInvoice = (transaction: Transaction) => {
    if (!transaction) return;
    toast({
      title: 'Invoice Downloading',
      description: `Your invoice for transaction ${transaction.id} will be downloaded shortly.`
    });
  }

  const kpiCards = [
    { title: 'Total Revenue', value: '$10,245.50', description: '+15.2% from last month' },
    { title: 'Active Subscriptions', value: '1,258', description: '+201 from last month' },
    { title: 'Pending Payments', value: '$350.00', description: '5 pending transactions' },
    { title: 'Refunds Issued', value: '$19.99', description: '1 refund this month' },
  ]

  return (
    <>
      <ViewTransactionDialog transaction={selectedTransaction} isOpen={modalState.view} onOpenChange={() => closeModal('view')} onDownload={handleDownloadInvoice} />
      <RefundDialog transaction={selectedTransaction} isOpen={modalState.refund} onOpenChange={() => closeModal('refund')} onConfirm={handleRefund} />
      <ConfirmationDialog title="Verify Payment?" description="Are you sure you want to manually mark this payment as verified?" isOpen={modalState.verify} onOpenChange={() => closeModal('verify')} onConfirm={handleVerify} />
      <ConfirmationDialog title="Cancel Subscription?" description={`Are you sure you want to cancel the subscription for ${selectedTransaction?.user.name}?`} isOpen={modalState.cancel} onOpenChange={() => closeModal('cancel')} onConfirm={handleCancel} confirmVariant="destructive" />
      <ExportDialog isOpen={modalState.export} onOpenChange={() => closeModal('export')} />

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mb-8">
        {kpiCards.map(card => (
            <Card key={card.title} className="transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)] hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Manage all payments and subscriptions on the platform.
          </CardDescription>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, email, or ID..."
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
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
               <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by plan" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Lifetime Premium">Lifetime Premium</SelectItem>
                    <SelectItem value="Lifetime Standard">Lifetime Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-10 gap-1" onClick={() => openModal('export')}>
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Plan</TableHead>
                <TableHead className="hidden md:table-cell text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Method</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? filteredTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{t.user.name}</div>
                    <div className="text-sm text-muted-foreground">{t.user.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{t.plan}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">${t.amount.toFixed(2)}</TableCell>
                  <TableCell>
                     <Badge className={cn('font-normal', statusStyles[t.status as keyof typeof statusStyles])}>{t.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{t.method}</TableCell>
                  <TableCell className="hidden lg:table-cell">{format(new Date(t.date), 'PPP')}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu open={openMenuId === t.id} onOpenChange={(isOpen) => setOpenMenuId(isOpen ? t.id : null)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => openModal('view', t)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {t.status === 'Paid' && <DropdownMenuItem onSelect={() => openModal('refund', t)}>
                            <RefreshCw className="mr-2 h-4 w-4"/>
                            <span>Refund</span>
                        </DropdownMenuItem>}
                        {t.status === 'Pending' && <DropdownMenuItem onSelect={() => openModal('verify', t)}>
                            <CheckCircle className="mr-2 h-4 w-4"/>
                            <span>Verify</span>
                        </DropdownMenuItem>}
                         <DropdownMenuItem onSelect={() => openModal('cancel', t)} className="text-destructive focus:text-destructive">
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Cancel Subscription</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                        No transactions found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong> transactions.
            </div>
        </CardFooter>
      </Card>
    </>
  );
}
