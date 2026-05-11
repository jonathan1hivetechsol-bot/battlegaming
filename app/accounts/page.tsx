import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CategoryNavigation from '../components/CategoryNavigation';
import AccountsGrid from '../components/AccountsGrid';

// Revalidate every 60 seconds to keep the listing fresh
export const revalidate = 60;

// Dynamic metadata for the accounts listing page
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';
  
  const { count } = await supabase
    .from('cod_accounts')
    .select('id', { count: 'exact', head: true });

  return {
    title: `Buy Premium Call of Duty Accounts | BattleGaming - ${count || 'All'} Verified Options`,
    description: `Browse ${count || 'all'} verified Call of Duty accounts with instant delivery, high wins, and lifetime guarantees. Filter by platform, wins, price & region.`,
    keywords: 'Call of Duty accounts, CoD accounts for sale, verified accounts, instant delivery, PS5, Xbox, PC',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/accounts`,
    },
    openGraph: {
      title: 'Premium Call of Duty Accounts | BattleGaming',
      description: `Buy from ${count || 'our collection of'} verified CoD accounts with instant delivery & lifetime support.`,
      url: `${baseUrl}/accounts`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'BattleGaming - Premium Call of Duty Accounts',
        },
      ],
    },
  };
}

interface Account {
  id: string;
  slug: string;
  meta_title: string;
  game_version: string;
  platform: string;
  wins: number;
  price: number;
  region: string;
  average_rating?: number;
  review_count?: number;
}

async function getAllAccounts() {
  const { data: accounts, error } = await supabase
    .from('cod_accounts')
    .select('id, slug, meta_title, game_version, platform, wins, price, region, average_rating, review_count')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching accounts:', error);
    return [];
  }

  return (accounts as Account[]) || [];
}

export default async function AccountsPage() {
  const accounts = await getAllAccounts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';

  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Header Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#0d071a]">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-96 top-1/2 w-[600px] h-[600px] bg-[#FF7828]/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-96 bottom-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 text-white">
              All Premium <span className="text-[#FF7828]">Call of Duty</span> Accounts
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mb-6 leading-relaxed">
              Welcome to BattleGaming's premium Call of Duty accounts marketplace. We offer {accounts.length} carefully curated and verified Call of Duty accounts with instant delivery, lifetime guarantees, and exceptional 24/7 customer support. Whether you're looking for high-wins accounts, specific regional optimization, or accounts optimized for competitive play, we have the perfect account for your gaming needs.
            </p>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">
              Every single account in our marketplace has been thoroughly verified for authenticity, performance, and compliance with anti-cheat systems. We pride ourselves on transparency, offering detailed account statistics, verified customer reviews, and comprehensive account information so you can make an informed decision. Our automated delivery system ensures you receive your account within minutes of purchase, 24 hours a day, 7 days a week.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-[#FF7828]/10 border border-[#FF7828] px-6 py-3 rounded-lg hover:bg-[#FF7828]/20 transition-all">
                <span className="text-[#FF7828] font-bold text-lg">{accounts.length}+</span>
                <p className="text-gray-400 text-sm">Premium Accounts</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500 px-6 py-3 rounded-lg hover:bg-blue-500/20 transition-all">
                <span className="text-blue-400 font-bold text-lg">99.8%</span>
                <p className="text-gray-400 text-sm">Delivery Success</p>
              </div>
              <div className="bg-green-500/10 border border-green-500 px-6 py-3 rounded-lg hover:bg-green-500/20 transition-all">
                <span className="text-green-400 font-bold text-lg">⚡</span>
                <p className="text-gray-400 text-sm">Instant Delivery</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500 px-6 py-3 rounded-lg hover:bg-purple-500/20 transition-all">
                <span className="text-purple-400 font-bold text-lg">🛡️</span>
                <p className="text-gray-400 text-sm">Military-Grade Security</p>
              </div>
            </div>
            <div className="bg-[#1a1a3e]/50 border border-[#FF7828]/30 rounded-lg p-6">
              <h3 className="text-[#FF7828] font-bold mb-3">Why Choose BattleGaming?</h3>
              <ul className="text-gray-300 space-y-2 text-sm md:text-base">
                <li>✓ All accounts verified and anti-cheat compliant</li>
                <li>✓ Transparent pricing with zero hidden fees</li>
                <li>✓ 30-day money-back satisfaction guarantee</li>
                <li>✓ Regional optimization for USA, UK, and Europe</li>
                <li>✓ Lifetime account security and performance warranty</li>
                <li>✓ Expert support team available in multiple languages</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <Suspense fallback={<div className="h-24 bg-[#1a1a3e]/30" />}>
        <CategoryNavigation />
      </Suspense>

      {/* Content Section */}
      <section className="relative w-full py-16 md:py-20 overflow-hidden bg-black/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#1a1a3e]/40 border border-[#FF7828]/20 rounded-lg p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#FF7828] mb-4">Premium Account Selection</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our marketplace features the most extensive collection of verified Call of Duty accounts available online. Each account is hand-picked and tested to ensure exceptional quality, legitimate stats, and optimal performance. We work directly with verified sellers and trusted sources to guarantee authenticity and protect our community from fraudulent or compromised accounts.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  From casual players looking to enhance their gaming experience to competitive esports players seeking optimized tournament-ready accounts, BattleGaming has options for every skill level and budget. Our AI-powered recommendation system helps you find the perfect account based on your preferences, gaming style, and regional location.
                </p>
              </div>
              
              <div className="bg-[#1a1a3e]/40 border border-[#FF7828]/20 rounded-lg p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#FF7828] mb-4">How Our Marketplace Works</h2>
                <div className="space-y-3 text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-[#FF7828] font-bold flex-shrink-0">1.</span>
                    <p><strong>Browse & Filter</strong> - Use our advanced filtering system to find accounts by game version, platform, wins, price, and region</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#FF7828] font-bold flex-shrink-0">2.</span>
                    <p><strong>Review Details</strong> - Check detailed account statistics, customer reviews, win rates, and performance metrics</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#FF7828] font-bold flex-shrink-0">3.</span>
                    <p><strong>Secure Purchase</strong> - Complete your purchase through our encrypted payment system with buyer protection</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#FF7828] font-bold flex-shrink-0">4.</span>
                    <p><strong>Instant Delivery</strong> - Receive your account credentials within minutes via secure email and account dashboard</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#FF7828] font-bold flex-shrink-0">5.</span>
                    <p><strong>Lifetime Support</strong> - Access our 24/7 support team for any questions, account transfers, or assistance</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#FF7828]/20 to-transparent border border-[#FF7828]/40 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#FF7828] mb-4">Quick Stats</h3>
                <div className="space-y-4 text-sm">
                  <div className="bg-black/40 rounded p-3">
                    <p className="text-gray-400">Total Accounts</p>
                    <p className="text-2xl font-bold text-[#FF7828]">{accounts.length}+</p>
                  </div>
                  <div className="bg-black/40 rounded p-3">
                    <p className="text-gray-400">Avg. Delivery Time</p>
                    <p className="text-2xl font-bold text-[#FF7828]\">3 min</p>
                  </div>
                  <div className="bg-black/40 rounded p-3">
                    <p className="text-gray-400">Success Rate</p>
                    <p className="text-2xl font-bold text-[#FF7828]\">99.8%</p>
                  </div>
                  <div className="bg-black/40 rounded p-3">
                    <p className="text-gray-400">Customer Rating</p>
                    <p className="text-2xl font-bold text-[#FF7828]\">4.9★</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1a1a3e]/40 border border-[#FF7828]/20 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Supported Regions</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>🇺🇸 USA, California, Texas, New York</p>
                  <p>🇬🇧 UK, London, Manchester</p>
                  <p>🎮 PS5, Xbox, PC</p>
                  <p>⚡ 24/7 Global Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accounts Grid */}
      <section className="relative w-full py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-white">Featured </span>
            <span className="text-[#FF7828]">Accounts</span>
          </h2>
          {accounts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No accounts available at the moment.</p>
            </div>
          ) : (
            <Suspense fallback={<div className="h-96 bg-[#1a1a3e]/30 rounded-lg animate-pulse" />}>
              <AccountsGrid initialAccounts={accounts} />
            </Suspense>
          )}
        </div>
      </section>

      {/* Schema Markup for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Premium Call of Duty Accounts',
            url: `${baseUrl}/accounts`,
            description: `Browse ${accounts.length} verified Call of Duty accounts with instant delivery.`,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: accounts.length,
              itemListElement: accounts.slice(0, 50).map((account, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${baseUrl}/accounts/${account.slug}`,
                name: account.meta_title,
                offers: {
                  '@type': 'Offer',
                  price: account.price,
                  priceCurrency: 'USD',
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
