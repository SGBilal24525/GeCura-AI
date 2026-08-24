import LegalLayout from '@/components/legal-layout';
import LastUpdated from '@/components/last-updated';

const toc = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'information-we-collect', label: '2. Information We Collect' },
  { id: 'how-we-use-information', label: '3. How We Use Your Information' },
  { id: 'data-sharing', label: '4. Data Sharing and Disclosure' },
  { id: 'data-security', label: '5. Data Security' },
  { id: 'your-rights', label: '6. Your Rights' },
  { id: 'changes-to-policy', label: '7. Changes to This Policy' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" tableOfContents={toc}>
      <div className="space-y-8">
        <LastUpdated />
        <section id="introduction">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            CuraAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the service.
          </p>
        </section>
        <section id="information-we-collect">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Service or when you choose to participate in various activities related to the Service.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Service.</li>
            <li><strong>User Content:</strong> Questions, images, and chat logs you provide to our AI features are processed to provide the service. We may store this data anonymously to improve our AI models.</li>
          </ul>
        </section>
        <section id="how-we-use-information">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Create and manage your account.</li>
            <li>Provide you with our AI-powered services.</li>
            <li>Email you regarding your account or order.</li>
            <li>Improve our website and AI models.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
          </ul>
        </section>
        <section id="data-sharing">
          <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
          <p>
            We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., payment processing).
          </p>
        </section>
        <section id="data-security">
          <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </section>
        <section id="your-rights">
          <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. You can manage your account information by logging into your account settings or by contacting us directly.
          </p>
        </section>
        <section id="changes-to-policy">
          <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
