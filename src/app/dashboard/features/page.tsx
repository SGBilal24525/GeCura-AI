'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { features, Feature } from './data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lock, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const planTiers: { [key: string]: number } = { free: 0, standard: 1, premium: 2, admin: 3 };

function FeatureCard({ feature, userPlan }: { feature: Feature; userPlan: string }) {
  const hasAccess = planTiers[userPlan] >= planTiers[feature.plan];
  const isComingSoon = feature.status === 'coming-soon';

  const getButton = () => {
    if (isComingSoon) {
      return (
        <Button disabled variant="outline" className="w-full">
          <Clock className="mr-2 h-4 w-4" />
          Coming Soon
        </Button>
      );
    }
    if (hasAccess) {
      return (
        <Button asChild className="w-full group">
          <Link href={feature.href}>
            Open Feature <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      );
    }
    return (
      <Button asChild variant="secondary" className="w-full group">
        <Link href="/pricing">
          <Lock className="mr-2 h-4 w-4" />
          Upgrade to Unlock
        </Link>
      </Button>
    );
  };

  return (
    <Card className={cn("flex flex-col", !hasAccess && !isComingSoon && "bg-muted/50 border-dashed")}>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
           <Badge variant="outline">{feature.category}</Badge>
        </div>
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <h4 className="text-sm font-semibold mb-2">Includes:</h4>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          {feature.subFeatures.map((sub) => (
            <li key={sub} className="flex items-center gap-2">
              <span className={cn("h-1 w-1 rounded-full", hasAccess || isComingSoon ? "bg-primary" : "bg-muted-foreground/50")}></span>
              {sub}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {getButton()}
      </CardFooter>
    </Card>
  );
}

export default function FeaturesPage() {
  const [userPlan, setUserPlan] = useState<string | null>(null);

  useEffect(() => {
    const plan = localStorage.getItem('userPlan') || 'free';
    setUserPlan(plan);
  }, []);

  if (!userPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Features</h1>
        <p className="text-muted-foreground">Explore everything CuraAI can do for you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} userPlan={userPlan} />
        ))}
      </div>
    </div>
  );
}
