import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BattleGaming News & Blog | Latest COD Updates & Gaming Insights',
  description: 'Stay updated with latest Call of Duty news, account reviews, gaming tips, and industry insights from BattleGaming experts.',
  keywords: 'Call of Duty news, gaming blog, COD updates, esports news, gaming guides',
  openGraph: {
    title: 'BattleGaming News | COD Updates & Gaming Insights',
    description: 'Read the latest news, reviews, and gaming guides from the BattleGaming community.',
    url: 'https://battlegaming.store/news',
    type: 'website',
  },
  alternates: {
    canonical: 'https://battlegaming.store/news',
  },
};

export default function News() {
  const articles = [
    {
      id: '1',
      title: 'Top 10 Call of Duty Strategies for Beginners',
      excerpt: 'Master the fundamentals with our comprehensive guide to Call of Duty gameplay strategies.',
      date: 'May 1, 2026',
      category: 'Guide',
      image: '🎮',
    },
    {
      id: '2',
      title: 'Season 4 Weapon Balance Update Analysis',
      excerpt: 'We break down the latest weapon changes and how they impact competitive gameplay.',
      date: 'April 28, 2026',
      category: 'Update',
      image: '⚔️',
    },
    {
      id: '3',
      title: 'BattleGaming May Tournament Announced',
      excerpt: 'Join our biggest tournament yet with $15,000 in prizes and exclusive account rewards.',
      date: 'April 25, 2026',
      category: 'Tournament',
      image: '🏆',
    },
    {
      id: '4',
      title: 'How to Improve Your KD Ratio',
      excerpt: 'Expert tips from pro players on increasing kill-death ratio and win rate.',
      date: 'April 20, 2026',
      category: 'Tips',
      image: '📈',
    },
    {
      id: '5',
      title: 'New Map Review: Arctic Base',
      excerpt: 'Complete walkthrough and strategy guide for the newly released Arctic Base map.',
      date: 'April 15, 2026',
      category: 'Review',
      image: '🗺️',
    },
    {
      id: '6',
      title: 'Account Security: Protecting Your Investment',
      excerpt: 'Learn how to keep your premium gaming account secure with our security checklist.',
      date: 'April 10, 2026',
      category: 'Security',
      image: '🔒',
    },
    {
      id: '7',
      title: 'Best Premium Accounts for Competitive Play May 2026',
      excerpt: 'Discover the top-tier accounts perfect for competitive Call of Duty tournaments and ranked matches.',
      date: 'May 8, 2026',
      category: 'Review',
      image: '⭐',
    },
    {
      id: '8',
      title: 'Cross-Platform Gaming Guide: Play on Any Device',
      excerpt: 'Learn how to seamlessly play Call of Duty across PS5, Xbox, and PC with cross-platform progression.',
      date: 'May 6, 2026',
      category: 'Guide',
      image: '🎮',
    },
  ];

  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 text-[#FF7828]">
            News & Blog
          </h1>
          <p className="text-xl text-gray-300">
            Latest Call of Duty updates, gaming strategies, and BattleGaming community insights.
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          {/* Featured Article */}
          <div className="mb-16 bg-gradient-to-r from-[#FF7828]/20 to-transparent p-8 rounded-lg border border-[#FF7828]/40">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{articles[0].image}</div>
              <div className="flex-1">
                <span className="inline-block bg-[#FF7828] text-black px-3 py-1 rounded-full text-sm font-bold mb-3">FEATURED</span>
                <h2 className="text-3xl font-bold text-[#FF7828] mb-3">{articles[0].title}</h2>
                <p className="text-gray-300 mb-4">
                  {articles[0].excerpt}
                </p>
                <div className="flex gap-4 items-center text-gray-400 text-sm">
                  <span>📅 {articles[0].date}</span>
                  <Link href={`/news/article-view/${articles[0].id}`} className="text-[#FF7828] font-bold hover:text-[#E86B1F] transition-colors">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <h2 className="text-3xl font-bold text-[#FF7828] mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <Link
                key={article.id}
                href={`/news/article-view/${article.id}`}
                className="bg-[#1a1a3e]/60 rounded-lg border border-[#FF7828]/30 overflow-hidden hover:border-[#FF7828] hover:shadow-lg hover:shadow-[#FF7828]/20 transition-all"
              >
                <div className="text-5xl p-6 bg-[#0a0410]">{article.image}</div>
                <div className="p-6">
                  <span className="inline-block text-[#FF7828] text-xs font-bold uppercase tracking-wider mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">{article.date}</span>
                    <span className="text-[#FF7828] font-bold">Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-20 bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e] p-12 rounded-lg border border-[#FF7828]/30">
            <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">Subscribe to our newsletter for latest news, guides, and exclusive offers.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/50 border border-[#FF7828]/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7828]"
              />
              <button className="bg-[#FF7828] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#E86B1F] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
