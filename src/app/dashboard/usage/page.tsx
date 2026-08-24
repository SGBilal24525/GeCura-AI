'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Zap, BookOpen, ScanSearch, Stethoscope, AlertTriangle, ArrowRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const usageData = {
  free: {
    planName: 'Free',
    billingCycle: 'N/A',
    renewalDate: 'N/A',
    limits: {
      learning: { name: 'Learning', limit: 20, used: 15, unit: 'queries/day' },
      smartAnswer: { name: 'Smart Answer', limit: 0, used: 0, unit: 'analyses/month' },
      aiDoctor: { name: 'AI Doctor', limit: 0, used: 0, unit: 'consults/month' },
    },
  },
  standard: {
    planName: 'Standard',
    billingCycle: 'Monthly',
    renewalDate: 'July 30, 2024',
    limits: {
      learning: { name: 'Learning', limit: 200, used: 82, unit: 'queries/month' },
      smartAnswer: { name: 'Smart Answer', limit: 100, used: 35, unit: 'analyses/month' },
      aiDoctor: { name: 'AI Doctor', limit: 0, used: 0, unit: 'consults/month' },
    },
  },
  premium: {
    planName: 'Premium',
    billingCycle: 'Yearly',
    renewalDate: 'December 25, 2024',
    limits: {
      learning: { name: 'Learning', limit: 1000, used: 150, unit: 'queries/month' },
      smartAnswer: { name: 'Smart Answer', limit: 500, used: 120, unit: 'analyses/month' },
      aiDoctor: { name: 'AI Doctor', limit: 10, used: 4, unit: 'consults/month' },
    },
  },
   admin: {
    planName: 'Lifetime Premium',
    billingCycle: 'Lifetime',
    renewalDate: 'N/A',
    limits: {
      learning: { name: 'Learning', limit: Infinity, used: 540, unit: 'queries' },
      smartAnswer: { name: 'Smart Answer', limit: Infinity, used: 210, unit: 'analyses' },
      aiDoctor: { name: 'AI Doctor', limit: Infinity, used: 32, unit: 'consults' },
    },
  },
};

const featureIcons = {
  Learning: <BookOpen className="h-6 w-6 text-blue-500" />,
  'Smart Answer': <ScanSearch className="h-6 w-6 text-green-500" />,
  'AI Doctor': <Stethoscope className="h-6 w-6 text-red-500" />,
};

function UsageCard({ title, used, limit, unit }: { title: string, used: number, limit: number, unit: string }) {
  const percentage = limit > 0 && isFinite(limit) ? (used / limit) * 100 : 0;
  const isUnlimited = !isFinite(limit);
  const isLimitReached = !isUnlimited && used >= limit;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
            {featureIcons[title as keyof typeof featureIcons]}
            {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {isUnlimited ? (
            <>
                <p className="text-3xl font-bold">{used}</p>
                <p className="text-sm text-muted-foreground">Total {unit} used</p>
            </>
        ) : (
            <>
                <div className="flex justify-between items-baseline">
                    <p className="text-3xl font-bold">{used} <span className="text-lg text-muted-foreground">/ {limit}</span></p>
                    <p className="text-sm text-muted-foreground">{unit}</p>
                </div>
                <Progress value={percentage} aria-label={`${title} usage`} />
                 {isLimitReached && (
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span>You've reached your limit for this cycle.</span>
                    </div>
                )}
            </>
        )}
      </CardContent>
    </Card>
  );
}

export default function AIUsagePage() {
  const [plan, setPlan] = useState<string | null>(null);
  
  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
  }, []);

  if (!plan) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  const currentPlanData = usageData[plan as keyof typeof usageData] || usageData.free;
  const { planName, billingCycle, renewalDate, limits } = currentPlanData;

  const tableData = Object.values(limits).filter(feature => isFinite(feature.limit));
  
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <Zap /> AI Usage
        </h1>
        <p className="text-muted-foreground">
            Track your plan limits and AI consumption.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <p className="text-2xl font-bold text-primary">{planName}</p>
                <p className="text-sm text-muted-foreground">{billingCycle} Plan</p>
                {renewalDate !== 'N/A' && <p className="text-sm text-muted-foreground">Renews on {renewalDate}</p>}
            </div>
             {plan !== 'premium' && plan !== 'admin' && (
                <Button asChild className="group">
                    <Link href="/pricing">
                        Upgrade Plan <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            )}
        </CardContent>
      </Card>

        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight font-headline">Usage Breakdown</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.values(limits).map(limit => (
                    <UsageCard key={limit.name} title={limit.name} used={limit.used} limit={limit.limit} unit={limit.unit} />
                ))}
            </div>
        </div>

        {tableData.length > 0 && (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight font-headline">Feature-Level Details</h2>
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Feature</TableHead>
                                <TableHead>Limit</TableHead>
                                <TableHead>Used</TableHead>
                                <TableHead>Remaining</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableData.map(feature => (
                                <TableRow key={feature.name}>
                                    <TableCell className="font-medium">{feature.name}</TableCell>
                                    <TableCell>{feature.limit} {feature.unit.split('/')[1]}</TableCell>
                                    <TableCell>{feature.used}</TableCell>
                                    <TableCell>{feature.limit - feature.used}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        )}

        <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle className="text-base">Usage Reset Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
                <p><span className="font-semibold">Daily Limits:</span> Usage for features with daily limits resets at midnight (00:00) in your local timezone.</p>
                <p><span className="font-semibold">Monthly Limits:</span> Usage resets on the same day of the month you started your subscription.</p>
                <p><span className="font-semibold">Lifetime Plans:</span> Enjoy unlimited access with no resets, subject to our fair use policy.</p>
            </CardContent>
        </Card>

    </div>
  );
}
