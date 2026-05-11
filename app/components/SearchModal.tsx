'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface SearchResult {
  id: string;
  slug: string;
  meta_title: string;
  game_version: string;
  platform: string;
  wins: number;
  price: number;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus on search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search functionality
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cod_accounts')
        .select('id, slug, meta_title, game_version, platform, wins, price')
        .or(`meta_title.ilike.%${query}%,game_version.ilike.%${query}%,platform.ilike.%${query}%`)
        .limit(8);

      if (error) {
        console.error('Search error:', error);
        setResults([]);
      } else {
        setResults(data || []);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[999] flex items-start justify-center pt-20 px-4">
        <div className="w-full max-w-2xl bg-[#1a1a3e] border border-[#FF7828]/30 rounded-2xl shadow-2xl shadow-[#FF7828]/20 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {/* Search Input */}
          <div className="bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e] border-b border-[#FF7828]/20 p-4 md:p-6">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF7828]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search accounts, games, platforms..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-[#0d071a] border border-[#FF7828]/30 text-white placeholder-gray-500 pl-12 pr-4 py-3 md:py-4 rounded-lg focus:outline-none focus:border-[#FF7828] focus:ring-2 focus:ring-[#FF7828]/30 transition-all text-sm md:text-base"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-lg font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 md:p-8 text-center">
                <div className="inline-block">
                  <div className="w-8 h-8 border-3 border-[#FF7828]/30 border-t-[#FF7828] rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-400 mt-3 text-sm">Searching...</p>
              </div>
            ) : searchQuery.trim() === '' ? (
              <div className="p-6 md:p-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto text-gray-500 mb-3 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-gray-400 text-sm md:text-base">Type to search accounts...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-6 md:p-8 text-center">
                <p className="text-gray-400 text-sm md:text-base">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="divide-y divide-[#FF7828]/10">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={`/accounts/${result.slug}`}
                    onClick={onClose}
                    className="block p-4 md:p-5 hover:bg-[#2d1b4e]/40 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm md:text-base group-hover:text-[#FF7828] transition-colors line-clamp-2">
                          {result.meta_title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="inline-block bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded">
                            {result.game_version}
                          </span>
                          <span className="inline-block bg-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded">
                            {result.platform}
                          </span>
                          <span className="inline-block bg-green-600/30 text-green-300 text-xs px-2 py-1 rounded">
                            {result.wins} wins
                          </span>
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <p className="text-[#FF7828] font-bold text-sm md:text-base">
                          ${result.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="border-t border-[#FF7828]/10 bg-[#1a1a3e]/50 px-4 md:px-6 py-3 text-center text-xs text-gray-400">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
