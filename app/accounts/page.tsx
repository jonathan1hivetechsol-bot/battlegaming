import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
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
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 text-white">
              All Premium <span className="text-[#FF7828]">Call of Duty</span> Accounts
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-6">
              Browse {accounts.length} verified accounts with instant delivery, lifetime guarantees, and 24/7 support.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#FF7828]/10 border border-[#FF7828] px-4 py-2 rounded">
                <span className="text-[#FF7828] font-bold">{accounts.length}+</span> Accounts
              </div>
              <div className="bg-blue-500/10 border border-blue-500 px-4 py-2 rounded">
                <span className="text-blue-400 font-bold">99.8%</span> Delivery Success
              </div>
              <div className="bg-green-500/10 border border-green-500 px-4 py-2 rounded">
                <span className="text-green-400 font-bold">⚡</span> Instant Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNavigation />

      {/* Accounts Grid */}
      <section className="relative w-full py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {accounts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No accounts available at the moment.</p>
            </div>
          ) : (
            <AccountsGrid initialAccounts={accounts} />
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
