import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CursorGlow from "./components/CursorGlow";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
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
  description: "Buy verified Call of Duty accounts with exclusive stats and instant delivery. Trusted globally in USA, UK, & Europe. Lifetime guarantees. Shop BattleGaming today!",
  keywords: "Call of Duty accounts, CoD accounts, verified accounts, instant delivery, USA, UK, Europe",
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  verification: {
    google: 'IQwmnCTqC92TeOWdUkT3UkTb-2g5p-XagXgpB9cHDCM',
  },
  openGraph: {
    title: "BattleGaming - Premium Call of Duty Accounts",
    description: "Elite verified CoD accounts with 99.8% delivery success rate. Instant delivery & lifetime support.",
    url: "https://battlegaming.store",
    type: 'website',
    siteName: "BattleGaming",
    locale: 'en_US',
    images: [
      {
        url: "https://battlegaming.store/logo.svg",
        width: 1200,
        height: 630,
        alt: "BattleGaming - Premium Call of Duty Accounts",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "BattleGaming - Premium Call of Duty Accounts",
    description: "Buy verified CoD accounts with instant delivery & 24/7 support. Trusted by 50K+ gamers.",
    images: ["https://battlegaming.store/logo.svg"],
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
        {/* Scroll to Top on Navigation */}
        <ScrollToTop />
        
        {/* Custom Cursor Glow - Ultra High Z-Index for Universal Top Visibility */}
        <CursorGlow />
        
        {/* Navbar - Optimized Component */}
        <Navbar />

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
