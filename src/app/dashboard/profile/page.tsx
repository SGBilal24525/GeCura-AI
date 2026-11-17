'use client';

import { useState, useEffect, useRef } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { User, Camera, Loader2, Shield, Bell, Trash2, CreditCard, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { toast } = useToast();
  const [plan, setPlan] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [name, setName] = useState('Valued User');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const storedPlan = localStorage.getItem('userPlan') || 'free';
    setPlan(storedPlan);
    if(storedPlan === 'admin') setEmail('sgbilal33845@gmail.com');
    if(storedPlan === 'premium') setEmail('sgbilal69@gmail.com');
    if(storedPlan === 'standard') setEmail('sgbilal9@gmail.com');
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    toast({ title: 'Profile Updated', description: 'Your personal information has been saved.' });
    if (avatarPreview) {
        // In a real app, you'd upload the file here.
        // For this demo, we just show a second toast.
        toast({ title: 'Profile Picture Updated', description: 'Your new avatar has been saved.' });
    }
    setIsEditing(false);
  };
  
  const planTiers = { free: 0, standard: 1, premium: 2, admin: 3 };
  const userTier = plan ? planTiers[plan as keyof typeof planTiers] : 0;
  
  const planDetails = {
    premium: { name: 'Premium', badgeClass: 'bg-green-600 hover:bg-green-700' },
    standard: { name: 'Standard', badgeClass: 'bg-blue-600 hover:bg-blue-700' },
    admin: { name: 'Admin', badgeClass: 'bg-purple-600 hover:bg-purple-700'},
    free: { name: 'Free', badgeClass: 'bg-gray-600 hover:bg-gray-700' },
  }[plan as 'premium' | 'standard' | 'free' | 'admin'] || { name: 'Free', badgeClass: 'bg-gray-600 hover:bg-gray-700' };

  if (!plan) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <User /> Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarPreview || "https://i.pravatar.cc/150"} alt="User avatar" />
                    <AvatarFallback>{name.substring(0,2)}</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                  <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full" onClick={() => fileInputRef.current?.click()} disabled={!isEditing}>
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-xl font-semibold'>{name}</h3>
                    <p className='text-sm text-muted-foreground'>{email}</p>
                    <Badge className={cn("text-white w-fit", planDetails.badgeClass)}>{planDetails.name}</Badge>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={email} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone number" disabled={!isEditing} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>

           {/* Account Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield /> Account Security</CardTitle>
            </CardHeader>
             <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                    <Switch id="two-factor" />
                </div>
                <div className='space-y-4'>
                    <Label className="font-medium">Change Password</Label>
                    <div className="space-y-2">
                        <Input id="current-password" type="password" placeholder="Current Password" />
                    </div>
                    <div className="space-y-2">
                        <Input id="new-password" type="password" placeholder="New Password" />
                    </div>
                     <div className="space-y-2">
                        <Input id="confirm-password" type="password" placeholder="Confirm New Password" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
                <Button>Update Password</Button>
            </CardFooter>
          </Card>

        </div>
        <div className="lg:col-span-1 space-y-8">
            {/* Subscription */}
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'><CreditCard /> Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">You are currently on the <span className="font-semibold text-primary">{planDetails.name}</span> plan.</p>
                </CardContent>
                <CardFooter>
                    {plan === 'admin' ? (
                        <p className='text-sm text-muted-foreground'>You have lifetime access.</p>
                    ) : (
                         <Button asChild className="w-full group" variant="outline">
                            <Link href="/dashboard/billing">
                                Manage Billing <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </Card>

            {/* Preferences */}
           <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell /> Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                         <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                        <Switch id="push-notifications" />
                    </div>
                </CardContent>
           </Card>
          
          {/* Danger Zone */}
          {userTier >= 1 && (
            <Card className="border-destructive bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2"><Trash2 /> Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Deleting your account is a permanent action and cannot be undone.</p>
                </CardContent>
                <CardFooter>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">Delete My Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className={cn(buttonVariants({ variant: 'destructive' }))}>Yes, Delete Account</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
