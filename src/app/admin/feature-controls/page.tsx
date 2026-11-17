
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  SlidersHorizontal,
  AlertTriangle,
  Save,
  Cpu,
  BookOpen,
  ScanLine,
  Stethoscope,
  History,
  Settings,
  Badge,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const initialFeatures = [
    {
        id: 'learning-engine',
        name: 'Learning Engine',
        description: 'Core AI module for educational content and explanations.',
        icon: BookOpen,
        plans: {
            free: { enabled: true, queryLimit: '20' },
            standard: { enabled: true, queryLimit: '100' },
            premium: { enabled: true, queryLimit: 'Unlimited' },
        },
        subFeatures: [
            { id: 'concept-builder', name: 'Concept Builder', plans: { free: false, standard: true, premium: true } },
            { id: 'exam-mode', name: 'Exam Mode', plans: { free: false, standard: true, premium: true } },
            { id: 'mistake-finder', name: 'Mistake Finder', plans: { free: false, standard: false, premium: true } },
        ]
    },
    {
        id: 'smart-answer',
        name: 'Smart Answer Engine',
        description: 'Image and text analysis for instant insights.',
        icon: ScanLine,
        plans: {
            free: { enabled: false, queryLimit: '0' },
            standard: { enabled: true, queryLimit: '50' },
            premium: { enabled: true, queryLimit: '200' },
        },
        subFeatures: [
            { id: 'image-question', name: 'Image Question Analysis', plans: { free: false, standard: true, premium: true } },
            { id: 'medicine-box', name: 'Medicine Box Analysis', plans: { free: false, standard: true, premium: true } },
            { id: 'text-structuring', name: 'Text Structuring', plans: { free: false, standard: false, premium: true } },
        ]
    },
    {
        id: 'ai-doctor',
        name: 'AI Doctor Engine',
        description: 'Symptom consultation and guidance feature.',
        icon: Stethoscope,
        plans: {
            free: { enabled: false, queryLimit: '0' },
            standard: { enabled: false, queryLimit: '0' },
            premium: { enabled: true, queryLimit: 'Fair-use' },
        },
        subFeatures: [
            { id: 'appointment-recommendation', name: 'Appointment Recommendation', plans: { free: false, standard: false, premium: true } },
        ]
    },
];

type Plan = 'free' | 'standard' | 'premium';
type Feature = typeof initialFeatures[number];

function EditFeatureDialog({ feature, isOpen, onOpenChange, onSave }: { feature: Feature | null; isOpen: boolean; onOpenChange: (open: boolean) => void; onSave: (updatedFeature: Feature) => void; }) {
    const [editedFeature, setEditedFeature] = useState<Feature | null>(null);

    useEffect(() => {
        if (feature) {
            setEditedFeature(JSON.parse(JSON.stringify(feature))); // Deep copy
        }
    }, [feature]);

    const handlePlanToggle = (plan: Plan, checked: boolean) => {
        if (!editedFeature) return;
        setEditedFeature({
            ...editedFeature,
            plans: {
                ...editedFeature.plans,
                [plan]: { ...editedFeature.plans[plan], enabled: checked }
            }
        });
    };

    const handleLimitChange = (plan: Plan, value: string) => {
        if (!editedFeature) return;
         setEditedFeature({
            ...editedFeature,
            plans: {
                ...editedFeature.plans,
                [plan]: { ...editedFeature.plans[plan], queryLimit: value }
            }
        });
    };
    
    const handleSubFeatureToggle = (subFeatureId: string, plan: Plan, checked: boolean) => {
        if (!editedFeature || !editedFeature.subFeatures) return;
        
        setEditedFeature(prev => {
            if (!prev) return null;
            const newSubFeatures = prev.subFeatures!.map(sub => 
                sub.id === subFeatureId 
                ? { ...sub, plans: { ...sub.plans, [plan]: checked } }
                : sub
            );
            return {
                ...prev,
                subFeatures: newSubFeatures,
            };
        });
    };

    if (!feature || !editedFeature) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="font-headline text-xl flex items-center gap-2">
                        <Settings /> Configure: {feature.name}
                    </DialogTitle>
                    <DialogDescription>{feature.description}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Tabs defaultValue="free">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="free">Free Plan</TabsTrigger>
                            <TabsTrigger value="standard">Standard Plan</TabsTrigger>
                            <TabsTrigger value="premium">Premium Plan</TabsTrigger>
                        </TabsList>
                        {(['free', 'standard', 'premium'] as Plan[]).map(plan => (
                            <TabsContent key={plan} value={plan} className="mt-6 space-y-6">
                                <div className="space-y-4 rounded-lg border p-4">
                                     <div className="flex items-center justify-between">
                                        <Label htmlFor={`${plan}-enabled`} className="text-base font-semibold">Enable for {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan</Label>
                                        <Switch id={`${plan}-enabled`} checked={editedFeature.plans[plan].enabled} onCheckedChange={(checked) => handlePlanToggle(plan, checked)} />
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label htmlFor={`${plan}-limit`}>Query Limit</Label>
                                        <Input id={`${plan}-limit`} value={editedFeature.plans[plan].queryLimit} onChange={(e) => handleLimitChange(plan, e.target.value)} disabled={!editedFeature.plans[plan].enabled} />
                                    </div>
                                </div>
                                {editedFeature.subFeatures && editedFeature.subFeatures.length > 0 && (
                                     <div className="space-y-4 rounded-lg border p-4">
                                         <h4 className="font-semibold">Sub-Features</h4>
                                         {editedFeature.subFeatures.map(sub => (
                                             <div key={sub.id} className="flex items-center justify-between">
                                                 <Label htmlFor={`${plan}-${sub.id}`} className="font-normal">{sub.name}</Label>
                                                 <Switch id={`${plan}-${sub.id}`} checked={(sub.plans as any)[plan]} onCheckedChange={(checked) => handleSubFeatureToggle(sub.id, plan, checked)} disabled={!editedFeature.plans[plan].enabled} />
                                             </div>
                                         ))}
                                     </div>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={() => editedFeature && onSave(editedFeature)}>Save Configuration</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function FeatureControlsPage() {
    const { toast } = useToast();
    const [features, setFeatures] = useState(initialFeatures);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

    const handleSaveChanges = () => {
        toast({
            title: "Feature Controls Updated",
            description: "All feature configurations have been saved.",
        });
    };

    const openModal = (feature: Feature) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
    };

    const handleSaveConfiguration = (updatedFeature: Feature) => {
        setFeatures(prev => prev.map(f => f.id === updatedFeature.id ? updatedFeature : f));
        setIsModalOpen(false);
        toast({
            title: "Configuration Saved",
            description: `${updatedFeature.name} has been updated.`
        });
    };
    
     const handlePlanToggle = (featureId: string, plan: Plan, checked: boolean) => {
        setFeatures(prevFeatures =>
            prevFeatures.map(f =>
                f.id === featureId
                    ? { ...f, plans: { ...f.plans, [plan]: { ...f.plans[plan], enabled: checked } } }
                    : f
            )
        );
    };

    return (
        <>
            <EditFeatureDialog 
                feature={selectedFeature}
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSave={handleSaveConfiguration}
            />
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
                            <SlidersHorizontal /> Feature Controls
                        </h1>
                        <p className="text-muted-foreground">
                            Enable, disable, and configure features for different user plans.
                        </p>
                    </div>
                </div>
                
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                        Changes made here take effect immediately and will impact all users. Proceed with caution.
                    </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2">
                         <Card>
                             <CardHeader>
                                 <CardTitle>Feature Matrix</CardTitle>
                                 <CardDescription>Toggle features on/off for each plan or click 'Configure' for more options.</CardDescription>
                             </CardHeader>
                             <CardContent>
                                 <Table>
                                     <TableHeader>
                                         <TableRow>
                                             <TableHead className="w-[40%]">Feature</TableHead>
                                             <TableHead className="text-center">Free</TableHead>
                                             <TableHead className="text-center">Standard</TableHead>
                                             <TableHead className="text-center">Premium</TableHead>
                                             <TableHead className="text-right">Actions</TableHead>
                                         </TableRow>
                                     </TableHeader>
                                     <TableBody>
                                         {features.map((feature) => (
                                             <TableRow key={feature.id}>
                                                 <TableCell>
                                                     <div className="flex items-center gap-3">
                                                        <feature.icon className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <div className="font-medium">{feature.name}</div>
                                                            <div className="text-xs text-muted-foreground">{feature.description}</div>
                                                        </div>
                                                     </div>
                                                 </TableCell>
                                                 {(['free', 'standard', 'premium'] as Plan[]).map(plan => (
                                                      <TableCell key={plan} className="text-center">
                                                         <Switch
                                                             checked={feature.plans[plan].enabled}
                                                             onCheckedChange={(checked) => handlePlanToggle(feature.id, plan, checked)}
                                                         />
                                                     </TableCell>
                                                 ))}
                                                 <TableCell className="text-right">
                                                     <Button variant="outline" size="sm" onClick={() => openModal(feature)}>Configure</Button>
                                                 </TableCell>
                                             </TableRow>
                                         ))}
                                     </TableBody>
                                 </Table>
                             </CardContent>
                         </Card>
                     </div>
                     <div className="lg:col-span-1 space-y-8">
                         <Card>
                             <CardHeader>
                                 <CardTitle className="flex items-center gap-2"><History /> Audit Trail</CardTitle>
                                 <CardDescription>Track all changes made to feature configurations.</CardDescription>
                             </CardHeader>
                             <CardContent>
                                <p className="text-sm text-muted-foreground">The audit log provides a complete history of all feature control changes.</p>
                             </CardContent>
                             <CardFooter>
                                <Button variant="secondary" className="w-full" asChild>
                                    <Link href="/admin/logs">View Full Audit Log</Link>
                                </Button>
                             </CardFooter>
                         </Card>
                     </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 z-50 md:left-[220px] lg:left-[280px] p-4 bg-background/80 backdrop-blur-sm border-t">
                    <div className="flex justify-end">
                        <Button onClick={handleSaveChanges} size="lg">
                            <Save className="mr-2" />
                            Save All Changes
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
