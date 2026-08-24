'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Cpu, AlertTriangle, Save, SlidersHorizontal, Package, Wand2, Bot, HelpCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const auditLogData = [
    { admin: 'sgbilal33845@gmail.com', change: 'Set daily free limit to 15', feature: 'Plan Limits', timestamp: '2024-07-22 10:05:15' },
    { admin: 'sgbilal33845@gmail.com', change: 'Disabled "Exam Mode"', feature: 'Learning Module', timestamp: '2024-07-21 15:30:00' },
    { admin: 'sgbilal33845@gmail.com', change: 'Updated medical disclaimer text', feature: 'Safety & Compliance', timestamp: '2024-07-20 09:00:45' },
];


export default function AdminAiManagementPage() {
    const { toast } = useToast();

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved",
            description: "All AI Management configurations have been updated.",
        });
    }

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <Cpu /> AI Management
          </h1>
          <p className="text-muted-foreground">
            Control AI behavior, rules & limits.
          </p>
        </div>
      </div>
      
       <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Changes made on this page directly affect the live AI system. Proceed with caution.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Master Switches */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><SlidersHorizontal /> Master AI Feature Control</CardTitle>
                        <CardDescription>Instantly enable or disable core AI engines system-wide.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="learning-engine" className="font-medium">Learning Engine</Label><Switch id="learning-engine" defaultChecked /></div>
                        <div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="smart-answer" className="font-medium">Smart Answer</Label><Switch id="smart-answer" defaultChecked /></div>
                        <div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="ai-doctor" className="font-medium">AI Doctor</Label><Switch id="ai-doctor" defaultChecked /></div>
                        <div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="appointment-logic" className="font-medium">Appointment AI Logic</Label><Switch id="appointment-logic" /></div>
                    </CardContent>
                </Card>

                {/* Feature-Level Rules */}
                <Card>
                    <CardHeader>
                         <CardTitle>Feature-Level Rules</CardTitle>
                         <CardDescription>Fine-tune the behavior of each AI module.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple" defaultValue={['learning-module']}>
                            <AccordionItem value="learning-module">
                                <AccordionTrigger className="font-semibold text-base">Learning Module</AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-4">
                                    <div className="flex items-center justify-between"><Label>Enable Concept Builder</Label><Switch defaultChecked /></div>
                                    <div className="flex items-center justify-between"><Label>Enable Exam Mode</Label><Switch defaultChecked /></div>
                                    <div className="flex items-center justify-between"><Label>Enable Mistake Finder</Label><Switch /></div>
                                    <div className="flex items-center justify-between">
                                        <Label>Response Depth</Label>
                                        <Select defaultValue="medium">
                                            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="basic">Basic</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="full">Full</SelectItem></SelectContent>
                                        </Select>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="smart-answer-module">
                                <AccordionTrigger className="font-semibold text-base">Smart Answer Rules</AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-4">
                                     <div className="flex items-center justify-between"><Label>Enable Medicine Box Analysis</Label><Switch defaultChecked /></div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="ai-doctor-module">
                                <AccordionTrigger className="font-semibold text-base">AI Doctor Rules</AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-4">
                                     <div className="flex items-center justify-between"><Label>Enable Appointment Recommendation</Label><Switch defaultChecked /></div>
                                      <div className="flex items-center justify-between">
                                        <Label>Max Follow-up Questions</Label>
                                        <Input type="number" defaultValue={3} className="w-20" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                {/* Audit Trail */}
                 <Card>
                    <CardHeader>
                        <CardTitle>Change Log & Audit Trail</CardTitle>
                        <CardDescription>A log of all administrative changes to the AI system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow><TableHead>Admin</TableHead><TableHead>Change</TableHead><TableHead>Timestamp</TableHead></TableRow>
                            </TableHeader>
                            <TableBody>
                                {auditLogData.map(log => (
                                    <TableRow key={log.timestamp}>
                                        <TableCell className="font-mono text-xs">{log.admin}</TableCell>
                                        <TableCell>{log.change}</TableCell>
                                        <TableCell>{log.timestamp}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 space-y-8">
                 {/* Plan Limits */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Package /> Plan-Based AI Limits</CardTitle>
                        <CardDescription>Define AI usage limits for each subscription plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="free">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="free">Free</TabsTrigger>
                                <TabsTrigger value="standard">Standard</TabsTrigger>
                                <TabsTrigger value="premium">Premium</TabsTrigger>
                            </TabsList>
                            <TabsContent value="free" className="pt-4 space-y-4">
                                <div className="space-y-2"><Label>Daily AI Queries</Label><Input type="number" defaultValue="15" /></div>
                                <div className="flex items-center justify-between"><Label>Demo Mode Blur</Label><Switch defaultChecked /></div>
                            </TabsContent>
                             <TabsContent value="standard" className="pt-4 space-y-4">
                                <div className="space-y-2"><Label>Monthly AI Queries</Label><Input type="number" defaultValue="200" /></div>
                            </TabsContent>
                             <TabsContent value="premium" className="pt-4 space-y-4">
                                <div className="flex items-center justify-between"><Label>Fair-Use Policy</Label><Switch defaultChecked /></div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                
                 {/* Prompt Templates */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Wand2 /> Prompts & Behavior</CardTitle>
                        <CardDescription>Control the AI's personality and core instructions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Response Tone</Label>
                            <Select defaultValue="humanized">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="professional">Professional</SelectItem>
                                    <SelectItem value="humanized">Humanized</SelectItem>
                                    <SelectItem value="neutral">Neutral</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label>Medical Disclaimer Text</Label>
                             <Textarea defaultValue="This AI assistant does not replace professional medical advice. If this is an emergency, please contact local emergency services immediately." className="text-xs" />
                        </div>
                    </CardContent>
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
  );
}
