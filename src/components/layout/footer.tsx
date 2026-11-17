'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { useState, useEffect } from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const pathname = usePathname();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    return null;
  }


  return (
    <footer className="border-t bg-muted">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">CuraAI</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your Medical AI Companion. Simplifying learning, consultation, and analysis.
            </p>
             <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
               <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Legal Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faqs"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
               <li>
                <Link
                  href="/refund-policy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
               <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Get in Touch</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with the latest in AI healthcare.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1"/>
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {year} CuraAI. All rights reserved. Powered by Gepard Tech & Sultan Pharma.
        </div>
      </div>
    </footer>
  );
}
