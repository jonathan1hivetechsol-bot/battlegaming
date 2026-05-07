import { supabase } from '@/lib/supabase';
import AccountsGrid from './components/AccountsGrid';

export const revalidate = 60; // ISR - revalidate every 60 seconds for fresh pricing/reviews

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

async function getAllAccounts() {
  const { data: accounts, error } = await supabase
    .from('cod_accounts')
    .select('id, slug, meta_title, game_version, platform, wins, price, average_rating, review_count, reviews, unique_description, buying_amount')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching accounts:', error);
    return [];
  }

  // Log first 3 accounts to verify prices
  if (accounts && accounts.length > 0) {
    console.log('📊 HOMEPAGE ACCOUNTS FETCHED:');
    accounts.slice(0, 3).forEach((acc: any, i: number) => {
      console.log(`[${i}] ${acc.meta_title} - Price: $${acc.price}`);
    });
  }

  return (accounts as Account[]) || [];
}

export default async function Home() {
  const accounts = await getAllAccounts();

  return (
    <div className="bg-[#0d071a] min-h-screen text-white overflow-hidden">
      {/* Neon Glow & Animation CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes neon-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255, 120, 40, 0.5), 0 0 20px rgba(255, 120, 40, 0.3), 6px 6px 0px #FF7828;
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 120, 40, 0.8), 0 0 40px rgba(255, 120, 40, 0.6), 6px 6px 0px #FF7828;
          }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        
        @keyframes hero-image-glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(255, 120, 40, 0.4)) brightness(1.1);
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(255, 120, 40, 0.6)) brightness(1.2);
          }
        }
        
        .neon-glow {
          animation: neon-glow 3s ease-in-out infinite;
        }
        .polygon-btn {
          clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0% 30%);
        }
        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          animation: glitch-1 0.3s;
          color: #FF7828;
          z-index: -1;
          opacity: 0.8;
        }
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          animation: glitch-2 0.3s;
          color: #45f882;
          z-index: -1;
          opacity: 0.8;
        }
      `}} />

      {/* Hero Section - Premium Side by Side */}
      <section className="relative w-full py-16 md:py-20 lg:py-24 flex items-center overflow-hidden bg-[#0d071a]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-96 top-1/2 w-[600px] h-[600px] bg-[#FF7828]/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-96 bottom-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 opacity-3">
            <div className="w-full h-full bg-[linear-gradient(0deg,transparent_24%,rgba(255,120,40,.1)_25%,rgba(255,120,40,.1)_26%,transparent_27%,transparent_74%,rgba(255,120,40,.1)_75%,rgba(255,120,40,.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,120,40,.1)_25%,rgba(255,120,40,.1)_26%,transparent_27%,transparent_74%,rgba(255,120,40,.1)_75%,rgba(255,120,40,.1)_76%,transparent_77%,transparent)] bg-[50px_50px]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 md:px-8 lg:px-12 relative z-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {/* Pre-heading */}
            <div className="inline-block mb-4 w-fit">
              <span className="text-[#FF7828] font-bold text-xs uppercase tracking-widest border border-[#FF7828] px-4 py-2 rounded-full">
                ⚡ NEXT GENERATION
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="relative mb-6">
              <span className="neon-glow block text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter">
                DOMINATE
              </span>
              <span className="neon-glow block text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter">
                THE
              </span>
              <span className="neon-glow block text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter">
                BATTLE
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-300 text-base md:text-lg max-w-md mb-8 leading-relaxed font-light">
              Elite verified Call of Duty accounts with <span className="text-[#FF7828] font-semibold">lightning-fast delivery</span>, 
              <span className="text-[#FF7828] font-semibold"> military-grade security</span>, and <span className="text-[#FF7828] font-semibold">lifetime support</span>.
            </p>

            {/* Stats Badges */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="bg-black/40 border border-[#FF7828]/40 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#FF7828] transition-colors">
                <p className="text-[#FF7828] font-black text-xl">45+</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Premium Accounts</p>
              </div>
              <div className="bg-black/40 border border-[#FF7828]/40 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#FF7828] transition-colors">
                <p className="text-[#FF7828] font-black text-xl">24/7</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Instant Delivery</p>
              </div>
              <div className="bg-black/40 border border-[#FF7828]/40 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#FF7828] transition-colors">
                <p className="text-[#FF7828] font-black text-xl">100%</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Verified</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#accounts"
                className="polygon-btn inline-flex items-center justify-center bg-[#FF7828] text-black font-black px-10 py-4 text-sm uppercase tracking-wider hover:bg-[#E86B1F] hover:shadow-[0_0_40px_rgba(255,120,40,0.8)] transition-all duration-300 hover:scale-110 w-fit"
              >
                BROWSE NOW
              </a>
              <button
                className="border-2 border-[#FF7828] text-[#FF7828] font-black px-10 py-4 text-sm uppercase tracking-wider rounded-lg hover:bg-[#FF7828]/15 hover:shadow-[0_0_30px_rgba(255,120,40,0.6)] transition-all duration-300 w-fit"
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Right Image Section - Professional Frame */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-[380px] h-[500px]">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FF7828]/50 via-[#FF7828]/25 to-transparent rounded-2xl blur-2xl" />
              
              {/* Gaming Frame Border - Bright Orange */}
              <div className="absolute -inset-3 bg-gradient-to-br from-[#FF7828] via-[#FF7828]/80 to-[#45f882]/40 rounded-xl" />
              
              {/* Inner Frame - Black */}
              <div className="absolute -inset-2 bg-[#0a0410] rounded-lg" />
              
              {/* Image Container */}
              <div className="absolute inset-0 m-2 rounded-lg overflow-hidden bg-gradient-to-b from-black/20 to-black/40 shadow-2xl">
                <img
                  src="/blackops7heroimage.jpg"
                  alt="Black Ops 7 Hero"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(0.85) contrast(1.4) saturate(1.1) hue-rotate(0deg)',
                  }}
                />
                
                {/* Premium Overlay with Gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[#FF7828]/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                
                {/* Scanlines - Enhanced */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 120, 40, 0.15) 0px, rgba(255, 120, 40, 0.15) 2px, transparent 2px, transparent 4px)',
                  }}
                />
                
                {/* Premium Corner HUD - Larger & Detailed */}
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-[#FF7828] rounded-sm">
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF7828] rounded-tl-sm" />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-[#FF7828] rounded-sm">
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FF7828] rounded-tr-sm" />
                </div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-[#FF7828] rounded-sm">
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FF7828] rounded-bl-sm" />
                </div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-[#FF7828] rounded-sm">
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF7828] rounded-br-sm" />
                </div>
                
                {/* Side Accent Elements */}
                <div className="absolute left-0 top-1/4 h-12 w-1 bg-gradient-to-b from-transparent via-[#FF7828] to-transparent opacity-80" />
                <div className="absolute right-0 top-3/4 h-12 w-1 bg-gradient-to-b from-transparent via-[#FF7828] to-transparent opacity-80" />
                
                {/* Top Accent */}
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#FF7828] to-transparent opacity-90" />
                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#FF7828] to-transparent opacity-90" />
                
                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-px h-6 bg-[#FF7828] opacity-30" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-px bg-[#FF7828] opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accounts Section with Interactive Grid */}
      <section id="accounts" className="py-20 px-4">
        <AccountsGrid initialAccounts={accounts} />
      </section>
    </div>
  );
}