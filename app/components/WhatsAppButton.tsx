'use client';

export default function WhatsAppButton() {
  const whatsappNumber = '+17808511699';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white rounded-full p-4 md:p-5 shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/70 transition-all duration-300 hover:scale-110 animate-in fade-in slide-in-from-bottom-5 flex items-center justify-center group"
      title="Chat with us on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <svg
        className="w-6 h-6 md:w-7 md:h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.707 5.4 2.045 7.718L2.585 24l8.386-2.192a9.871 9.871 0 004.670 1.192h.004c5.44 0 9.868-4.436 9.868-9.886 0-2.657-.744-5.165-2.158-7.341A9.865 9.865 0 0012.052 6.979z" />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 bg-[#25D366] text-white text-xs md:text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-semibold shadow-lg">
        +1 (780) 851-1699
      </div>
    </a>
  );
}
