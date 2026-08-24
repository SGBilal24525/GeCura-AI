import LegalLayout from '@/components/legal-layout';
import LastUpdated from '@/components/last-updated';

const toc = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'monthly-yearly-plans', label: '2. Monthly & Yearly Plans' },
  { id: 'lifetime-plan', label: '3. Lifetime Plan' },
  { id: 'how-to-request-refund', label: '4. How to Request a Refund' },
  { id: 'processing', label: '5. Refund Processing' },
];

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" tableOfContents={toc}>
      <div className="space-y-8">
        <LastUpdated />
        <section id="introduction">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            At CuraAI, we want our customers to be satisfied with our services. This Refund Policy outlines the terms and conditions under which refunds will be provided. By subscribing to our services, you agree to this Refund Policy.
          </p>
        </section>
        <section id="monthly-yearly-plans">
          <h2 className="text-2xl font-bold mb-4">2. Monthly & Yearly Subscriptions</h2>
          <p>
            For our monthly and yearly subscription plans (Standard and Premium), we do not offer prorated refunds. You may cancel your subscription at any time through your account dashboard.
          </p>
          <p className="mt-2">
            When you cancel, your subscription will remain active until the end of your current paid billing period. You will not be charged for the next billing cycle. No refunds will be issued for the period you have already paid for.
          </p>
        </section>
        <section id="lifetime-plan">
          <h2 className="text-2xl font-bold mb-4">3. Lifetime Plan</h2>
          <p>
            For our Exclusive Lifetime Limited Offer, we provide a 30-day money-back guarantee. If you are not satisfied with the Lifetime plan for any reason, you may request a full refund within 30 days of your original purchase date.
          </p>
          <p className="mt-2">
            After the 30-day period has expired, no refunds will be issued for the Lifetime plan.
          </p>
        </section>
        <section id="how-to-request-refund">
          <h2 className="text-2xl font-bold mb-4">4. How to Request a Refund</h2>
          <p>
            To request a refund for the Lifetime plan within the 30-day window, please contact our support team via the contact form on our website or by emailing support@curaai.com. Please include your account email and the reason for your request.
          </p>
        </section>
        <section id="processing">
          <h2 className="text-2xl font-bold mb-4">5. Refund Processing</h2>
          <p>
            Once we receive your refund request and confirm your eligibility, we will process the refund. The refund will be credited back to your original method of payment within 5-10 business days.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
