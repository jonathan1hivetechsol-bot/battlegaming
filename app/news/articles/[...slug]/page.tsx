'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const articles = [
  { id: '1', title: 'Top 10 Call of Duty Strategies', slug: '1', content: 'Master the fundamentals...' },
  { id: '2', title: 'Advanced Gunplay Techniques', slug: '2', content: 'Improve your aim...' },
  { id: '3', title: 'Competitive Tournament Guide', slug: '3', content: 'Prepare for tournaments...' },
  { id: '4', title: 'Map Control Mastery', slug: '4', content: 'Dominate the battlefield...' },
  { id: '5', title: 'Team Coordination Tips', slug: '5', content: 'Work with your squad...' },
  { id: '6', title: 'Account Security Guide', slug: '6', content: 'Protect your account...' },
  { id: '7', title: 'Best Premium Accounts for Competitive Play May 2026', slug: '7', content: 'Find the perfect account...' },
  { id: '8', title: 'Cross-Platform Gaming Guide', slug: '8', content: 'Play on any device...' },
];

export default function ArticlesPage() {
  const params = useParams();
  const articleId = params?.slug?.[0];

  const article = articles.find(a => a.id === articleId);

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
