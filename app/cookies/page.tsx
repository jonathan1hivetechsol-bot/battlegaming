import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - BattleGaming | battlegaming.store',
  description: 'Learn about cookies and tracking technologies used on BattleGaming.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d071a] via-[#1a1a3e] to-[#0d071a]">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Cookie <span className="text-[#FF7828]">Policy</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Last updated: May 6, 2026 | Effective for battlegaming.store
        </p>
      </div>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-8 text-gray-300">
          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> What Are Cookies?
            </h2>
            <p className="leading-relaxed">
              Cookies are small text files that are stored on your computer, mobile device, or browser when you visit a website. They allow websites to remember your preferences, login information, and browsing behavior. Cookies are essential for modern web functionality and help improve user experience.
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Types of Cookies We Use
            </h2>
            <div className="space-y-4">
              <div className="bg-[#1a1a3e] p-4 rounded-lg border border-[#FF7828]/20">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#FF7828]">1.</span> Essential Cookies
                </h3>
                <p className="leading-relaxed text-sm">
                  These cookies are necessary for the website to function properly. They enable basic functionality such as page navigation, secure login, and access to secure areas of the website.
                </p>
              </div>

              <div className="bg-[#1a1a3e] p-4 rounded-lg border border-[#FF7828]/20">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#FF7828]">2.</span> Performance Cookies
                </h3>
                <p className="leading-relaxed text-sm">
                  These cookies collect information about how visitors use our website, such as pages visited and error messages received. They help us understand how visitors interact with BattleGaming to improve performance and user experience.
                </p>
              </div>

              <div className="bg-[#1a1a3e] p-4 rounded-lg border border-[#FF7828]/20">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#FF7828]">3.</span> Functional Cookies
                </h3>
                <p className="leading-relaxed text-sm">
                  These cookies enable personalized functionality such as remembering your username, preferred language, account settings, and shopping cart contents.
                </p>
              </div>

              <div className="bg-[#1a1a3e] p-4 rounded-lg border border-[#FF7828]/20">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#FF7828]">4.</span> Marketing Cookies
                </h3>
                <p className="leading-relaxed text-sm">
                  These cookies track your browsing behavior and preferences to display targeted advertisements. They are used by third-party advertising networks to show relevant ads across different websites.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie List */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Cookies We Use
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#FF7828]/30">
                    <th className="text-left py-3 px-2 text-white font-semibold">Cookie Name</th>
                    <th className="text-left py-3 px-2 text-white font-semibold">Type</th>
                    <th className="text-left py-3 px-2 text-white font-semibold">Purpose</th>
                    <th className="text-left py-3 px-2 text-white font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#FF7828]/10">
                    <td className="py-3 px-2">session_id</td>
                    <td className="py-3 px-2"><span className="text-[#FF7828]">Essential</span></td>
                    <td className="py-3 px-2">Maintain user session</td>
                    <td className="py-3 px-2">Session</td>
                  </tr>
                  <tr className="border-b border-[#FF7828]/10">
                    <td className="py-3 px-2">auth_token</td>
                    <td className="py-3 px-2"><span className="text-[#FF7828]">Essential</span></td>
                    <td className="py-3 px-2">User authentication</td>
                    <td className="py-3 px-2">30 days</td>
                  </tr>
                  <tr className="border-b border-[#FF7828]/10">
                    <td className="py-3 px-2">user_preferences</td>
                    <td className="py-3 px-2"><span className="text-[#FF7828]">Functional</span></td>
                    <td className="py-3 px-2">Remember user settings</td>
                    <td className="py-3 px-2">1 year</td>
                  </tr>
                  <tr className="border-b border-[#FF7828]/10">
                    <td className="py-3 px-2">ga_tracking</td>
                    <td className="py-3 px-2"><span className="text-[#FF7828]">Performance</span></td>
                    <td className="py-3 px-2">Analytics tracking</td>
                    <td className="py-3 px-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">marketing_id</td>
                    <td className="py-3 px-2"><span className="text-[#FF7828]">Marketing</span></td>
                    <td className="py-3 px-2">Targeted advertising</td>
                    <td className="py-3 px-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Third-Party Cookies
            </h2>
            <p className="leading-relaxed mb-4">
              We use third-party services that may set their own cookies on your device:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">•</span>
                <span><strong className="text-white">Google Analytics:</strong> Analyzes website traffic and user behavior</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">•</span>
                <span><strong className="text-white">Stripe Payment:</strong> Processes payment transactions securely</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">•</span>
                <span><strong className="text-white">Vercel Analytics:</strong> Monitors site performance and uptime</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF7828] font-bold">•</span>
                <span><strong className="text-white">Facebook Pixel:</strong> Tracks conversions and user interactions</span>
              </li>
            </ul>
          </section>

          {/* How to Control Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> How to Control Cookies
            </h2>
            <p className="leading-relaxed mb-4">
              You have full control over cookies on your browser. Here's how to manage them:
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="text-white font-semibold mb-2">🌐 Browser Settings</h3>
                <p className="leading-relaxed text-sm">
                  You can set your browser to refuse all cookies or to alert you when a cookie is being sent. Note that disabling essential cookies may prevent the website from functioning properly.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">⚙️ Common Browsers</h3>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  <li><strong className="text-[#FF7828]">Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong className="text-[#FF7828]">Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
                  <li><strong className="text-[#FF7828]">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong className="text-[#FF7828]">Edge:</strong> Settings → Privacy and Security → Cookies and other site permissions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">🛑 Opt-Out of Tracking</h3>
                <p className="leading-relaxed text-sm">
                  Visit <a href="https://optout.aboutads.info/" className="text-[#FF7828] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">aboutads.info</a> or <a href="https://optout.networkadvertising.org/" className="text-[#FF7828] hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">networkadvertising.org</a> to opt-out of behavioral advertising.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Consent */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Cookie Consent
            </h2>
            <p className="leading-relaxed mb-3">
              When you first visit BattleGaming, you will be presented with a cookie consent banner. This banner allows you to:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>Accept all cookies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>Reject non-essential cookies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>Customize cookie preferences</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF7828]">✓</span> <span>Withdraw consent at any time</span>
              </li>
            </ul>
          </section>

          {/* GDPR & CCPA Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Legal Compliance
            </h2>
            <div className="space-y-3">
              <p className="leading-relaxed">
                <strong className="text-white">GDPR (EU & UK):</strong> We comply with GDPR requirements by obtaining explicit consent for non-essential cookies before storing them on EU and UK users' devices.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">CCPA (California):</strong> California residents have the right to know what cookies are being used and can opt-out of cookie-based tracking for targeted advertising.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">ePrivacy Directive:</strong> We comply with the ePrivacy Directive by providing transparent information about cookies and obtaining user consent.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">►</span> Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Cookie Policy periodically to reflect changes in technology or legal requirements. When updates are made, we will notify you by updating the "Last updated" date above. Your continued use of BattleGaming constitutes acceptance of any changes.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e] p-6 rounded-lg border border-[#FF7828]/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF7828]">✉</span> Questions About Cookies?
            </h2>
            <p className="leading-relaxed mb-4">
              If you have questions about our use of cookies or this Cookie Policy:
            </p>
            <div className="space-y-2">
              <p><strong className="text-white">Privacy Email:</strong> <a href="mailto:privacy@battlegaming.store" className="text-[#FF7828] hover:text-white transition-colors">privacy@battlegaming.store</a></p>
              <p><strong className="text-white">Support Email:</strong> <a href="mailto:support@battlegaming.store" className="text-[#FF7828] hover:text-white transition-colors">support@battlegaming.store</a></p>
              <p><strong className="text-white">Website:</strong> battlegaming.store</p>
              <p><strong className="text-white">Support Hours:</strong> 24/7 Available</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
