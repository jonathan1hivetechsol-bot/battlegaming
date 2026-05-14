import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import Link from 'next/link';
import ScrollToTop from '@/app/components/ScrollToTop';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';
  
  return {
    title: 'Premium Call of Duty Accounts - Buy Verified CoD Accounts | BattleGaming - 1000+ Listings',
    description: 'Browse 1000+ verified Call of Duty accounts with instant delivery, high wins, lifetime guarantees. Warzone, MW3, BO7 accounts optimized for PC, Xbox, PS5 - All verified & 24/7 support.',
    keywords: 'Call of Duty accounts, CoD accounts for sale, verified accounts, instant delivery, Warzone accounts, MW3, BO7, PS5, Xbox, PC gaming accounts',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/accounts/index-complete`,
    },
    openGraph: {
      title: '1000+ Premium Call of Duty Accounts | BattleGaming Marketplace',
      description: 'Buy from 1000+ verified CoD accounts with instant delivery, competitive wins, and lifetime support. Trusted by 1000s of gamers.',
      url: `${baseUrl}/accounts/index-complete`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'BattleGaming - 1000+ Premium Call of Duty Accounts',
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

async function getAccountStats() {
  const { data: accounts, error } = await supabase
    .from('cod_accounts')
    .select('game_version, platform, region, average_rating, price, wins')
    .limit(1000);

  if (error || !accounts) return null;

  return {
    total: accounts.length,
    games: [...new Set(accounts.map(a => a.game_version))],
    platforms: [...new Set(accounts.map(a => a.platform))],
    regions: [...new Set(accounts.map(a => a.region))],
    avgPrice: (accounts.reduce((sum, a) => sum + a.price, 0) / accounts.length).toFixed(2),
    avgRating: (accounts.reduce((sum, a) => sum + (a.average_rating || 5), 0) / accounts.length).toFixed(1),
    totalWins: accounts.reduce((sum, a) => sum + a.wins, 0),
  };
}

export default async function AccountsIndexPage() {
  const stats = await getAccountStats();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';

  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Simple Breadcrumb Navigation */}
      <div className="bg-[#1a1428] border-b border-[#FF7828]/20 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-sm text-gray-400 flex flex-wrap gap-2 items-center">
            <Link href="/" className="hover:text-[#FF7828] transition-colors">
              🏠 Home
            </Link>
            <span className="text-[#FF7828]">/</span>
            <Link href="/accounts" className="hover:text-[#FF7828] transition-colors">
              📦 All Accounts
            </Link>
            <span className="text-[#FF7828]">/</span>
            <span className="text-white font-medium">Complete Index</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#0d071a]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-96 top-1/2 w-[600px] h-[600px] bg-[#FF7828]/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-96 bottom-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 text-white">
              Complete <span className="text-[#FF7828]">Call of Duty</span> Accounts Marketplace
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mb-6 leading-relaxed">
              Welcome to BattleGaming's comprehensive Call of Duty accounts marketplace—your definitive destination for premium, verified {stats?.games?.[0] || 'Call of Duty'} accounts spanning {stats?.total || '1000'} expertly curated listings. Whether you seek immediate competitive gameplay, want to bypass months of progression grinding, or aim to establish credibility within the elite gaming community, our marketplace delivers verified account solutions with instant delivery, lifetime guarantees, and professional customer support.
            </p>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">
              Every single account in our marketplace undergoes comprehensive verification ensuring authenticity, performance compliance, and competitive legitimacy. We pride ourselves on transparency, offering detailed account statistics, verified customer reviews, and comprehensive account information enabling informed purchase decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="relative w-full py-12 bg-[#1a1428] border-y border-[#FF7828]/20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-gradient-to-br from-[#FF7828] to-[#FF7828]/50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stats.total}</div>
                <div className="text-sm text-white/80">Verified Accounts</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-500/50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stats.games.length}</div>
                <div className="text-sm text-white/80">Game Versions</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-500/50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stats.platforms.length}</div>
                <div className="text-sm text-white/80">Platform Options</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-500/50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">${stats.avgPrice}</div>
                <div className="text-sm text-white/80">Average Price</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-500/50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stats.avgRating}⭐</div>
                <div className="text-sm text-white/80">Avg. Rating</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Why Purchase Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Why Purchase a Verified <span className="text-[#FF7828]">Call of Duty</span> Account?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#1a1428] rounded-lg p-8 border border-[#FF7828]/20 hover:border-[#FF7828]/50 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-[#FF7828]">Accelerate Competitive Progression</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Eliminate 500-1000 hours of preliminary grinding</li>
                  <li>✓ Enter competitive ranked queues immediately</li>
                  <li>✓ Establish yourself within competitive hierarchies</li>
                  <li>✓ Present verified competitive statistics</li>
                </ul>
              </div>

              <div className="bg-[#1a1428] rounded-lg p-8 border border-[#FF7828]/20 hover:border-[#FF7828]/50 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-[#FF7828]">Achieve Cosmetic Completeness</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Access exclusive operator skins and bundles</li>
                  <li>✓ Unlock specialized weapon blueprints</li>
                  <li>✓ Secure seasonal cosmetics instantly</li>
                  <li>✓ Obtain limited-time exclusive variants</li>
                </ul>
              </div>

              <div className="bg-[#1a1428] rounded-lg p-8 border border-[#FF7828]/20 hover:border-[#FF7828]/50 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-[#FF7828]">Enhance Gaming Experience</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Access pre-configured professional loadouts</li>
                  <li>✓ Receive platform-optimized accounts</li>
                  <li>✓ Benefit from regional network tuning</li>
                  <li>✓ Join competitive teams with established credentials</li>
                </ul>
              </div>

              <div className="bg-[#1a1428] rounded-lg p-8 border border-[#FF7828]/20 hover:border-[#FF7828]/50 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-[#FF7828]">Premium Quality Assurance</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ 100% verified authenticity guarantee</li>
                  <li>✓ Instant delivery within 24 hours</li>
                  <li>✓ Permanent account ownership transfer</li>
                  <li>✓ Lifetime customer support included</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Game Versions */}
          {stats && stats.games.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Available Game Versions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {stats.games.map((game) => (
                  <div key={game} className="bg-gradient-to-br from-[#FF7828]/10 to-transparent rounded-lg p-8 border border-[#FF7828]/20 hover:border-[#FF7828]/50 transition-all">
                    <h3 className="text-2xl font-bold mb-4 text-[#FF7828]">{game}</h3>
                    <p className="text-gray-300 mb-6">Complete {game} progression including campaign mastery, multiplayer progression, and full cosmetic unlocks.</p>
                    <Link href={`/accounts?game=${game.toLowerCase().replace(/\s+/g, '_')}`} className="inline-block px-6 py-2 bg-[#FF7828] text-black font-bold rounded-lg hover:bg-[#FF9844] transition-colors">
                      Browse {game} Accounts
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platforms */}
          {stats && stats.platforms.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Supported Platforms</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {stats.platforms.map((platform) => {
                  const platformName = platform === 'PS5' ? 'PlayStation 5' : platform === 'Xbox' ? 'Xbox Series X/S' : 'Personal Computer';
                  return (
                    <div key={platform} className="bg-[#1a1428] rounded-lg p-8 border border-[#FF7828]/20 hover:border-[#FF7828]/50 transition-colors">
                      <h3 className="text-2xl font-bold mb-4 text-[#FF7828]">{platform}</h3>
                      <p className="text-gray-300 mb-6">Optimized for {platformName} hardware specifications with platform-specific controller configurations.</p>
                      <Link href={`/accounts?platform=${platform.toLowerCase()}`} className="inline-block px-6 py-2 bg-[#FF7828] text-black font-bold rounded-lg hover:bg-[#FF9844] transition-colors">
                        Browse {platform} Accounts
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regions */}
          {stats && stats.regions.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Regional Availability</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {stats.regions.map((region) => (
                  <Link
                    key={region}
                    href={`/accounts/region/${region.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-[#1a1428] rounded-lg p-6 border border-[#FF7828]/20 hover:border-[#FF7828] transition-all hover:bg-[#1a1428]/80 text-center"
                  >
                    <h3 className="text-lg font-bold text-[#FF7828]">{region}</h3>
                    <p className="text-gray-400 text-sm">Optimized Network Performance</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#FF7828] to-[#FF7828]/70 rounded-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-black">Ready to Dominate?</h2>
            <p className="text-black/90 text-lg mb-8 max-w-2xl mx-auto">
              Browse our complete {stats?.total || '1000'}-account marketplace and find your perfect gaming account today. Instant delivery, verified quality, lifetime support.
            </p>
            <Link
              href="/accounts"
              className="inline-block px-8 py-4 bg-black text-[#FF7828] font-bold text-lg rounded-lg hover:bg-black/90 transition-colors"
            >
              Explore All {stats?.total || '1000'} Accounts →
            </Link>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
