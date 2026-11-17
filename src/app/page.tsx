'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  HeartPulse,
  ScanLine,
  Stethoscope,
  GraduationCap,
  Heart,
  Pill,
  Check,
  Cpu,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CtaBanner from '@/components/cta-banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image-v2');

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Learning',
    description: 'Step-by-step tutorials for medical students.',
  },
  {
    icon: <ScanLine className="h-8 w-8 text-primary" />,
    title: 'AI Answering',
    description: 'Image-based instant answers for questions and medicines.',
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: 'AI Doctor',
    description: 'Get guidance on symptoms via a human-like conversation.',
  },
];

const howItWorksSteps = [
  {
    icon: <Cpu className="h-8 w-8" />,
    title: '1. Provide Your Input',
    description:
      'Start by asking a medical question, uploading an image of a problem, or describing your symptoms in the chat with our AI Doctor.',
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: '2. AI-Powered Analysis',
    description:
      'Our advanced AI processes your input, understands the context, and cross-references it with reliable medical knowledge bases.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
      >
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 2L12 22" />
        <path d="M22 12L2 12" />
        <path d="M12 2v10" />
        <path d="M12 12h10" />
      </svg>
    ),
    title: '3. Get a Structured Answer',
    description:
      "Receive a clear, simple, and structured response—whether it's a step-by-step explanation, a detailed image analysis, or safe guidance from the AI Doctor.",
  },
];

const plans = {
  monthly: [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'For new users & medical students to explore.',
      features: [
        { text: 'Learning Module', included: true },
        { text: 'Limited Daily AI Questions', included: true },
        { text: 'Basic Question History', included: true },
        { text: 'Image-based Answers', included: false },
        { text: 'AI Doctor Consultation', included: false },
      ],
      popular: false,
      ctaText: 'Free Signup',
      ctaLink: '/signup',
      badgeText: 'Always Free',
    },
    {
      name: 'Standard',
      price: '$4.99',
      period: '/month',
      description: 'For serious students & general users.',
      features: [
        { text: 'All Free Plan Features', included: true },
        { text: 'Smart Answer (Image Analysis)', included: true },
        { text: 'Medium Daily AI Usage', included: true },
        { text: 'Full Learning History', included: true },
        { text: 'AI Doctor Consultation', included: false },
      ],
      popular: true,
      ctaText: 'Choose Plan',
      ctaLink: '/checkout?plan=standard&period=monthly',
      badgeText: 'Most Popular',
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: '/month',
      description: 'For health-focused users & patients.',
      features: [
        { text: 'All Standard Plan Features', included: true },
        { text: 'AI Doctor Consultation', included: true },
        { text: 'High AI Usage Limits', included: true },
        { text: 'Priority AI Responses', included: true },
        { text: 'Full Conversation History', included: true },
      ],
      popular: false,
      ctaText: 'Choose Plan',
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
        { text: 'Learning Module', included: true },
        { text: 'Limited Daily AI Questions', included: true },
        { text: 'Basic Question History', included: true },
        { text: 'Image-based Answers', included: false },
        { text: 'AI Doctor Consultation', included: false },
      ],
      popular: false,
      ctaText: 'Free Signup',
      ctaLink: '/signup',
      badgeText: 'Always Free',
    },
    {
      name: 'Standard',
      price: '$14.99',
      period: '/year',
      description: 'For serious students & general users.',
      features: [
        { text: 'All Free Plan Features', included: true },
        { text: 'Smart Answer (Image Analysis)', included: true },
        { text: 'Medium Daily AI Usage', included: true },
        { text: 'Full Learning History', included: true },
        { text: 'AI Doctor Consultation', included: false },
      ],
      popular: false,
      ctaText: 'Choose Plan',
      ctaLink: '/checkout?plan=standard&period=yearly',
    },
    {
      name: 'Premium',
      price: '$49.99',
      period: ' /year',
      description: 'For health-focused users & patients.',
      features: [
        { text: 'All Standard Plan Features', included: true },
        { text: 'AI Doctor Consultation', included: true },
        { text: 'High AI Usage Limits', included: true },
        { text: 'Priority AI Responses', included: true },
        { text: 'Full Conversation History', included: true },
      ],
      popular: false,
      ctaText: 'Choose Plan',
      ctaLink: '/checkout?plan=premium&period=yearly',
      badgeText: '65% off',
    },
  ],
};

const FloatingIcon = ({
  icon,
  className,
  style,
}: {
  icon: React.ReactNode;
  className: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`absolute bg-card/80 backdrop-blur-sm p-3 rounded-full shadow-lg border animate-float ${className}`}
    style={style}
  >
    {icon}
  </div>
);

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );

  const currentPlans = plans[billingCycle];

  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-grid-slate-100/[0.05] dark:bg-grid-slate-700/[0.05]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-balance text-primary">
                    Where AI Meets Human Care
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-balance">
                    Smart learning, instant answers, and humanized AI guidance
                    for students and patients.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="group transition-transform duration-300 hover:scale-105 active:scale-95"
                  >
                    <Link href="/signup">
                      Get Started{' '}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="group transition-transform duration-300 hover:scale-105 active:scale-95"
                  >
                    <Link href="/features">Explore Features</Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={500}
                    height={500}
                    className="mx-auto rounded-full object-cover aspect-square shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                    priority
                  />
                )}
                <FloatingIcon
                  icon={<Stethoscope className="h-6 w-6 text-primary" />}
                  className="top-8 left-8"
                  style={{ animationDelay: '0s' }}
                />
                <FloatingIcon
                  icon={<GraduationCap className="h-6 w-6 text-blue-500" />}
                  className="top-24 right-0"
                  style={{ animationDelay: '1s' }}
                />
                <FloatingIcon
                  icon={<Heart className="h-6 w-6 text-red-500" />}
                  className="bottom-24 left-0"
                  style={{ animationDelay: '2s' }}
                />
                <FloatingIcon
                  icon={<Pill className="h-6 w-6 text-green-500" />}
                  className="bottom-8 right-8"
                  style={{ animationDelay: '3s' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-card"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  A Simple Path to Clarity
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get from question to answer in a few straightforward steps.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <Card
                  key={step.title}
                  className="text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border hover:border-primary"
                >
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 border">
                      {step.icon}
                    </div>
                    <CardTitle className="font-headline text-lg">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold">
                  Core Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  A Complete Medical Ecosystem
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From interactive learning for students to conversational
                  guidance for patients, CuraAI integrates everything you need.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border hover:border-primary hover:-translate-y-1"
                >
                  <CardHeader className="flex-col items-center text-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold font-headline">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 text-center">
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-card"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Find a Plan That's Right for You
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple and transparent pricing for every need.
              </p>
            </div>

            <div className="flex justify-center my-8">
              <Tabs
                value={billingCycle}
                onValueChange={(v) => setBillingCycle(v as any)}
                className="w-auto"
              >
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto mt-12">
              {currentPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`flex flex-col shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border hover:border-primary ${
                    plan.popular
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-border'
                  }`}
                >
                  {(plan as any).badgeText && (
                    <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-1.5 rounded-t-lg -m-px">
                      {(plan as any).badgeText}
                    </div>
                  )}
                  <CardHeader className="items-center text-center">
                    <CardTitle className="text-2xl font-headline">
                      {plan.name}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-center">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <Check className="h-5 w-5 text-muted-foreground/30 mr-3 flex-shrink-0" />
                          )}
                          <span
                            className={
                              !feature.included
                                ? 'text-muted-foreground line-through'
                                : ''
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardContent>
                    <Button
                      asChild
                      className="w-full transition-transform duration-300 hover:scale-105 active:scale-95"
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      <Link href={plan.ctaLink}>{plan.ctaText}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CtaBanner
        title="Start your medical journey today with CuraAI"
        description="Join thousands of students, doctors, and patients who trust CuraAI. Get started for free today."
        buttonText="Get Started"
        buttonLink="/signup"
      />
    </>
  );
}
