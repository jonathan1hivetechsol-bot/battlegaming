import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';
import AccountsGrid from './components/AccountsGrid';

export const revalidate = 60; // ISR - revalidate every 60 seconds for fresh pricing/reviews

interface Account {
  id: string;
  slug: string;
  meta_title: string;
  game_version: string;
  platform: string;
  region: string;
  wins: number;
  price: number;
  average_rating?: number;
  review_count?: number;
  reviews?: any[];
  unique_description?: string;
  buying_amount?: number;
}

async function getAllAccounts() {
  const { data: accounts, error } = await supabase
    .from('cod_accounts')
    .select('id, slug, meta_title, game_version, platform, region, wins, price, average_rating, review_count, reviews, unique_description, buying_amount')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching accounts:', error);
    return [];
  }

  return (accounts as Account[]) || [];
}

export default async function Home() {
  const accounts = await getAllAccounts();

  return (
    <div className="bg-[#0d071a] min-h-screen text-white overflow-hidden">
      {/* Neon Glow & Animation CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes neon-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255, 120, 40, 0.5), 0 0 20px rgba(255, 120, 40, 0.3), 6px 6px 0px #FF7828;
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 120, 40, 0.8), 0 0 40px rgba(255, 120, 40, 0.6), 6px 6px 0px #FF7828;
          }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        
        @keyframes hero-image-glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(255, 120, 40, 0.4)) brightness(1.1);
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(255, 120, 40, 0.6)) brightness(1.2);
          }
        }
        
        .neon-glow {
          animation: neon-glow 3s ease-in-out infinite;
        }
        .polygon-btn {
          clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0% 30%);
        }
        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          animation: glitch-1 0.3s;
          color: #FF7828;
          z-index: -1;
          opacity: 0.8;
        }
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          animation: glitch-2 0.3s;
          color: #45f882;
          z-index: -1;
          opacity: 0.8;
        }
      `}} />

      {/* Hero Section - Premium Side by Side */}
      <section className="relative w-full py-16 md:py-20 lg:py-24 flex items-center overflow-hidden bg-[#0d071a]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-96 top-1/2 w-[600px] h-[600px] bg-[#FF7828]/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-96 bottom-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 opacity-3">
            <div className="w-full h-full bg-[linear-gradient(0deg,transparent_24%,rgba(255,120,40,.1)_25%,rgba(255,120,40,.1)_26%,transparent_27%,transparent_74%,rgba(255,120,40,.1)_75%,rgba(255,120,40,.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,120,40,.1)_25%,rgba(255,120,40,.1)_26%,transparent_27%,transparent_74%,rgba(255,120,40,.1)_75%,rgba(255,120,40,.1)_76%,transparent_77%,transparent)] bg-[50px_50px]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 md:px-8 lg:px-12 relative z-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {/* Pre-heading */}
            <div className="inline-block mb-4 w-fit">
              <span className="text-[#FF7828] font-bold text-xs uppercase tracking-widest border border-[#FF7828] px-4 py-2 rounded-full">
                ⚡ NEXT GENERATION
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="relative mb-6">
              <span className="neon-glow block text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter">
                DOMINATE
              </span>
              <span className="neon-glow block text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter">
                THE
              </span>
              <span className="neon-glow block text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter">
                BATTLE
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-300 text-base md:text-lg max-w-lg mb-4 leading-relaxed font-light">
              Elite verified Call of Duty accounts with <span className="text-[#FF7828] font-semibold">lightning-fast delivery</span>, 
              <span className="text-[#FF7828] font-semibold"> military-grade security</span>, and <span className="text-[#FF7828] font-semibold">lifetime support</span>.
            </p>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
              BattleGaming is the world's most trusted premium gaming accounts marketplace, serving 50,000+ players worldwide. Our 1260+ verified accounts offer exceptional value with instant delivery, transparent pricing, and industry-leading customer support available 24/7/365.
            </p>

            {/* Stats Badges */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="bg-black/40 border border-[#FF7828]/40 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#FF7828] transition-colors">
                <p className="text-[#FF7828] font-black text-xl">{accounts.length}+</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Dynamic Accounts</p>
              </div>
              <div className="bg-black/40 border border-[#FF7828]/40 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#FF7828] transition-colors">
                <p className="text-[#FF7828] font-black text-xl">3-5min</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Instant Delivery</p>
              </div>
              <div className="bg-black/40 border border-[#FF7828]/40 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#FF7828] transition-colors">
                <p className="text-[#FF7828] font-black text-xl">100%</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Unique Content</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#accounts"
                className="polygon-btn inline-flex items-center justify-center bg-[#FF7828] text-black font-black px-10 py-4 text-sm uppercase tracking-wider hover:bg-[#E86B1F] hover:shadow-[0_0_40px_rgba(255,120,40,0.8)] transition-all duration-300 hover:scale-110 w-fit"
              >
                BROWSE NOW
              </a>
              <button
                className="border-2 border-[#FF7828] text-[#FF7828] font-black px-10 py-4 text-sm uppercase tracking-wider rounded-lg hover:bg-[#FF7828]/15 hover:shadow-[0_0_30px_rgba(255,120,40,0.6)] transition-all duration-300 w-fit"
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Right Image Section - Professional Frame */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[380px] h-[500px]">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FF7828]/50 via-[#FF7828]/25 to-transparent rounded-2xl blur-2xl" />
              
              {/* Gaming Frame Border - Bright Orange */}
              <div className="absolute -inset-3 bg-gradient-to-br from-[#FF7828] via-[#FF7828]/80 to-[#45f882]/40 rounded-xl" />
              
              {/* Inner Frame - Black */}
              <div className="absolute -inset-2 bg-[#0a0410] rounded-lg" />
              
              {/* Image Container */}
              <div className="absolute inset-0 m-2 rounded-lg overflow-hidden bg-gradient-to-b from-black/20 to-black/40 shadow-2xl">
                <img
                  src="/blackops7heroimage.jpg"
                  alt="Black Ops 7 Hero"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(0.85) contrast(1.4) saturate(1.1) hue-rotate(0deg)',
                  }}
                />
                
                {/* Premium Overlay with Gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[#FF7828]/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                
                {/* Scanlines - Enhanced */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 120, 40, 0.15) 0px, rgba(255, 120, 40, 0.15) 2px, transparent 2px, transparent 4px)',
                  }}
                />
                
                {/* Premium Corner HUD - Larger & Detailed */}
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-[#FF7828] rounded-sm">
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF7828] rounded-tl-sm" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-[#FF7828] rounded-sm">
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF7828] rounded-tr-sm" />
                </div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-[#FF7828] rounded-sm">
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF7828] rounded-bl-sm" />
                </div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-[#FF7828] rounded-sm">
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF7828] rounded-br-sm" />
                </div>
                
                {/* Side Accent Elements */}
                <div className="absolute left-0 top-1/4 h-12 w-1 bg-gradient-to-b from-transparent via-[#FF7828] to-transparent opacity-80" />
                <div className="absolute right-0 top-3/4 h-12 w-1 bg-gradient-to-b from-transparent via-[#FF7828] to-transparent opacity-80" />
                
                {/* Top Accent */}
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#FF7828] to-transparent opacity-90" />
                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#FF7828] to-transparent opacity-90" />
                
                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-px h-6 bg-[#FF7828] opacity-30" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-px bg-[#FF7828] opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BattleGaming Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
              <span className="text-white">Why </span>
              <span className="text-[#FF7828]">BattleGaming</span>
              <span className="text-white">?</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Join thousands of satisfied gamers who trust BattleGaming for premium accounts, exceptional service, and unbeatable value.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1a1a3e]/50 border border-[#FF7828]/30 rounded-xl p-8 hover:border-[#FF7828] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-xl font-bold text-white mb-3">100% Verified & Secure</h3>
              <p className="text-gray-400 leading-relaxed">Every account undergoes rigorous verification for authenticity, security, and anti-cheat compliance. Your purchase is protected by our 30-day money-back guarantee.</p>
            </div>
            
            <div className="bg-[#1a1a3e]/50 border border-[#FF7828]/30 rounded-xl p-8 hover:border-[#FF7828] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Delivery</h3>
              <p className="text-gray-400 leading-relaxed">Receive your account within 3 minutes of purchase, 24 hours a day, 7 days a week. Our automated system ensures fast, reliable delivery every single time.</p>
            </div>
            
            <div className="bg-[#1a1a3e]/50 border border-[#FF7828]/30 rounded-xl p-8 hover:border-[#FF7828] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-xl font-bold text-white mb-3">Global Support</h3>
              <p className="text-gray-400 leading-relaxed">Expert support team available in multiple languages with response times under 2 minutes. Serving players in USA, UK, and Europe with regional optimization.</p>
            </div>
            
            <div className="bg-[#1a1a3e]/50 border border-[#FF7828]/30 rounded-xl p-8 hover:border-[#FF7828] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-xl font-bold text-white mb-3">Best Value</h3>
              <p className="text-gray-400 leading-relaxed">Transparent pricing with zero hidden fees. Compare our prices and quality - BattleGaming offers the best value in the industry with competitive rates.</p>
            </div>
            
            <div className="bg-[#1a1a3e]/50 border border-[#FF7828]/30 rounded-xl p-8 hover:border-[#FF7828] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-xl font-bold text-white mb-3">5-Star Reviews</h3>
              <p className="text-gray-400 leading-relaxed">Join 50,000+ satisfied customers with an average rating of 4.9/5 stars. Read genuine customer reviews and testimonials from verified buyers.</p>
            </div>
            
            <div className="bg-[#1a1a3e]/50 border border-[#FF7828]/30 rounded-xl p-8 hover:border-[#FF7828] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,120,40,0.2)]">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-xl font-bold text-white mb-3">All Platforms</h3>
              <p className="text-gray-400 leading-relaxed">Support for PS5, Xbox, and PC. All accounts optimized for your specific platform with cross-platform compatibility options available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accounts Section with Interactive Grid */}
      <section id="accounts" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-4">
            <span className="text-white">Browse Premium </span>
            <span className="text-[#FF7828]">Accounts</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Explore our carefully curated selection of 1260+ verified accounts. Use filters to find exactly what you're looking for.</p>
        </div>
        <Suspense fallback={<div className="h-96 bg-[#1a1a3e]/30 rounded-lg animate-pulse max-w-6xl mx-auto" />}>
          <AccountsGrid initialAccounts={accounts} />
        </Suspense>

      {/* Featured Accounts - Showcasing Dynamic Content */}
      <section className="py-16 px-4 border-t border-[#FF7828]/20 mt-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black uppercase text-center mb-8">
            <span className="text-[#FF7828]">Dynamic</span>
            <span className="text-white"> Content Per Region & Platform</span>
          </h3>
          <p className="text-gray-400 text-center mb-12">Each account combination has unique, optimized content for maximum search visibility</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* California Examples */}
            <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 rounded-lg p-6 hover:border-[#FF7828]/60 transition-all">
              <p className="text-xs uppercase tracking-widest text-[#FF7828] font-bold mb-2">🌴 California Region</p>
              <h4 className="text-white font-black mb-3">West Coast Optimized</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ <strong>PS5:</strong> DualSense haptic optimization</li>
                <li>✓ <strong>Xbox:</strong> MS West Coast servers</li>
                <li>✓ <strong>PC:</strong> 240+ FPS fiber routing</li>
                <li>✓ <span className="text-[#FF7828]">&lt;15ms latency guaranteed</span></li>
              </ul>
              <a href="/accounts?region=California" className="text-[#FF7828] text-sm font-semibold mt-4 inline-block hover:underline">
                Browse California Accounts →
              </a>
            </div>

            {/* UK Examples */}
            <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 rounded-lg p-6 hover:border-[#FF7828]/60 transition-all">
              <p className="text-xs uppercase tracking-widest text-[#FF7828] font-bold mb-2">🇬🇧 UK Region</p>
              <h4 className="text-white font-black mb-3">EU Optimized</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ <strong>London:</strong> Ultra-low latency</li>
                <li>✓ <strong>Manchester:</strong> North UK focused</li>
                <li>✓ <strong>All Platforms:</strong> EU server routing</li>
                <li>✓ <span className="text-[#FF7828]">&lt;8ms latency guaranteed</span></li>
              </ul>
              <a href="/accounts?region=London" className="text-[#FF7828] text-sm font-semibold mt-4 inline-block hover:underline">
                Browse UK Accounts →
              </a>
            </div>

            {/* Game Specific */}
            <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 rounded-lg p-6 hover:border-[#FF7828]/60 transition-all">
              <p className="text-xs uppercase tracking-widest text-[#FF7828] font-bold mb-2">🎮 Game Specific</p>
              <h4 className="text-white font-black mb-3">Optimized Per Game</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ <strong>BO7:</strong> Movement & reaction focus</li>
                <li>✓ <strong>MW3:</strong> Gunsmith customization</li>
                <li>✓ <strong>Warzone:</strong> Battle royale strategy</li>
                <li>✓ <span className="text-[#FF7828]">Completely unique content per game</span></li>
              </ul>
              <a href="/accounts" className="text-[#FF7828] text-sm font-semibold mt-4 inline-block hover:underline">
                Browse All Games →
              </a>
            </div>
          </div>
        </div>
      </section>
        
        {/* CRAWLER-FRIENDLY LINKS (Hidden but crawlable) */}
        {/* Fixes: Low Discovery + Broken paths */}
        <div className="sr-only" role="navigation" aria-label="All Call of Duty Accounts">
          <h2>Browse All Call of Duty Accounts</h2>
          <ul>
            {accounts.slice(0, 50).map((account) => (
              <li key={account.id}>
                <a href={`/accounts/${account.slug}`} title={account.meta_title}>
                  {account.meta_title} - {account.platform} - ${account.price}
                </a>
              </li>
            ))}
            <li>
              <a href="/accounts" title="View all accounts">
                View all {accounts.length} accounts
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* JSON-LD SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://battlegaming.store',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'All Accounts',
                item: 'https://battlegaming.store/accounts',
              },
            ],
          }),
        }}
      />

      {/* AGGREGATE OFFERS SCHEMA - Helps Google understand pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: Math.min(...accounts.map(a => a.price)),
            highPrice: Math.max(...accounts.map(a => a.price)),
            offerCount: accounts.length,
            url: 'https://battlegaming.store/accounts',
          }),
        }}
      />

      {/* ORGANIZATION SCHEMA - Establishes BattleGaming Authority */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'BattleGaming',
            url: 'https://battlegaming.store',
            description: 'Premium verified Call of Duty gaming accounts with instant delivery, dynamic content optimization per region and platform, and 24/7 customer support.',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              availableLanguage: ['en'],
              areaServed: ['US', 'UK', 'CA'],
            },
            sameAs: ['https://twitter.com/BattleGaming'],
            reviews: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '4.9',
                bestRating: '5',
              },
              reviewCount: `${accounts.reduce((sum, a) => sum + (a.review_count || 0), 0)}`,
            },
          }),
        }}
      />

      {/* DYNAMIC ACCOUNTS COLLECTION SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Premium Call of Duty Accounts',
            description: `Browse ${accounts.length}+ dynamically optimized gaming accounts with unique content per region, platform, and game combination.`,
            url: 'https://battlegaming.store/accounts',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: accounts.length,
              itemListElement: accounts.slice(0, 20).map((account, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://battlegaming.store/accounts/${account.slug}`,
                name: account.meta_title,
                description: account.meta_description,
                offers: {
                  '@type': 'Offer',
                  price: account.price.toString(),
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
                aggregateRating: account.average_rating ? {
                  '@type': 'AggregateRating',
                  ratingValue: account.average_rating.toString(),
                  reviewCount: account.review_count || 0,
                } : undefined,
              })),
            },
          }),
        }}
      />
    </div>
  );
}