import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - BattleGaming | battlegaming.store',
  description: 'Learn how BattleGaming protects your personal data and privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d071a] via-[#1a1a3e] to-[#0d071a]">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Privacy <span className="text-[#FF7828]">Policy</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Last updated: May 6, 2026 | Effective for battlegaming.store
        </p>
      </div>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-8 text-gray-300">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Introduction
            </h2>
            <p className="leading-relaxed">
              BattleGaming ("we," "us," "our," or "Company") operates the battlegaming.store website (the "Site"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Email address</li>
                  <li>Username and password</li>
                  <li>Payment information (credit card, PayPal)</li>
                  <li>Shipping and billing address</li>
                  <li>Phone number (optional)</li>
                  <li>Account gaming username and ID</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent</li>
                  <li>Device information (OS, resolution)</li>
                  <li>Cookies and tracking data</li>
                  <li>Geographic location (approximate)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> How We Use Your Information
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">✓</span>
                <span>Process account transactions and deliver purchased gaming accounts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">✓</span>
                <span>Provide customer support and respond to inquiries</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">✓</span>
                <span>Send transactional emails (order confirmation, delivery status)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">✓</span>
                <span>Improve and personalize our Site and services</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">✓</span>
                <span>Prevent fraud and ensure account security</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">✓</span>
                <span>Comply with legal obligations and law enforcement requests</span>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Data Security
            </h2>
            <p className="leading-relaxed mb-3">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-[#FF7828]">🔒</span> SSL/TLS encryption for all data transmission
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">🔒</span> Secure password hashing and storage
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">🔒</span> Regular security audits and penetration testing
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">🔒</span> Limited employee access to personal data
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">🔒</span> Compliance with Supabase security standards
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Cookies
            </h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences. You can control cookies through your browser settings. See our <a href="/cookies" className="text-[#FF7828] hover:text-white transition-colors">Cookie Policy</a> for details.
            </p>
          </section>

          {/* Sharing Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Sharing Your Information
            </h2>
            <p className="leading-relaxed mb-3">We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Payment processors (Stripe, PayPal) for transaction processing</li>
              <li>Hosting providers (Vercel, Supabase) for platform operation</li>
              <li>Law enforcement when legally required</li>
              <li>Third parties with your explicit consent</li>
            </ul>
            <p className="leading-relaxed mt-3">
              We do not sell or rent your personal information to third parties for marketing purposes.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Your Rights
            </h2>
            <p className="leading-relaxed mb-3">Depending on your location, you may have rights including:</p>
            <ul className="space-y-2 ml-4">
              <li>🎯 Right to access your personal data</li>
              <li>🎯 Right to request correction or deletion</li>
              <li>🎯 Right to opt-out of marketing communications</li>
              <li>🎯 Right to data portability (export your data)</li>
              <li>🎯 Right to withdraw consent</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise these rights, contact us at <a href="mailto:privacy@battlegaming.store" className="text-[#FF7828] hover:text-white transition-colors">privacy@battlegaming.store</a>
            </p>
          </section>

          {/* Regional Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Regional Compliance
            </h2>
            <div className="space-y-3">
              <p><strong className="text-white">GDPR (EU & UK):</strong> We comply with the General Data Protection Regulation for UK and EU customers.</p>
              <p><strong className="text-white">CCPA (California):</strong> We comply with the California Consumer Privacy Act for US customers.</p>
              <p><strong className="text-white">Regional Data Protection:</strong> We respect all applicable data protection laws in USA, UK, and other jurisdictions.</p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically. Changes become effective when posted to battlegaming.store. Continued use of the Site constitutes acceptance of updated terms.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e] p-6 rounded-lg border border-[#FF7828]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">✉</span> Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy or our privacy practices:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@battlegaming.store" className="text-[#FF7828] hover:text-white transition-colors">privacy@battlegaming.store</a></p>
              <p><strong className="text-white">Website:</strong> battlegaming.store</p>
              <p><strong className="text-white">Business Hours:</strong> 24/7 Support Available</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
