import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | BattleGaming - 30-Day Money-Back Guarantee',
  description: 'BattleGaming Refund Policy. 30-day satisfaction guarantee on all premium Call of Duty accounts. Fast, hassle-free refunds guaranteed.',
  keywords: 'refund policy, money-back guarantee, satisfaction guarantee, returns',
  openGraph: {
    title: 'Refund Policy | BattleGaming',
    description: '30-day satisfaction guarantee with full refunds on all account purchases.',
    url: 'https://battlegaming.store/refund',
    type: 'website',
  },
  alternates: {
    canonical: 'https://battlegaming.store/refund',
  },
};

export default function RefundPolicy() {
  return (
    <div className="bg-[#0d071a] min-h-screen text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-8 text-[#FF7828] drop-shadow-[0_0_20px_rgba(255,120,40,0.5)]">
          Refund Policy
        </h1>

        <div className="space-y-8 text-gray-300">
          {/* Overview */}
          <section>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">30-Day Satisfaction Guarantee</h2>
            <p className="leading-relaxed">
              At BattleGaming, we stand behind the quality of our premium verified Call of Duty accounts. We offer a <strong>100% money-back guarantee within 30 days</strong> of purchase if you're not completely satisfied with your account.
            </p>
          </section>

          {/* Refund Eligibility */}
          <section>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Refund Eligibility</h2>
            <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30 space-y-3">
              <p className="font-bold text-[#FF7828]">Your refund is eligible if:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7828] font-bold">✓</span>
                  <span>Refund request submitted within 30 days of purchase</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7828] font-bold">✓</span>
                  <span>Account has not been permanently banned or suspended</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7828] font-bold">✓</span>
                  <span>Account credentials have not been altered or sold to third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7828] font-bold">✓</span>
                  <span>No fraud or dispute chargebacks filed against the purchase</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Non-Refundable Cases */}
          <section>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Non-Refundable Cases</h2>
            <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/30 space-y-3">
              <p className="font-bold text-red-400">Refunds may not be processed if:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>Account was permanently banned due to account-sharing or cheating detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>Refund request made after 30 days from purchase date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>Chargeback or dispute filed without contacting support first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>Account compromised due to weak password or account sharing</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How to Request Refund */}
          <section>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">How to Request a Refund</h2>
            <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30 space-y-4">
              <div>
                <h3 className="font-bold text-[#FF7828] mb-2">Step 1: Contact Support</h3>
                <p className="text-sm">Email us at <strong>contact@digizaro.com</strong> or message us via WhatsApp: <strong>+1-780-851-1699</strong></p>
              </div>
              <div>
                <h3 className="font-bold text-[#FF7828] mb-2">Step 2: Provide Order Details</h3>
                <p className="text-sm">Include your order number, purchase date, and reason for the refund request.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#FF7828] mb-2">Step 3: Verification</h3>
                <p className="text-sm">Our support team will verify your claim and account status within 24-48 hours.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#FF7828] mb-2">Step 4: Processing</h3>
                <p className="text-sm">Once approved, refunds are processed within 5-7 business days to your original payment method.</p>
              </div>
            </div>
          </section>

          {/* Refund Timeline */}
          <section>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Refund Processing Timeline</h2>
            <div className="space-y-3 text-sm">
              <div className="bg-[#1a1a3e]/60 p-4 rounded border border-[#FF7828]/30">
                <p className="font-bold text-[#FF7828] mb-1">Request Submitted → Approved: 24-48 hours</p>
                <p className="text-gray-400">Our team reviews your request and account status</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-4 rounded border border-[#FF7828]/30">
                <p className="font-bold text-[#FF7828] mb-1">Approved → Processing: 1-2 business days</p>
                <p className="text-gray-400">Refund is initiated with payment processor</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-4 rounded border border-[#FF7828]/30">
                <p className="font-bold text-[#FF7828] mb-1">Processing → Receipt: 3-7 business days</p>
                <p className="text-gray-400">Funds appear in your account (varies by bank)</p>
              </div>
            </div>
          </section>

          {/* Account Access After Refund */}
          <section>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Account Access After Refund</h2>
            <p className="leading-relaxed">
              Once a refund is processed, you will lose access to the purchased account. We will reset the account credentials to secure it. Please do not attempt to access the account after refund processing begins.
            </p>
          </section>

          {/* Special Cases */}
          <section>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Account Ban Within 30 Days</h2>
            <p className="leading-relaxed mb-4">
              If your account is banned by the game developer within 30 days of purchase <strong>despite following our provided guidelines</strong>, we will refund you immediately without question. This covers:
            </p>
            <ul className="space-y-2 text-sm ml-4">
              <li>• Unexplained anti-cheat bans (when you followed all guidelines)</li>
              <li>• Account security compromises due to our delivery method failure</li>
              <li>• Hardware ban affecting the purchased account</li>
            </ul>
          </section>

          {/* Support Contact */}
          <section className="bg-gradient-to-r from-[#FF7828]/20 to-transparent p-8 rounded-lg border border-[#FF7828]/40">
            <h2 className="text-2xl font-bold text-[#FF7828] mb-4">Questions About Your Refund?</h2>
            <p className="mb-4">Contact our support team immediately:</p>
            <div className="space-y-2">
              <p><strong>Email:</strong> contact@digizaro.com</p>
              <p><strong>WhatsApp:</strong> +1-780-851-1699</p>
              <p><strong>Response Time:</strong> Usually within 2 hours</p>
            </div>
          </section>

          {/* Last Updated */}
          <p className="text-xs text-gray-500 text-center pt-8">
            Last Updated: May 6, 2026 | This policy is effective immediately
          </p>
        </div>
      </div>
    </div>
  );
}
