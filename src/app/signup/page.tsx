import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';
import { BookOpen, ScanLine, Stethoscope } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="hidden bg-gradient-to-br from-primary via-blue-800 to-purple-800 text-white lg:flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
            <div className="mb-10 self-start">
              <Link href="/" className="flex items-center space-x-2">
                <Logo className="h-8 w-8" />
                <span className="text-2xl font-bold font-headline text-white">CuraAI</span>
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter font-headline mb-4 text-white">
              Join CuraAI Today ✨
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Unlock the full power of AI-driven medical insights.
            </p>
            <ul className="space-y-6 text-left text-white">
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI-Powered Learning</h3>
                  <p className="text-white/70 text-sm">Simplify complex topics with AI-driven, step-by-step explanations.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <ScanLine className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Smart Image Analysis</h3>
                  <p className="text-white/70 text-sm">Get instant answers from images of questions or medicine boxes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Human-like AI Doctor</h3>
                  <p className="text-white/70 text-sm">Consult our AI about symptoms in a natural, conversational way.</p>
                </div>
              </li>
            </ul>
        </div>
      </div>
      <div className="flex items-center justify-center py-12 min-h-[80vh] bg-background">
        <div className="mx-auto grid w-[380px] gap-6 p-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Create an Account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create your account.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-primary-foreground font-semibold">
              Create Account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
