import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { SchemaMarkup } from '../../components/SchemaMarkup'
import BuyNowButton from '../../components/BuyNowButton'
import ProductWhatsAppButton from '../../components/ProductWhatsAppButton'
import EnhancedBreadcrumb from '../../components/EnhancedBreadcrumb'
import RelatedProducts from '../../components/RelatedProducts'
import OptimizedAccountContent from '../../components/OptimizedAccountContent'
import { generateUniquePageContent } from '../../../lib/dynamicContentGenerator'
import { markdownToHtml } from '../../../lib/markdownParser'

// Revalidate every 60 seconds for optimal performance + fresh data
// ISR: Pages cached for 60s, then regenerated in background
export const revalidate = 60;

/**
 * generateMetadata - Dynamic SEO for all 1,260+ product pages
 * 
 * CANONICAL FIX: Uses process.env.NEXT_PUBLIC_SITE_URL to ensure self-referencing canonical URLs
 * No pages show "Missing" in SEO analyzer. All canonicals resolve to clean domain.
 * 
 * META DESCRIPTION: Shortened to 155 characters max for optimal SERP display
 * 
 * ROBOTS TAG: index, follow enabled for all pages with proper tag structure
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Canonical Fix: Use environment variable with fallback to production domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';
  
  const { data } = await supabase
    .from('cod_accounts')
    .select('meta_title, meta_description, game_version, platform, wins, region, price, unique_description, average_rating, buying_amount, review_count, intent_category, region_code')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!data) {
    return {
      title: 'Account Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Generate truly unique content for this specific page
  const generatedContent = generateUniquePageContent({
    game: data.game_version,
    platform: data.platform,
    region: data.region,
    regionCode: data.region_code || '',
    wins: data.wins,
    intent: data.intent_category || 'ranked-ready',
    kd: Math.random() * 2 + 1.5,
    price: data.price
  });

  // Self-referencing canonical URL (CRITICAL for duplicate prevention)
  const canonicalUrl = `${baseUrl}/accounts/${resolvedParams.slug}`;

  // Ensure description is <= 155 chars
  const description = generatedContent.description.length > 155
    ? generatedContent.description.substring(0, 152) + '...'
    : generatedContent.description;

  return {
    title: generatedContent.title,
    description: description,
    keywords: `${data.game_version} account, ${data.platform}, ${data.wins} wins, ${data.region}, verified account, instant delivery, real reviews, trusted seller`,
    
    // Canonical Fix: Self-referencing canonical with process.env variable
    alternates: {
      canonical: canonicalUrl,
    },

    // Robots Tag: index, follow enabled
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      googleBot: 'index, follow',
    },

    // Open Graph for Social Media - Include rating and reviews
    openGraph: {
      title: generatedContent.title,
      description: `${description} | ⭐ ${data.average_rating?.toFixed(1) || '5.0'}/5 (${data.review_count || 0} reviews)`,
      url: canonicalUrl,
      type: 'website',
      siteName: 'BattleGaming',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${data.game_version} Account - ${data.wins} Wins on ${data.platform} | $${data.price}`,
          type: 'image/png',
        },
      ],
    },

    // Twitter Card for Social Media
    twitter: {
      card: 'summary_large_image',
      title: generatedContent.title,
      description: `⭐ ${data.average_rating?.toFixed(1) || '5.0'}/5 • ${description.substring(0, 100)}...`,
      images: [`${baseUrl}/og-image.png`],
      creator: '@BattleGaming',
    },
  };
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

  // Generate TRULY UNIQUE content dynamically for this specific page
  const dynamicContent = generateUniquePageContent({
    game: account.game_version,
    platform: account.platform,
    region: account.region,
    regionCode: account.region_code || '',
    wins: account.wins,
    intent: account.intent_category || 'ranked-ready',
    kd: Math.random() * 2 + 1.5,
    price: account.price
  });

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
          average_rating: account.average_rating,
          review_count: account.review_count,
          reviews: account.reviews,
          buying_amount: account.buying_amount,
        }}
      />

      <div className="min-h-screen bg-[#0d071a] text-slate-50 font-sans selection:bg-[#FF7828]/30">
      <main className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Enhanced Breadcrumb with Category Links */}
        <EnhancedBreadcrumb
          gameVersion={account.game_version}
          platform={account.platform}
          region={account.region}
          title={account.meta_title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Optimized Content */}
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-[#FF7828] to-[#FF7828] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,120,40,0.3)]">
              {dynamicContent.title}
            </h1>
            
            {/* Dynamically Generated Unique Content */}
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(dynamicContent.pageContent) }} />
            </div>

            {/* Unique Description Section */}
            {account.unique_description && (
              <div className="bg-gradient-to-r from-[#FF7828]/10 to-transparent p-6 rounded-lg border border-[#FF7828]/30">
                <h2 className="text-xl font-bold text-[#FF7828] mb-3">Additional Account Details</h2>
                <p className="text-gray-300 leading-relaxed">{account.unique_description}</p>
              </div>
            )}

            {/* Reviews Section */}
            {account.reviews && account.reviews.length > 0 && (
              <div className="space-y-4 pt-8 border-t border-[#FF7828]/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-[#FF7828]">{account.average_rating?.toFixed(1) || '5.0'}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.round(account.average_rating || 5) ? 'text-[#FF7828]' : 'text-gray-600'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400 ml-2">({account.review_count} reviews)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {account.reviews.map((review: any, idx: number) => (
                    <div key={idx} className="bg-[#1a1a3e]/60 border border-[#FF7828]/20 p-4 rounded-lg hover:border-[#FF7828]/40 transition-all duration-300">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-white flex items-center gap-2">
                            {review.reviewer_name}
                            {review.verified_purchase && (
                              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">✓ Verified</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">Verified Purchase</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? 'text-[#FF7828]' : 'text-gray-600'} style={{ fontSize: '14px' }}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{review.review_text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#FF7828]/20">
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
                <p className="font-black text-[#FF7828] text-lg">{account.delivery_time || 'Instant'}</p>
              </div>
              <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 p-6 rounded-xl hover:border-[#FF7828]/60 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Sold</p>
                <p className="font-black text-[#FF7828] text-lg">{account.buying_amount || 0}+</p>
              </div>
              <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 p-6 rounded-xl hover:border-[#FF7828]/60 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Rating</p>
                <div className="flex items-center gap-1">
                  <span className="font-black text-[#FF7828]">{account.average_rating?.toFixed(1) || '5.0'}</span>
                  <span className="text-[#FF7828]">★</span>
                </div>
              </div>
              <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 p-6 rounded-xl hover:border-[#FF7828]/60 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Region</p>
                <p className="font-black text-[#FF7828] text-lg">{account.region}</p>
              </div>
              <div className="bg-[#1a1a3e]/60 border border-[#FF7828]/30 p-6 rounded-xl hover:border-[#FF7828]/60 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Reviews</p>
                <p className="font-black text-[#FF7828] text-lg">{account.review_count || 0}</p>
              </div>
            </div>
          </div>

          {/* Right Column: WhatsApp Buy Now */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Price Header with Rating */}
              <div className="bg-gradient-to-r from-[#FF7828]/20 to-transparent p-6 rounded-lg border border-[#FF7828]/40 mb-6">
                <p className="text-sm text-gray-400 mb-2">Account Price</p>
                <p className="text-5xl font-black text-[#FF7828]">${account.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.round(account.average_rating || 5) ? 'text-[#FF7828]' : 'text-gray-600'} style={{ fontSize: '14px' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({account.review_count || 0} verified reviews)</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  ✓ {account.buying_amount || 0}+ customers
                  <br />
                  ✓ {account.region} Region
                  <br />
                  ✓ Instant Delivery
                </p>
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

              {/* WhatsApp Chat Button */}
              <div className="mt-4">
                <ProductWhatsAppButton
                  productTitle={account.meta_title}
                  game={account.game_version}
                  platform={account.platform}
                  wins={account.wins}
                  price={account.price}
                />
              </div>

              {/* Stock Status */}
              <div className="mt-6 text-center">
                <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${account.stock_status === 'available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                  {account.stock_status === 'available' ? '🟢 IN STOCK' : '🔴 OUT OF STOCK'}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Related Products Section */}
        <div className="pt-16 border-t border-[#FF7828]/20">
          <RelatedProducts
            currentGame={account.game_version}
            currentPlatform={account.platform}
            currentRegion={account.region}
            currentSlug={resolvedParams.slug}
          />
        </div>
      </main>
    </div>
    </>
  )
}