'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Search, 
  Info, 
  School, 
  PieChart, 
  CreditCard,
  MessageSquare,
  Mail,
  ChevronRight,
  HelpCircle,
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const faqSections = [
  {
    id: "general",
    title: "General Information",
    icon: <Info className="h-5 w-5" />,
    items: [
      {
        question: "What is CuraAI and how does it work?",
        answer: "CuraAI is an advanced AI-powered medical platform designed for both students and patients. It uses large language models and specialized clinical data to assist in symptom checking, lab result interpretation, and medical education. It simplifies complex medical jargon into easy-to-understand explanations."
      },
      {
        question: "Is my health data secure and private?",
        answer: "Yes, we prioritize your privacy. All data is encrypted at rest and in transit, complying with international standards. Your medical information is never shared with third parties without your explicit consent."
      },
      {
        question: "Is AI Doctor more powerful than a real doctor?",
        answer: "The AI Doctor is a powerful triage tool designed to analyze symptoms and provide immediate guidance, but it does not replace a human physician. It is built to complement professional care by providing 24/7 support and risk assessment before you see a specialist."
      }
    ]
  },
  {
    id: "registration",
    title: "Registration & Account",
    icon: <School className="h-5 w-5" />,
    items: [
      {
        question: "How do I create a free account?",
        answer: "Simply click the 'Sign Up' button in the header. You only need a valid email address to start using our base learning features."
      },
      {
        question: "Can I use CuraAI without an account?",
        answer: "You can explore our landing page and basic descriptions, but accessing the AI Learning, Smart Answer, and AI Doctor modules requires a secure login to protect your data and history."
      }
    ]
  },
  {
    id: "ai-learning",
    title: "AI Learning & Education",
    icon: <School className="h-5 w-5" />,
    items: [
      {
        question: "Can medical students use this for exam prep?",
        answer: "Absolutely. Our 'Exam Mode' and 'Concept Builder' are specifically designed for medical students to generate MCQs and deep conceptual breakdowns."
      },
      {
        question: "What is 'Mistake Finder'?",
        answer: "Mistake Finder is a unique tool where you provide your own explanation of a medical concept, and the AI analyzes it to find logical gaps or factual errors."
      }
    ]
  },
  {
    id: "smart-analysis",
    title: "Smart Analysis",
    icon: <PieChart className="h-5 w-5" />,
    items: [
      {
        question: "How do I upload medical questions for analysis?",
        answer: "Navigate to the 'Smart Answer' section in your dashboard. You can upload a photo of a textbook question, and our AI will provide a structured answer."
      },
      {
        question: "What can the 'Medicine Intelligence' feature do?",
        answer: "By uploading a photo of a medicine box, our AI can identify the drug, its active ingredients, usage, and side effects."
      }
    ]
  },
  {
    id: "safety",
    title: "Safety & Ethics",
    icon: <Stethoscope className="h-5 w-5" />,
    items: [
      {
        question: "Does the AI follow clinical guidelines?",
        answer: "Yes, CuraAI is grounded in established clinical protocols and peer-reviewed medical literature to ensure the guidance provided is safe and evidence-based."
      },
      {
        question: "What should I do in a medical emergency?",
        answer: "CuraAI is NOT for emergencies. If you are experiencing a life-threatening situation, contact your local emergency services (like 911) immediately."
      }
    ]
  },
  {
    id: "payments",
    title: "Subscription & Payments",
    icon: <CreditCard className="h-5 w-5" />,
    items: [
      {
        question: "What is the 'Lifetime Standard' offer?",
        answer: "It is a one-time payment of $99.99 that gives you perpetual access to all Standard features. This offer is strictly limited to the first 100 users."
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can manage or cancel your subscription at any time from the 'Billing' section of your dashboard. Your access will continue until the end of your cycle."
      }
    ]
  }
];

export default function FaqsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeSection, setActiveSection] = React.useState('general');

  const filteredFaqs = faqSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-body">
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-900 border-b py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <nav className="flex items-center text-sm font-medium text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-foreground">Help Center</span>
            </nav>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
              How can we help you?
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-lg">
              Search our knowledge base for medical guides, AI documentation, and account support.
            </p>
            
            <div className="w-full max-w-2xl mt-8 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <Input 
                className="pl-12 pr-24 py-6 text-lg rounded-xl shadow-lg border-none bg-white dark:bg-slate-800 ring-offset-background focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Search for articles, guides, and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-2 right-2 flex">
                <Button className="h-full px-6 rounded-lg font-bold font-headline">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-3 font-headline">
                  Categories
                </h3>
                <nav className="space-y-1">
                  {faqSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all group font-headline",
                        activeSection === section.id 
                          ? "bg-primary/10 text-primary font-semibold" 
                          : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground"
                      )}
                    >
                      <div className={cn(
                        "p-1.5 rounded-md transition-colors",
                        activeSection === section.id ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-muted group-hover:text-primary"
                      )}>
                        {React.cloneElement(section.icon as React.ReactElement, { className: "h-4 w-4" })}
                      </div>
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wide font-headline">Help Status</p>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium">Support is Online</span>
                </div>
              </div>
            </div>
          </aside>

          {/* FAQ Content */}
          <div className="flex-1 space-y-16">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                      {React.cloneElement(section.icon as React.ReactElement, { className: "h-6 w-6" })}
                    </div>
                    <h2 className="text-2xl font-bold font-headline">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {section.items.map((item, idx) => (
                        <AccordionItem 
                          key={idx} 
                          value={`${section.id}-${idx}`}
                          className="border rounded-xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden px-4 hover:border-primary/50 transition-colors"
                        >
                          <AccordionTrigger className="hover:no-underline py-5 text-left text-base font-semibold group font-headline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5 font-body">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-bold font-headline">No results found</h3>
                <p className="text-muted-foreground mt-2 font-body">Try searching for different keywords or browse the categories.</p>
                <Button variant="outline" className="mt-6 font-headline" onClick={() => setSearchTerm('')}>Clear Search</Button>
              </div>
            )}

            {/* Still Need Help CTA */}
            <section className="mt-20 p-8 md:p-12 bg-slate-900 dark:bg-slate-800 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-primary/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left space-y-4">
                  <h2 className="text-3xl font-bold font-headline">Still need help?</h2>
                  <p className="text-slate-400 max-w-md text-lg font-body">
                    Our medical support team is available 24/7 to assist with your technical or clinical platform queries.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-blue-600 h-14 px-8 rounded-xl font-bold font-headline shadow-xl shadow-primary/20">
                    <Link href="/contact" className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Start Live Chat
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-xl font-bold font-headline border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
                    <Link href="/contact" className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Support
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
