'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Check, CreditCard, Loader2, Lock } from 'lucide-react';
import { plans, Plan } from './plans';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  cardNumber: z.string().min(16, 'Card number must be 16 digits.').max(16, 'Card number must be 16 digits.'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/, 'Expiry date must be in MM / YY format.'),
  cvc: z.string().min(3, 'CVC must be 3 or 4 digits.').max(4, 'CVC must be 3 or 4 digits.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

function CheckoutForm({ plan, tax }: { plan: Plan; tax: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // In a real app, you would redirect to a success page or show a toast message.
  }

  const totalPrice = (plan.price + tax).toFixed(2);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">1. Create Your Account</h3>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">2. Payment Details</h3>
           <p className="text-sm text-muted-foreground">
              Enter your card details. We use Stripe for secure payments.
            </p>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="0000 0000 0000 0000" {...field} className="pl-10" disabled={isSubmitting} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM / YY" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="123" {...field} className="pl-10" disabled={isSubmitting} />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             </div>
          </div>
        </div>

        <Button type="submit" className="w-full text-lg h-12 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            `Pay $${totalPrice}`
          )}
        </Button>
      </form>
    </Form>
  );
}

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');
  const period = searchParams.get('period');
  const planKey = period ? `${planId}-${period}` : planId;
  
  const selectedPlan: Plan | undefined = planKey ? plans[planKey] : undefined;
  const tax = selectedPlan ? selectedPlan.price * 0.1 : 0; // 10% tax for example

  if (!selectedPlan) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">No Plan Selected</CardTitle>
            <CardDescription>It looks like you haven't selected a plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Please select a plan from the pricing page to proceed.</p>
            <Button asChild>
              <Link href="/pricing">Go to Pricing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const periodText = {
    monthly: 'Monthly',
    yearly: 'Yearly',
    'one-time': 'One-Time Payment',
  };

  return (
    <div className="bg-background">
        <div className="container mx-auto py-12 md:py-20 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column: Order Summary */}
            <div className="space-y-6">
            <Card className="p-6 md:p-8 sticky top-28 bg-card shadow-lg">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="font-bold text-lg">{selectedPlan.name}</p>
                            <p className="text-muted-foreground capitalize">{periodText[selectedPlan.period]}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{selectedPlan.priceFormatted}</p>
                            <p className="text-sm text-muted-foreground">+ ${tax.toFixed(2)} tax</p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h4 className="font-semibold mb-4">What's included:</h4>
                        <ul className="space-y-3">
                        {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className={feature.included ? 'text-foreground' : 'text-muted-foreground line-through'}>{feature.text}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <p className="text-xs text-muted-foreground mt-8">
                        By proceeding, you agree to our <Link href="/terms-of-service" className="underline hover:text-primary">Terms</Link> and <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
                    </p>
                </CardContent>
            </Card>
            </div>

            {/* Right Column: Checkout Form */}
            <div>
            <Card className="p-6 md:p-8 bg-card shadow-lg">
                <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-headline">Secure Checkout</CardTitle>
                <CardDescription>Complete your purchase for the {selectedPlan.name}.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                <CheckoutForm plan={selectedPlan} tax={tax} />
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
    </div>
  );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="w-full min-h-[80vh] flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin" /></div>}>
            <CheckoutPageContent />
        </Suspense>
    )
}
