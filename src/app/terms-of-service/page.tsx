import LegalLayout from '@/components/legal-layout';
import LastUpdated from '@/components/last-updated';

const toc = [
  { id: 'agreement', label: '1. Agreement to Terms' },
  { id: 'user-accounts', label: '2. User Accounts' },
  { id: 'prohibited-activities', label: '3. Prohibited Activities' },
  { id: 'intellectual-property', label: '4. Intellectual Property' },
  { id: 'disclaimer-of-warranties', label: '5. Disclaimer of Warranties' },
  { id: 'limitation-of-liability', label: '6. Limitation of Liability' },
  { id: 'governing-law', label: '7. Governing Law' },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" tableOfContents={toc}>
      <div className="space-y-8">
        <LastUpdated />
        <section id="agreement">
          <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
          <p>
            By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. We may modify the terms at any time, and such modifications will be effective immediately upon posting.
          </p>
        </section>
        <section id="user-accounts">
          <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
          <p>
            To access certain features of our platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
          </p>
        </section>
        <section id="prohibited-activities">
          <h2 className="text-2xl font-bold mb-4">3. Prohibited Activities</h2>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Using the service for any illegal purpose or in violation of any local, state, national, or international law.</li>
            <li>Violating or encouraging others to violate the rights of third parties, including intellectual property rights.</li>
            <li>Posting, uploading, or distributing any content that is unlawful, defamatory, libelous, inaccurate, or that a reasonable person could deem to be objectionable, profane, indecent, pornographic, harassing, threatening, hateful, or otherwise inappropriate.</li>
            <li>Interfering with the security-related features of the service.</li>
          </ul>
        </section>
        <section id="intellectual-property">
          <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are and will remain the exclusive property of CuraAI and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CuraAI.
          </p>
        </section>
        <section id="disclaimer-of-warranties">
          <h2 className="text-2xl font-bold mb-4">5. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" and "as available" without any warranties of any kind, either express or implied. CuraAI does not warrant that the service will be uninterrupted, secure, or free from errors or omissions. Please refer to our main Disclaimer for information about medical content.
          </p>
        </section>
        <section id="limitation-of-liability">
          <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
          <p>
            In no event shall CuraAI, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our service.
          </p>
        </section>
        <section id="governing-law">
          <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
