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
  // WhatsApp number (user's WhatsApp business number)
  const whatsappNumber = '17808511699'; // +1-780-851-1699
  
  // Create pre-filled message with product details
  const message = `Hi BattleGaming! 👋\n\nI'm interested in purchasing:\n\n🎮 Game: ${gameVersion}\n🏆 Wins: ${wins}\n🌍 Region: ${region}\n📱 Platform: ${platform}\n💰 Price: $${price.toFixed(2)}\n\nPage: battlegaming.store/${slug}\n\nIs this account currently available? Please confirm and send me the payment details.`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <div className="w-full">
      <style>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 120, 40, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 120, 40, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 120, 40, 0);
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .whatsapp-buy-button {
          animation: pulse-glow 2s infinite, pulse-scale 2s infinite;
        }

        .whatsapp-buy-button:hover {
          animation: none;
        }
      `}</style>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-buy-button inline-block w-full px-8 py-4 bg-gradient-to-r from-[#FF7828] to-[#E86B1F] text-white font-black text-lg uppercase rounded-lg hover:from-[#E86B1F] hover:to-[#D65A0C] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,120,40,1)] hover:scale-105 text-center shadow-lg shadow-[#FF7828]/50"
      >
        <div className="flex items-center justify-center gap-3">
          <span>💬</span>
          <span>Order via WhatsApp</span>
          <span className="animate-bounce">→</span>
        </div>
      </a>

      {/* Product Details Summary */}
      <div className="mt-6 bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-400">Game</div>
            <div className="text-lg font-bold text-[#FF7828]">{gameVersion}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Wins</div>
            <div className="text-lg font-bold text-[#FF7828]">{wins}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Platform</div>
            <div className="text-lg font-bold text-[#FF7828]">{platform}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Price</div>
            <div className="text-lg font-bold text-[#FF7828]">${price.toFixed(2)}</div>
          </div>
        </div>
        
        {/* Trust Signals */}
        <div className="mt-4 pt-4 border-t border-[#FF7828]/20 space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Instant WhatsApp confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>24/7 dedicated support</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>30-day satisfaction guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Verified & anti-cheat cleared</span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-[#FF7828]/10 rounded-lg border border-[#FF7828]/30 text-center text-sm text-gray-300">
        <p>
          Click the button above to chat with our support team on WhatsApp. They'll confirm availability and process your order instantly.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Response time: Usually under 5 minutes during business hours
        </p>
      </div>
    </div>
  );
}
