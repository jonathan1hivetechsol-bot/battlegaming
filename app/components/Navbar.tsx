'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import SearchModal from './SearchModal';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, userProfile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMobileRegion, setActiveMobileRegion] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const regionData = [
    {
      region: 'USA',
      country: 'United States',
      icon: '🇺🇸',
      pages: [
        { name: 'USA Accounts', slug: '/accounts/region/usa' },
        { name: 'California', slug: '/accounts/region/california' },
        { name: 'Texas', slug: '/accounts/region/texas' },
        { name: 'New York', slug: '/accounts/region/newyork' },
      ],
    },
    {
      region: 'UK',
      country: 'United Kingdom',
      icon: '🇬🇧',
      pages: [
        { name: 'UK Accounts', slug: '/accounts/region/uk' },
        { name: 'London', slug: '/accounts/region/london' },
        { name: 'Manchester', slug: '/accounts/region/manchester' },
      ],
    },
  ];

  const featuredPages = [
    { name: 'About Us', slug: '/about' },
    { name: 'Tournament', slug: '/tournament' },
    { name: 'Latest News', slug: '/news' },
    { name: 'Contact Support', slug: '/contact' },
    { name: 'Privacy Policy', slug: '/privacy' },
    { name: 'Terms of Service', slug: '/terms' },
  ];

  return (
    <nav className="sticky top-0 z-[999] pointer-events-auto bg-[#0d071a]/85 bg-gradient-to-r from-[#1a1a3e]/95 via-[#2d1b4e]/95 to-[#1a1a3e]/95 backdrop-blur-xl border-b border-[#FF7828]/40 shadow-xl shadow-[#FF7828]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 w-32">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/logo.svg"
                alt="BattleGaming"
                width={140}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </a>
          </div>

          {/* ========== DESKTOP NAVIGATION ========== */}
          <div className="hidden md:flex items-center gap-12 pointer-events-auto">
            {/* Home Link */}
            <a href="/" className="relative group pointer-events-auto">
              <span className="text-white font-semibold tracking-wide text-sm uppercase group-hover:text-[#FF7828] group-hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)] transition-all duration-300">
                Home
              </span>
              <div className="absolute -bottom-2 left-0 w-2 h-2 bg-[#FF7828] rounded-full group-hover:shadow-[0_0_15px_#FF7828] transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </a>

            {/* Accounts Link */}
            <a href="/accounts" className="relative group pointer-events-auto">
              <span className="text-white font-semibold tracking-wide text-sm uppercase group-hover:text-[#FF7828] group-hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)] transition-all duration-300">
                Accounts
              </span>
              <div className="absolute -bottom-2 left-0 w-2 h-2 bg-[#FF7828] rounded-full group-hover:shadow-[0_0_15px_#FF7828] transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </a>

            {/* About Link */}
            <a
              href="/about"
              className="text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]"
            >
              About Us
            </a>

            {/* Tournament Link */}
            <a
              href="/tournament"
              className="text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]"
            >
              Tournament
            </a>

            {/* ========== PAGES DROPDOWN (DESKTOP) ========== */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)] flex items-center gap-2 group"
              >
                Pages
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* Desktop Mega Menu - Centered with Invisible Bridge */}
              {isOpen && (
                <>
                  {/* Invisible bridge to prevent dropdown from closing on hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-full h-3 -translate-y-3"></div>
                  
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-screen max-w-4xl
                      z-50 overflow-hidden
                      animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="bg-[#0d071a]/95 backdrop-blur-xl border border-[#FF7828]/30 rounded-2xl 
                      shadow-2xl shadow-[#FF7828]/30 overflow-hidden">
                      {/* Gradient top border */}
                      <div className="h-1 bg-gradient-to-r from-[#FF7828] via-[#FF7828]/50 to-transparent"></div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                    {/* Featured Pages Section */}
                    <div className="md:col-span-1">
                      <h3 className="text-[#FF7828] font-bold text-sm uppercase tracking-widest mb-5 drop-shadow-[0_0_10px_rgba(255,120,40,0.5)]">
                        ✨ Featured
                      </h3>
                      <div className="space-y-3">
                        {featuredPages.map((page) => (
                          <Link
                            key={page.slug}
                            href={page.slug}
                            className="block text-gray-300 hover:text-[#FF7828] transition-all duration-200 text-sm hover:translate-x-1"
                            onClick={() => setIsOpen(false)}
                          >
                            → {page.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Regional Pages - USA */}
                    <div className="md:col-span-1">
                      <h3 className="text-[#FF7828] font-bold text-sm uppercase tracking-widest mb-5 drop-shadow-[0_0_10px_rgba(255,120,40,0.5)] flex items-center gap-2">
                        🇺🇸 USA
                      </h3>
                      <div className="space-y-3">
                        {regionData[0].pages.map((page) => (
                          <Link
                            key={page.slug}
                            href={page.slug}
                            className="block text-gray-300 hover:text-[#FF7828] transition-all duration-200 text-sm hover:translate-x-1"
                            onClick={() => setIsOpen(false)}
                          >
                            → {page.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Regional Pages - UK */}
                    <div className="md:col-span-1">
                      <h3 className="text-[#FF7828] font-bold text-sm uppercase tracking-widest mb-5 drop-shadow-[0_0_10px_rgba(255,120,40,0.5)] flex items-center gap-2">
                        🇬🇧 UK
                      </h3>
                      <div className="space-y-3">
                        {regionData[1].pages.map((page) => (
                          <Link
                            key={page.slug}
                            href={page.slug}
                            className="block text-gray-300 hover:text-[#FF7828] transition-all duration-200 text-sm hover:translate-x-1"
                            onClick={() => setIsOpen(false)}
                          >
                            → {page.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="bg-[#1a1a3e]/40 border-t border-[#FF7828]/20 px-8 py-4 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      <span className="text-[#FF7828]">💎</span> Premium accounts in{' '}
                      <span className="text-[#FF7828]">7 regions</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      <span className="text-[#FF7828]">⚡</span> Instant delivery guaranteed
                    </div>
                  </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* News Link */}
            <a
              href="/news"
              className="text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]"
            >
              News
            </a>

            {/* Contact Link */}
            <a
              href="/contact"
              className="text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]"
            >
              Contact
            </a>
          </div>

          {/* ========== RIGHT SECTION ========== */}
          <div className="flex items-center gap-4 pointer-events-auto">
            {/* Search Icon - Desktop & Mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors pointer-events-auto"
              title="Search accounts"
            >
              <svg
                className="w-5 h-5 text-gray-300 hover:text-white"
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
            </button>

            {/* ========== AUTH UI ========== */}
            {!isAuthenticated ? (
              // Not logged in - Show Sign In/Sign Up buttons
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/signin"
                  className="px-6 py-2.5 text-[#FF7828] border border-[#FF7828] font-bold text-sm uppercase rounded-lg hover:bg-[#FF7828]/10 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2.5 bg-[#FF7828] text-black font-bold text-sm uppercase rounded-lg hover:bg-[#E86B1F] hover:shadow-[0_0_25px_rgba(255,120,40,0.8)] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF7828]/50"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              // Logged in - Show profile dropdown
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-[#1a1a3e] border border-[#FF7828]/30 rounded-lg hover:bg-[#2d1b4e] transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF7828] to-[#45f882] rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {userProfile?.display_name?.charAt(0).toUpperCase() || 'B'}
                    </span>
                  </div>
                  <span className="text-white font-semibold text-sm hidden lg:inline">
                    {userProfile?.display_name || 'Account'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a3e] border border-[#FF7828]/30 rounded-lg shadow-xl shadow-[#FF7828]/20 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-[#FF7828]/20 to-[#45f882]/20 px-4 py-3 border-b border-[#FF7828]/20">
                      <p className="text-white font-semibold text-sm">
                        {userProfile?.display_name || 'BattleGaming User'}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">{userProfile?.user_id}</p>
                    </div>

                    {/* Menu Items */}
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-[#FF7828] hover:bg-[#2d1b4e]/60 transition-all duration-200 text-sm font-semibold border-b border-[#FF7828]/10"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={async () => {
                        await signOut();
                        setIsProfileOpen(false);
                        router.push('/');
                      }}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ========== MOBILE MENU BUTTON ========== */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 pointer-events-auto hover:bg-white/5 rounded-lg transition-colors duration-300"
            >
              <svg
                className={`w-6 h-6 text-gray-300 transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ========== MOBILE MENU ========== */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#FF7828]/20 bg-[#0d071a]/95 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Mobile Links */}
            <a
              href="/"
              className="block px-4 py-3 text-gray-300 hover:text-[#FF7828] hover:bg-[#1a1a3e]/60 rounded-lg transition-all duration-200 text-sm uppercase font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/about"
              className="block px-4 py-3 text-gray-300 hover:text-[#FF7828] hover:bg-[#1a1a3e]/60 rounded-lg transition-all duration-200 text-sm uppercase font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="/tournament"
              className="block px-4 py-3 text-gray-300 hover:text-[#FF7828] hover:bg-[#1a1a3e]/60 rounded-lg transition-all duration-200 text-sm uppercase font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tournament
            </a>

            {/* Mobile Accordion - Pages */}
            <div className="border-t border-[#FF7828]/20 pt-4">
              {regionData.map((regionGroup) => (
                <div key={regionGroup.region} className="mb-4">
                  <button
                    onClick={() =>
                      setActiveMobileRegion(
                        activeMobileRegion === regionGroup.region
                          ? null
                          : regionGroup.region
                      )
                    }
                    className="w-full px-4 py-3 text-[#FF7828] hover:bg-[#1a1a3e]/60 rounded-lg transition-all duration-200 text-sm uppercase font-semibold flex items-center justify-between"
                  >
                    <span>{regionGroup.icon} {regionGroup.region}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeMobileRegion === regionGroup.region
                          ? 'rotate-180'
                          : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>

                  {/* Accordion Content */}
                  {activeMobileRegion === regionGroup.region && (
                    <div className="bg-[#1a1a3e]/40 rounded-lg p-4 mt-2 space-y-2 animate-in fade-in slide-in-from-top duration-200">
                      {regionGroup.pages.map((page) => (
                        <a
                          key={page.slug}
                          href={page.slug}
                          className="block px-4 py-2.5 text-gray-300 hover:text-[#FF7828] hover:bg-[#2d1b4e]/60 rounded-lg transition-all duration-200 text-sm font-semibold touch-target"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          → {page.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Featured Pages on Mobile */}
              <div className="mt-4 border-t border-[#FF7828]/20 pt-4">
                <p className="px-4 py-2 text-[#FF7828] text-xs uppercase font-bold tracking-widest">
                  More Pages
                </p>
                <div className="space-y-2">
                  <a
                    href="/news"
                    className="block px-4 py-2.5 text-gray-300 hover:text-[#FF7828] hover:bg-[#1a1a3e]/60 rounded-lg transition-all duration-200 text-sm font-semibold touch-target"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    → Latest News
                  </a>
                  <a
                    href="/contact"
                    className="block px-4 py-2.5 text-gray-300 hover:text-[#FF7828] hover:bg-[#1a1a3e]/60 rounded-lg transition-all duration-200 text-sm font-semibold touch-target"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    → Contact Support
                  </a>
                  <a
                    href="/privacy"
                    className="block px-4 py-2.5 text-gray-300 hover:text-[#FF7828] hover:bg-[#1a1a3e]/60 rounded-lg transition-all duration-200 text-sm font-semibold touch-target"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    → Privacy Policy
                  </a>
                  <a
                    href="/terms"
                    className="block px-4 py-2.5 text-gray-300 hover:text-[#FF7828] hover:bg-[#1a1a3e]/60 rounded-lg transition-all duration-200 text-sm font-semibold touch-target"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    → Terms of Service
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Sign In Button */}
            <div className="pt-4 border-t border-[#FF7828]/20 space-y-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-6 py-3 text-center text-[#FF7828] border border-[#FF7828] font-bold text-sm uppercase rounded-lg hover:bg-[#FF7828]/10 transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-6 py-3 bg-[#FF7828] text-black font-bold text-sm uppercase rounded-lg hover:bg-[#E86B1F] transition-all duration-300 shadow-lg shadow-[#FF7828]/50"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-6 py-3 bg-[#1a1a3e] border border-[#FF7828]/30 text-center text-white font-bold text-sm uppercase rounded-lg hover:bg-[#2d1b4e] transition-all duration-300"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      setIsMobileMenuOpen(false);
                      router.push('/');
                    }}
                    className="w-full px-6 py-3 bg-red-500/10 text-red-400 font-bold text-sm uppercase rounded-lg hover:bg-red-500/20 transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
