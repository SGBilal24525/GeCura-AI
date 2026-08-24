import LegalLayout from '@/components/legal-layout';

const toc = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'no-medical-advice', label: '2. No Medical Advice' },
  { id: 'no-professional-relationship', label: '3. No Professional Relationship' },
  { id: 'accuracy-of-information', label: '4. Accuracy of Information' },
  { id: 'external-links', label: '5. External Links' },
  { id: 'limitation-of-liability', label: '6. Limitation of Liability' },
];

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" tableOfContents={toc}>
      <div className="space-y-8">
        <section id="introduction">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            Welcome to CuraAI. This disclaimer governs your use of our website and services. By using our platform, you accept this disclaimer in full. If you disagree with any part of this disclaimer, you must not use our services.
          </p>
        </section>
        <section id="no-medical-advice">
          <h2 className="text-2xl font-bold mb-4">2. No Medical Advice</h2>
          <p>
            The information provided by CuraAI, including text, graphics, images, and other material, is for informational purposes only and does not constitute medical advice. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p className="mt-2">
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the CuraAI platform.
          </p>
          <p className="mt-2 font-semibold">
            If you think you may have a medical emergency, call your doctor or emergency services immediately.
          </p>
        </section>
        <section id="no-professional-relationship">
          <h2 className="text-2xl font-bold mb-4">3. No Professional Relationship</h2>
          <p>
            Your use of the CuraAI platform and its content does not create a doctor-patient, therapist-patient, or other healthcare professional relationship between you and CuraAI or its affiliates. The platform is designed to provide educational and informational support and is not a substitute for professional healthcare.
          </p>
        </section>
        <section id="accuracy-of-information">
          <h2 className="text-2xl font-bold mb-4">4. Accuracy of Information</h2>
          <p>
            While we strive to provide accurate and up-to-date information, CuraAI makes no warranties or representations as to the accuracy, completeness, or reliability of any information provided. The medical field is constantly evolving, and information that was accurate at the time of publication may become outdated. We rely on AI models which may produce inaccurate information.
          </p>
        </section>
        <section id="external-links">
          <h2 className="text-2xl font-bold mb-4">5. External Links</h2>
          <p>
            Our service may contain links to external websites that are not provided or maintained by or in any way affiliated with CuraAI. Please note that CuraAI does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>
        </section>
        <section id="limitation-of-liability">
          <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
          <p>
            In no event shall CuraAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
