'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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

interface RelatedProductsProps {
  currentGame: string;
  currentPlatform: string;
  currentRegion: string;
  currentSlug: string;
}

export default function RelatedProducts({
  currentGame,
  currentPlatform,
  currentRegion,
  currentSlug,
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Fetch products with same game version, platform, or region
        const { data, error } = await supabase
          .from('cod_accounts')
          .select('id, slug, meta_title, game_version, platform, wins, price, region, average_rating, review_count')
          .or(
            `game_version.eq.${currentGame},platform.eq.${currentPlatform},region.eq.${currentRegion}`
          )
          .neq('slug', currentSlug)
          .limit(6);

        if (!error && data) {
          // Sort by relevance: same game > same platform > same region
          const sorted = data.sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;

            if (a.game_version === currentGame) scoreA += 3;
            if (a.platform === currentPlatform) scoreA += 2;
            if (a.region === currentRegion) scoreA += 1;

            if (b.game_version === currentGame) scoreB += 3;
            if (b.platform === currentPlatform) scoreB += 2;
            if (b.region === currentRegion) scoreB += 1;

            return scoreB - scoreA;
          });

          setRelatedProducts(sorted.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching related products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentGame, currentPlatform, currentRegion, currentSlug]);

  if (loading) {
    return (
      <div className="py-12">
        <div className="h-8 bg-[#FF7828]/20 rounded w-48 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#1a1a3e]/40 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-black text-white mb-8">
        🎮 Related Accounts You Might Like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/accounts/${product.slug}`}
            className="group block bg-[#1a1a3e]/60 border border-[#FF7828]/20 rounded-lg overflow-hidden hover:border-[#FF7828]/60 hover:bg-[#1a1a3e]/80 transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-5 space-y-4">
              {/* Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-[#FF7828] transition-colors line-clamp-2">
                {product.meta_title}
              </h3>

              {/* Game & Platform */}
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-[#FF7828]/20 text-[#FF7828] text-xs font-bold rounded-full">
                  {product.game_version}
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full">
                  {product.platform}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Wins:</span>
                  <span className="font-bold text-[#FF7828]">{product.wins.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Region:</span>
                  <span className="font-bold text-white">{product.region}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price:</span>
                  <span className="font-black text-[#FF7828] text-lg">${product.price}</span>
                </div>
              </div>

              {/* Rating */}
              {product.average_rating && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#FF7828]/20">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.round(product.average_rating || 0)
                            ? 'text-[#FF7828]'
                            : 'text-gray-600'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    ({product.review_count || 0})
                  </span>
                </div>
              )}

              {/* CTA */}
              <div className="pt-2">
                <span className="inline-block px-4 py-2 bg-[#FF7828] text-black font-bold rounded hover:bg-[#FF7828]/80 transition-colors">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
