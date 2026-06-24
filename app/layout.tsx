import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { OrganizationSchema } from "./components/SchemaMarkup";
import { AuthProvider } from "./context/AuthContext";
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
    icon: '/favicon.avif',
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
  other: {
    'ai-policies': '/ai.txt',
    'crawler-policy': 'https://battlegaming.store/ai.txt',
    'p:domain_verify': 'b0b3cd7bbd2816fe9c401e665de2e14b',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/blackops7heroimage.avif" />
        <link rel="preload" as="image" href="/logo.avif" />
        
        {/* Critical CSS inline - Prevent render-blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html {
              background-color: #0d071a;
              color: #ffffff;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: #0d071a;
              color: #ffffff;
              font-family: system-ui, -apple-system, sans-serif;
            }
            main {
              flex: 1;
            }
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#0d071a] text-white" suppressHydrationWarning>
        <AuthProvider>
          {/* Scroll to Top on Navigation */}
          <ScrollToTop />
          
          {/* Navbar - Optimized Component */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Organization Schema Markup */}
          <OrganizationSchema />
          
          {/* WhatsApp Floating Button */}
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
