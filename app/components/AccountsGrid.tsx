'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

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
  reviews?: any[];
  unique_description?: string;
  buying_amount?: number;
}

interface AccountsGridProps {
  initialAccounts: Account[];
}

type SortOption = 'newest' | 'price-high' | 'price-low' | 'rating' | 'wins-high' | 'random';

export default function AccountsGrid({ initialAccounts }: AccountsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Shuffle accounts randomly on mount
  const shuffledAccounts = useMemo(() => {
    const shuffled = [...initialAccounts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [initialAccounts]);

  // Initialize from URL params
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('random');
  const [displayCount, setDisplayCount] = useState(12);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20);
  const [minWins, setMinWins] = useState<number>(0);
  const [maxWins, setMaxWins] = useState<number>(5000);
  const [minRating, setMinRating] = useState<number>(0);

  // Load filters from URL params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const game = searchParams.get('game') || 'all';
      const platform = searchParams.get('platform') || 'all';
      const region = searchParams.get('region') || 'all';
      const search = searchParams.get('search') || '';
      const sort = searchParams.get('sort') || 'random';
      const minPriceParam = searchParams.get('minPrice');
      const maxPriceParam = searchParams.get('maxPrice');
      const minWinsParam = searchParams.get('minWins');
      const maxWinsParam = searchParams.get('maxWins');
      const minRatingParam = searchParams.get('minRating');

      setSelectedGame(game);
      setSelectedPlatform(platform);
      setSelectedRegion(region);
      setSearchQuery(search);
      setSortBy(sort as SortOption);
      if (minPriceParam) setMinPrice(parseFloat(minPriceParam));
      if (maxPriceParam) setMaxPrice(parseFloat(maxPriceParam));
      if (minWinsParam) setMinWins(parseFloat(minWinsParam));
      if (maxWinsParam) setMaxWins(parseFloat(maxWinsParam));
      if (minRatingParam) setMinRating(parseFloat(minRatingParam));
    }
  }, [searchParams]);

  // Get unique games, platforms, and regions
  const games = useMemo(() => {
    const unique = Array.from(new Set(initialAccounts.map((a) => a.game_version)));
    return unique.sort();
  }, [initialAccounts]);

  const platforms = useMemo(() => {
    const unique = Array.from(new Set(initialAccounts.map((a) => a.platform)));
    return unique.sort();
  }, [initialAccounts]);

  const regions = useMemo(() => {
    const unique = Array.from(new Set(initialAccounts.map((a) => a.region)));
    return unique.sort();
  }, [initialAccounts]);

  // Get min/max prices
  const priceRange = useMemo(() => {
    if (initialAccounts.length === 0) return { min: 0, max: 20 };
    const prices = initialAccounts.map((a) => a.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [initialAccounts]);

  // Get min/max wins
  const winsRange = useMemo(() => {
    if (initialAccounts.length === 0) return { min: 0, max: 5000 };
    const wins = initialAccounts.map((a) => a.wins);
    return {
      min: Math.floor(Math.min(...wins) / 100) * 100,
      max: Math.ceil(Math.max(...wins) / 100) * 100,
    };
  }, [initialAccounts]);

  // Helper function to update URL params
  const updateFilters = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'all' || value === '' || value === 0) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(`/accounts${newUrl}`);
  };

  // Filter and sort accounts
  const filteredAccounts = useMemo(() => {
    let filtered = shuffledAccounts.filter((account) => {
      const matchesGame = selectedGame === 'all' || account.game_version === selectedGame;
      const matchesPlatform = selectedPlatform === 'all' || account.platform === selectedPlatform;
      const matchesRegion = selectedRegion === 'all' || account.region === selectedRegion;
      const matchesPrice = account.price >= minPrice && account.price <= maxPrice;
      const matchesWins = account.wins >= minWins && account.wins <= maxWins;
      const matchesRating = (account.average_rating || 5) >= minRating;
      const matchesSearch = 
        searchQuery === '' ||
        account.meta_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.game_version.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.region.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesGame &&
        matchesPlatform &&
        matchesRegion &&
        matchesPrice &&
        matchesWins &&
        matchesRating &&
        matchesSearch
      );
    });

    // Sort
    if (sortBy === 'price-high') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-low') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
    } else if (sortBy === 'wins-high') {
      filtered = filtered.sort((a, b) => b.wins - a.wins);
    } else if (sortBy === 'random') {
      // Keep random order
    }

    return filtered;
  }, [shuffledAccounts, selectedGame, selectedPlatform, selectedRegion, sortBy, minPrice, maxPrice, minWins, maxWins, minRating, searchQuery]);

  // Get displayed accounts
  const displayedAccounts = filteredAccounts.slice(0, displayCount);
  const hasMore = displayCount < filteredAccounts.length;

  // Platform badge colors
  const platformColors: Record<string, string> = {
    PS5: 'bg-blue-600',
    'Xbox Series X': 'bg-green-600',
    PC: 'bg-purple-600',
  };

  // Region badge colors
  const regionColors: Record<string, string> = {
    USA: 'text-red-400',
    UK: 'text-blue-400',
    California: 'text-orange-400',
    Texas: 'text-yellow-400',
    'New York': 'text-purple-400',
    London: 'text-pink-400',
    Manchester: 'text-cyan-400',
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
          {filteredAccounts.length} accounts available {selectedGame !== 'all' && `for ${selectedGame}`}
          {selectedRegion !== 'all' && ` in ${selectedRegion}`}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Search Box */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                🔍 Search
              </label>
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateFilters({ search: e.target.value });
                }}
                className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FF7828]/50 transition-colors placeholder-slate-500"
              />
            </div>

            {/* Price Range Filter */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                💵 Price Range
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 mb-2 block">
                    Min: ${minPrice.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={minPrice}
                    onChange={(e) => {
                      const newVal = parseFloat(e.target.value);
                      setMinPrice(newVal);
                      updateFilters({ minPrice: newVal });
                    }}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF7828]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-2 block">
                    Max: ${maxPrice.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min={priceRange.min}
                    max={priceRange.max}
                    value={maxPrice}
                    onChange={(e) => {
                      const newVal = parseFloat(e.target.value);
                      setMaxPrice(newVal);
                      updateFilters({ maxPrice: newVal });
                    }}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF7828]"
                  />
                </div>
              </div>
            </div>

            {/* Wins Range Filter */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                🎯 Wins Range
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 mb-2 block">
                    Min: {minWins.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={winsRange.min}
                    max={winsRange.max}
                    step="100"
                    value={minWins}
                    onChange={(e) => {
                      const newVal = parseFloat(e.target.value);
                      setMinWins(newVal);
                      updateFilters({ minWins: newVal });
                    }}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF7828]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-2 block">
                    Max: {maxWins.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min={winsRange.min}
                    max={winsRange.max}
                    step="100"
                    value={maxWins}
                    onChange={(e) => {
                      const newVal = parseFloat(e.target.value);
                      setMaxWins(newVal);
                      updateFilters({ maxWins: newVal });
                    }}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF7828]"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                ⭐ Min Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FF7828]/50 transition-colors"
              >
                <option value={0}>All Ratings</option>
                <option value={3}>3+ Stars</option>
                <option value={3.5}>3.5+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={5}>5 Stars Only</option>
              </select>
            </div>

            {/* Game Filter */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                🎮 Game Version
              </label>
              <select
                value={selectedGame}
                onChange={(e) => {
                  setSelectedGame(e.target.value);
                  updateFilters({ game: e.target.value });
                  setDisplayCount(12);
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
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                🖥️ Platform
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => {
                  setSelectedPlatform(e.target.value);
                  updateFilters({ platform: e.target.value });
                  setDisplayCount(12);
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

            {/* Region Filter */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                🌍 Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  updateFilters({ region: e.target.value });
                  setDisplayCount(12);
                }}
                className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FF7828]/50 transition-colors"
              >
                <option value="all">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                📊 Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                  updateFilters({ sort: e.target.value });
                  setDisplayCount(12);
                }}
                className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FF7828]/50 transition-colors"
              >
                <option value="random">Random</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="wins-high">Most Wins</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSelectedGame('all');
                setSelectedPlatform('all');
                setSelectedRegion('all');
                setSearchQuery('');
                setSortBy('random');
                setDisplayCount(12);
                setMinPrice(priceRange.min);
                setMaxPrice(priceRange.max);
                setMinWins(winsRange.min);
                setMaxWins(winsRange.max);
                setMinRating(0);
                router.push('/accounts');
              }}
              className="w-full bg-[#FF7828] hover:bg-[#FF7828]/80 text-black font-bold py-3 rounded-lg transition-colors uppercase text-sm"
            >
              🔄 Reset All Filters
            </button>
          </div>
        </div>

        {/* Main Content - Accounts Grid */}
        <div className="lg:col-span-3">
          {filteredAccounts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedAccounts.map((account) => (
                  <Link
                    key={account.id}
                    href={`/accounts/${account.slug}`}
                    className="group relative bg-slate-900/40 border-2 border-slate-600 rounded-2xl p-6 hover:border-[#FF7828] hover:shadow-[0_0_20px_rgba(255,120,40,0.3)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/10 to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Title with Platform Badge */}
                      <div className="flex items-start justify-between mb-4 gap-3">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FF7828] transition-colors line-clamp-2 flex-1">
                          {account.meta_title}
                        </h3>
                        <span
                          className={`${platformColors[account.platform] || 'bg-gray-600'} text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap flex-shrink-0`}
                        >
                          {account.platform}
                        </span>
                      </div>

                      {/* Region Highlight - PROMINENT */}
                      <div className={`mb-4 pb-4 border-b border-slate-700 ${regionColors[account.region] || 'text-gray-400'}`}>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Region</p>
                        <p className="text-lg font-black">{account.region} 📍</p>
                      </div>

                      {/* Ratings and Reviews */}
                      {account.average_rating && account.review_count ? (
                        <div className="flex items-center gap-3 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-[#FF7828] font-bold">{account.average_rating.toFixed(1)}</span>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={
                                    i < Math.round(account.average_rating || 0) ? 'text-[#FF7828]' : 'text-gray-600'
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="text-gray-400">
                            ({account.review_count} {account.review_count === 1 ? 'review' : 'reviews'})
                          </span>
                        </div>
                      ) : null}

                      {/* Stats Grid - 2x2 */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {/* Game Version */}
                        <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1 tracking-wider">Game</p>
                          <p className="text-sm font-bold text-white">{account.game_version}</p>
                        </div>

                        {/* Wins */}
                        <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1 tracking-wider">Wins</p>
                          <p className="text-sm font-bold text-[#FF7828]">{account.wins.toLocaleString()}</p>
                        </div>

                        {/* Price */}
                        <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700/50 col-span-2">
                          <p className="text-[10px] uppercase text-slate-500 font-semibold mb-1 tracking-wider">Price</p>
                          <p className="text-lg font-black text-white">${account.price.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="flex justify-center">
                        <button className="w-full bg-[#FF7828] hover:bg-[#E86B1F] text-black font-bold px-4 py-3 text-sm hover:shadow-[0_0_15px_rgba(255,120,40,0.4)] transition-all duration-300 hover:scale-105 rounded">
                          VIEW DETAILS →
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mb-8">
                  <button
                    onClick={() => setDisplayCount((prev) => prev + 12)}
                    className="bg-[#FF7828] hover:bg-[#E86B1F] text-black font-bold px-16 py-4 text-lg hover:shadow-[0_0_25px_rgba(255,120,40,0.5)] transition-all duration-300 hover:scale-105 rounded"
                  >
                    LOAD MORE ({filteredAccounts.length - displayedAccounts.length} remaining)
                  </button>
                </div>
              )}

              {/* Results counter */}
              <div className="text-center text-slate-400 text-sm py-8 border-t border-slate-700">
                Showing {displayedAccounts.length} of {filteredAccounts.length} accounts
                {selectedGame !== 'all' && ` • Game: ${selectedGame}`}
                {selectedPlatform !== 'all' && ` • Platform: ${selectedPlatform}`}
                {selectedRegion !== 'all' && ` • Region: ${selectedRegion}`}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800">
              <p className="text-gray-500 text-xl font-medium">
                🔍 No accounts match your filters. Try adjusting your selection.
              </p>
              <button
                onClick={() => {
                  setSelectedGame('all');
                  setSelectedPlatform('all');
                  setSelectedRegion('all');
                  setSearchQuery('');
                  setSortBy('random');
                  setMinPrice(priceRange.min);
                  setMaxPrice(priceRange.max);
                  setMinWins(winsRange.min);
                  setMaxWins(winsRange.max);
                  setMinRating(0);
                  router.push('/accounts');
                }}
                className="mt-6 bg-[#FF7828] hover:bg-[#E86B1F] text-black font-bold px-8 py-2 rounded transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
