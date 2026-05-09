import Link from 'next/link';

export default function CategoryNavigation() {
  const games = [
    'Black Ops 7',
    'Black Ops 6',
    'Modern Warfare 3',
    'Warzone',
  ];

  const platforms = ['PS5', 'Xbox Series X', 'PC'];
  const regions = ['USA', 'UK', 'California', 'Texas', 'New York', 'London', 'Manchester'];

  return (
    <section className="py-8 border-b border-[#FF7828]/20 mb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Games */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              🎮 Filter by Game
            </h3>
            <div className="flex flex-wrap gap-2">
              {games.map((game) => (
                <Link
                  key={game}
                  href={`/accounts?game=${game}`}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-300 bg-[#1a1a3e]/60 border border-[#FF7828]/30 rounded hover:border-[#FF7828] hover:text-[#FF7828] hover:bg-[#1a1a3e] transition-all duration-300"
                >
                  {game}
                </Link>
              ))}
              <Link
                href="/accounts"
                className="px-3 py-1.5 text-xs font-semibold text-gray-300 bg-[#1a1a3e]/60 border border-[#FF7828]/30 rounded hover:border-[#FF7828] hover:text-[#FF7828] transition-all duration-300"
              >
                All Games
              </Link>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              🖥️ Filter by Platform
            </h3>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Link
                  key={platform}
                  href={`/accounts?platform=${platform}`}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-300 bg-[#1a1a3e]/60 border border-blue-500/30 rounded hover:border-blue-500 hover:text-blue-400 hover:bg-[#1a1a3e] transition-all duration-300"
                >
                  {platform}
                </Link>
              ))}
              <Link
                href="/accounts"
                className="px-3 py-1.5 text-xs font-semibold text-gray-300 bg-[#1a1a3e]/60 border border-blue-500/30 rounded hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
              >
                All Platforms
              </Link>
            </div>
          </div>

          {/* Regions */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              🌍 Filter by Region
            </h3>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Link
                  key={region}
                  href={`/accounts?region=${region}`}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-300 bg-[#1a1a3e]/60 border border-green-500/30 rounded hover:border-green-500 hover:text-green-400 hover:bg-[#1a1a3e] transition-all duration-300"
                >
                  {region}
                </Link>
              ))}
              <Link
                href="/accounts"
                className="px-3 py-1.5 text-xs font-semibold text-gray-300 bg-[#1a1a3e]/60 border border-green-500/30 rounded hover:border-green-500 hover:text-green-400 transition-all duration-300"
              >
                All Regions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
