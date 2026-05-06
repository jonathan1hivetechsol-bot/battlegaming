'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RegionPage {
  name: string;
  slug: string;
  description: string;
}

interface RegionGroup {
  region: string;
  country: string;
  pages: RegionPage[];
}

const regions: RegionGroup[] = [
  {
    region: 'USA',
    country: 'United States',
    pages: [
      { name: 'USA Accounts', slug: '/accounts/usa-all', description: 'Premium US server accounts' },
      { name: 'California', slug: '/accounts/california-all', description: 'West Coast ultra-low latency' },
      { name: 'Texas', slug: '/accounts/texas-all', description: 'Central US high performance' },
      { name: 'New York', slug: '/accounts/newyork-all', description: 'East Coast premium servers' },
    ],
  },
  {
    region: 'UK',
    country: 'United Kingdom',
    pages: [
      { name: 'UK Accounts', slug: '/accounts/uk-all', description: 'EU/UK low-latency servers' },
      { name: 'London', slug: '/accounts/london-all', description: 'London data center <10ms ping' },
      { name: 'Manchester', slug: '/accounts/manchester-all', description: 'Northern UK servers' },
    ],
  },
];

export default function PagesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div className="relative group pointer-events-auto">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="relative group pointer-events-auto text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)] flex items-center gap-2"
      >
        Pages
        <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Main Dropdown Menu */}
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-0 w-screen max-w-6xl bg-[#0d071a]/98 backdrop-blur-xl border border-[#FF7828]/30 rounded-xl shadow-2xl shadow-[#FF7828]/20 z-50 overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8">
            {/* Other Pages Section */}
            <div className="border-r border-[#FF7828]/20 pr-6">
              <h3 className="text-[#FF7828] font-bold text-sm uppercase tracking-widest mb-4 drop-shadow-[0_0_10px_rgba(255,120,40,0.5)]">Featured Pages</h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-gray-300 hover:text-[#FF7828] transition-colors duration-200 text-sm hover:pl-2 duration-200">
                  ✓ About Us
                </Link>
                <Link href="/tournament" className="block text-gray-300 hover:text-[#FF7828] transition-colors duration-200 text-sm hover:pl-2 duration-200">
                  ✓ Tournament
                </Link>
                <Link href="/news" className="block text-gray-300 hover:text-[#FF7828] transition-colors duration-200 text-sm hover:pl-2 duration-200">
                  ✓ Latest News
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-[#FF7828] transition-colors duration-200 text-sm hover:pl-2 duration-200">
                  ✓ Contact Support
                </Link>
                <Link href="/privacy" className="block text-gray-300 hover:text-[#FF7828] transition-colors duration-200 text-sm hover:pl-2 duration-200">
                  ✓ Privacy Policy
                </Link>
                <Link href="/terms" className="block text-gray-300 hover:text-[#FF7828] transition-colors duration-200 text-sm hover:pl-2 duration-200">
                  ✓ Terms of Service
                </Link>
              </div>
            </div>

            {/* Regional Pages Sections */}
            {regions.map((regionGroup) => (
              <div key={regionGroup.region} className="border-r border-[#FF7828]/20 pr-6 last:border-r-0">
                <h3 className="text-[#FF7828] font-bold text-sm uppercase tracking-widest mb-4 drop-shadow-[0_0_10px_rgba(255,120,40,0.5)]">
                  🌍 {regionGroup.region}
                </h3>
                <div className="space-y-3">
                  {regionGroup.pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={page.slug}
                      className="block group/item hover:text-[#FF7828] transition-all duration-200"
                    >
                      <div className="text-sm font-semibold text-gray-300 group-hover/item:text-[#FF7828] transition-colors">
                        → {page.name}
                      </div>
                      <div className="text-xs text-gray-500 group-hover/item:text-gray-400 ml-4 transition-colors">
                        {page.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Stats Section */}
            <div className="md:col-span-3 border-t border-[#FF7828]/20 pt-6 mt-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-[#1a1a3e]/50 rounded-lg p-3">
                  <div className="text-[#FF7828] font-bold text-lg">1260+</div>
                  <div className="text-xs text-gray-400">Verified Pages</div>
                </div>
                <div className="bg-[#1a1a3e]/50 rounded-lg p-3">
                  <div className="text-[#FF7828] font-bold text-lg">7</div>
                  <div className="text-xs text-gray-400">Regions</div>
                </div>
                <div className="bg-[#1a1a3e]/50 rounded-lg p-3">
                  <div className="text-[#FF7828] font-bold text-lg">99.8%</div>
                  <div className="text-xs text-gray-400">Delivery Rate</div>
                </div>
                <div className="bg-[#1a1a3e]/50 rounded-lg p-3">
                  <div className="text-[#FF7828] font-bold text-lg">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
