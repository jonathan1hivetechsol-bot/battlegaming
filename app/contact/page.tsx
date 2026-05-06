import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact BattleGaming | Support & Customer Service',
  description: 'Get in touch with BattleGaming support team. 24/7 customer service for account assistance, refunds, and inquiries. Fast response time guaranteed.',
  keywords: 'contact us, customer support, COD account help, gaming support',
  openGraph: {
    title: 'Contact BattleGaming | 24/7 Support',
    description: 'Reach out to our support team anytime. We respond within 2 hours.',
    url: 'https://battlegaming.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://battlegaming.com/contact',
  },
};

export default function Contact() {
  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 text-[#FF7828]">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300">
            We're here to help. Get in touch with our support team anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-[#FF7828] mb-2">Live Chat</h3>
              <p className="text-gray-300 mb-4">Instant support available 24/7 on our website</p>
              <span className="inline-block bg-[#FF7828] text-black px-4 py-2 rounded font-bold">Start Chat</span>
            </div>
            <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 text-center">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-[#FF7828] mb-2">Email Support</h3>
              <p className="text-gray-300 mb-4">Response within 2 hours guaranteed</p>
              <a href="mailto:support@battlegaming.com" className="text-[#FF7828] font-bold hover:text-[#E86B1F]">
                support@battlegaming.com
              </a>
            </div>
            <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-[#FF7828] mb-2">Phone Support</h3>
              <p className="text-gray-300 mb-4">Call our support hotline</p>
              <a href="tel:+1234567890" className="text-[#FF7828] font-bold hover:text-[#E86B1F]">
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FF7828] mb-8 text-center">Send us a Message</h2>
            <form className="bg-[#1a1a3e]/40 p-8 rounded-lg border border-[#FF7828]/30">
              <div className="mb-6">
                <label className="block text-gray-300 font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-black/50 border border-[#FF7828]/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7828] transition-colors"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-black/50 border border-[#FF7828]/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7828] transition-colors"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 font-bold mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-black/50 border border-[#FF7828]/40 rounded-lg text-white focus:outline-none focus:border-[#FF7828] transition-colors">
                  <option>Account Support</option>
                  <option>Refund Request</option>
                  <option>Technical Issue</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 font-bold mb-2">Message</label>
                <textarea
                  rows={6}
                  placeholder="Please describe your issue in detail..."
                  className="w-full px-4 py-3 bg-black/50 border border-[#FF7828]/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7828] transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF7828] text-black font-bold py-3 rounded-lg hover:bg-[#E86B1F] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-[#FF7828] mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">How quickly will I receive my account?</h3>
                <p className="text-gray-300">Most accounts are delivered within 5-15 minutes of purchase. You'll receive instant notifications.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">Is my payment secure?</h3>
                <p className="text-gray-300">Yes, we use military-grade encryption and PCI DSS compliance for all transactions.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">What's your refund policy?</h3>
                <p className="text-gray-300">30-day satisfaction guarantee. If not satisfied, we'll refund 100% of your purchase.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-3">How do I change account password?</h3>
                <p className="text-gray-300">We provide password reset links with every purchase. Check your email for instructions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
