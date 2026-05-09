'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const articles = [
  { id: '1', title: 'Top 10 Call of Duty Strategies for Beginners', slug: 'top-10-call-of-duty-strategies', content: 'Master the fundamentals of Call of Duty gameplay and dominate the battlefield with proven strategies...' },
  { id: '2', title: 'Advanced Gunplay Techniques', slug: 'advanced-gunplay-techniques', content: 'Improve your aim and master advanced weapon techniques for competitive play...' },
  { id: '3', title: 'Competitive Tournament Guide', slug: 'competitive-tournament-guide', content: 'Prepare for tournaments with expert tips and strategies from pro players...' },
  { id: '4', title: 'Map Control Mastery', slug: 'map-control-mastery', content: 'Dominate the battlefield by mastering map positioning and control tactics...' },
  { id: '5', title: 'Team Coordination Tips', slug: 'team-coordination-tips', content: 'Work with your squad effectively using communication and coordination strategies...' },
  { id: '6', title: 'Account Security Guide', slug: 'account-security-guide', content: 'Protect your account with essential security tips and best practices...' },
  { id: '7', title: 'Best Premium Accounts for Competitive Play May 2026', slug: 'best-premium-accounts-competitive-play', content: 'Find the perfect premium account for competitive gameplay with verified stats and history...' },
  { id: '8', title: 'Cross-Platform Gaming Guide', slug: 'cross-platform-gaming-guide', content: 'Play on any device with our comprehensive cross-platform gaming guide...' },
];

export default function ArticlesPage() {
  const params = useParams();
  const articleSlug = params?.slug?.[0];

  const article = articles.find(a => a.slug === articleSlug);

  if (!article) {
    return (
      <div className="bg-[#0d071a] min-h-screen text-white">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-[#FF7828] mb-8">Article Not Found</h1>
          <Link href="/news" className="text-[#FF7828] hover:underline">
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-[#FF7828]">{article.title}</h1>
        <p className="text-gray-300 mb-8">{article.content}</p>
        <Link href="/news" className="text-[#FF7828] hover:underline">
          ← Back to News
        </Link>
      </div>
    </div>
  );
}
