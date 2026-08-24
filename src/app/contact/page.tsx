import Faq from '@/components/faq';
import { Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { ContactForm } from './contact-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqItems = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by going to the login page and clicking on the "Forgot Password" link. You will receive an email with instructions on how to reset it.',
  },
  {
    question: 'How do I upgrade my plan?',
    answer: 'You can upgrade your plan at any time from your account dashboard. Simply select the plan you wish to upgrade to and follow the payment instructions.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer refunds based on our refund policy. For our Lifetime plans, we offer a 30-day money-back guarantee. Please check our Refund Policy page for more details.',
  },
  {
    question: 'How can I get technical support?',
    answer: 'The best way to get technical support is by using the contact form on this page. Our team will get back to you as soon as possible. Premium users get priority support.',
  },
  {
    question: 'Do you offer custom enterprise plans?',
    answer: 'Yes, we do. Please get in touch with us through the contact form, mentioning "Enterprise Inquiry" in your message, and our sales team will reach out to you.',
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Have questions, need support, or want to partner with us? We&apos;d love to hear from you.
          </p>
          <Button asChild className="mt-8">
              <Link href="/signup">Start for Free</Link>
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-5 max-w-6xl mx-auto">
              <Card className="lg:col-span-3 p-6 md:p-8 bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                 <h2 className="text-2xl font-bold tracking-tighter mb-1 font-headline">Send us a Message</h2>
                 <p className="text-muted-foreground mb-6">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                <ContactForm />
              </Card>
              <div className="lg:col-span-2 space-y-8">
                <Card className="p-6 bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <h3 className="text-xl font-bold tracking-tighter font-headline mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-base">Email</h4>
                          <a href="mailto:support@curaai.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                            support@curaai.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-base">Address</h4>
                          <p className="text-muted-foreground text-sm">123 Health-Tech Avenue, MedCity.</p>
                        </div>
                      </div>
                    </div>
                </Card>
                <Card className="p-6 bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <h3 className="text-xl font-bold tracking-tighter font-headline mb-4">Follow Us</h3>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="#" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </Button>
                         <Button variant="outline" size="icon" asChild>
                            <Link href="#" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </Button>
                         <Button variant="outline" size="icon" asChild>
                            <Link href="#" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </Card>
              </div>
            </div>
          </div>
      </section>
      
      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
             <div className="text-center mb-12 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                  Quick Answers
                </h2>
                 <p className="mt-3 text-muted-foreground md:text-lg">
                  Find answers to common questions below.
                </p>
              </div>
            <Faq title="" items={faqItems} />
          </div>
      </section>
    </main>
  );
}
