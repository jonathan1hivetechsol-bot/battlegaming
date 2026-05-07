import type { Metadata } from 'next';
import ContactForm from '../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact BattleGaming | 24/7 Premium Support & Customer Service',
  description: 'Get in touch with BattleGaming support team. 24/7 customer service for account assistance, technical support, refunds, and partnerships. Multilingual support across USA, UK, and 5+ regions. Response time under 2 hours guaranteed.',
  keywords: 'contact us, customer support, COD account help, gaming support, technical assistance, live chat, email support',
  openGraph: {
    title: 'Contact BattleGaming | 24/7 Premium Support',
    description: 'Reach out to our multilingual support team anytime. Average response time under 2 minutes for live chat, 2 hours for email.',
    url: 'https://battlegaming.store/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://battlegaming.store/contact',
  },
};

export default function Contact() {
  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 text-[#FF7828] drop-shadow-[0_0_20px_rgba(255,120,40,0.5)]">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            24/7 Premium Support Team - We're here to help instantly
          </p>
          <p className="text-lg text-gray-400">
            Multilingual support across USA, UK, California, Texas, New York, London, and Manchester
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          {/* Quick Contact Methods */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828] transition-all duration-300 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-[#FF7828] mb-2">Live Chat</h3>
              <p className="text-gray-300 text-sm mb-4">Instant support available</p>
              <div className="text-xs text-[#FF7828] font-bold">⚡ Under 2 minutes</div>
            </div>
            <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828] transition-all duration-300 text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-lg font-bold text-[#FF7828] mb-2">Email Support</h3>
              <p className="text-gray-300 text-sm mb-4">contact@digizaro.com</p>
              <div className="text-xs text-[#FF7828] font-bold">📨 Under 2 hours</div>
            </div>
            <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828] transition-all duration-300 text-center">
              <div className="text-6xl mb-4">💚</div>
              <h3 className="text-lg font-bold text-[#FF7828] mb-2">WhatsApp</h3>
              <p className="text-gray-300 text-sm mb-4">+15795507750</p>
              <div className="text-xs text-[#FF7828] font-bold">💬 Instant chat</div>
            </div>
            <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828] transition-all duration-300 text-center">
              <div className="text-6xl mb-4">🕐</div>
              <h3 className="text-lg font-bold text-[#FF7828] mb-2">Availability</h3>
              <p className="text-gray-300 text-sm mb-4">24/7/365</p>
              <div className="text-xs text-[#FF7828] font-bold">🌍 All regions</div>
            </div>
          </div>

          {/* Main Contact Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-[#FF7828] mb-8 drop-shadow-[0_0_15px_rgba(255,120,40,0.3)]">Send us a Message</h2>
              <ContactForm />
            </div>

            {/* Support Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#FF7828]/20 to-transparent p-6 rounded-lg border border-[#FF7828]/40">
                <h3 className="text-xl font-bold text-[#FF7828] mb-4">Why Contact Us?</h3>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7828] font-bold">→</span>
                    <span>Account assistance & optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7828] font-bold">→</span>
                    <span>Technical support & troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7828] font-bold">→</span>
                    <span>Refund requests & disputes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7828] font-bold">→</span>
                    <span>Partnership opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7828] font-bold">→</span>
                    <span>Business inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF7828] font-bold">→</span>
                    <span>Feedback & suggestions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-4">Response Times</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Live Chat:</span>
                    <span className="text-[#FF7828] font-bold">&lt; 2 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">WhatsApp:</span>
                    <span className="text-[#FF7828] font-bold">&lt; 5 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email:</span>
                    <span className="text-[#FF7828] font-bold">&lt; 2 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Average Overall:</span>
                    <span className="text-[#FF7828] font-bold">&lt; 10 min</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-4">🌍 Regional Support</h3>
                <div className="space-y-2 text-xs text-gray-400">
                  <div>🇺🇸 USA Support: English</div>
                  <div>🇬🇧 UK Support: English</div>
                  <div>✅ Multilingual assistance available</div>
                  <div>✅ Timezone-aligned support</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#FF7828] mb-12 text-center drop-shadow-[0_0_15px_rgba(255,120,40,0.3)]">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">⚡ How quickly will I receive my account?</h3>
                <p className="text-gray-300 leading-relaxed">Most accounts are delivered within 3-5 minutes of purchase. You'll receive instant email notification with login credentials and instructions for immediate access on PS5, Xbox, or PC.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">🔒 Is my payment secure?</h3>
                <p className="text-gray-300 leading-relaxed">Absolutely. We use military-grade 256-bit SSL encryption and are PCI DSS Level 1 compliant. All transactions are processed through secure payment gateways with fraud detection.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">💰 What's your refund policy?</h3>
                <p className="text-gray-300 leading-relaxed">30-day satisfaction guarantee. If not satisfied with your account quality, we'll refund 100% of your purchase - no questions asked. Simply contact our support team with your order ID.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">🔐 How do I change account password?</h3>
                <p className="text-gray-300 leading-relaxed">We provide detailed password reset instructions with every purchase. Log in to your new account, go to Settings, and follow the change password process. Support available if needed.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">🎮 Will the account work on my platform?</h3>
                <p className="text-gray-300 leading-relaxed">Yes! All accounts are available across PS5, Xbox, and PC with cross-platform compatibility. Specify your preferred platform during checkout, and we'll ensure proper configuration.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">🌍 Do you ship internationally?</h3>
                <p className="text-gray-300 leading-relaxed">Accounts are digital and delivered instantly worldwide. We support 7 regions: USA, UK, California, Texas, New York, London, and Manchester with timezone-aligned regional support.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">📞 How do I contact support?</h3>
                <p className="text-gray-300 leading-relaxed">Multiple options: Live chat (instant), Email (contact@digizaro.com), WhatsApp (+15795507750), or this contact form. We respond within 2 hours guaranteed or your money back.</p>
              </div>
            </div>
          </div>

          {/* Support Promise */}
          <div className="bg-gradient-to-r from-[#FF7828]/20 to-transparent p-12 rounded-lg border border-[#FF7828]/40 text-center">
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4 drop-shadow-[0_0_15px_rgba(255,120,40,0.3)]">Our Support Promise</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your satisfaction is our priority. We guarantee 99.8% response rate, under 2-minute response times for urgent issues, and professional multilingual support 24/7. If we fail to meet these standards, we'll credit your account with additional benefits.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-5xl text-[#FF7828] mb-2">✓</div>
                <div className="font-bold text-white">Instant Response</div>
                <div className="text-gray-400 text-sm">Average under 2 minutes</div>
              </div>
              <div>
                <div className="text-5xl text-[#FF7828] mb-2">✓</div>
                <div className="font-bold text-white">Expert Support</div>
                <div className="text-gray-400 text-sm">Dedicated gaming experts</div>
              </div>
              <div>
                <div className="text-5xl text-[#FF7828] mb-2">✓</div>
                <div className="font-bold text-white">Satisfaction Guaranteed</div>
                <div className="text-gray-400 text-sm">30-day money-back promise</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
