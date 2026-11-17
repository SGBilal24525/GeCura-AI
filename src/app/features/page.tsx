'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  ScanLine, 
  Stethoscope, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
  Pill,
  GraduationCap
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CtaBanner from '@/components/cta-banner';

const learningImg = PlaceHolderImages.find(p => p.id === 'learning-feature');
const analysisImg = PlaceHolderImages.find(p => p.id === 'analysis-feature');
const doctorImg = PlaceHolderImages.find(p => p.id === 'doctor-feature');

const detailedFeatures = [
  {
    title: 'AI Medical Teacher',
    description: 'Deep, structured learning for medical students and professionals.',
    icon: <BookOpen className="h-6 w-6 text-blue-500" />,
    image: learningImg,
    benefits: [
      'Normal Learning: Clear, factual definitions.',
      'Concept Builder: Deep analogies and clinical value.',
      'Exam Mode: AI-generated MCQs with explanations.',
      'Mistake Finder: Analysis of your conceptual logic.',
    ],
    link: '/signup',
    cta: 'Start Learning',
    reverse: false,
  },
  {
    title: 'Smart Answer Engine',
    description: 'Instant intelligence from images and unstructured text.',
    icon: <ScanLine className="h-6 w-6 text-green-500" />,
    image: analysisImg,
    benefits: [
      'Question Analysis: Upload textbook or exam photos.',
      'Medicine Intelligence: Identify medicines from packaging.',
      'Text Structuring: Turn messy notes into professional docs.',
      'OCR Optimized: Works with handwritten medical notes.',
    ],
    link: '/signup',
    cta: 'Analyze Now',
    reverse: true,
  },
  {
    title: 'Human-like AI Doctor',
    description: 'Conversational symptom guidance and triage system.',
    icon: <Stethoscope className="h-6 w-6 text-red-500" />,
    image: doctorImg,
    benefits: [
      'Natural Chat: Feels like talking to a real triage nurse.',
      'Risk Assessment: Automated urgency detection.',
      'Specialty Matching: Suggested doctors for your symptoms.',
      'Care Instructions: Clear next steps and self-care advice.',
    ],
    link: '/signup',
    cta: 'Consult AI Doctor',
    reverse: false,
  }
];

export default function FeaturesLandingPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-card border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge variant="outline" className="px-3 py-1 text-sm font-semibold border-primary text-primary">
              The Ecosystem
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline max-w-3xl">
              Powerful AI Tools Built for <span className="text-primary">Healthcare</span>
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Explore our specialized modules designed to simplify medical knowledge and provide instant health guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      {detailedFeatures.map((feature, index) => (
        <section key={feature.title} className={cn("w-full py-16 md:py-24 lg:py-32", index % 2 === 1 ? "bg-muted/30" : "bg-background")}>
          <div className="container px-4 md:px-6">
            <div className={cn("grid gap-12 lg:grid-cols-2 items-center", feature.reverse && "lg:flex-row-reverse")}>
              <div className={cn("space-y-6", feature.reverse ? "lg:order-last" : "")}>
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-2">
                  {feature.icon}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">{feature.title}</h2>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button asChild size="lg" className="group">
                    <Link href={feature.link}>
                      {feature.cta} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className={cn("relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-card transition-all duration-500 hover:scale-[1.02]", !feature.reverse && "lg:order-last")}>
                {feature.image && (
                  <Image 
                    src={feature.image.imageUrl} 
                    alt={feature.image.description} 
                    fill 
                    className="object-cover"
                    data-ai-hint={feature.image.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Trust Section */}
      <section className="w-full py-16 bg-card border-y">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="space-y-2">
              <ShieldCheck className="h-10 w-10 text-primary mx-auto" />
              <h3 className="font-bold font-headline">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and never shared with third parties.</p>
            </div>
            <div className="space-y-2">
              <Zap className="h-10 w-10 text-primary mx-auto" />
              <h3 className="font-bold font-headline">Instant Responses</h3>
              <p className="text-sm text-muted-foreground">Our Flash models deliver answers in seconds, not minutes.</p>
            </div>
            <div className="space-y-2">
              <Sparkles className="h-10 w-10 text-primary mx-auto" />
              <h3 className="font-bold font-headline">Verified Knowledge</h3>
              <p className="text-sm text-muted-foreground">AI trained on professional medical literature and textbooks.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner 
        title="Ready to experience CuraAI?"
        description="Join thousands of users who are already using our AI tools to better their medical knowledge."
        buttonText="Get Started for Free"
        buttonLink="/signup"
      />
    </main>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
