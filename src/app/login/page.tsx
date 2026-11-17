'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';
import { BookOpen, ScanLine, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address to log in.',
        variant: 'destructive',
      });
      return;
    }

    const adminEmail = 'sgbilal33845@gmail.com';
    const premiumUser = 'sgbilal69@gmail.com';
    const standardUser = 'sgbilal9@gmail.com';

    const lowerCaseEmail = email.toLowerCase();

    // Store plan in localStorage and redirect without query params
    if (lowerCaseEmail === adminEmail) {
      localStorage.setItem('userPlan', 'admin');
      toast({ title: 'Admin Login Successful', description: 'Redirecting to Admin Panel...' });
      router.push('/admin');
    } else if (lowerCaseEmail === premiumUser) {
      localStorage.setItem('userPlan', 'premium');
      toast({ title: 'Login Successful', description: 'Redirecting to your dashboard...' });
      router.push('/dashboard');
    } else if (lowerCaseEmail === standardUser) {
      localStorage.setItem('userPlan', 'standard');
      toast({ title: 'Login Successful', description: 'Redirecting to your dashboard...' });
      router.push('/dashboard');
    } else {
      localStorage.setItem('userPlan', 'free');
      toast({ title: 'Login Successful', description: 'Redirecting to your dashboard...' });
      router.push('/dashboard');
    }
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2">
       <div className="flex items-center justify-center py-12 min-h-[80vh] bg-background">
        <div className="mx-auto grid w-[380px] gap-6 p-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Log in to your Account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to access your dashboard.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="ml-auto inline-block text-sm underline text-primary">
                        Forgot your password?
                    </Link>
                </div>
              <Input id="password" type="password" required />
            </div>
            <Button onClick={handleLogin} className="w-full mt-2 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-primary-foreground font-semibold">
              Log In
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-gradient-to-br from-primary via-blue-800 to-purple-800 lg:flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
            <div className="mb-10 self-start">
              <Link href="/" className="flex items-center space-x-2">
                <Logo className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold font-headline text-white">CuraAI</span>
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter font-headline mb-4 text-white">
              Welcome Back to CuraAI ✨
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Access your personalized medical insights and continue your learning journey.
            </p>
            <ul className="space-y-6 text-left text-white">
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI-Powered Learning</h3>
                  <p className="text-white/70 text-sm">Simplify complex topics with AI-driven, step-by-step explanations.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <ScanLine className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Smart Image Analysis</h3>
                  <p className="text-white/70 text-sm">Get instant answers from images of questions or medicine boxes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Human-like AI Doctor</h3>
                  <p className="text-white/70 text-sm">Consult our AI about symptoms in a natural, conversational way.</p>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  );
}
