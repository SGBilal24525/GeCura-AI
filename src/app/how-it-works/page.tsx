import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  ArrowRight,
  UserPlus,
  CreditCard,
  GraduationCap,
  ScanLine,
  Stethoscope,
  History,
  Rocket,
  ShieldCheck,
  Bot,
  Scan,
} from 'lucide-react';
import Faq from '@/components/faq';
import CtaBanner from '@/components/cta-banner';

const detailedSteps = [
    {
      icon: <UserPlus className="h-10 w-10 text-primary" />,
      title: 'Step 1: Sign Up / Login',
      description:
        'Start by registering or logging in. A free plan doesn\'t require a credit card. Once your account is created, you get access to your personal dashboard.',
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: 'Step 2: Choose Your Plan',
      description:
        'Select from Free, Standard, Premium, or special Lifetime offers. Upgrading unlocks additional AI features, which are then activated on your dashboard.',
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: 'Step 3: Use the Learning Module',
      description:
        'Perfect for students. Type any medical question, and our AI will generate a simple, step-by-step answer, structured for clarity with definitions, explanations, examples, and summaries.',
    },
    {
        icon: <ScanLine className="h-10 w-10 text-primary" />,
        title: 'Step 4: Smart Answer (Image-Based Q&A)',
        description:
          'Upload an image of a textbook question for a structured answer, or a medicine box to get details on its name, use, composition, dosage, and precautions.',
      },
    {
      icon: <Stethoscope className="h-10 w-10 text-primary" />,
      title: 'Step 5: Consult the AI Doctor',
      description:
        'Engage in a conversation about your health symptoms. Our humanized AI Doctor provides safe, structured guidance including a summary, possible explanations, and care instructions.',
    },
    {
      icon: <History className="h-10 w-10 text-primary" />,
      title: 'Step 6: View History & Save Reports',
      description:
        'All your AI interactions, from questions to consultation logs, are automatically saved to your dashboard. Easily access your history anytime for review or study.',
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: 'Step 7: Upgrade & Unlock Offers',
      description:
        'As your needs grow, you can upgrade your plan at any time. Keep an eye out for special lifetime offers available to our early supporters to unlock more features.',
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: 'Step 8: Trust in Secure & Safe AI',
      description:
        'Your safety is our priority. Our AI is designed to simplify and advise, not to make a final diagnosis. The final medical decision always rests with you and your healthcare professional.',
    },
];

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'AI Learning',
    tagline: 'Simplifying complex medical knowledge.',
  },
  {
    icon: <Scan className="h-8 w-8 text-primary" />,
    title: 'Smart Analysis',
    tagline: 'Instant answers from images.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Doctor',
    tagline: 'Conversational medical guidance.',
  },
];

const faqItems = [
  {
    question: 'How does the AI ensure the information is accurate?',
    answer:
      "Our AI models are trained on a vast corpus of verified medical literature, textbooks, and databases. We continuously update our sources and use a multi-layered verification process to ensure the information is as accurate and current as possible. However, it's always a tool for information, not a substitute for professional advice.",
  },
  {
    question: 'Is my data safe when I use the platform?',
    answer:
      'Yes, data privacy and security are our top priorities. All data is encrypted in transit and at rest. We adhere to strict privacy policies and do not share your personal information without your consent. For more details, please see our Privacy Policy.',
  },
  {
    question: 'Can I use CuraAI for a medical emergency?',
    answer:
      'No. CuraAI is not intended for medical emergencies. If you are experiencing a medical emergency, you should immediately contact your local emergency services or go to the nearest hospital.',
  },
  {
    question: "What makes the 'Humanized AI Doctor' different?",
    answer:
      'Unlike simple chatbots, our AI Doctor is designed to hold a conversation. It asks clarifying questions to better understand your situation before offering guidance, mimicking the diagnostic process of a real doctor to provide safer and more relevant information.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
                Simple, Fast, and Intelligent
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                See how CuraAI transforms complex medical queries into clear,
                understandable answers in just a few simple steps.
              </p>
              <div className="mt-6">
                <Button asChild size="lg" className="group transform transition-transform duration-300 hover:scale-110 active:scale-100">
                  <Link href="/signup">
                    Get Started for Free{' '}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                A Detailed Look at How It Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                From signing up to getting advanced AI-powered medical
                insights, here is every step of your journey with CuraAI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {detailedSteps.map((step) => (
                <Card
                  key={step.title}
                  className="text-center flex flex-col border-border border-t-4 border-t-primary shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <CardHeader className="flex-grow-0">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                      {step.icon}
                    </div>
                    <CardTitle className="font-headline text-lg">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Our Core Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The tools that power your medical journey.
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary">
                    <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">{feature.tagline}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Faq title="Frequently Asked Questions" items={faqItems} />
          </div>
        </section>
      </main>
      <CtaBanner
        title="Ready to simplify your medical journey?"
        description="Sign up now and get instant access to our powerful AI tools."
        buttonText="Sign Up Now"
        buttonLink="/signup"
      />
    </>
  );
}
