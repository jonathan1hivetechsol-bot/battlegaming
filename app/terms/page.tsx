import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - BattleGaming | battlegaming.store',
  description: 'Read the Terms of Service for BattleGaming account marketplace.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d071a] via-[#1a1a3e] to-[#0d071a]">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Terms of <span className="text-[#FF7828]">Service</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Last updated: May 6, 2026 | Effective for battlegaming.store
        </p>
      </div>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-8 text-gray-300">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Agreement to Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using battlegaming.store (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. BattleGaming ("we," "us," "our," "Company") reserves the right to make changes to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Terms of Service.
            </p>
          </section>

          {/* User Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> User Eligibility
            </h2>
            <p className="leading-relaxed mb-3">To use BattleGaming, you must:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Be at least 18 years old or legal age of majority in your jurisdiction</li>
              <li>Have legal capacity to enter into binding agreements</li>
              <li>Provide accurate, complete, and current information</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Agree to comply with all applicable laws and regulations</li>
            </ul>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Account Registration
            </h2>
            <div className="space-y-3">
              <p className="leading-relaxed">
                <strong className="text-white">Username & Password:</strong> You are responsible for maintaining the confidentiality of your account credentials and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Account Security:</strong> You agree to notify BattleGaming immediately of any unauthorized use of your account or any other breaches of security.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Account Termination:</strong> BattleGaming reserves the right to terminate your account for violation of these Terms of Service or for any reason without notice.
              </p>
            </div>
          </section>

          {/* Product Description */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Product & Service Description
            </h2>
            <p className="leading-relaxed mb-3">
              BattleGaming provides verified Call of Duty gaming accounts across multiple platforms and regions. Our products include:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>Verified gaming accounts with specific win counts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>Account access credentials and setup assistance</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>24/7 customer support and account management</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>Lifetime warranty and account protection</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>Instant delivery and rapid account transfer</span>
              </li>
            </ul>
          </section>

          {/* Pricing & Payment */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Pricing & Payment
            </h2>
            <div className="space-y-3">
              <p className="leading-relaxed">
                <strong className="text-white">Prices:</strong> All prices are listed in USD and subject to change without notice. We reserve the right to modify prices at any time.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Payment Methods:</strong> We accept credit cards, debit cards, PayPal, and other payment methods at checkout. All payments are processed securely through PCI-DSS compliant processors.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Tax:</strong> You are responsible for paying any applicable sales tax or VAT on your purchase, depending on your location.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Billing:</strong> By providing a payment method, you authorize BattleGaming to charge that method for any purchases made.
              </p>
            </div>
          </section>

          {/* Refund & Money-Back Guarantee */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Refund Policy
            </h2>
            <div className="space-y-3">
              <p className="leading-relaxed">
                <strong className="text-white">30-Day Money-Back Guarantee:</strong> If you are not satisfied with your account purchase within 30 days, we offer a full refund of your purchase price.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Refund Eligibility:</strong> Refunds are available for accounts that have not been modified, transferred, or compromised. You must contact support within 30 days of purchase.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Dispute Resolution:</strong> If you believe you were charged incorrectly, contact us at support@battlegaming.store within 60 days of the charge.
              </p>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> User Conduct
            </h2>
            <p className="leading-relaxed mb-3">You agree NOT to:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-red-500">✗</span> <span>Use the Service for any illegal purpose or in violation of any laws</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">✗</span> <span>Attempt to gain unauthorized access to the Service or systems</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">✗</span> <span>Share account credentials with unauthorized parties</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">✗</span> <span>Engage in harassment, abuse, or discriminatory conduct</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">✗</span> <span>Interfere with or disrupt the Service or its infrastructure</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">✗</span> <span>Fraudulently represent yourself or use another's identity</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500">✗</span> <span>Resell or redistribute BattleGaming accounts without authorization</span>
              </li>
            </ul>
          </section>

          {/* Account Terms & Responsibility */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Account Terms & Responsibility
            </h2>
            <p className="leading-relaxed mb-3">
              <strong className="text-white">Account Responsibility:</strong> Once you receive access to your account, you assume full responsibility for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Protecting your account credentials and keeping them confidential</li>
              <li>All activities conducted through your account</li>
              <li>Complying with the game publisher's Terms of Service</li>
              <li>Maintaining account security and reporting suspicious activity</li>
              <li>Any modifications you make to the account after purchase</li>
            </ul>
          </section>

          {/* Warranty Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Warranty & Liability
            </h2>
            <div className="space-y-3">
              <p className="leading-relaxed">
                <strong className="text-white">Lifetime Warranty:</strong> BattleGaming warrants that all accounts are verified and safe for use. If your account is banned due to our fault, we will replace it at no additional cost.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Limitation of Liability:</strong> BattleGaming shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including loss of data or profits.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Game Publisher Not Responsible:</strong> BattleGaming is an independent third-party service. Activision, Microsoft, and Sony are not affiliates of BattleGaming and do not endorse this service.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content on BattleGaming, including text, graphics, logos, and images, is owned by BattleGaming or its licensors and protected by copyright law. Call of Duty, Activision, and related marks are trademarks of their respective owners. You may not reproduce, distribute, or transmit any content without express written permission.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Governing Law & Dispute Resolution
            </h2>
            <div className="space-y-3">
              <p className="leading-relaxed">
                <strong className="text-white">Governing Law:</strong> These Terms of Service are governed by and construed in accordance with the laws of the United States and applicable international laws.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Dispute Resolution:</strong> Any disputes shall be resolved through binding arbitration rather than litigation, except as required by law.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Regional Compliance:</strong> These terms comply with USA and UK consumer protection regulations for our primary markets.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e] p-6 rounded-lg border border-[#FF7828]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">✉</span> Contact & Support
            </h2>
            <p className="leading-relaxed mb-4">
              If you have questions about these Terms of Service:
            </p>
            <div className="space-y-2">
              <p><strong className="text-white">Support Email:</strong> <a href="mailto:support@battlegaming.store" className="text-[#FF7828] hover:text-white transition-colors">support@battlegaming.store</a></p>
              <p><strong className="text-white">Legal Inquiries:</strong> <a href="mailto:legal@battlegaming.store" className="text-[#FF7828] hover:text-white transition-colors">legal@battlegaming.store</a></p>
              <p><strong className="text-white">Website:</strong> battlegaming.store</p>
              <p><strong className="text-white">Availability:</strong> 24/7 Support Team</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
