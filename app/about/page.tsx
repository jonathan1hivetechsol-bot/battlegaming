import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About BattleGaming | Premium Call of Duty Accounts & Marketplace',
  description: 'Learn about BattleGaming - The leading provider of verified, premium Call of Duty accounts with 45+ elite accounts, 24/7 instant delivery, and 100% secure transactions.',
  keywords: 'Call of Duty accounts, COD accounts, premium gaming accounts, verified sellers',
  openGraph: {
    title: 'About BattleGaming | Elite COD Account Provider',
    description: 'Discover how BattleGaming delivers premium verified Call of Duty accounts with military-grade security and lifetime support.',
    url: 'https://battlegaming.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://battlegaming.com/about',
  },
};

export default function About() {
  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 text-[#FF7828]">
            About BattleGaming
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Premium verified Call of Duty accounts delivered with military-grade security and professional support.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Our Mission */}
          <div>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              At BattleGaming, we're dedicated to providing the gaming community with premium, verified Call of Duty accounts that deliver exceptional value. Our mission is to make premium gaming experiences accessible and secure for every player, regardless of their location or skill level.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We believe every gamer deserves access to elite accounts with verified stats, impressive win ratios, and premium cosmetics - all delivered with complete transparency and security.
            </p>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-6">Why Choose BattleGaming?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ 45+ Premium Accounts</h3>
                <p className="text-gray-300">Carefully selected elite accounts with verified stats and impressive performance metrics.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ 24/7 Instant Delivery</h3>
                <p className="text-gray-300">Access your account within minutes of purchase with our automated delivery system.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ Military-Grade Security</h3>
                <p className="text-gray-300">Advanced encryption and security protocols protect your account and personal data.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ Lifetime Support</h3>
                <p className="text-gray-300">Our dedicated support team is available around the clock to assist you.</p>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Our Expert Team</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              BattleGaming is built by passionate gamers who understand the Call of Duty community. Our team consists of experienced professionals with over 50+ years of combined gaming industry expertise.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We're committed to maintaining the highest standards of service, security, and customer satisfaction in the premium gaming accounts marketplace.
            </p>
          </div>

          {/* Commitment */}
          <div className="bg-gradient-to-r from-[#FF7828]/20 to-transparent p-8 rounded-lg border border-[#FF7828]/40">
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Our Commitment</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-[#FF7828] mr-3">→</span>
                <span>100% verified and authentic Call of Duty accounts</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF7828] mr-3">→</span>
                <span>Transparent pricing with no hidden fees</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF7828] mr-3">→</span>
                <span>Fast and secure account transfer process</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF7828] mr-3">→</span>
                <span>30-day satisfaction guarantee on all purchases</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF7828] mr-3">→</span>
                <span>Dedicated customer support team</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
