import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0410] border-t border-[#FF7828]/20 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div>
            <h3 className="text-white font-black text-2xl mb-4">BATTLEFAMING</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Elite verified Call of Duty accounts with lightning-fast delivery, military-grade security, and lifetime support. The #1 trusted account marketplace.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#FF7828] hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                🔗
              </a>
              <a href="#" className="text-[#FF7828] hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                𝕏
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Games</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-[#FF7828] transition-colors">Black Ops 7 Accounts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FF7828] transition-colors">MW3 Accounts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FF7828] transition-colors">Warzone Accounts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FF7828] transition-colors">View All Accounts</a></li>
            </ul>
          </div>

          {/* Regions - USA & UK Markets */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Markets</h4>
            <ul className="space-y-3 text-sm">
              {/* USA Markets */}
              <li className="text-[#FF7828] font-semibold text-xs">🇺🇸 USA</li>
              <li className="ml-2"><a href="#accounts" className="text-gray-400 hover:text-[#FF7828] transition-colors">California</a></li>
              <li className="ml-2"><a href="#accounts" className="text-gray-400 hover:text-[#FF7828] transition-colors">Texas</a></li>
              <li className="ml-2"><a href="#accounts" className="text-gray-400 hover:text-[#FF7828] transition-colors">New York</a></li>
              {/* UK Markets */}
              <li className="text-[#FF7828] font-semibold text-xs pt-2">🇬🇧 UK</li>
              <li className="ml-2"><a href="#accounts" className="text-gray-400 hover:text-[#FF7828] transition-colors">London</a></li>
              <li className="ml-2"><a href="#accounts" className="text-gray-400 hover:text-[#FF7828] transition-colors">Manchester</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="text-gray-400 hover:text-[#FF7828] transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-[#FF7828] transition-colors">Contact Support</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-[#FF7828] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-[#FF7828] transition-colors">Terms of Service</a></li>
              <li><a href="/refund" className="text-gray-400 hover:text-[#FF7828] transition-colors">Refund Policy</a></li>
              <li><a href="/cookies" className="text-gray-400 hover:text-[#FF7828] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-[#FF7828]/20">
          <div className="text-center">
            <p className="text-[#FF7828] font-black text-2xl mb-2">50K+</p>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-[#FF7828] font-black text-2xl mb-2">99.8%</p>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Delivery Success</p>
          </div>
          <div className="text-center">
            <p className="text-[#FF7828] font-black text-2xl mb-2">24/7</p>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Support Team</p>
          </div>
          <div className="text-center">
            <p className="text-[#FF7828] font-black text-2xl mb-2">Lifetime</p>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Warranty</p>
          </div>
        </div>

        {/* Editorial Transparency Section */}
        <div className="py-8 border-y border-[#FF7828]/20 my-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h5 className="text-[#FF7828] font-bold mb-2">Transparency</h5>
              <p className="text-gray-400">We maintain strict editorial standards and independent verification of all products.</p>
            </div>
            <div>
              <h5 className="text-[#FF7828] font-bold mb-2">Trust Signals</h5>
              <p className="text-gray-400">Licensed, verified, and compliant with industry standards and consumer protection laws.</p>
            </div>
            <div>
              <h5 className="text-[#FF7828] font-bold mb-2">Legal Compliance</h5>
              <p className="text-gray-400">All operations governed by Terms of Service, Privacy Policy, and Cookie Policy.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[#FF7828]/20">
          <p className="text-gray-400 text-xs">
            © {currentYear} BattleGaming.store. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <span className="text-[#FF7828]">✓ 100% Verified Accounts</span>
            <span className="text-[#FF7828]">✓ Instant Delivery</span>
            <span className="text-[#FF7828]">✓ Secure Payment</span>
          </div>
        </div>
      </div>

      {/* Neon Bottom Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#FF7828] to-transparent opacity-50" />
    </footer>
  );
}
