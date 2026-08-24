'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, ArrowRight, Sparkles, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Faq from '@/components/faq';
import CtaBanner from '@/components/cta-banner';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';

const plans = {
  monthly: [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'For new users & medical students to explore.',
      features: [
        { text: 'Learning (text-based questions)', included: true },
        { text: 'Step-by-step explanations', included: true },
        { text: 'Limited daily AI questions', included: true },
        { text: 'Basic question history', included: true },
        { text: 'Image-based answers', included: false },
        { text: 'AI Doctor consultation', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/signup',
      badgeText: 'Always Free',
    },
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
      cta: 'Upgrade Now',
      ctaLink: '/checkout?plan=standard&period=monthly',
      popular: true,
      badgeText: 'Most Popular',
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
      cta: 'Go Premium',
      ctaLink: '/checkout?plan=premium&period=monthly',
    },
  ],
  yearly: [
     {
      name: 'Free',
      price: '$0',
      period: '/year',
      description: 'For new users & medical students to explore.',
      features: [
        { text: 'Learning (text-based questions)', included: true },
        { text: 'Step-by-step explanations', included: true },
        { text: 'Limited daily AI questions', included: true },
        { text: 'Basic question history', included: true },
        { text: 'Image-based answers', included: false },
        { text: 'AI Doctor consultation', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/signup',
      badgeText: 'Always Free',
    },
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
      cta: 'Upgrade Now',
      ctaLink: '/checkout?plan=standard&period=yearly',
      popular: false,
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
      cta: 'Go Premium',
      ctaLink: '/checkout?plan=premium&period=yearly',
      badgeText: '65% off',
    },
  ]
};

const lifetimePlans = [
    {
      name: 'Lifetime Standard',
      price: '$99.99',
      period: ' one-time',
      description: 'All Standard plan features, forever. No recurring fees.',
      features: [
        { text: 'All Standard plan features', included: true },
        { text: 'Lifetime access & updates', included: true },
        { text: 'No monthly or yearly fees', included: true },
      ],
      cta: 'Get Lifetime Standard',
      ctaLink: '/checkout?plan=lifetime-standard',
      popular: true,
      badgeText: 'Exclusive Offer',
    }
];

const faqItems = [
    {
        question: "Can I change my plan later?",
        answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account dashboard. Changes will take effect at the end of your current billing cycle."
    },
    {
        question: "What is the lifetime offer?",
        answer: "The lifetime offer is a special, one-time payment that gives you access to the Standard or Premium features forever, including all future updates. It's a limited-time deal for our early supporters."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, including Visa, Mastercard, and American Express. All payments are processed securely through our payment partner."
    },
    {
        question: "What is your refund policy?",
        answer: "For monthly and yearly plans, you can cancel anytime, and you will not be billed for the next cycle. For the Lifetime plans, we offer a 30-day money-back guarantee. Please see our Refund Policy page for full details."
    }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [spotsLeft, setSpotsLeft] = useState(87); // Hardcoded simulation for the 100 user limit

  const currentPlans = plans[billingCycle];

  return (
    <>
    <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-24 lg:py-32 bg-card">
            <div className="container px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                    Our Pricing Plans
                    </h1>
                    <p className="mt-4 text-muted-foreground md:text-xl">
                    Choose a plan that fits your needs. Simple, transparent pricing for everyone.
                    </p>
                    <div className="mt-6">
                        <Button asChild size="lg" className="group">
                            <Link href="/signup">Start for Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Pricing Table Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-center mb-8">
                    <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as any)}>
                    <TabsList className="w-full sm:w-auto grid grid-cols-2">
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly (Save up to 65%)</TabsTrigger>
                    </TabsList>
                    </Tabs>
                </div>

                <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
                    {currentPlans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={cn('flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2', plan.popular ? 'border-primary ring-2 ring-primary' : 'border-border')}
                    >
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
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
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
        </section>

        {/* Lifetime Offer */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline flex items-center justify-center gap-3">
                        <Sparkles className="h-8 w-8 text-primary" />
                        Exclusive Lifetime Offers
                    </h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4 text-balance">
                    Pay once, own it forever. This exclusive offer is strictly limited to the first 100 users only.
                    </p>
                </div>
                 <div className="grid gap-8 md:grid-cols-1 max-w-md mx-auto">
                    {lifetimePlans.map((plan) => (
                         <Card key={plan.name} className={cn('flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 relative overflow-hidden', plan.popular && 'border-primary ring-2 ring-primary')}>
                            {(plan as any).badgeText && <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-1.5">{(plan as any).badgeText}</div>}
                            <CardHeader className="items-center text-center">
                                <CardTitle className="text-3xl font-headline">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="mt-2">
                                    <span className="text-5xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">{plan.period}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-6">
                                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                                            <Users className="h-3 w-3" /> Spots Remaining
                                        </span>
                                        <span className="text-xs font-bold text-primary">{spotsLeft} / 100</span>
                                    </div>
                                    <Progress value={spotsLeft} className="h-2 bg-primary/20" />
                                    <p className="text-[10px] text-muted-foreground mt-2 text-center">Once these 100 spots are gone, the lifetime offer will be closed.</p>
                                </div>

                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                    <li key={feature.text} className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-foreground text-sm">{feature.text}</span>
                                    </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button asChild size="lg" className="w-full group" variant={plan.popular ? 'default' : 'outline'}>
                                    <Link href={plan.ctaLink}>{plan.cta} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Feature Comparison Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Feature Comparison
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
                A quick look at what each plan offers.
              </p>
            </div>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%] text-lg font-headline">Feature</TableHead>
                      <TableHead className="text-center text-lg font-headline">Free</TableHead>
                      <TableHead className="text-center text-lg font-headline">Standard</TableHead>
                      <TableHead className="text-center text-lg font-headline">Premium</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">AI-Powered Learning</TableCell>
                      <TableCell className="text-center"><Check className="h-6 w-6 text-green-500 mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-6 w-6 text-green-500 mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-6 w-6 text-green-500 mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Smart Image Analysis</TableCell>
                      <TableCell className="text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-6 w-6 text-green-500 mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-6 w-6 text-green-500 mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AI Doctor Consultation</TableCell>
                      <TableCell className="text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></TableCell>
                      <TableCell className="text-center"><X className="h-6 w-6 text-red-500 mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-6 w-6 text-green-500 mx-auto" /></TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium">Usage Limits</TableCell>
                      <TableCell className="text-center">Limited</TableCell>
                      <TableCell className="text-center">Medium</TableCell>
                      <TableCell className="text-center">High</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium">Saved History</TableCell>
                       <TableCell className="text-center">Basic</TableCell>
                      <TableCell className="text-center">Full</TableCell>
                      <TableCell className="text-center">Full</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container px-4 md:px-6">
                <Faq title="Billing and Plans FAQs" items={faqItems} />
            </div>
        </section>
    </main>
    <CtaBanner 
        title="Ready to Get Started?"
        description="Choose the plan that's right for you and unlock a smarter way to approach healthcare."
        buttonText="Sign Up Free"
        buttonLink="/signup"
    />
    </>
  );
}
