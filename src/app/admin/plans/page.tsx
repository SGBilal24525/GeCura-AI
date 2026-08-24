'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
  BookOpen,
  ScanLine,
  Stethoscope,
  Sparkles,
  Save,
  Package,
  PlusCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';


const initialPlanData = {
  subscriptions: [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'For new users to explore basic features.',
      features: {
        learning: { 'Normal Learning': true, 'Concept Builder': false, 'Exam Mode': false, 'Mistake Finder': false },
        smart: { 'Smart Text Answer': true, 'Image Question Analysis': false, 'Medicine Image Scan': false },
        doctor: { 'Consultation Enabled': false, 'Follow-up Questions': false },
      },
      limits: { queries: '15/day', history: '7 days', saved: 3 },
      isPopular: false,
    },
    {
      name: 'Standard',
      price: { monthly: 4.99, yearly: 14.99 },
      description: 'For serious students & general users.',
      features: {
        learning: { 'Normal Learning': true, 'Concept Builder': true, 'Exam Mode': true, 'Mistake Finder': true },
        smart: { 'Smart Text Answer': true, 'Image Question Analysis': true, 'Medicine Image Scan': true },
        doctor: { 'Consultation Enabled': false, 'Follow-up Questions': false },
      },
      limits: { queries: '100/day', history: '90 days', saved: 50 },
      isPopular: true,
    },
    {
      name: 'Premium',
      price: { monthly: 19.99, yearly: 49.99 },
      description: 'For health-focused users & patients.',
      features: {
        learning: { 'Normal Learning': true, 'Concept Builder': true, 'Exam Mode': true, 'Mistake Finder': true },
        smart: { 'Smart Text Answer': true, 'Image Question Analysis': true, 'Medicine Image Scan': true },
        doctor: { 'Consultation Enabled': true, 'Follow-up Questions': true },
      },
      limits: { queries: 'Unlimited', history: 'Unlimited', saved: 'Unlimited' },
      isPopular: false,
    },
  ],
  lifetime: [
     {
      name: 'Lifetime Standard',
      price: { onetime: 99.99 },
      description: 'All Standard plan features, forever.',
      maxUsers: 100,
      enabled: true,
    },
  ]
};

const featureIcons = {
  learning: <BookOpen className="h-5 w-5 text-blue-500" />,
  smart: <ScanLine className="h-5 w-5 text-green-500" />,
  doctor: <Stethoscope className="h-5 w-5 text-red-500" />,
}

function PlanCard({ plan, cycle }: { plan: typeof initialPlanData.subscriptions[0], cycle: 'monthly' | 'yearly' }) {
  return (
    <Card className={cn('flex flex-col', plan.isPopular && 'border-primary ring-2 ring-primary')}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle>{plan.name}</CardTitle>
            <Badge variant={plan.isPopular ? 'default' : 'secondary'}>{plan.isPopular ? 'Most Popular' : 'Active'}</Badge>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        <div className="space-y-2">
          <Label htmlFor={`price-${plan.name}-${cycle}`}>Price ({cycle})</Label>
          <Input id={`price-${plan.name}-${cycle}`} type="number" defaultValue={plan.price[cycle]} />
        </div>
        <Separator />
        <div className="space-y-4">
            <h4 className="font-semibold text-sm">Features</h4>
            {Object.entries(plan.features).map(([key, value]) => (
                <div key={key} className="space-y-3">
                    <Label className="capitalize flex items-center gap-2 font-medium">
                        {featureIcons[key as keyof typeof featureIcons]}
                        {key} Module
                    </Label>
                     {Object.entries(value).map(([featureName, enabled]) => (
                         <div key={featureName} className="flex items-center justify-between pl-6">
                            <Label htmlFor={`${plan.name}-${featureName}`} className="text-xs font-normal">{featureName}</Label>
                            <Switch id={`${plan.name}-${featureName}`} defaultChecked={enabled} />
                        </div>
                     ))}
                </div>
            ))}
        </div>
         <Separator />
        <div className="space-y-4">
            <h4 className="font-semibold text-sm">User Limits</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                    <Label>AI Queries</Label>
                    <Input defaultValue={plan.limits.queries} />
                </div>
                 <div>
                    <Label>History Length</Label>
                    <Input defaultValue={plan.limits.history} />
                </div>
                 <div>
                    <Label>Saved Items</Label>
                    <Input defaultValue={plan.limits.saved} />
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AddPlanDialog({ isOpen, onOpenChange, onAddPlan }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onAddPlan: (plan: any) => void }) {
  const { toast } = useToast();
  
  const initialFeatures = {
    learning: { 'Normal Learning': true, 'Concept Builder': false, 'Exam Mode': false, 'Mistake Finder': false },
    smart: { 'Smart Text Answer': false, 'Image Question Analysis': false, 'Medicine Image Scan': false },
    doctor: { 'Consultation Enabled': false, 'Follow-up Questions': false },
  };
  const initialLimits = { queries: '20/day', history: '14 days', saved: 5 };

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [monthlyPrice, setMonthlyPrice] = React.useState('');
  const [yearlyPrice, setYearlyPrice] = React.useState('');
  const [features, setFeatures] = React.useState(initialFeatures);
  const [limits, setLimits] = React.useState(initialLimits);

  const resetForm = () => {
    setName('');
    setDescription('');
    setMonthlyPrice('');
    setYearlyPrice('');
    setFeatures(initialFeatures);
    setLimits(initialLimits);
  };
  
  const handleFeatureToggle = (module: 'learning' | 'smart' | 'doctor', feature: string, checked: boolean) => {
    setFeatures(prev => ({
        ...prev,
        [module]: {
            ...prev[module],
            [feature]: checked
        }
    }));
  };

  const handleLimitChange = (limitType: keyof typeof limits, value: string | number) => {
    setLimits(prev => ({ ...prev, [limitType]: value }));
  };

  const handleCreatePlan = () => {
    if (!name || !description || !monthlyPrice || !yearlyPrice) {
      toast({ title: "Validation Error", description: "Please fill out all plan details.", variant: "destructive" });
      return;
    }
    
    const newPlan = {
      name,
      price: { monthly: parseFloat(monthlyPrice), yearly: parseFloat(yearlyPrice) },
      description,
      features,
      limits,
      isPopular: false,
    };

    onAddPlan(newPlan);
    onOpenChange(false);
    resetForm();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl">Create a New Plan</DialogTitle>
          <DialogDescription>
            Configure the details, features, and limits for the new subscription plan.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] -mx-6 px-6">
        <div className="grid gap-6 py-4 pr-4">
          
          {/* --- Basic Info --- */}
          <div className="space-y-4 rounded-lg border p-4">
            <h4 className="font-semibold text-base">Basic Information</h4>
            <div className="space-y-2">
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input id="plan-name" placeholder="e.g., Enterprise" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-description">Description</Label>
              <Textarea id="plan-description" placeholder="A short description for the plan card." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-price">Monthly Price ($)</Label>
                <Input id="monthly-price" type="number" placeholder="e.g., 29.99" value={monthlyPrice} onChange={(e) => setMonthlyPrice(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearly-price">Yearly Price ($)</Label>
                <Input id="yearly-price" type="number" placeholder="e.g., 299.99" value={yearlyPrice} onChange={(e) => setYearlyPrice(e.target.value)} />
              </div>
            </div>
          </div>
          
          {/* --- Features --- */}
           <div className="space-y-4 rounded-lg border p-4">
                <h4 className="font-semibold text-base">Features</h4>
                <div className="space-y-4">
                    {Object.entries(features).map(([moduleKey, moduleFeatures]) => (
                        <div key={moduleKey} className="space-y-3">
                            <Label className="capitalize flex items-center gap-2 font-medium">
                                {featureIcons[moduleKey as keyof typeof featureIcons]} {moduleKey} Module
                            </Label>
                            <div className="pl-6 space-y-3">
                            {Object.entries(moduleFeatures).map(([featureName, enabled]) => (
                                <div key={featureName} className="flex items-center justify-between">
                                    <Label htmlFor={`new-${featureName}`} className="text-sm font-normal">{featureName}</Label>
                                    <Switch id={`new-${featureName}`} checked={enabled} onCheckedChange={(checked) => handleFeatureToggle(moduleKey as any, featureName, checked)} />
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Limits --- */}
            <div className="space-y-4 rounded-lg border p-4">
                 <h4 className="font-semibold text-base">User Limits</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>AI Queries</Label>
                        <Input value={limits.queries} onChange={e => handleLimitChange('queries', e.target.value)} placeholder="e.g., 100/day" />
                    </div>
                     <div className="space-y-2">
                        <Label>History Length</Label>
                        <Input value={limits.history} onChange={e => handleLimitChange('history', e.target.value)} placeholder="e.g., 90 days" />
                    </div>
                     <div className="space-y-2">
                        <Label>Saved Items</Label>
                        <Input type="number" value={limits.saved} onChange={e => handleLimitChange('saved', parseInt(e.target.value))} placeholder="e.g., 50" />
                    </div>
                </div>
            </div>

        </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => { onOpenChange(false); resetForm(); }}>Cancel</Button>
          <Button onClick={handleCreatePlan}>Create Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default function AdminPlansPage() {
  const { toast } = useToast();
  const [plans, setPlans] = React.useState(initialPlanData);
  const [isAddPlanOpen, setIsAddPlanOpen] = React.useState(false);

  const handleSaveChanges = () => {
      toast({
          title: "Changes Saved",
          description: "All plan configurations have been updated successfully."
      });
  }

  const handleAddPlan = (newPlan: any) => {
    setPlans(prevPlans => ({
        ...prevPlans,
        subscriptions: [...prevPlans.subscriptions, newPlan]
    }));
    toast({ title: "Plan Created", description: `The "${newPlan.name}" plan has been successfully added.` });
  };


  return (
    <>
    <AddPlanDialog isOpen={isAddPlanOpen} onOpenChange={setIsAddPlanOpen} onAddPlan={handleAddPlan} />
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <Package /> Plans Management
          </h1>
          <p className="text-muted-foreground">
            Manage pricing, limits, and feature access for all plans.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsAddPlanOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Plan
            </Button>
            <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save All Changes
            </Button>
        </div>
      </div>

      <Tabs defaultValue="monthly">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight font-headline">Subscription Plans</h2>
            <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="monthly">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {plans.subscriptions.map(plan => <PlanCard key={plan.name} plan={plan} cycle="monthly" />)}
            </div>
        </TabsContent>
        <TabsContent value="yearly">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {plans.subscriptions.map(plan => <PlanCard key={plan.name} plan={plan} cycle="yearly" />)}
            </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline flex items-center gap-2">
            <Sparkles className="text-amber-500" /> Lifetime Offers
        </h2>
        <p className="text-muted-foreground mt-2">Manage one-time payment offers. Limited to first 100 users.</p>
        <div className="grid md:grid-cols-1 max-w-md gap-6 mt-6">
            {plans.lifetime.map(plan => (
                <Card key={plan.name} className="border-amber-500 border-2 bg-amber-500/5">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>{plan.name}</CardTitle>
                            <Badge className="bg-amber-500 text-white">Limited Offer</Badge>
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>One-Time Price</Label>
                            <Input type="number" defaultValue={plan.price.onetime} />
                        </div>
                         <div className="space-y-2">
                            <Label>Max Allowed Users</Label>
                            <Input type="number" defaultValue={plan.maxUsers} />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <Label className="font-medium">Enable Lifetime Offer</Label>
                            <Switch defaultChecked={plan.enabled} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
    </>
  );
}
