import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { SchemaMarkup } from '../../components/SchemaMarkup'

// Cache revalidation time (1 hour). PSEO ke liye best hai.
export const revalidate = 3600;

// Dynamic SEO Metadata generate karne ke liye
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';
  
  const { data } = await supabase
    .from('cod_accounts')
    .select('meta_title, meta_description, game_version, platform, wins, region, price')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!data) return { title: 'Account Not Found' };

  const canonicalUrl = `${baseUrl}/accounts/${resolvedParams.slug}`;

  return {
    title: data.meta_title,
    description: data.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.meta_title,
      description: data.meta_description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'BattleGaming',
      images: [
        {
          url: `${baseUrl}/logo.svg`,
          width: 1200,
          height: 630,
          alt: 'BattleGaming - Premium Call of Duty Accounts',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta_title,
      description: data.meta_description,
      images: [`${baseUrl}/logo.svg`],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
}

export default async function AccountPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';

  // Supabase se data fetch kar rahe hain
  const { data: account, error } = await supabase
    .from('cod_accounts')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  // Agar account nahi mila to Next.js ka default 404 page dikhayega
  if (error || !account) {
    notFound();
  }

  const canonicalUrl = `${baseUrl}/accounts/${resolvedParams.slug}`;

  return (
    <>
      {/* Canonical Tag for duplicate prevention */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* JSON-LD Schema Markup */}
      <SchemaMarkup
        product={{
          name: account.meta_title,
          description: account.meta_description,
          price: account.price,
          url: canonicalUrl,
          image: `${baseUrl}/logo.svg`,
          game: account.game_version,
          platform: account.platform,
          wins: account.wins,
          region: account.region,
        }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      <main className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-8">
          Home &gt; Accounts &gt; {account.game_version} &gt; <span className="text-blue-400">{account.platform}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {account.meta_title}
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              {account.page_content}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Game</p>
                <p className="font-semibold">{account.game_version}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Platform</p>
                <p className="font-semibold text-blue-400">{account.platform}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Guaranteed Wins</p>
                <p className="font-semibold text-emerald-400">{account.wins}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">Delivery</p>
                <p className="font-semibold text-purple-400">{account.delivery_time}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-black/50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Price</p>
                  <p className="text-4xl font-bold">${account.price.toFixed(2)}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${account.stock_status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {account.stock_status}
                </div>
              </div>

              <button 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                disabled={account.stock_status !== 'available'}
              >
                {account.stock_status === 'available' ? 'Buy Now' : 'Out of Stock'}
              </button>

              <div className="space-y-3 text-sm text-slate-400">
                <p className="flex items-center gap-2">
                  ✓ 100% Secure Transaction
                </p>
                <p className="flex items-center gap-2">
                  ✓ Full Access Details Provided
                </p>
                <p className="flex items-center gap-2">
                  ✓ Lifetime Support Guarantee
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
    </>
  )
}