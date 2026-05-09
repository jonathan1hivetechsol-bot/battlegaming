import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Enable static generation and revalidation
export const revalidate = 60; // Revalidate every 60 seconds (ISR)
export const dynamicParams = false; // Only allow static params, return 404 for others

// Blog articles data
const articles = [
  {
    id: '1',
    title: 'Top 10 Call of Duty Strategies for Beginners',
    excerpt: 'Master the fundamentals with our comprehensive guide to Call of Duty gameplay strategies.',
    date: 'May 1, 2026',
    category: 'Guide',
    image: '🎮',
    author: 'BattleGaming Team',
    content: `
      <h2>Master the Fundamentals of Call of Duty</h2>
      <p>Whether you're just starting your Call of Duty journey or looking to improve your gameplay, mastering these 10 core strategies will significantly enhance your performance on the battlefield.</p>
      
      <h3>1. Map Control & Positioning</h3>
      <p>Understanding map layout is crucial. Learn key positions, chokepoints, and sightlines. Familiarize yourself with spawning locations and rotations to always stay ahead of your enemies.</p>
      
      <h3>2. Weapon Selection Strategy</h3>
      <p>Different weapons excel in different situations. Use close-range weapons (SMGs) indoors, assault rifles for medium range, and sniper rifles for long-distance engagements. Practice weapon recoil control in gunfights.</p>
      
      <h3>3. Team Communication</h3>
      <p>Effective communication with teammates is essential. Call out enemy positions, coordinate pushes, and maintain team cohesion. Use clear, concise callouts to help your team make informed decisions.</p>
      
      <h3>4. Aim and Sensitivity Settings</h3>
      <p>Find the right sensitivity setting that allows smooth aiming and quick target acquisition. Practice in aim trainers to develop muscle memory and improve reaction times.</p>
      
      <h3>5. Sound Awareness</h3>
      <p>Footsteps, gunshots, and killstreak audio cues provide valuable information. Wear headphones and learn to identify enemy movements through audio queues to stay alert.</p>
      
      <h3>6. Loadout Customization</h3>
      <p>Tailor your loadout to your playstyle. Experiment with attachments, perks, and equipment. Create loadouts for different scenarios: aggressive rushing, defensive holding, or balanced gameplay.</p>
      
      <h3>7. Game Mode Awareness</h3>
      <p>Each game mode requires different strategies. Learn objective-based gameplay for Team Deathmatch, Domination, and Search & Destroy. Understand rotation patterns and high-value positions.</p>
      
      <h3>8. Enemy Prediction</h3>
      <p>Anticipate enemy movements based on the map, game flow, and their previous positions. Pre-aim common angles and corners where enemies are likely to appear.</p>
      
      <h3>9. Killstreak Management</h3>
      <p>Effectively use scorestreaks to turn the tide of battle. Know when to call in support or offensive streaks. Coordinate with teammates to maximize their impact.</p>
      
      <h3>10. Consistent Practice & Improvement</h3>
      <p>Dedicate time to practicing regularly. Watch professional players, analyze your own gameplay, and identify areas for improvement. Consistency is key to climbing the ranks.</p>
      
      <p>Remember, improvement comes with dedication and practice. Start with these fundamentals, and gradually build advanced techniques as you progress. Happy gaming!</p>
    `,
  },
  {
    id: '2',
    title: 'Season 4 Weapon Balance Update Analysis',
    excerpt: 'We break down the latest weapon changes and how they impact competitive gameplay.',
    date: 'April 28, 2026',
    category: 'Update',
    image: '⚔️',
    author: 'Gaming Analyst',
    content: `
      <h2>Complete Breakdown of Season 4 Weapon Changes</h2>
      <p>The latest Season 4 update brings significant weapon balancing changes that reshape the competitive meta. Let's dive into the changes and their implications.</p>
      
      <h3>Assault Rifle Changes</h3>
      <p>The M16 received a 5% damage reduction but gained improved hip-fire accuracy. The XM4 remains dominant but saw a slight recoil increase. These changes encourage more skillful weapon handling.</p>
      
      <h3>SMG Updates</h3>
      <p>Close-range weapons got a much-needed buff. The LC10 now has improved range, making it viable at medium distances. The Krig9 received stability improvements for better accuracy.</p>
      
      <h3>Sniper Rifle Adjustments</h3>
      <p>Snipers maintain their one-shot capability but with slightly reduced ADS speed. This prevents excessive rushing while preserving their skillful, high-reward nature.</p>
      
      <h3>Tactical Rifle Meta</h3>
      <p>The new DMR-7 introduces a fresh tactical option. It bridges the gap between sniper rifles and assault rifles, offering consistent 2-shot kills with faster rate of fire.</p>
      
      <h3>Shotgun Balance</h3>
      <p>Shotguns gained improved range but require more precise aiming. This makes them viable without being overpowered in close quarters.</p>
      
      <h3>Competitive Impact</h3>
      <p>These changes shift the meta towards skilled weapon mastery. Teams will need to adapt their strategies and practice new loadout combinations to maintain competitive advantage.</p>
    `,
  },
  {
    id: '3',
    title: 'BattleGaming May Tournament Announced',
    excerpt: 'Join our biggest tournament yet with $15,000 in prizes and exclusive account rewards.',
    date: 'April 25, 2026',
    category: 'Tournament',
    image: '🏆',
    author: 'Tournament Team',
    content: `
      <h2>BattleGaming May Championship - $15,000 Prize Pool</h2>
      <p>We're thrilled to announce the biggest BattleGaming tournament of the year. Compete against the best players, win incredible prizes, and earn exclusive rewards.</p>
      
      <h3>Tournament Details</h3>
      <p><strong>Dates:</strong> May 15-30, 2026</p>
      <p><strong>Prize Pool:</strong> $15,000</p>
      <p><strong>Format:</strong> 4v4 Teams</p>
      <p><strong>Platforms:</strong> PS5, Xbox Series X, PC</p>
      
      <h3>Prize Distribution</h3>
      <p>🥇 1st Place: $8,000 + Gold Tournament Badge + Premium Account Bundle</p>
      <p>🥈 2nd Place: $4,000 + Silver Tournament Badge + 50% Account Discount</p>
      <p>🥉 3rd Place: $2,000 + Bronze Tournament Badge + 25% Account Discount</p>
      <p>🎖️ 4th-8th Place: $250 each + 15% Account Discount</p>
      
      <h3>Registration</h3>
      <p>Teams can register starting May 1st. Entry fee is waived for BattleGaming customers. Visit our tournament page to register your team.</p>
      
      <h3>Exclusive Rewards</h3>
      <p>All participants receive tournament cosmetics and badges displayed on their profile. Top finishers get exclusive premium account discounts and lifetime tournament recognition.</p>
      
      <h3>Stream & Community</h3>
      <p>Follow our Twitch channel for live coverage. Community voting determines side tournaments and special challenges with bonus prize pools.</p>
    `,
  },
  {
    id: '4',
    title: 'How to Improve Your KD Ratio',
    excerpt: 'Expert tips from pro players on increasing kill-death ratio and win rate.',
    date: 'April 20, 2026',
    category: 'Tips',
    image: '📈',
    author: 'Pro Coaches',
    content: `
      <h2>Master Your KD Ratio: Pro Player Tips</h2>
      <p>Your Kill-Death ratio is more than just a number—it reflects your overall gameplay quality. Learn professional strategies to consistently improve your KD.</p>
      
      <h3>Understanding KD Ratio</h3>
      <p>KD Ratio = Total Kills / Total Deaths. A 2.0 KD means 2 kills per death. Even a small improvement compounds significantly over your career.</p>
      
      <h3>Positioning Over Aggression</h3>
      <p>Professional players emphasize smart positioning. Control high-ground areas, use cover effectively, and avoid unfavorable fights. Survival extends your killstreaks.</p>
      
      <h3>Pre-Aiming & Anticipation</h3>
      <p>Always anticipate enemy positions. Pre-aim corners and sightlines. This millisecond advantage often determines engagements, directly improving your KD.</p>
      
      <h3>Loadout Optimization</h3>
      <p>Use loadouts perfectly suited to your playstyle. Balance weapon performance with movement speed. Test different setups to find your optimal configuration.</p>
      
      <h3>Map Control Mastery</h3>
      <p>Control key map positions early. This limits enemy options and creates favorable engagement scenarios. Defensive map control is as valuable as aggressive play.</p>
      
      <h3>Tactical Retreating</h3>
      <p>It's not cowardly—it's strategic. Retreat from unfavorable fights to fight another day. This reduces deaths and preserves killstreaks for bigger impact.</p>
      
      <h3>Regular Practice</h3>
      <p>Dedicate 30 minutes daily to aim practice. Use aim trainers to develop muscle memory. Consistency in training directly translates to improved gunfight outcomes.</p>
    `,
  },
  {
    id: '5',
    title: 'New Map Review: Arctic Base',
    excerpt: 'Complete walkthrough and strategy guide for the newly released Arctic Base map.',
    date: 'April 15, 2026',
    category: 'Review',
    image: '🗺️',
    author: 'Map Expert',
    content: `
      <h2>Arctic Base Map Strategy Guide</h2>
      <p>The new Arctic Base map brings fresh challenges and opportunities. Master this frozen battlefield with our comprehensive strategy guide.</p>
      
      <h3>Map Layout Overview</h3>
      <p>Arctic Base features three main areas: North Base (defensive spawn area), Central Plaza (open fighting zone), and South Ridge (sniper-friendly terrain). Understanding these zones is crucial for success.</p>
      
      <h3>North Base Defense</h3>
      <p>Strong defensive positions with multiple cover points. Teams spawning here should control corners and maintain sight-lines. Use buildings for cover rotation.</p>
      
      <h3>Central Plaza Combat</h3>
      <p>The heart of the action. This open area rewards tactical gameplay. Use the central structure for protection and coordinate team movements through the middle.</p>
      
      <h3>South Ridge Sniping</h3>
      <p>Elevated terrain provides excellent sniper positions. Control these heights to dominate engagements. Teams should designate one player to hold high-ground advantage.</p>
      
      <h3>Rotation Routes</h3>
      <p>Optimal movement paths prevent getting pinned. Learn the fastest rotations between areas. Practice side routes to flank enemies and maintain momentum.</p>
      
      <h3>Objective Play</h3>
      <p>In competitive modes, bomb plants and flag captures favor certain positions. Plan rotations around objective locations for team success.</p>
      
      <h3>Loadout Recommendations</h3>
      <p>Range varies from close quarters to long sightlines. Bring a balanced loadout covering multiple ranges. Adaptability is key on Arctic Base.</p>
    `,
  },
  {
    id: '6',
    title: 'Account Security: Protecting Your Investment',
    excerpt: 'Learn how to keep your premium gaming account secure with our security checklist.',
    date: 'April 10, 2026',
    category: 'Security',
    image: '🔒',
    author: 'Security Team',
    content: `
      <h2>Complete Account Security Guide</h2>
      <p>Your premium gaming account is a valuable investment. Protect it with proper security practices. This guide covers essential protection strategies.</p>
      
      <h3>Strong Password Requirements</h3>
      <p>Use unique, complex passwords (15+ characters with mixed case, numbers, symbols). Never reuse passwords across platforms. Consider password managers for secure storage.</p>
      
      <h3>Two-Factor Authentication</h3>
      <p>Enable 2FA on all accounts. Use authenticator apps rather than SMS when possible. 2FA provides critical protection against unauthorized access.</p>
      
      <h3>Email Security</h3>
      <p>Secure your email account with strong passwords and 2FA. Your email is the gateway to all account recovery processes. Treat it as your most valuable asset.</p>
      
      <h3>Phishing Awareness</h3>
      <p>Never click suspicious links or download files from unknown sources. Verify login pages before entering credentials. Report phishing attempts immediately.</p>
      
      <h3>Device Security</h3>
      <p>Keep your operating system and antivirus software updated. Use firewalls and avoid public WiFi for gaming. Regular security scans prevent malware compromise.</p>
      
      <h3>Account Monitoring</h3>
      <p>Regularly review login history and connected devices. Set up security alerts for unusual activity. Early detection prevents account takeovers.</p>
      
      <h3>Recovery Options</h3>
      <p>Keep recovery options updated. Maintain backup email addresses and phone numbers. This ensures you can regain access if compromised.</p>
    `,
  },
  {
    id: '7',
    title: 'Best Premium Accounts for Competitive Play May 2026',
    excerpt: 'Discover the top-tier accounts perfect for competitive Call of Duty tournaments and ranked matches.',
    date: 'May 8, 2026',
    category: 'Review',
    image: '⭐',
    author: 'Competitive Analyst',
    content: `
      <h2>Top Premium Accounts for Competitive Gaming</h2>
      <p>Competitive play demands high-level accounts with excellent stats and reputation. We've curated the best premium accounts available for serious competitors.</p>
      
      <h3>What Makes a Premium Competitive Account?</h3>
      <p>High win rate (60%+ minimum), strong K/D ratio (2.0+), extensive weapon mastery, and established reputation in ranked play. These accounts give you immediate credibility in tournaments.</p>
      
      <h3>Pro-Level Accounts</h3>
      <p>Our elite selection features accounts used by professional players. These accounts have tournament-winning track records, rare cosmetics, and peak ranking achievements.</p>
      
      <h3>Ranked Progress Accounts</h3>
      <p>Accounts at Grandmaster and Master tier provide competitive advantage from day one. Start your tournament run with an already-established rank and skill rating.</p>
      
      <h3>Full-Featured Accounts</h3>
      <p>All weapons unlocked, max-tier cosmetics, battle pass completed, and extensive operator skins. These accounts provide complete competitive readiness.</p>
      
      <h3>Why Choose Premium Accounts</h3>
      <p>Save months of grind. Jump straight into competitive play. Access tournament-ready loadouts. Establish credibility in the community instantly.</p>
      
      <h3>Verification & Guarantee</h3>
      <p>Every account is verified for authenticity. We provide lifetime support and account replacement guarantee if issues arise. Invest with confidence.</p>
      
      <h3>Getting Started</h3>
      <p>Browse our competitive account collection. Filter by platform, rank, and price. Purchase instantly and receive login credentials within minutes.</p>
    `,
  },
  {
    id: '8',
    title: 'Cross-Platform Gaming Guide: Play on Any Device',
    excerpt: 'Learn how to seamlessly play Call of Duty across PS5, Xbox, and PC with cross-platform progression.',
    date: 'May 6, 2026',
    category: 'Guide',
    image: '🎮',
    author: 'Platform Expert',
    content: `
      <h2>Complete Cross-Platform Gaming Guide</h2>
      <p>Modern gaming no longer confines you to a single platform. Master cross-platform play and progression with this comprehensive guide.</p>
      
      <h3>Understanding Cross-Platform Progression</h3>
      <p>Your account data syncs across PS5, Xbox Series X, and PC. Progression, cosmetics, and unlocks carry over. This unified ecosystem lets you play anywhere.</p>
      
      <h3>Setting Up Cross-Platform Account</h3>
      <p>Link your Call of Duty account to your gaming profile on each platform. Verify email and security settings. Synchronization happens automatically.</p>
      
      <h3>Platform Performance Differences</h3>
      <p>PS5 offers exclusive content. Xbox provides Game Pass benefits. PC delivers maximum graphical fidelity. Choose platforms based on your priorities.</p>
      
      <h3>Cross-Platform Matchmaking</h3>
      <p>Queue with friends on different platforms. Matchmaking is fair and balanced. Controller vs. keyboard players compete separately to ensure fairness.</p>
      
      <h3>Platform-Specific Advantages</h3>
      <p>PS5: Ultra-fast SSD loading times. Xbox: Quick Resume feature. PC: Graphics customization and unlimited frame rates. Leverage platform strengths.</p>
      
      <h3>Optimal Setup Tips</h3>
      <p>Use consistent controller settings across platforms for muscle memory. Adjust graphics settings per platform's capabilities. Maintain consistent gameplay.</p>
      
      <h3>Performance Optimization</h3>
      <p>Each platform handles games differently. Update drivers on PC. Manage storage on consoles. Optimize internet connection for smooth gameplay.</p>
      
      <h3>Troubleshooting Cross-Platform Issues</h3>
      <p>If progression doesn't sync, verify account linking. Clear cache if crossplay matchmaking fails. Contact support for persistent issues.</p>
    `,
  },
];

// Generate static params for all article IDs
export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';

  return {
    title: `${article.title} | BattleGaming News`,
    description: article.excerpt,
    keywords: `${article.category}, Call of Duty, gaming, BattleGaming`,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${baseUrl}/news/${article.id}`,
      type: 'article',
      publishedTime: article.date,
    },
    alternates: {
      canonical: `${baseUrl}/news/${article.id}`,
    },
  };
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Breadcrumb */}
      <div className="bg-black/30 py-4 px-4">
        <div className="max-w-4xl mx-auto text-sm text-gray-400">
          <Link href="/news" className="hover:text-[#FF7828] transition-colors">
            News
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{article.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 px-4 border-b border-[#FF7828]/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-5xl mb-6">{article.image}</div>
          <span className="inline-block bg-[#FF7828] text-black px-3 py-1 rounded-full text-sm font-bold mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#FF7828] mb-6">{article.title}</h1>
          <div className="flex gap-6 text-gray-400 text-sm">
            <span>📅 {article.date}</span>
            <span>👤 {article.author}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert max-w-none">
          <div
            className="text-gray-300 space-y-6 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: article.content
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line)
                .join(''),
            }}
          />
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 px-4 bg-black/30 border-t border-[#FF7828]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#FF7828] mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((relArticle) => (
              <Link
                key={relArticle.id}
                href={`/news/${relArticle.id}`}
                className="bg-[#1a1a3e]/60 rounded-lg border border-[#FF7828]/30 overflow-hidden hover:border-[#FF7828] hover:shadow-lg hover:shadow-[#FF7828]/20 transition-all"
              >
                <div className="text-4xl p-6 bg-[#0a0410]">{relArticle.image}</div>
                <div className="p-6">
                  <span className="inline-block text-[#FF7828] text-xs font-bold uppercase tracking-wider mb-2">
                    {relArticle.category}
                  </span>
                  <h3 className="font-bold mb-2 line-clamp-2">{relArticle.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{relArticle.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#1a1a3e] to-[#2d1b4e] p-12 rounded-lg border border-[#FF7828]/30">
          <h2 className="text-3xl font-bold text-[#FF7828] mb-4">Get More Gaming Content</h2>
          <p className="text-gray-300 mb-6">Subscribe to our newsletter for exclusive guides, tips, and tournament announcements.</p>
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
      </section>
    </div>
  );
}
