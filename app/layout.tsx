import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import CursorGlow from "./components/CursorGlow";
import Footer from "./components/Footer";
import { OrganizationSchema } from "./components/SchemaMarkup";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BattleGaming - Premium Call of Duty Accounts | battlegaming.store",
  description: "Buy premium verified Call of Duty accounts with exclusive stats, instant delivery, and lifetime guarantees. Available in USA, UK, California, Texas, New York, London, and Manchester.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "BattleGaming - Premium Call of Duty Accounts",
    description: "Elite verified CoD accounts with 99.8% delivery success rate.",
    url: "https://battlegaming.store",
    siteName: "BattleGaming",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d071a] text-white" suppressHydrationWarning>
        {/* Custom Cursor Glow - Ultra High Z-Index for Universal Top Visibility */}
        <CursorGlow />
        
        {/* Navbar - Ultra High Z-Index with Full Interactivity */}
        <nav className="sticky top-0 z-[999] pointer-events-auto bg-[#0d071a]/85 bg-gradient-to-r from-[#1a1a3e]/95 via-[#2d1b4e]/95 to-[#1a1a3e]/95 backdrop-blur-md border-b border-[#FF7828]/40 shadow-xl shadow-[#FF7828]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0 w-32">
                <a href="/" className="flex items-center">
                  <Image 
                    src="/logo.svg" 
                    alt="BattleGaming" 
                    width={140}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>
              </div>

              {/* Navigation Links - Desktop */}
              <div className="hidden md:flex items-center gap-12 pointer-events-auto">
                <a href="/" className="relative group pointer-events-auto">
                  <span className="text-white font-semibold tracking-wide text-sm uppercase group-hover:text-[#FF7828] group-hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)] transition-all duration-300">Home</span>
                  <div className="absolute -bottom-2 left-0 w-2 h-2 bg-[#FF7828] rounded-full group-hover:shadow-[0_0_15px_#FF7828] transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                </a>
                <a href="/about" className="relative group pointer-events-auto text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]">About Us</a>
                <a href="/tournament" className="relative group pointer-events-auto text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]">Tournament</a>
                <a href="#" className="relative group pointer-events-auto text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]">Pages</a>
                <a href="/news" className="relative group pointer-events-auto text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]">News</a>
                <a href="/contact" className="relative group pointer-events-auto text-gray-300 hover:text-[#FF7828] font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,120,40,0.8)]">Contact</a>
              </div>

              {/* Right Section - Search & Sign In */}
              <div className="flex items-center gap-4 pointer-events-auto">
                {/* Search Icon */}
                <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors pointer-events-auto">
                  <svg className="w-5 h-5 text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Sign In Button - Premium Style with Full Interactivity */}
                <button className="hidden md:block relative px-8 py-2.5 bg-[#FF7828] text-black font-bold text-sm uppercase rounded-lg hover:bg-[#E86B1F] hover:shadow-[0_0_25px_rgba(255,120,40,0.8)] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF7828]/50 pointer-events-auto">
                  Sign In
                </button>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 pointer-events-auto">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Organization Schema Markup */}
        <OrganizationSchema />

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/17808511699?text=I%20am%20interested%20in%20BattleGaming%20accounts"
          target="_blank"
          rel="noopener noreferrer"
          title="Contact us on WhatsApp"
          className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold text-xs px-4 py-3 rounded-full shadow-lg shadow-green-500/50 z-40 flex items-center gap-2 transition-all duration-300 hover:scale-110"
        >
          <span>💬</span>
          <span>WhatsApp Only</span>
        </a>
      </body>
    </html>
  );
}
