'use client';

interface BuyNowButtonProps {
  gameVersion: string;
  wins: number;
  region: string;
  price: number;
  platform: string;
  slug: string;
}

export default function BuyNowButton({
  gameVersion,
  wins,
  region,
  price,
  platform,
  slug,
}: BuyNowButtonProps) {
  // WhatsApp number with country code
  const whatsappNumber = '923184445800'; // Pakistan WhatsApp Business
  
  // Create pre-filled message with exact format
  const message = `Hi BattleGaming, I want to buy the ${gameVersion} account with ${wins} wins on ${platform} for the ${region} region. Is it available?`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <div className="w-full">
      <style>{`
        @keyframes neon-pulse {
          0% {
            box-shadow: 0 0 5px rgba(69, 248, 130, 0.4), 0 0 10px rgba(69, 248, 130, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(69, 248, 130, 0.8), 0 0 30px rgba(69, 248, 130, 0.4);
          }
          100% {
            box-shadow: 0 0 5px rgba(69, 248, 130, 0.4), 0 0 10px rgba(69, 248, 130, 0.2);
          }
        }

        @keyframes scale-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        .whatsapp-neon-button {
          animation: neon-pulse 2s infinite, scale-pulse 2s infinite;
        }

        .whatsapp-neon-button:hover {
          animation: none;
        }
      `}</style>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-neon-button inline-block w-full px-8 py-5 bg-[#45f882] text-black font-black text-xl uppercase rounded-lg hover:bg-[#3de673] transition-all duration-300 hover:shadow-[0_0_40px_rgba(69,248,130,1)] hover:scale-110 text-center shadow-lg shadow-[#45f882]/60"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">💬</span>
          <span>BUY NOW VIA WHATSAPP</span>
        </div>
      </a>

      {/* Product Details Summary */}
      <div className="mt-6 bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#45f882]/40">
        <h3 className="text-sm font-bold text-[#45f882] uppercase mb-4 tracking-widest">Order Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          <div className="bg-black/40 p-3 rounded">
            <div className="text-xs text-gray-400 uppercase tracking-widest">Game</div>
            <div className="text-lg font-bold text-[#45f882]">{gameVersion}</div>
          </div>
          <div className="bg-black/40 p-3 rounded">
            <div className="text-xs text-gray-400 uppercase tracking-widest">Wins</div>
            <div className="text-lg font-bold text-[#45f882]">{wins}</div>
          </div>
          <div className="bg-black/40 p-3 rounded">
            <div className="text-xs text-gray-400 uppercase tracking-widest">Platform</div>
            <div className="text-lg font-bold text-[#45f882]">{platform}</div>
          </div>
          <div className="bg-black/40 p-3 rounded">
            <div className="text-xs text-gray-400 uppercase tracking-widest">Price</div>
            <div className="text-lg font-bold text-[#45f882]">${price.toFixed(2)}</div>
          </div>
        </div>
        
        {/* Trust Signals */}
        <div className="pt-4 border-t border-[#45f882]/30 space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-[#45f882]">✓</span>
            <span>Instant WhatsApp confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#45f882]">✓</span>
            <span>100% verified anti-cheat cleared account</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#45f882]">✓</span>
            <span>24/7 dedicated support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#45f882]">✓</span>
            <span>30-day satisfaction guarantee</span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-[#45f882]/10 rounded-lg border border-[#45f882]/30 text-center text-sm text-gray-300">
        <p className="font-semibold text-[#45f882] mb-2">Quick Support Available</p>
        <p>
          Click the button above to chat with our support team on WhatsApp. They'll confirm availability and process your order within minutes.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          ⚡ Average response time: Under 5 minutes
        </p>
      </div>
    </div>
  );
}
