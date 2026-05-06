import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { SchemaMarkup } from '../../components/SchemaMarkup'
import BuyNowButton from '../../components/BuyNowButton'

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

      <div className="min-h-screen bg-[#0d071a] text-slate-50 font-sans selection:bg-[#FF7828]/30">
      <main className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-[#FF7828] transition-colors">Home</a> &gt; <a href="/accounts/usa-all" className="hover:text-[#FF7828] transition-colors">Accounts</a> &gt; <span className="text-[#FF7828]">{account.game_version}</span> &gt; <span className="text-[#FF7828]">{account.platform}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-[#FF7828] to-[#FF7828] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,120,40,0.3)]">
              {account.meta_title}
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed bg-[#1a1a3e]/40 p-6 rounded-lg border border-[#FF7828]/20">
              {account.page_content}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 p-6 rounded-xl hover:border-[#FF7828]/60 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Game</p>
                <p className="font-black text-[#FF7828] text-lg">{account.game_version}</p>
              </div>
              <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 p-6 rounded-xl hover:border-[#FF7828]/60 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Platform</p>
                <p className="font-black text-[#FF7828] text-lg">{account.platform}</p>
              </div>
              <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 p-6 rounded-xl hover:border-[#FF7828]/60 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Wins</p>
                <p className="font-black text-[#FF7828] text-lg">{account.wins}</p>
              </div>
              <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 p-6 rounded-xl hover:border-[#FF7828]/60 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Delivery</p>
                <p className="font-black text-[#FF7828] text-lg">{account.delivery_time}</p>
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp Buy Now */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Price Header */}
              <div className="bg-gradient-to-r from-[#FF7828]/20 to-transparent p-6 rounded-lg border border-[#FF7828]/40 mb-6">
                <p className="text-sm text-gray-400 mb-2">Starting Price</p>
                <p className="text-5xl font-black text-[#FF7828]">${account.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-2">Region: {account.region}</p>
              </div>

              {/* Buy Now Button */}
              <BuyNowButton
                gameVersion={account.game_version}
                wins={account.wins}
                region={account.region}
                price={account.price}
                platform={account.platform}
                slug={resolvedParams.slug}
              />

              {/* Stock Status */}
              <div className="mt-6 text-center">
                <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${account.stock_status === 'available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                  {account.stock_status === 'available' ? '🟢 IN STOCK' : '🔴 OUT OF STOCK'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
    </>
  )
}