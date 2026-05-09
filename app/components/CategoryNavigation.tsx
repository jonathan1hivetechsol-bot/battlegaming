'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryNavigation() {
  const games = [
    'Black Ops 7',
    'Black Ops 6',
    'Modern Warfare 3',
    'Warzone',
  ];

  const platforms = ['PS5', 'Xbox Series X', 'PC'];
  const regions = ['USA', 'UK', 'California', 'Texas', 'New York', 'London', 'Manchester'];

  const searchParams = useSearchParams();
  const currentGame = searchParams.get('game');
  const currentPlatform = searchParams.get('platform');
  const currentRegion = searchParams.get('region');

  // Helper to build URLs with multiple filters preserved
  const buildFilterUrl = (filterType: string, filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (filterValue === 'all') {
      params.delete(filterType);
    } else {
      params.set(filterType, filterValue);
    }
    const queryString = params.toString();
    return `/accounts${queryString ? `?${queryString}` : ''}`;
  };

  const isFilterActive = (filterType: string, filterValue: string) => {
    if (filterValue === 'all') {
      return !searchParams.has(filterType);
    }
    return searchParams.get(filterType) === filterValue;
  };

  return (
    <section className="py-8 border-b border-[#FF7828]/20 mb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Games */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              🎮 Filter by Game
            </h3>
            <div className="flex flex-wrap gap-2">
              {games.map((game) => (
                <Link
                  key={game}
                  href={buildFilterUrl('game', game)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 border ${
                    isFilterActive('game', game)
                      ? 'bg-[#FF7828] text-white border-[#FF7828]'
                      : 'text-gray-300 bg-[#1a1a3e]/60 border-[#FF7828]/30 hover:border-[#FF7828] hover:text-[#FF7828] hover:bg-[#1a1a3e]'
                  }`}
                >
                  {game}
                </Link>
              ))}
              <Link
                href={buildFilterUrl('game', 'all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 border ${
                  isFilterActive('game', 'all')
                    ? 'bg-[#FF7828] text-white border-[#FF7828]'
                    : 'text-gray-300 bg-[#1a1a3e]/60 border-[#FF7828]/30 hover:border-[#FF7828] hover:text-[#FF7828]'
                }`}
              >
                All Games
              </Link>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              🖥️ Filter by Platform
            </h3>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Link
                  key={platform}
                  href={buildFilterUrl('platform', platform)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 border ${
                    isFilterActive('platform', platform)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'text-gray-300 bg-[#1a1a3e]/60 border-blue-500/30 hover:border-blue-500 hover:text-blue-400 hover:bg-[#1a1a3e]'
                  }`}
                >
                  {platform}
                </Link>
              ))}
              <Link
                href={buildFilterUrl('platform', 'all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 border ${
                  isFilterActive('platform', 'all')
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'text-gray-300 bg-[#1a1a3e]/60 border-blue-500/30 hover:border-blue-500 hover:text-blue-400'
                }`}
              >
                All Platforms
              </Link>
            </div>
          </div>

          {/* Regions */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              🌍 Filter by Region
            </h3>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Link
                  key={region}
                  href={buildFilterUrl('region', region)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 border ${
                    isFilterActive('region', region)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'text-gray-300 bg-[#1a1a3e]/60 border-green-500/30 hover:border-green-500 hover:text-green-400 hover:bg-[#1a1a3e]'
                  }`}
                >
                  {region}
                </Link>
              ))}
              <Link
                href={buildFilterUrl('region', 'all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 border ${
                  isFilterActive('region', 'all')
                    ? 'bg-green-600 text-white border-green-600'
                    : 'text-gray-300 bg-[#1a1a3e]/60 border-green-500/30 hover:border-green-500 hover:text-green-400'
                }`}
              >
                All Regions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
