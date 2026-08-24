'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Download, Loader2, Star, CheckCircle, ArrowRight, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- Data for Upgrade Modal ---
const plans = {
  monthly: [
    {
      name: 'Standard',
      price: '$4.99',
      period: '/month',
      description: 'For serious students & general users.',
      features: [
        { text: 'All Free plan features', included: true },
        { text: 'Smart Answer (Image Analysis)', included: true },
        { text: 'Medium daily AI usage limits', included: true },
        { text: 'Saved answers & learning history', included: true },
        { text: 'AI Doctor consultation', included: false },
      ],
      cta: 'Upgrade to Standard',
      ctaLink: '/checkout?plan=standard-monthly',
      popular: true,
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: '/month',
      description: 'For health-focused users & patients.',
      features: [
        { text: 'All Standard plan features', included: true },
        { text: 'AI Doctor (humanized consultation)', included: true },
        { text: 'Higher AI usage limits', included: true },
        { text: 'Priority AI responses', included: true },
        { text: 'Health conversation history', included: true },
      ],
      cta: 'Upgrade to Premium',
      ctaLink: '/checkout?plan=premium-monthly',
    },
  ],
  yearly: [
    {
      name: 'Standard',
      price: '$14.99',
      period: '/year',
      description: 'Save big for serious students & general users.',
      features: [
        { text: 'All Free plan features', included: true },
        { text: 'Smart Answer (Image Analysis)', included: true },
        { text: 'Medium daily AI usage limits', included: true },
        { text: 'Saved answers & learning history', included: true },
        { text: 'AI Doctor consultation', included: false },
      ],
      cta: 'Upgrade to Standard',
      ctaLink: '/checkout?plan=standard-yearly',
    },
    {
      name: 'Premium',
      price: '$49.99',
      period: '/year',
      description: 'Best value for health-focused users & patients.',
      features: [
        { text: 'All Standard plan features', included: true },
        { text: 'AI Doctor (humanized consultation)', included: true },
        { text: 'Higher AI usage limits', included: true },
        { text: 'Priority AI responses', included: true },
        { text: 'Health conversation history', included: true },
      ],
      cta: 'Upgrade to Premium',
      ctaLink: '/checkout?plan=premium-yearly',
      badgeText: '25% off',
    },
  ]
};

// --- Upgrade Plan Modal Component ---
function UpgradePlanDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const currentPlans = plans[billingCycle];

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline text-center">Upgrade Your Plan</DialogTitle>
                    <DialogDescription className="text-center">
                        Choose the plan that best fits your needs.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="flex justify-center mb-8">
                        <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as 'monthly' | 'yearly')} className="w-auto">
                            <TabsList>
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                <TabsTrigger value="yearly">Yearly (Save)</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        {currentPlans.map((plan) => (
                           <Card key={plan.name} className={cn('flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2', plan.popular ? 'border-primary ring-2 ring-primary' : 'border-border')}>
                                {(plan as any).badgeText && <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-1.5 rounded-t-lg -m-px">{(plan as any).badgeText}</div>}
                                <CardHeader className="items-center text-center">
                                    <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                    <div>
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <ul className="space-y-4">
                                        {plan.features.map((feature) => (
                                        <li key={feature.text} className="flex items-center">
                                            {feature.included ? (
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                            ) : (
                                            <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                                            )}
                                            <span className={cn(feature.included ? 'text-foreground' : 'text-muted-foreground line-through')}>{feature.text}</span>
                                        </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full group" variant={plan.popular ? 'default' : 'outline'}>
                                        <Link href={plan.ctaLink}>{plan.cta} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}


// --- Main Billing Page Component ---

// Mock data for billing
const planData = {
  free: {
    name: 'Free Plan',
    price: '$0/month',
    status: 'Active',
    nextBilling: 'N/A',
  },
  standard: {
    name: 'Standard Plan',
    price: '$4.99/month',
    status: 'Active',
    nextBilling: 'August 15, 2024',
  },
  premium: {
    name: 'Premium Plan',
    price: '$19.99/month',
    status: 'Active',
    nextBilling: 'August 15, 2024',
  },
  admin: {
    name: 'Lifetime Premium',
    price: 'One-time payment',
    status: 'Active',
    nextBilling: 'Never',
  }
};

const invoices = [
  { id: 'inv_1', date: 'July 15, 2024', description: 'Premium Plan - Monthly Subscription', amount: '$19.99', status: 'Paid' },
  { id: 'inv_2', date: 'June 15, 2024', description: 'Premium Plan - Monthly Subscription', amount: '$19.99', status: 'Paid' },
  { id: 'inv_3', date: 'May 15, 2024', description: 'Standard Plan - Monthly Subscription', amount: '$4.99', status: 'Paid' },
];

type Invoice = typeof invoices[number];


// Update Payment Method Modal
function UpdatePaymentMethodDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    const handleUpdate = () => {
        toast({ title: "Payment Method Updated", description: "Your new payment method has been saved." });
        onOpenChange(false);
    }
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Payment Method</DialogTitle>
                    <DialogDescription>Enter your new card details below. Your card will be securely stored.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update Card</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Cancel Subscription Alert
function CancelSubscriptionAlert({ isOpen, onOpenChange, onConfirm }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onConfirm: () => void }) {
     return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your subscription will remain active until the end of the current billing period. You can resume your subscription anytime.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className={cn(buttonVariants({ variant: "destructive" }))}>Yes, Cancel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

// Invoice Detail Modal
function InvoiceDetailDialog({ isOpen, onOpenChange, invoice }: { isOpen: boolean, onOpenChange: (open: boolean) => void, invoice: Invoice | null }) {
    const { toast } = useToast();

    if (!invoice) return null;

    const handleDownload = () => {
        toast({
            title: "Downloading Invoice...",
            description: `Invoice ${invoice.id} is being prepared for download.`
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Invoice Details</DialogTitle>
                    <DialogDescription>
                        Summary of your invoice from {invoice.date}.
                    </DialogDescription>
                </DialogHeader>
                <div className="my-6 space-y-6">
                    <div className="p-6 border rounded-lg bg-muted/50">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">CuraAI</h3>
                                <p className="text-xs text-muted-foreground">123 Health-Tech Avenue, MedCity</p>
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-lg">INVOICE</h3>
                                <p className="text-xs text-muted-foreground">#{invoice.id}</p>
                            </div>
                        </div>
                        <Separator className="my-4"/>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="font-semibold">Billed To</p>
                                <p className="text-muted-foreground">Valued User</p>
                                <p className="text-muted-foreground">user@example.com</p>
                            </div>
                             <div className="text-right">
                                <p className="font-semibold">Date of Issue</p>
                                <p className="text-muted-foreground">{invoice.date}</p>
                            </div>
                        </div>
                        <Table className="mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{invoice.description}</TableCell>
                                    <TableCell className="text-right font-medium">{invoice.amount}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                         <Separator className="my-4"/>
                         <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Status</p>
                                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">{invoice.status}</Badge>
                            </div>
                            <div className="text-right">
                                <p className="text-muted-foreground">Total</p>
                                <p className="font-bold text-2xl">{invoice.amount}</p>
                            </div>
                         </div>
                    </div>
                     <p className="text-xs text-center text-muted-foreground">Thank you for being a customer of CuraAI.</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4"/>Download PDF</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function BillingPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);


  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
  }, []);

  const { toast } = useToast();

  const handleCancelConfirm = () => {
    setIsCancelAlertOpen(false);
    toast({
      title: "Subscription Canceled",
      description: "Your subscription will remain active until the end of the current billing period."
    });
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  }

  if (!plan) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const currentPlan = planData[plan as keyof typeof planData];
  const isPaidPlan = plan !== 'free';

  return (
    <>
    <UpdatePaymentMethodDialog isOpen={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen} />
    <CancelSubscriptionAlert isOpen={isCancelAlertOpen} onOpenChange={setIsCancelAlertOpen} onConfirm={handleCancelConfirm} />
    <InvoiceDetailDialog isOpen={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen} invoice={selectedInvoice} />
    <UpgradePlanDialog isOpen={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen} />

    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <CreditCard /> Billing
        </h1>
        <p className="text-muted-foreground">
            Manage your subscription and payment details.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Current Subscription Card */}
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-lg text-primary">{currentPlan.name}</p>
                        <p className="text-sm text-muted-foreground">{currentPlan.price}</p>
                    </div>
                    <Badge variant={currentPlan.status === 'Active' ? 'default' : 'secondary'} className={currentPlan.status === 'Active' ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" : ""}>{currentPlan.status}</Badge>
                </div>
                 <Separator className="my-4" />
                 <div className="text-sm text-muted-foreground">
                    <p>Next billing date: <span className="font-semibold text-foreground">{currentPlan.nextBilling}</span></p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Manage your subscription.</p>
              <div className="flex gap-2">
                {plan !== 'admin' && isPaidPlan && <Button variant="outline" onClick={() => setIsCancelAlertOpen(true)}>Cancel Subscription</Button>}
                {plan !== 'premium' && plan !== 'admin' && <Button onClick={() => setIsUpgradeModalOpen(true)} className="group">Upgrade Plan <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button>}
              </div>
            </CardFooter>
          </Card>

          {/* Billing History Card */}
          {isPaidPlan && (
            <Card>
                <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your past invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Invoice</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                        <TableCell className="text-center">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">{invoice.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleViewInvoice(invoice)}>
                            <Download className="h-4 w-4" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1 space-y-8">
            {/* Payment Method Card */}
            {isPaidPlan && (
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <CreditCard className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <p className="font-semibold">Visa ending in 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => setIsUpdateModalOpen(true)}>Update Payment Method</Button>
                    </CardFooter>
                </Card>
            )}
            
            {plan === 'admin' && (
                <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary"><Star /> Lifetime Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">You have lifetime access to all Premium features. Thank you for being a valued supporter of CuraAI.</p>
                        <div className="mt-4 flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>No recurring charges</span>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
    </>
  );
}
