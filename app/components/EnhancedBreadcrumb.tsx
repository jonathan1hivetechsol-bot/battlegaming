import Link from 'next/link';

interface EnhancedBreadcrumbProps {
  gameVersion: string;
  platform: string;
  region: string;
  title: string;
}

export default function EnhancedBreadcrumb({
  gameVersion,
  platform,
  region,
  title,
}: EnhancedBreadcrumbProps) {
  return (
    <nav className="space-y-4 mb-8">
      {/* Main Breadcrumb */}
      <div className="text-sm text-gray-400 flex flex-wrap gap-2 items-center">
        <Link href="/" className="hover:text-[#FF7828] transition-colors font-medium">
          🏠 Home
        </Link>
        <span className="text-[#FF7828]">/</span>
        <Link href="/accounts" className="hover:text-[#FF7828] transition-colors font-medium">
          📦 All Accounts
        </Link>
        <span className="text-[#FF7828]">/</span>
        <Link
          href={`/accounts?game=${gameVersion}`}
          className="hover:text-[#FF7828] transition-colors font-medium"
        >
          {gameVersion}
        </Link>
        <span className="text-[#FF7828]">/</span>
        <Link
          href={`/accounts?platform=${platform}`}
          className="hover:text-[#FF7828] transition-colors font-medium"
        >
          {platform}
        </Link>
        <span className="text-[#FF7828]">/</span>
        <span className="text-[#FF7828] font-bold">{title}</span>
      </div>

      {/* Category Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
        <Link
          href={`/accounts?game=${gameVersion}`}
          className="text-xs font-semibold text-gray-300 bg-[#1a1a3e]/40 p-2 rounded border border-[#FF7828]/20 hover:border-[#FF7828]/60 hover:text-[#FF7828] transition-all duration-300"
        >
          🎮 More {gameVersion}
        </Link>
        <Link
          href={`/accounts?platform=${platform}`}
          className="text-xs font-semibold text-gray-300 bg-[#1a1a3e]/40 p-2 rounded border border-[#FF7828]/20 hover:border-[#FF7828]/60 hover:text-[#FF7828] transition-all duration-300"
        >
          🖥️ All {platform}
        </Link>
        <Link
          href={`/accounts/region/${region}`}
          className="text-xs font-semibold text-gray-300 bg-[#1a1a3e]/40 p-2 rounded border border-[#FF7828]/20 hover:border-[#FF7828]/60 hover:text-[#FF7828] transition-all duration-300"
        >
          🌍 {region} Region
        </Link>
        <Link
          href="/accounts"
          className="text-xs font-semibold text-gray-300 bg-[#1a1a3e]/40 p-2 rounded border border-[#FF7828]/20 hover:border-[#FF7828]/60 hover:text-[#FF7828] transition-all duration-300"
        >
          🔍 Browse All
        </Link>
      </div>
    </nav>
  );
}
