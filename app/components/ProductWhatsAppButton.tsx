'use client';

interface ProductWhatsAppButtonProps {
  productTitle: string;
  game: string;
  platform: string;
  wins: number;
  price: number;
}

export default function ProductWhatsAppButton({
  productTitle,
  game,
  platform,
  wins,
  price,
}: ProductWhatsAppButtonProps) {
  const whatsappNumber = '15795507750';
  
  // Pre-filled message with product details
  const message = `Hi BattleGaming! I'm interested in the ${game} account on ${platform} with ${wins} wins for $${price}. Product: ${productTitle}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
      title="Ask about this product on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.52 3.449C18.9 1.86 16.76 1 14.409 1 7.894 1 2.54 6.354 2.54 12.869c0 2.25.565 4.438 1.639 6.394L1.07 23.13l6.882-1.495c1.839 1.058 3.93 1.618 6.158 1.618h.006c6.516 0 11.89-5.373 11.89-11.889 0-3.179-1.243-6.167-3.504-8.431zM14.409 21.35h-.004c-1.925 0-3.814-.588-5.424-1.713l-.389-.23-4.032.879.893-3.262-.21-.333A9.869 9.869 0 015.188 12.869c0-5.487 4.468-9.954 9.948-9.954 2.655 0 5.148 1.034 7.021 2.904 1.872 1.872 2.905 4.365 2.905 7.02 0 5.487-4.468 9.954-9.954 9.954zm5.204-7.38c-.286-.15-1.687-.833-1.95-.927-.263-.097-.455-.15-.644.15-.19.298-.73.926-.893 1.114-.164.188-.328.21-.614.063-.286-.15-1.204-.444-2.291-1.414-.847-.755-1.42-1.687-1.585-1.973-.163-.287-.017-.44.122-.583.125-.125.286-.325.429-.488.143-.163.19-.278.286-.465.095-.187.047-.35-.024-.489-.071-.138-.645-1.555-.884-2.128-.233-.572-.469-.495-.644-.504-.167-.009-.36-.009-.552-.009-.19 0-.501.071-.763.35-.262.28-1.003.981-1.003 2.39 0 1.409 1.026 2.771 1.169 2.959.143.188 2.01 3.07 4.873 4.304.68.294 1.21.468 1.623.597.682.215 1.303.186 1.794.112.548-.082 1.687-.689 1.926-1.354.238-.665.238-1.234.167-1.354-.07-.12-.26-.19-.545-.33z"/>
      </svg>
      Chat on WhatsApp
    </a>
  );
}
