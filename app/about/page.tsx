import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About BattleGaming | Premium Call of Duty Accounts & Marketplace',
  description: 'Learn about BattleGaming - The leading provider of verified, premium Call of Duty accounts with 1260+ elite pages, 24/7 instant delivery, 99.8% success rate, and 100% secure transactions.',
  keywords: 'Call of Duty accounts, COD accounts, premium gaming accounts, verified sellers, gaming marketplace',
  openGraph: {
    title: 'About BattleGaming | Elite COD Account Provider',
    description: 'Discover how BattleGaming delivers premium verified Call of Duty accounts with military-grade security and lifetime support.',
    url: 'https://battlegaming.store/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://battlegaming.store/about',
  },
};

export default function About() {
  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 text-[#FF7828] drop-shadow-[0_0_20px_rgba(255,120,40,0.5)]">
            About BattleGaming
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            The world's most trusted premium Call of Duty accounts marketplace with 1260+ verified pages, instant delivery, and military-grade security.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1a1a3e]/50 p-4 rounded-lg border border-[#FF7828]/30">
              <div className="text-3xl font-bold text-[#FF7828]">1260+</div>
              <div className="text-sm text-gray-400">Verified Pages</div>
            </div>
            <div className="bg-[#1a1a3e]/50 p-4 rounded-lg border border-[#FF7828]/30">
              <div className="text-3xl font-bold text-[#FF7828]">99.8%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="bg-[#1a1a3e]/50 p-4 rounded-lg border border-[#FF7828]/30">
              <div className="text-3xl font-bold text-[#FF7828]">7</div>
              <div className="text-sm text-gray-400">Global Regions</div>
            </div>
            <div className="bg-[#1a1a3e]/50 p-4 rounded-lg border border-[#FF7828]/30">
              <div className="text-3xl font-bold text-[#FF7828]">50K+</div>
              <div className="text-sm text-gray-400">Happy Players</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Our Mission */}
          <div>
            <h2 className="text-4xl font-bold text-[#FF7828] mb-6 drop-shadow-[0_0_15px_rgba(255,120,40,0.3)]">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-lg">
              At BattleGaming, we're dedicated to providing the global gaming community with premium, verified Call of Duty accounts that deliver exceptional value and unforgettable experiences. Our mission is to democratize access to elite gaming accounts while maintaining the highest standards of security, transparency, and customer service.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              We believe every gamer deserves access to professionally optimized accounts with verified stats, impressive win ratios, and premium cosmetics - all delivered instantly, securely, and with complete transparency. Whether you're in the USA, UK, or any of our 7 supported regions, BattleGaming is your trusted partner for premium gaming.
            </p>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-4xl font-bold text-[#FF7828] mb-8 drop-shadow-[0_0_15px_rgba(255,120,40,0.3)]">Why Choose BattleGaming?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ 1260+ Premium Accounts</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Carefully curated elite accounts with verified stats, impressive performance metrics, and regional optimization across USA, UK, California, Texas, New York, London, and Manchester.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ 24/7 Instant Delivery</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Access your account within minutes of purchase via our automated delivery system. No waiting, no delays, just instant gaming readiness across all platforms: PS5, Xbox, and PC.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ Military-Grade Security</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Advanced encryption, two-factor authentication, anti-cheat compliance verification, and secure data handling protect your account investment and personal information at every step.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ Lifetime Support</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Our dedicated multilingual support team is available 24/7/365 to assist with account issues, optimization requests, and technical support with response times under 2 minutes.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ Regional Optimization</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Every account is optimized for your specific region with ideal server connectivity, timezone-aligned support, regional payment options, and localized assistance in your preferred language.</p>
              </div>
              <div className="bg-[#1a1a3e]/60 p-8 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828]/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
                <h3 className="text-xl font-bold text-[#FF7828] mb-3">✓ Money-Back Guarantee</h3>
                <p className="text-gray-300 text-sm leading-relaxed">30-day unconditional satisfaction guarantee. If you're not completely satisfied with your account quality or service, we'll refund your purchase 100% - no questions asked.</p>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div>
            <h2 className="text-4xl font-bold text-[#FF7828] mb-6 drop-shadow-[0_0_15px_rgba(255,120,40,0.3)]">Our Expert Team</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-lg">
              BattleGaming is built by passionate gamers and industry veterans who genuinely understand the Call of Duty competitive community. Our team consists of experienced professionals with over 50+ years of combined gaming industry expertise, esports background, and customer service excellence.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              Each team member is personally invested in delivering the best possible experience because we're gamers ourselves. We've walked in your shoes, understand your needs, and are committed to exceeding expectations every single day.
            </p>
            
            <div className="bg-[#1a1a3e]/40 p-8 rounded-lg border border-[#FF7828]/20">
              <h3 className="text-2xl font-bold text-[#FF7828] mb-6">Team Expertise</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <span className="text-[#FF7828] text-2xl">🎮</span>
                  <div>
                    <div className="font-bold text-white">Gaming Industry Veterans</div>
                    <div className="text-gray-400 text-sm">15+ years experience in competitive gaming and account management</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF7828] text-2xl">🛡️</span>
                  <div>
                    <div className="font-bold text-white">Security Specialists</div>
                    <div className="text-gray-400 text-sm">Certified in cybersecurity and data protection compliance</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF7828] text-2xl">🌍</span>
                  <div>
                    <div className="font-bold text-white">Global Support Team</div>
                    <div className="text-gray-400 text-sm">Multilingual support professionals across 7 regions worldwide</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF7828] text-2xl">⚙️</span>
                  <div>
                    <div className="font-bold text-white">Technical Experts</div>
                    <div className="text-gray-400 text-sm">Expert engineers ensuring 99.8% uptime and delivery success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gradient-to-r from-[#FF7828]/20 to-transparent p-8 rounded-lg border border-[#FF7828]/40">
            <h2 className="text-4xl font-bold text-[#FF7828] mb-8 drop-shadow-[0_0_15px_rgba(255,120,40,0.3)]">Our Commitment</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#FF7828] mr-3 font-bold text-xl">✓</span>
                  <span className="text-base">100% verified and authentic Call of Duty accounts with anti-cheat clearance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7828] mr-3 font-bold text-xl">✓</span>
                  <span className="text-base">Transparent pricing with zero hidden fees or surprise charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7828] mr-3 font-bold text-xl">✓</span>
                  <span className="text-base">Instant account transfer within minutes of verified purchase</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7828] mr-3 font-bold text-xl">✓</span>
                  <span className="text-base">30-day satisfaction guarantee with full refund on all purchases</span>
                </li>
              </ul>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#FF7828] mr-3 font-bold text-xl">✓</span>
                  <span className="text-base">Dedicated customer support team available 24/7/365 in multiple languages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7828] mr-3 font-bold text-xl">✓</span>
                  <span className="text-base">Regional payment options and support for all major regions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7828] mr-3 font-bold text-xl">✓</span>
                  <span className="text-base">Lifetime warranty covering account security and performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF7828] mr-3 font-bold text-xl">✓</span>
                  <span className="text-base">Compliance with all regional consumer protection laws and regulations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Global Presence */}
          <div>
            <h2 className="text-4xl font-bold text-[#FF7828] mb-8 drop-shadow-[0_0_15px_rgba(255,120,40,0.3)]">Global Presence & Expertise</h2>
            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              BattleGaming proudly serves gamers across 7 major regions worldwide, with specialized support teams in each location ensuring optimal service delivery and regional compliance.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a3e]/50 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-4">🇺🇸 United States</h3>
                <p className="text-gray-400 text-sm">USA, California, Texas, New York - Full coverage with optimized server infrastructure and fastest delivery times</p>
              </div>
              <div className="bg-[#1a1a3e]/50 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-4">🇬🇧 United Kingdom</h3>
                <p className="text-gray-400 text-sm">UK, London, Manchester - EU-compliant operations with GDPR compliance and regional payment options</p>
              </div>
              <div className="bg-[#1a1a3e]/50 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-4">🎮 Multi-Platform</h3>
                <p className="text-gray-400 text-sm">PS5, Xbox, PC - All major platforms supported with cross-platform account optimization services</p>
              </div>
              <div className="bg-[#1a1a3e]/50 p-6 rounded-lg border border-[#FF7828]/30">
                <h3 className="text-lg font-bold text-[#FF7828] mb-4">⚡ Instant Delivery</h3>
                <p className="text-gray-400 text-sm">Average 3-minute delivery time - Fastest in the industry with 24/7 automated delivery systems</p>
              </div>
            </div>
          </div>

          {/* Testimonials CTA */}
          <div className="bg-[#FF7828]/10 p-8 rounded-lg border border-[#FF7828]/40 text-center">
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Join 50,000+ Happy Gamers</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Trusted by competitive gamers worldwide. Experience premium accounts with industry-leading service quality and customer satisfaction.
            </p>
            <a href="/accounts/usa-all" className="inline-block px-8 py-3 bg-[#FF7828] text-black font-bold rounded-lg hover:bg-[#E86B1F] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.6)]">
              Browse Premium Accounts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
