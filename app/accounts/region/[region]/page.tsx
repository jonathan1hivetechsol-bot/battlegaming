import { createClient } from '@supabase/supabase-js';
import { use } from 'react';
import AccountsGrid from '@/app/components/AccountsGrid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface RegionPageProps {
  params: Promise<{
    region: string;
  }>;
}

// Metadata for SEO
export async function generateMetadata({ params }: RegionPageProps) {
  const resolvedParams = await params;
  const regionName = resolvedParams.region.charAt(0).toUpperCase() + resolvedParams.region.slice(1).replace(/-/g, ' ');
  
  return {
    title: `Buy Verified Gaming Accounts in ${regionName} | BattleGaming`,
    description: `Discover verified gaming accounts available in ${regionName}. Instant delivery, safe & secure. Browse our collection of premium accounts.`,
    openGraph: {
      title: `Gaming Accounts in ${regionName} | BattleGaming`,
      description: `Find verified gaming accounts in ${regionName} with instant delivery and 24/7 support.`,
      type: 'website',
      url: `https://battlegaming.store/accounts/region/${resolvedParams.region}`,
    },
  };
}

// Map URL slugs to region codes used in database
const regionMap: Record<string, string> = {
  'usa': 'usa',
  'usa-all': 'usa',
  'uk': 'uk',
  'uk-all': 'uk',
  'california': 'california',
  'california-all': 'california',
  'texas': 'texas',
  'texas-all': 'texas',
  'newyork': 'newyork',
  'new-york': 'newyork',
  'newyork-all': 'newyork',
  'london': 'london',
  'london-all': 'london',
  'manchester': 'manchester',
  'manchester-all': 'manchester',
};

// Friendly names for display
const regionNames: Record<string, string> = {
  'usa': 'USA',
  'uk': 'United Kingdom',
  'california': 'California',
  'texas': 'Texas',
  'newyork': 'New York',
  'london': 'London',
  'manchester': 'Manchester',
};

export default async function RegionPage({ params }: RegionPageProps) {
  const resolvedParams = await params;
  const regionCode = regionMap[resolvedParams.region.toLowerCase()];
  const regionName = regionNames[regionCode] || 'Accounts';

  if (!regionCode) {
    return (
      <div className="min-h-screen bg-[#0d071a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Region Not Found</h1>
          <p className="text-gray-400 mb-6">The region you're looking for doesn't exist.</p>
          <a href="/" className="text-[#FF7828] hover:underline font-semibold">
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  try {
    // Fetch all accounts for this region
    const { data: accounts, error } = await supabase
      .from('cod_accounts')
      .select('*')
      .eq('region_code', regionCode)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    // Transform data for AccountsGrid component
    const transformedAccounts = (accounts || []).map((account: any) => ({
      id: account.id,
      slug: account.slug,
      meta_title: account.meta_title,
      game_version: account.game_version,
      platform: account.platform,
      region: account.region,
      wins: account.wins,
      price: account.price,
      average_rating: account.average_rating,
      review_count: account.review_count,
      reviews: account.reviews,
      unique_description: account.unique_description,
      buying_amount: account.buying_amount,
    }));

    return (
      <main className="min-h-screen bg-[#0d071a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <a href="/" className="text-[#FF7828] hover:underline text-sm font-semibold mb-4 inline-block">
              ← Back to Home
            </a>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4">
              <span className="text-white">{regionName} </span>
              <span className="text-[#FF7828]">Marketplace</span>
            </h1>
            <p className="text-gray-400 text-lg">
              {transformedAccounts.length} verified accounts available in {regionName}
            </p>
          </div>

          {/* Accounts Grid */}
          {transformedAccounts.length > 0 ? (
            <AccountsGrid initialAccounts={transformedAccounts} />
          ) : (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800">
              <p className="text-gray-500 text-xl font-medium">
                No accounts available in {regionName} yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching region accounts:', error);
    return (
      <div className="min-h-screen bg-[#0d071a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error Loading Accounts</h1>
          <p className="text-gray-400 mb-6">We couldn't load accounts for this region. Please try again later.</p>
          <a href="/" className="text-[#FF7828] hover:underline font-semibold">
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }
}
