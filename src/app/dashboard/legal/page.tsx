'use client';

import {
  Card
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale } from 'lucide-react';
import { ReactNode } from 'react';

// Data for legal documents
const legalDocuments = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: [
      {
        heading: '1. Introduction',
        body: 'CuraAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the service.',
      },
      {
        heading: '2. Information We Collect',
        body: (
          <>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Service
              includes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping
                address, email address, and telephone number, that you voluntarily give to us when you register with the
                Service or when you choose to participate in various activities related to the Service.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the
                Service, such as your IP address, your browser type, your operating system, your access times, and the
                pages you have viewed directly before and after accessing the Service.
              </li>
              <li>
                <strong>User Content:</strong> Questions, images, and chat logs you provide to our AI features are
                processed to provide the service. We may store this data anonymously to improve our AI models.
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: '3. How We Use Your Information',
        body: (
          <>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized
              experience. Specifically, we may use information collected about you via the Service to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Create and manage your account.</li>
              <li>Provide you with our AI-powered services.</li>
              <li>Email you regarding your account or order.</li>
              <li>Improve our website and AI models.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
            </ul>
          </>
        ),
      },
       {
        heading: '4. Data Sharing and Disclosure',
        body: 'We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., payment processing).',
      },
      {
        heading: '5. Data Security',
        body: 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.',
      },
      {
        heading: '6. Your Rights',
        body: 'You have the right to access, correct, or delete your personal data. You can manage your account information by logging into your account settings or by contacting us directly.',
      },
      {
        heading: '7. Changes to This Policy',
        body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.',
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    content: [
        {
            heading: '1. Agreement to Terms',
            body: 'By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. We may modify the terms at any time, and such modifications will be effective immediately upon posting.',
        },
        {
            heading: '2. User Accounts',
            body: 'To access certain features of our platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.',
        },
        {
            heading: '3. Prohibited Activities',
            body: (
                <>
                    <p>You agree not to engage in any of the following prohibited activities:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Using the service for any illegal purpose or in violation of any local, state, national, or international law.</li>
                        <li>Violating or encouraging others to violate the rights of third parties, including intellectual property rights.</li>
                        <li>Posting, uploading, or distributing any content that is unlawful, defamatory, libelous, inaccurate, or that a reasonable person could deem to be objectionable, profane, indecent, pornographic, harassing, threatening, hateful, or otherwise inappropriate.</li>
                        <li>Interfering with the security-related features of the service.</li>
                    </ul>
                </>
            ),
        },
        {
            heading: '4. Intellectual Property',
            body: 'The service and its original content, features, and functionality are and will remain the exclusive property of CuraAI and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CuraAI.',
        },
        {
            heading: '5. Disclaimer of Warranties',
            body: 'The service is provided "as is" and "as available" without any warranties of any kind, either express or implied. CuraAI does not warrant that the service will be uninterrupted, secure, or free from errors or omissions. Please refer to our main Disclaimer for information about medical content.',
        },
        {
            heading: '6. Limitation of Liability',
            body: 'In no event shall CuraAI, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our service.',
        },
        {
            heading: '7. Governing Law',
            body: 'These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.',
        },
    ]
  },
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    content: [
       {
        heading: '1. Introduction',
        body: 'At CuraAI, we want our customers to be satisfied with our services. This Refund Policy outlines the terms and conditions under which refunds will be provided. By subscribing to our services, you agree to this Refund Policy.',
      },
      {
        heading: '2. Monthly & Yearly Subscriptions',
        body: 'For our monthly and yearly subscription plans (Standard and Premium), we do not offer prorated refunds. You may cancel your subscription at any time through your account dashboard. When you cancel, your subscription will remain active until the end of your current paid billing period. You will not be charged for the next billing cycle. No refunds will be issued for the period you have already paid for.',
      },
      {
        heading: '3. Lifetime Plan',
        body: 'For our Exclusive Lifetime Limited Offer, we provide a 30-day money-back guarantee. If you are not satisfied with the Lifetime plan for any reason, you may request a full refund within 30 days of your original purchase date. After the 30-day period has expired, no refunds will be issued for the Lifetime plan.',
      },
      {
        heading: '4. How to Request a Refund',
        body: 'To request a refund for the Lifetime plan within the 30-day window, please contact our support team via the contact form on our website or by emailing support@curaai.com. Please include your account email and the reason for your request.',
      },
      {
        heading: '5. Refund Processing',
        body: 'Once we receive your refund request and confirm your eligibility, we will process the refund. The refund will be credited back to your original method of payment within 5-10 business days.',
      },
    ]
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    content: [
         {
            heading: '1. Introduction',
            body: 'Welcome to CuraAI. This disclaimer governs your use of our website and services. By using our platform, you accept this disclaimer in full. If you disagree with any part of this disclaimer, you must not use our services.',
        },
        {
            heading: '2. No Medical Advice',
            body: 'The information provided by CuraAI, including text, graphics, images, and other material, is for informational purposes only and does not constitute medical advice. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the CuraAI platform. If you think you may have a medical emergency, call your doctor or emergency services immediately.',
        },
        {
            heading: '3. No Professional Relationship',
            body: 'Your use of the CuraAI platform and its content does not create a doctor-patient, therapist-patient, or other healthcare professional relationship between you and CuraAI or its affiliates. The platform is designed to provide educational and informational support and is not a substitute for professional healthcare.',
        },
        {
            heading: '4. Accuracy of Information',
            body: 'While we strive to provide accurate and up-to-date information, CuraAI makes no warranties or representations as to the accuracy, completeness, or reliability of any information provided. The medical field is constantly evolving, and information that was accurate at the time of publication may become outdated. We rely on AI models which may produce inaccurate information.',
        },
        {
            heading: '5. External Links',
            body: 'Our service may contain links to external websites that are not provided or maintained by or in any way affiliated with CuraAI. Please note that CuraAI does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.',
        },
        {
            heading: '6. Limitation of Liability',
            body: 'In no event shall CuraAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.',
        },
    ]
  }
];

interface LegalDocumentProps {
    title: string;
    content: { heading: string; body: ReactNode }[];
}

const LegalDocumentDisplay = ({ title, content }: LegalDocumentProps) => (
    <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6 font-headline">{title}</h2>
        <div className="space-y-8">
            {content.map((section, index) => (
                <section key={index}>
                    <h3 className="text-xl font-semibold mb-2 font-headline">{section.heading}</h3>
                    <div>{section.body}</div>
                </section>
            ))}
        </div>
    </div>
);


export default function LegalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <Scale /> Legal
        </h1>
        <p className="text-muted-foreground">
          All our policies and disclaimers in one place.
        </p>
      </div>

      <Card>
        <Tabs defaultValue="privacy-policy" orientation="vertical">
            <div className="grid md:grid-cols-4 lg:grid-cols-5">
                <TabsList className="md:col-span-1 lg:col-span-1 border-r flex-col items-stretch h-full bg-transparent p-4 gap-1">
                    {legalDocuments.map(doc => (
                        <TabsTrigger key={doc.slug} value={doc.slug} className="justify-start text-base data-[state=active]:bg-muted data-[state=active]:text-primary data-[state=active]:font-semibold">
                            {doc.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="md:col-span-3 lg:col-span-4">
                    {legalDocuments.map(doc => (
                        <TabsContent key={doc.slug} value={doc.slug} className="mt-0">
                            <ScrollArea className="h-[70vh]">
                                <div className="p-6">
                                    <LegalDocumentDisplay title={doc.title} content={doc.content} />
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    ))}
                </div>
            </div>
        </Tabs>
      </Card>
    </div>
  );
}
