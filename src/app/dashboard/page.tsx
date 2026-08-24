'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  ScanSearch,
  Stethoscope,
  Clock,
  Lock,
  BrainCircuit,
  Sparkles,
  FileClock,
  FlaskConical,
  MessageSquare,
  Lightbulb,
  FileQuestion,
  Pill,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


type StatCardProps = {
    icon: ReactNode;
    title: string;
    value: string;
    change?: string;
    plan: string;
    requiredPlan: 'free' | 'standard' | 'premium';
    href?: string;
};

function StatCard({ icon, title, value, change, plan, requiredPlan, href }: StatCardProps) {
    const planTiers = { free: 0, standard: 1, premium: 2 };
    const hasAccess = planTiers[plan as keyof typeof planTiers] >= planTiers[requiredPlan];

    const cardContent = (
         <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary h-full border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && <p className="text-xs text-muted-foreground">{change}</p>}
            </CardContent>
        </Card>
    );

    if (!hasAccess) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <div className="h-full">
                            <Card className="relative overflow-hidden bg-muted/50 border-dashed transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                                    <div className="text-muted-foreground">{icon}</div>
                                </CardHeader>
                                <CardContent>
                                    <Lock className="h-8 w-8 text-muted-foreground/50" />
                                </CardContent>
                            </Card>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Upgrade to {requiredPlan} to unlock this feature.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }
    
    if (href) {
        return (
            <Link href={href} className="block h-full">
                {cardContent}
            </Link>
        )
    }

    return cardContent;
}

export default function DashboardPage() {
  const [plan, setPlan] = useState('free');
  const [userName, setUserName] = useState('Valued User');

  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
    // In a real app, you'd fetch the user's name
  }, []);

  const statCards: Omit<StatCardProps, 'plan'>[] = [
      { icon: <BookOpen className="h-5 w-5"/>, title: "Learning Sessions", value: "82", change: "+12% this week", requiredPlan: 'free', href: "/dashboard/learning" },
      { icon: <ScanSearch className="h-5 w-5"/>, title: "Smart Answers Used", value: "35", change: "+5 today", requiredPlan: 'standard', href: "/dashboard/smart-analysis" },
      { icon: <Stethoscope className="h-5 w-5"/>, title: "AI Doctor Consults", value: "4", change: "1 new today", requiredPlan: 'premium', href: "/dashboard/consultation" },
      { icon: <Clock className="h-5 w-5"/>, title: "Time Saved (Est.)", value: "~3.2 hours", change: "using AI analysis", requiredPlan: 'free' },
  ]

  const recentActivity = [
      { icon: <FileQuestion className="text-blue-500" />, text: 'Asked: "How does aspirin work?"', time: "2h ago" },
      { icon: <ScanSearch className="text-green-500" />, text: "Analyzed an image of an MCQ paper", time: "5h ago" },
      { icon: <Pill className="text-purple-500" />, text: "Checked details for 'Panadol'", time: "1d ago" },
      { icon: <MessageSquare className="text-red-500" />, text: "Consultation summary saved", time: "2d ago", requiredPlan: 'premium' },
  ]

  const quickAccessFeatures = [
      { title: "Learn", icon: BookOpen, link: "/dashboard/learning", requiredPlan: 'free' },
      { title: "Smart", icon: ScanSearch, link: "/dashboard/smart-analysis", requiredPlan: 'standard' },
      { title: "Medicines", icon: Pill, link: "/dashboard/smart-analysis/medicines", requiredPlan: 'premium' },
      { title: "Doctor", icon: Stethoscope, link: "/dashboard/consultation", requiredPlan: 'premium' }
  ]
  
  const planTiers = { free: 0, standard: 1, premium: 2 };

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
            <p className="text-muted-foreground">Good morning, {userName}</p>
        </div>

        {/* Section 1: AI Activity Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map(card => <StatCard key={card.title} {...card} plan={plan} />)}
        </div>

        {/* Section 2 & 3: Learning, Insights & Activity */}
        <div className="grid gap-4 lg:grid-cols-5">
            <Link href="/dashboard/activity" className="block lg:col-span-3">
              <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary h-full border">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><FileClock /> Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                          {recentActivity.map((activity) => {
                              const hasAccess = !activity.requiredPlan || planTiers[plan as keyof typeof planTiers] >= planTiers[activity.requiredPlan as keyof typeof planTiers];
                              if (!hasAccess) return null;
                              return (
                                  <div key={activity.text} className="flex items-center gap-3">
                                      <div className="p-2 bg-muted rounded-full">{activity.icon}</div>
                                      <div className="flex-1">
                                          <p className="text-sm font-medium">{activity.text}</p>
                                      </div>
                                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                                  </div>
                              )
                          })}
                    </div>
                  </CardContent>
              </Card>
            </Link>

             <div className="lg:col-span-2 grid gap-4">
                <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BrainCircuit /> Learning Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-2">
                            <p className="text-sm font-medium">Topics Studied: <span className="font-normal">Pharmacology, Cardiology</span></p>
                            <Progress value={65} className="h-2" />
                            <p className="text-xs text-muted-foreground">AI suggests revising <span className="font-semibold text-primary">Pharmacology</span>.</p>
                       </div>
                    </CardContent>
                </Card>
                <Link href="/dashboard/insight" className="block">
                  <Card className="bg-primary/5 text-foreground/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary border dark:text-foreground">
                      <CardHeader>
                          <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> AI Insight</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm">"You understand mechanisms well, but your grasp on drug interactions needs revision. Try using the 'Concept Builder' mode."</p>
                      </CardContent>
                  </Card>
                </Link>
             </div>
        </div>

        {/* Section 4 & 5: Quick Access & Usage */}
         <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary border">
                <CardHeader>
                    <CardTitle>Quick Access</CardTitle>
                    <CardDescription>Jump right back into a core feature.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickAccessFeatures.map(feature => {
                        const hasAccess = planTiers[plan as keyof typeof planTiers] >= planTiers[feature.requiredPlan as keyof typeof planTiers];
                        return (
                            <TooltipProvider key={feature.title}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                         <Link href={hasAccess ? feature.link : '#'} className={cn(!hasAccess && "pointer-events-none")}>
                                            <Button variant="outline" className={cn("w-full h-24 flex-col gap-2 border", !hasAccess && "bg-muted/50 border-dashed")}>
                                                {hasAccess ? <feature.icon /> : <Lock />}
                                                <span>{feature.title}</span>
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                     {!hasAccess && <TooltipContent><p>Upgrade to unlock</p></TooltipContent>}
                                </Tooltip>
                            </TooltipProvider>
                        )
                    })}
                </CardContent>
            </Card>
            <Link href="/dashboard/usage" className="block h-full">
              <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary h-full border">
                  <CardHeader>
                      <CardTitle>Usage & Limits</CardTitle>
                      <CardDescription>Your current cycle's usage.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div>
                          <div className="flex justify-between text-xs font-medium mb-1"><span>Learning Queries</span><span>182 / 200</span></div>
                          <Progress value={182/200 * 100} className="h-2" />
                      </div>
                      <div>
                          <div className="flex justify-between text-xs font-medium mb-1"><span>Smart Answers</span><span>{plan === 'free' ? '0 / 0' : '35 / 100'}</span></div>
                          <Progress value={plan === 'free' ? 0 : 35} className="h-2" />
                      </div>
                      <div>
                          <div className="flex justify-between text-xs font-medium mb-1"><span>AI Doctor Consults</span><span>{plan === 'premium' ? '4 / 10' : '0 / 0'}</span></div>
                          <Progress value={plan === 'premium' ? 40 : 0} className="h-2" />
                      </div>
                  </CardContent>
              </Card>
            </Link>
        </div>

        {/* Footer Strip */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>CuraAI is for informational purposes and is not a substitute for professional medical advice.
            <br/> Your data is secure. Read our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
            </p>
        </div>
    </div>
  );
}
