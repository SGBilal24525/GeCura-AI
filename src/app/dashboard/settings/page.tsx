'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Settings,
  Palette,
  Bell,
  Globe,
  Trash2,
  ShieldCheck,
  Loader2,
  Cpu,
  FileCog,
  MessageSquare,
  CreditCard,
  Download,
  Languages,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';


function FeedbackDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    const handleSubmit = () => {
        toast({ title: "Feedback Submitted", description: "Thank you for helping us improve!" });
        onOpenChange(false);
    }
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submit Feedback</DialogTitle>
                    <DialogDescription>We'd love to hear your thoughts on how we can improve CuraAI.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="feedback-message">Your Feedback</Label>
                        <Textarea id="feedback-message" placeholder="What's on your mind?" className="min-h-[120px]" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
  }, []);

  const handleSaveChanges = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated.',
    });
  };
  
  if (!plan) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  const isFreePlan = plan === 'free';
  const isStandardOrFree = plan === 'free' || plan === 'standard';

  const privacySecurityContent = (
     <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
            <Label htmlFor="data-sharing" className="font-medium text-sm">Data Sharing for AI Improvement</Label>
            <Switch id="data-sharing" defaultChecked disabled={isFreePlan} />
        </div>
        <Separator />
        <div>
            <Button variant="outline" className="w-full justify-start gap-2" disabled={isFreePlan}>
                <Download className="h-4 w-4" />
                Export My Data
            </Button>
        </div>
     </CardContent>
  );

  const aiBehaviorContent = (
      <CardContent className="space-y-6">
        <div>
            <Label className="font-medium text-sm">AI Output Style</Label>
            <RadioGroup defaultValue="medium" className="mt-2 flex items-center gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="simple" id="ai-simple" /><Label htmlFor="ai-simple" className="text-sm font-normal">Simple</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="medium" id="ai-medium" /><Label htmlFor="ai-medium" className="text-sm font-normal">Normal</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="large" id="ai-large" /><Label htmlFor="ai-large" className="text-sm font-normal">Detailed</Label></div>
            </RadioGroup>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
            <Label htmlFor="auto-save" className="font-medium text-sm">Auto-Save Important Answers</Label>
            <Switch id="auto-save" />
        </div>
     </CardContent>
  );

  return (
    <>
      <FeedbackDialog isOpen={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen} />
      <TooltipProvider>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
              <Settings /> Settings
            </h1>
            <p className="text-muted-foreground">
              Control your CuraAI experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              {/* Appearance Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Palette /> Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme" className="font-medium">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div>
                    <Label className="font-medium">Font Size</Label>
                    <RadioGroup defaultValue="medium" className="mt-2 flex items-center gap-4">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="small" id="font-small" /><Label htmlFor="font-small">Small</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="medium" id="font-medium" /><Label htmlFor="font-medium">Medium</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="large" id="font-large" /><Label htmlFor="font-large">Large</Label></div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* AI Behavior Settings */}
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Cpu /> AI Behavior</CardTitle>
                      <CardDescription>Customize how the AI responds and behaves.</CardDescription>
                  </CardHeader>
                  {isFreePlan ? (
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <div className="opacity-50 cursor-not-allowed">
                                  {aiBehaviorContent}
                              </div>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>Upgrade to Standard to customize AI behavior.</p>
                          </TooltipContent>
                      </Tooltip>
                  ) : (
                      aiBehaviorContent
                  )}
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
                  <CardDescription>Manage how you receive communications from us.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appointment-reminders" className="font-medium text-sm">Appointment Reminders</Label>
                    <Switch id="appointment-reminders" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="usage-reminders" className="font-medium text-sm">AI Usage Limit Warnings</Label>
                    <Switch id="usage-reminders" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="feature-announcements" className="font-medium text-sm">New Feature Announcements</Label>
                    <Switch id="feature-announcements" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Feature Preferences */}
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><FileCog /> Feature Preferences</CardTitle>
                      <CardDescription>Enable or disable specific platform features.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                          <Label htmlFor="beta-features" className="font-medium text-sm">Enable Beta Features</Label>
                          <Switch id="beta-features" />
                      </div>
                  </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              {/* Language and Region */}
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Languages /> Language & Region</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div>
                          <Label htmlFor="language" className="font-medium text-sm">Language</Label>
                          <Select defaultValue="en-us">
                              <SelectTrigger id="language"><SelectValue placeholder="Select language" /></SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="en-us">English (United States)</SelectItem>
                                  <SelectItem value="es-es" disabled>Español (Coming soon)</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                      <div>
                          <Label htmlFor="timezone" className="font-medium text-sm">Timezone</Label>
                          <Select defaultValue="utc-5">
                              <SelectTrigger id="timezone"><SelectValue placeholder="Select timezone" /></SelectTrigger>
                              <SelectContent><SelectItem value="utc-5">Eastern Time (ET)</SelectItem></SelectContent>
                          </Select>
                      </div>
                  </CardContent>
              </Card>

              {/* Billing & Subscription */}
              <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard /> Billing & Subscription</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">You are on the <span className="font-semibold text-primary">{plan}</span> plan.</p></CardContent>
                  <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                          <Link href="/dashboard/billing">Manage Subscription</Link>
                      </Button>
                  </CardFooter>
              </Card>

              {/* Privacy & Security */}
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><ShieldCheck /> Privacy & Security</CardTitle>
                      <CardDescription>Control how your data is used.</CardDescription>
                  </CardHeader>
                  {isFreePlan ? (
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <div className="opacity-50 cursor-not-allowed">
                                  {privacySecurityContent}
                              </div>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>Upgrade to Standard to manage privacy settings.</p>
                          </TooltipContent>
                      </Tooltip>
                  ) : (
                      privacySecurityContent
                  )}
              </Card>

              {/* Support & Feedback */}
              <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare /> Support & Feedback</CardTitle></CardHeader>
                  <CardContent className="flex flex-col gap-2">
                      <Button variant="outline" className="w-full justify-start" asChild><Link href="/dashboard/support">Contact Support</Link></Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => setIsFeedbackModalOpen(true)}>Submit Feedback</Button>
                  </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive bg-destructive/5">
                  <CardHeader><CardTitle className="text-destructive flex items-center gap-2"><Trash2 /> Account Deletion</CardTitle></CardHeader>
                  <CardContent><p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p></CardContent>
                  <CardFooter>
                      <Button variant="destructive" className="w-full" onClick={() => setIsDeleteDialogOpen(true)}>Delete My Account</Button>
                  </CardFooter>
              </Card>
            </div>
          </div>
          <div className="flex justify-end pt-4 mt-8 border-t">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </div>
        
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
              <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action is irreversible and will permanently delete your account.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className={cn(buttonVariants({ variant: 'destructive' }))}>Yes, Delete Account</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
      </TooltipProvider>
    </>
  );
}
