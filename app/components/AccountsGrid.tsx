'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Account {
  id: string;
  slug: string;
  meta_title: string;
  game_version: string;
  platform: string;
  wins: number;
  price: number;
  average_rating?: number;
  review_count?: number;
  reviews?: any[];
  unique_description?: string;
  buying_amount?: number;
}

interface AccountsGridProps {
  initialAccounts: Account[];
}

type SortOption = 'newest' | 'price-high' | 'price-low';

export default function AccountsGrid({ initialAccounts }: AccountsGridProps) {
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [displayCount, setDisplayCount] = useState(12);

  // Get unique games and platforms
  const games = useMemo(() => {
    const unique = Array.from(new Set(initialAccounts.map((a) => a.game_version)));
    return unique.sort();
  }, [initialAccounts]);

  const platforms = useMemo(() => {
    const unique = Array.from(new Set(initialAccounts.map((a) => a.platform)));
    return unique.sort();
  }, [initialAccounts]);

  // Filter and sort accounts
  const filteredAccounts = useMemo(() => {
    let filtered = initialAccounts.filter((account) => {
      const matchesGame = selectedGame === 'all' || account.game_version === selectedGame;
      const matchesPlatform = selectedPlatform === 'all' || account.platform === selectedPlatform;
      return matchesGame && matchesPlatform;
    });

    // Sort
    if (sortBy === 'price-high') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-low') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else {
      // newest (keep original order)
      filtered = filtered;
    }

    return filtered;
  }, [initialAccounts, selectedGame, selectedPlatform, sortBy]);

  // Get displayed accounts
  const displayedAccounts = filteredAccounts.slice(0, displayCount);
  const hasMore = displayCount < filteredAccounts.length;

  // Platform badge colors
  const platformColors: Record<string, string> = {
    PS5: 'bg-blue-600',
    Xbox: 'bg-green-600',
    PC: 'bg-purple-600',
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4">
          <span className="text-white">Featured </span>
          <span className="text-[#FF7828]">Marketplace</span>
        </h2>
        <p className="text-gray-400 text-lg">
          {filteredAccounts.length} accounts available
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 mb-12 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Game Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
              Game Version
            </label>
            <select
              value={selectedGame}
              onChange={(e) => {
                setSelectedGame(e.target.value);
                setDisplayCount(12); // Reset pagination
              }}
              className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FF7828]/50 transition-colors"
            >
              <option value="all">All Games</option>
              {games.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
              Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => {
                setSelectedPlatform(e.target.value);
                setDisplayCount(12); // Reset pagination
              }}
              className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FF7828]/50 transition-colors"
            >
              <option value="all">All Platforms</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                setDisplayCount(12); // Reset pagination
              }}
              className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FF7828]/50 transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedGame('all');
                setSelectedPlatform('all');
                setSortBy('newest');
                setDisplayCount(12);
              }}
              className="w-full bg-slate-700/50 hover:bg-slate-600/50 border border-slate-700/50 text-white font-semibold py-2.5 rounded-lg transition-colors uppercase text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      {filteredAccounts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedAccounts.map((account) => (
              <div
                key={account.id}
                className="group relative bg-slate-900/40 border-2 border-slate-600 rounded-2xl p-6 hover:border-[#FF7828] hover:shadow-[0_0_20px_rgba(255,120,40,0.3)] transition-all duration-300 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/10 to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Platform Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FF7828] transition-colors line-clamp-2 flex-1">
                      {account.meta_title}
                    </h3>
                    <span
                      className={`${platformColors[account.platform] || 'bg-gray-600'} text-white text-xs font-bold px-3 py-1 rounded-full ml-2 whitespace-nowrap flex-shrink-0`}
                    >
                      {account.platform}
                    </span>
                  </div>

                  {/* Ratings and Reviews */}
                  {account.average_rating && account.review_count ? (
                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-[#FF7828] font-bold">{account.average_rating.toFixed(1)}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.round(account.average_rating || 0) ? 'text-[#FF7828]' : 'text-gray-600'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-400">({account.review_count} {account.review_count === 1 ? 'review' : 'reviews'})</span>
                    </div>
                  ) : null}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Game Version */}
                    <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1 tracking-wider">
                        Game
                      </p>
                      <p className="text-base font-bold text-white">{account.game_version}</p>
                    </div>

                    {/* Wins */}
                    <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1 tracking-wider">
                        Wins
                      </p>
                      <p className="text-base font-bold text-[#FF7828]">{account.wins}</p>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Price</p>
                      <p className="text-3xl font-black text-white">${account.price}</p>
                    </div>
                    <Link
                      href={`/accounts/${account.slug}`}
                      className="polygon-btn bg-[#FF7828] text-black font-bold px-6 py-3 text-sm hover:bg-[#E86B1F] hover:shadow-[0_0_15px_rgba(255,120,40,0.4)] transition-all duration-300 hover:scale-105"
                    >
                      VIEW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mb-8">
              <button
                onClick={() => setDisplayCount((prev) => prev + 12)}
                className="polygon-btn bg-[#FF7828] text-black font-bold px-16 py-4 text-lg hover:bg-[#E86B1F] hover:shadow-[0_0_25px_rgba(255,120,40,0.5)] transition-all duration-300 hover:scale-105"
              >
                LOAD MORE
              </button>
            </div>
          )}

          {/* Results counter */}
          <div className="text-center text-slate-400 text-sm">
            Showing {displayedAccounts.length} of {filteredAccounts.length} accounts
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800">
          <p className="text-gray-500 text-xl font-medium">
            No accounts match your filters. Try adjusting your selection.
          </p>
        </div>
      )}
    </div>
  );
}
