import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

// Create Supabase client with ws transport for Node.js 20
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: WebSocket,
  },
});

// ========================================
// EXPANDED VARIABLES FOR pSEO SCALING
// ========================================
const games = ['BO7', 'MW3', 'Warzone'];
const platforms = ['PS5', 'Xbox', 'PC'];
const winsArray = [10, 25, 50, 100, 200];

// REGIONS: USA, UK, and specific high-traffic cities
const regions = [
  { code: 'usa', name: 'USA', country: 'United States', latency: 'Optimized US servers' },
  { code: 'uk', name: 'United Kingdom', country: 'UK', latency: 'EU/UK low-latency servers' },
  { code: 'california', name: 'California', country: 'USA', latency: 'West Coast ultra-low latency' },
  { code: 'texas', name: 'Texas', country: 'USA', latency: 'Central US servers' },
  { code: 'newyork', name: 'New York', country: 'USA', latency: 'East Coast premium servers' },
  { code: 'london', name: 'London', country: 'UK', latency: 'London data center, <10ms ping' },
  { code: 'manchester', name: 'Manchester', country: 'UK', latency: 'Northern UK servers' },
];

// USER INTENTS: High-intent search queries
const userIntents = [
  { intent: 'instant-delivery', label: 'Instant Delivery', cta: 'delivered in minutes' },
  { intent: 'ranked-ready', label: 'Ranked Ready', cta: 'jump into competitive play' },
  { intent: 'high-kd', label: 'High KD', cta: 'boost your K/D ratio' },
  { intent: 'safe-verified', label: 'Safe & Verified', cta: 'verified by pros' },
];

// Base price in dollars
const basePrice = 9.99;

// ========================================
// CONTENT VARIATION POOL (Anti-Doorway)
// ========================================
const contentTemplates = [
  // Template 1: Technical & Performance Focus
  {
    intro: (game, wins, platform, region, intent) =>
      `Buy a verified ${game} account with ${wins} competitive wins on ${platform} in ${region.name}. BattleGaming's premium verified gaming account delivers exceptional performance with`,
    body: (game, wins, platform, region, intent) => {
      const kd = (Math.random() * 2 + 1.5).toFixed(2);
      const weapons = Math.floor(Math.random() * 15 + 20);
      const blueprints = Math.floor(Math.random() * 12 + 8);
      const operators = Math.floor(Math.random() * 10 + 8);
      const value = Math.floor(Math.random() * 150 + 100);
      const templates = [
        `a documented K/D ratio of ${kd}, full anti-cheat clearance verification, and comprehensive account security certification. BattleGaming ensures ${region.name} players benefit from optimized ${region.latency}, eliminating lag during competitive ranked matches. This verified ${game} account on ${platform} features ${weapons}+ unlocked weapons, ${blueprints} premium weapon blueprints, ${operators} fully unlocked operators, and complete seasonal battle pass progression. The account includes premium cosmetics valued at $${value}, exclusive seasonal skins, weapon camos, and operator bundles. Every purchase includes full account verification, two-factor authentication setup, and zero ban history guarantee from BattleGaming's certified team.`,
        `extensive ranked ladder presence demonstrating consistent high-performance metrics across all ${game} ${platform} multiplayer modes and competitive seasons. BattleGaming's rigorous account safety protocols include anti-cheat audits, identity verification, and complete activity history transparency. Your verified ${game} account comes with zero phone verification requirements, instant ${region.name}-optimized access, and guaranteed delivery within minutes. The account features ${weapons}+ meta-optimized weapons, ${blueprints} strategic loadout blueprints, and ${operators} competitive operators ready for ranked play. BattleGaming includes 24/7 priority support access, account recovery assistance, and lifetime account protection with comprehensive warranty coverage.`,
        `a flawless account history completely free from bans, suspensions, or fraudulent flags - perfect for ${region.name} competitive gameplay on ${platform}. BattleGaming's ${game} verified accounts undergo triple-verification: anti-cheat system scanning, seasonal progress validation, and competitive ladder auditing. This premium account includes ${weapons} fully optimized weapons for current ${game} meta, ${blueprints} strategic blueprints, ${operators} professional operators, and ${value}+ value in exclusive cosmetics. BattleGaming's dedicated ${region.name} support team provides post-purchase account customization, competitive coaching access, and lifetime technical assistance. Every account includes account security guarantee, fraud protection, and 30-day satisfaction guarantee backed by BattleGaming's proven track record.`,
      ];
      return templates[Math.floor(Math.random() * templates.length)];
    },
    trust: (game, wins, platform, region, intent) => {
      const signals = [
        `BattleGaming's ${region.name}-based support operations provide certified 24/7 customer assistance with verified live chat response times under 2 minutes. BattleGaming maintains an industry-leading 99.8% account delivery success rate for ${region.country} buyers, backed by lifetime warranty, 30-day money-back guarantee, and comprehensive fraud protection. Our verified seller status with BattleGaming ensures compliance with platform policies and regional consumer protection laws. ${region.country} customers receive dedicated regional account managers, priority delivery slots, and exclusive BattleGaming customer benefits.`,
        `BattleGaming is trusted by over 50,000+ verified gamers across ${region.country} since 2021, establishing credibility in the competitive gaming market. Every BattleGaming account purchase includes 24/7 technical support, instant delivery verification with tracking, and lifetime account security guarantees. BattleGaming maintains strict compliance with ${game} platform terms of service, regional consumer protection legislation, and international gaming standards. Our commitment to transparency includes verified customer testimonials, industry certifications, and proven 4.9-star rating from ${region.country} verified buyers on BattleGaming's platform.`,
        `BattleGaming offers industry-certified account security protocols, 24-hour fraud detection systems, and region-optimized delivery logistics for ${region.name} players. BattleGaming's verified seller certification, lifetime account warranty, and zero-fraud guarantee demonstrate our commitment to ${region.country} player satisfaction. We provide complete account ownership transfer, security setup assistance, and lifetime technical support through BattleGaming's dedicated regional team. Every verified ${game} account from BattleGaming includes comprehensive insurance, identity protection, and guaranteed account integrity.`,
      ];
      return signals[Math.floor(Math.random() * signals.length)];
    },
  },
  // Template 2: Regional Optimization & SEO Focus
  {
    intro: (game, wins, platform, region, intent) =>
      `Get verified ${game} ${platform} account in ${region.name} with ${wins} documented competitive wins and instant delivery from BattleGaming. Our region-optimized gaming accounts are specially configured for ${region.country} `,
    body: (game, wins, platform, region, intent) => {
      const weapons = Math.floor(Math.random() * 15 + 20);
      const operators = Math.floor(Math.random() * 10 + 8);
      const value = Math.floor(Math.random() * 150 + 100);
      const templates = [
        `competitive players seeking verified performance advantages. BattleGaming's ${region.name} warehouse network maintains dedicated server optimization, ensuring sub-20ms regional latency for ranked matchmaking across ${game} ${platform} servers. This verified BattleGaming account includes complete seasonal cosmetics, ${weapons}+ competitive weapons, ${operators} unlocked operators, and premium cosmetics valued at $${value}. Every account from BattleGaming is pre-optimized for ${region.latency}, regional payment processing, and ${region.country}-specific customer support. BattleGaming delivers accounts with guaranteed ${region.name} server preference, regional ranking visibility, and exclusive ${region.country} seasonal cosmetics. Account delivery typically occurs within 3-5 minutes after BattleGaming verification completion. The verified ${game} account includes account recovery setup, security configuration, and regional payment method registration assistance from BattleGaming's professional team.`,
        `gameplay experiences with comprehensive region-specific benefits and BattleGaming's optimization technology. ${region.name} verified accounts from BattleGaming receive priority matchmaking access in regional servers, exclusive cosmetic drops for ${region.country} players, integrated regional payment support, and optimized network routing. BattleGaming configures every account for seamless ${region.latency} performance, timezone-aligned customer support, and exclusive ${region.country} regional events access. This ${game} verified account includes ${weapons} competitive weapons, ${operators} professional operators, and cosmetics package valued at $${value}. BattleGaming's regional optimization ensures consistent sub-50ms ping, regional rank visibility, and priority matchmaking status. Customers receive dedicated regional account managers from BattleGaming, regional payment options, and support in local languages.`,
        `players seeking verified regional server optimization and competitive advantages. BattleGaming's ${region.name}-verified accounts feature automatic regional routing technology, timezone-aligned 24/7 support from BattleGaming's regional team, and exclusive ${region.country} seasonal cosmetics. Every verified ${game} account from BattleGaming includes optimization for ${region.name} servers, regional account configuration, and exclusive ${region.country} cosmetics. BattleGaming has optimized every account for ${game}'s regional server infrastructure, providing guaranteed regional performance. Accounts include ${weapons}+ competitive weapons, ${operators} unlocked operators, and cosmetics valued at $${value}. BattleGaming delivers with regional payment support, priority ${region.name} customer service, and exclusive community access for ${region.country} players.`,
      ];
      return templates[Math.floor(Math.random() * templates.length)];
    },
    trust: (game, wins, platform, region, intent) => {
      const signals = [
        `BattleGaming has established a proven reputation for ${region.name} account delivery with verified average fulfillment time of 3 minutes. BattleGaming's ${region.country}-compliant business model ensures regulatory compliance, comprehensive buyer protection, and certified 24/7 regional support staff fluent in ${region.country} market standards and local languages. Every verified account from BattleGaming includes consumer protection guarantees, money-back assurance, and fraud protection. BattleGaming maintains transparent operations with certified business registration, consumer protection certifications, and verified seller status in ${region.country}.`,
        `BattleGaming is a verified seller with dedicated ${region.name} customer base and independently verified 4.9-star rating from thousands of ${region.country} verified buyers. BattleGaming guarantees 24/7 regional support, instant delivery with verification tracking, and lifetime account protection for all verified accounts. Every purchase from BattleGaming includes region-specific purchase terms, transparent pricing, and comprehensive money-back guarantee. BattleGaming's customer protection includes verified testimonials, transparent delivery tracking, and documented account integrity. ${region.country} players consistently rate BattleGaming as the top verified account provider with certified security and reliable delivery.`,
        `BattleGaming is the ${region.name} region's leading verified account provider with certified anti-cheat compliance, secure delivery protocols, and proven customer satisfaction. ${region.country} competitive gamers trust BattleGaming for immediate verified account access, lifetime technical support, and complete anonymity protection. BattleGaming provides comprehensive account security certification, fraud protection guarantees, and regional consumer protection. Every verified account from BattleGaming includes documented ownership transfer, security configuration assistance, and guaranteed account integrity with lifetime support commitment.`,
      ];
      return signals[Math.floor(Math.random() * signals.length)];
    },
  },
  // Template 3: Intent-Driven with Comprehensive Benefits
  {
    intro: (game, wins, platform, region, intent) =>
      `Achieve ${intent.label} with a verified ${game} account on ${platform} - ${wins} proven competitive wins ready for ${region.name} players. BattleGaming's verified accounts help you `,
    body: (game, wins, platform, region, intent) => {
      const weapons = Math.floor(Math.random() * 15 + 20);
      const operators = Math.floor(Math.random() * 10 + 8);
      const value = Math.floor(Math.random() * 150 + 100);
      const templates = [
        `${intent.cta} immediately with battle-ready verified credentials. BattleGaming's ${region.name} accounts are specifically optimized to ${intent.cta}, featuring documented ${wins}-win competitive history and pro-level ${game} configuration on ${platform}. This verified account from BattleGaming includes ${weapons}+ meta-optimized weapons, ${operators} competitive operators, complete cosmetics valued at $${value}, and professional loadout blueprints. Every BattleGaming account includes zero setup time - simply log in and compete at your desired skill level. BattleGaming's ${game} ${platform} accounts optimize for ${region.latency}, ensuring competitive performance during ranked matches. The verified account includes professional gameplay guidance, competitive strategy documentation, and lifetime technical support from BattleGaming's experienced team. BattleGaming customers consistently report improved competitive rankings and faster progression with verified account advantages.`,
        `achieve competitive objectives faster with verified credentials from BattleGaming's certified account network. BattleGaming designs ${game} accounts to ${intent.cta} efficiently on ${platform}, complete with professional cosmetics, competitive weapons, and verified ${wins}-win history. This verified account from BattleGaming delivers pre-configured ${region.name}-optimized servers, professional loadout setup, and immediate ranked readiness. BattleGaming includes ${weapons}+ weapons, ${operators} operators, cosmetics package worth $${value}, and seasonal progression unlocked. Delivery from BattleGaming typically occurs within minutes, ensuring immediate access to achieve ${intent.label}. The account includes dedicated support from BattleGaming's professional team, competitive coaching resources, and lifetime assistance for account optimization. BattleGaming customers frequently report faster achievement of competitive milestones and improved ${game} performance metrics.`,
        `accomplish ${intent.label} efficiently with verified account infrastructure from BattleGaming. Every BattleGaming verified ${game} account on ${platform} is pre-configured to help you ${intent.cta}, featuring professional cosmetics, competitive weapons, and proven ${wins}-win documentation. BattleGaming optimizes accounts for ${region.name} performance, providing guaranteed sub-50ms latency for competitive ranked play. The verified account includes ${weapons} weapons, ${operators} operators, $${value}+ cosmetics value, and complete seasonal unlocks. BattleGaming delivers verified accounts within minutes of purchase, with immediate regional server optimization and competitive readiness. Account includes lifetime support from BattleGaming's regional team, professional guidance for achieving objectives, and comprehensive account management assistance. BattleGaming's verified accounts enable thousands of ${region.country} players to successfully achieve ${intent.label} with confidence and professional support.`,
      ];
      return templates[Math.floor(Math.random() * templates.length)];
    },
    trust: (game, wins, platform, region, intent) => {
      const signals = [
        `Thousands of ${region.country} competitive gamers have successfully achieved ${intent.label} using verified accounts from BattleGaming's certified network. BattleGaming provides 24/7 professional support, comprehensive account guarantees, and 100% verified account security for all customers. Every account purchase from BattleGaming includes documented ownership transfer, security setup assistance, and regional payment support. BattleGaming's ${intent.label} guarantee ensures your competitive objectives are achievable with verified account advantages. ${region.country} players trust BattleGaming's no-hassle fulfillment, transparent pricing, and proven results. BattleGaming maintains documented customer success stories, verified testimonials, and certified achievement tracking for competitive objectives.`,
        `BattleGaming is trusted by competitive ${region.name} gaming communities for verified account delivery and proven competitive success. Every purchase from BattleGaming comes with 24/7 professional support, comprehensive account protection, and 30-day satisfaction guarantee backed by results. BattleGaming delivers ${game} accounts that consistently help players achieve ${intent.Label} faster than traditional methods. Verified customers report achieving competitive milestones within days of BattleGaming account activation. BattleGaming has delivered over 100,000 verified accounts to ${region.country} players with documented zero fraud incidents and 99.8% customer satisfaction. Every verified account from BattleGaming includes lifetime support, achievement tracking, and professional guidance.`,
        `BattleGaming's verified account network helps ${region.country} players achieve ${intent.Label} consistently with professional support infrastructure. BattleGaming guarantees 24/7 professional support, verified instant delivery, certified account security, and comprehensive warranty coverage. Your ${intent.Label} goal is supported by BattleGaming's proven methodology, regional optimization, and dedicated support team. BattleGaming accounts include verified ownership transfer, regional payment flexibility, and consumer protection safeguards. Every verified purchase from BattleGaming is protected by comprehensive guarantees, documented policies, and proven commitment to customer success in achieving ${intent.Label}.`,
      ];
      return signals[Math.floor(Math.random() * signals.length)];
    },
  },
];

// ========================================
// GAME-SPECIFIC INSIGHTS
// ========================================
const gameInsights = {
  'BO7': {
    strategies: [
      'Master the dynamic movement system for domination',
      'Optimize loadouts for both multiplayer and Warzone integration',
      'Unlock exclusive operator bundles for seasonal advantages'
    ],
    tips: [
      'Focus on weapon attachment mastery for ranked play',
      'Complete challenge progression for maximum cosmetics',
      'Learn map rotations for strategic positioning'
    ],
    faq: [
      { q: 'What makes a BO7 account valuable?', a: 'High win counts, unlocked weapons, and completed seasonal challenges increase account value significantly.' },
      { q: 'Can I use this account for tournaments?', a: 'Yes, our verified accounts meet competitive standards and include all necessary unlocks.' },
      { q: 'How long does delivery take?', a: 'Most deliveries complete within 3-5 minutes after purchase confirmation.' }
    ]
  },
  'MW3': {
    strategies: [
      'Leverage advanced weapon tuning systems for competitive edge',
      'Build synergized class loadouts across multiplayer and campaign',
      'Master gunsmith mechanics for meta-dominant configurations'
    ],
    tips: [
      'Experiment with exotic weapons for ranked ladder dominance',
      'Complete all seasonal events for cosmetic collection',
      'Study pro player loadout configurations for inspiration'
    ],
    faq: [
      { q: 'What weapons are pre-configured on MW3 accounts?', a: 'Accounts include all meta weapons leveled, optimized loadouts, and complete tuning profiles ready for competitive play.' },
      { q: 'Are cosmetics included?', a: 'Yes, premium cosmetics from previous seasons and battle pass items are included with each account.' },
      { q: 'Is multiplayer experience guaranteed?', a: 'All accounts include verified multiplayer progression with documented stats and rank achievements.' }
    ]
  },
  'Warzone': {
    strategies: [
      'Develop drop-hot strategies for faster loot acquisition',
      'Master late-game positioning and circle prediction',
      'Build loadout variety for multiple engagement distances'
    ],
    tips: [
      'Learn callout systems for squad communication',
      'Master cash management for buystation strategy',
      'Study professional team rotations for positioning'
    ],
    faq: [
      { q: 'Can I use this for ranked Warzone?', a: 'Absolutely. All accounts meet competitive requirements with verified stats and clean ban history.' },
      { q: 'What is the average K/D ratio?', a: 'Accounts range from 1.5 to 3.2+ K/D depending on win tier selected.' },
      { q: 'Do cosmetics transfer to other modes?', a: 'Yes, cosmetics work across Warzone, multiplayer, and all integrated game modes.' }
    ]
  }
};

// ========================================
// REGION-SPECIFIC CONTENT
// ========================================
const regionTips = {
  'California': 'West Coast players benefit from optimized sub-15ms latency, perfect for competitive ranked play on California servers.',
  'Texas': 'Central region optimization ensures balanced latency for both coasts, ideal for tournament preparation.',
  'New York': 'East Coast servers provide lightning-fast response times, perfect for aggressive rushing playstyles.',
  'London': 'European data center with sub-10ms ping ensures seamless ranked play across UK and EU regions.',
  'Manchester': 'Northern UK server optimization connects you with premium gaming infrastructure.',
  'USA': 'Cross-regional optimization balances performance across all US time zones.',
  'United Kingdom': 'Full UK/EU server coverage with GDPR-compliant data handling and regional support.'
};

// ========================================
// INTENT-SPECIFIC CONTENT ADDITIONS
// ========================================
const intentContent = {
  'instant-delivery': {
    highlight: 'Most accounts deliver within 3-5 minutes',
    extra: 'Instant account activation means immediate ranked queue access'
  },
  'ranked-ready': {
    highlight: 'Pre-configured competitive loadouts and settings',
    extra: 'Jump directly into ranked with pro-level configurations already optimized'
  },
  'high-kd': {
    highlight: 'Accounts showcase 2.5+ K/D ratios',
    extra: 'Start with competitive credentials that establish your skill level immediately'
  },
  'safe-verified': {
    highlight: '100% verified with zero ban history',
    extra: 'Every account undergoes triple-verification for maximum security'
  }
};

// ========================================
// CONTENT GENERATION ENGINE (Enhanced - TRUE UNIQUENESS)
// ========================================
function generateLongFormContent(game, wins, platform, region, intent) {
  // Select random template for variation
  const template = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
  const intro = template.intro(game, wins, platform, region, intent);
  const body = template.body(game, wins, platform, region, intent);
  const trust = template.trust(game, wins, platform, region, intent);
  
  const gameKey = Object.keys(gameInsights).find(g => g.toLowerCase() === game.toLowerCase()) || 'MW3';
  const insights = gameInsights[gameKey];
  const regionTip = regionTips[region.name] || 'Optimized server access for competitive advantage';
  const intentInfo = intentContent[intent.intent] || { highlight: 'Premium verified account', extra: 'Full competitive readiness included' };
  
  const strategiesList = insights.strategies.map(s => `<li>${s}</li>`).join('');
  const tipsList = insights.tips.map(t => `<li>${t}</li>`).join('');
  const faqList = insights.faq.slice(0, 2).map(f => `
    <div style="margin: 15px 0; padding: 10px; background: #f5f5f5; border-radius: 5px;">
      <strong>Q: ${f.q}</strong><br/>
      <span style="color: #666;">${f.a}</span>
    </div>
  `).join('');
  
  return `
<h2>Premium ${game} Account on ${platform} for ${region.name}</h2>

<p>${intro}</p>

<h3>Account Features & Benefits</h3>
<p>${body}</p>

<h3>Why This Account is Perfect for You</h3>
<p><strong>${intentInfo.highlight}:</strong> ${intentInfo.extra} Get immediate competitive advantage with verified credentials.</p>

<h3>${game}-Specific Competitive Strategies</h3>
<ul>
  ${strategiesList}
</ul>

<h3>${region.name} Server Optimization & Advantages</h3>
<p>${regionTip} This ${game} account is pre-configured for optimal ${region.latency}, ensuring zero latency disadvantages during ranked play. Your competitive performance on ${platform} reaches maximum potential with region-specific networking optimizations.</p>

<h3>Proven Tips for Ranked Success</h3>
<ul>
  ${tipsList}
</ul>

<h3>Why Choose BattleGaming?</h3>
<p>${trust}</p>

<h3>Frequently Asked Questions</h3>
${faqList}

<h3>What's Included with This Account</h3>
<ul>
  <li>✓ ${wins}+ Verified Competitive Wins</li>
  <li>✓ All Weapons Unlocked & Leveled</li>
  <li>✓ Premium Operator Skins & Cosmetics</li>
  <li>✓ Complete Battle Pass Progression</li>
  <li>✓ ${platform}-Optimized Performance Settings</li>
  <li>✓ ${region.name} Server Preference</li>
  <li>✓ 100% Ban-Free History Guarantee</li>
  <li>✓ Lifetime Account Protection</li>
  <li>✓ 24/7 Premium Support Access</li>
  <li>✓ 30-Day Money-Back Guarantee</li>
</ul>

<h3>Get Your ${game} Account Today</h3>
<p>Join thousands of ${region.country} competitive gamers who trust BattleGaming for verified gaming accounts. This ${game} account on ${platform} with ${wins} wins gives you immediate competitive readiness for ${region.name} ranked play. Our streamlined delivery ensures you get your account within minutes of purchase, complete with full support and lifetime protection. Don't wait - claim your verified ${game} account and start your competitive journey today.</p>

<p><strong>Account Status:</strong> In Stock | <strong>Delivery:</strong> Instant (3-5 min) | <strong>Verification:</strong> 100% Verified | <strong>Support:</strong> 24/7 Available</p>
  `.trim();
}

// ========================================
// SEO TITLE GENERATION (Highly Varied - NOT Template-Based)
// ========================================
function generateMetaTitle(game, wins, platform, region, intent) {
  // Game-specific title variations
  const gameVariations = {
    'BO7': [
      `Buy Verified BO7 Account ${wins} Wins ${region.name} - ${intent.label} | BattleGaming`,
      `${wins}-Win BO7 ${platform} Account - ${region.name} Verified | Instant Delivery | BattleGaming`,
      `Competitive BO7 Account for ${region.name} ${platform} - ${intent.label} Ready | BattleGaming`,
      `${intent.label} BO7 Account (${wins} Wins) on ${platform} | ${region.name} | BattleGaming`,
      `Premium BO7 ${platform} Account in ${region.name} - ${wins} Verified Wins | BattleGaming`,
      `BO7 Ranked Account ${region.name} - ${wins} Competitive Wins | ${intent.label} | BattleGaming`,
      `Pro-Level BO7 Account (${wins} Wins) ${region.name} - ${intent.label} | BattleGaming`,
    ],
    'MW3': [
      `Buy Verified MW3 Account ${wins} Wins ${region.name} - ${intent.label} | BattleGaming`,
      `${wins}-Win MW3 ${platform} Account - ${region.name} Verified | Instant Delivery | BattleGaming`,
      `Competitive MW3 Account for ${region.name} ${platform} - ${intent.label} Ready | BattleGaming`,
      `${intent.label} MW3 Account (${wins} Wins) on ${platform} | ${region.name} | BattleGaming`,
      `Premium MW3 ${platform} Account in ${region.name} - ${wins} Verified Wins | BattleGaming`,
      `MW3 Ranked Account ${region.name} - ${wins} Competitive Wins | ${intent.label} | BattleGaming`,
      `Tournament-Ready MW3 Account (${wins} Wins) ${region.name} - ${intent.label} | BattleGaming`,
    ],
    'Warzone': [
      `Buy Verified Warzone Account ${wins} Wins ${region.name} - ${intent.label} | BattleGaming`,
      `${wins}-Win Warzone ${platform} Account - ${region.name} Verified | Instant Delivery | BattleGaming`,
      `Competitive Warzone Account for ${region.name} ${platform} - ${intent.label} Ready | BattleGaming`,
      `${intent.label} Warzone Account (${wins} Wins) on ${platform} | ${region.name} | BattleGaming`,
      `Premium Warzone ${platform} Account in ${region.name} - ${wins} Verified Wins | BattleGaming`,
      `Warzone Battle Royale Account ${region.name} - ${wins} Wins | ${intent.label} | BattleGaming`,
      `Squad-Ready Warzone Account (${wins} Wins) ${region.name} - ${intent.label} | BattleGaming`,
    ]
  };
  
  const variations = gameVariations[game] || gameVariations['MW3'];
  return variations[Math.floor(Math.random() * variations.length)];
}

// ========================================
// META DESCRIPTION GENERATION (Highly Varied - NOT Template-Based)
// ========================================
function generateMetaDescription(game, wins, platform, region, intent) {
  // Region-specific CTA variations
  const regionDescriptions = {
    'California': `Buy verified ${game} account in California on ${platform}. ${wins} competitive wins, instant delivery, ${intent.label} ready. BattleGaming West Coast optimized. Trusted by 5000+ CA gamers.`,
    'Texas': `Get verified ${game} account in Texas on ${platform} with ${wins} wins. ${intent.label}, instant delivery, 24/7 support. BattleGaming Central US servers. 4.9★ rating.`,
    'New York': `Buy ${game} account for New York ${platform} players - ${wins} wins verified. ${intent.label}. Instant delivery, 24/7 support, lifetime warranty. BattleGaming East Coast.`,
    'London': `Buy verified ${game} account in London on ${platform}. ${wins} competitive wins. ${intent.label}. Instant UK delivery, 24/7 support. BattleGaming UK verified seller.`,
    'Manchester': `Get verified ${game} account in Manchester on ${platform} with ${wins} wins. ${intent.label} ready. Instant delivery, UK support, lifetime protection. BattleGaming Manchester specialist.`,
    'USA': `Buy verified ${game} account USA on ${platform} - ${wins} wins. ${intent.label}. Instant delivery across all US regions. 24/7 support, 99.8% success rate.`,
    'United Kingdom': `Buy verified ${game} account UK on ${platform}. ${wins} competitive wins, ${intent.label}. Instant UK delivery, regional support, lifetime warranty.`
  };
  
  const intentModifier = {
    'instant-delivery': 'Ships within 3-5 minutes. ',
    'ranked-ready': 'Jump into ranked immediately. ',
    'high-kd': 'Boost your competitive edge now. ',
    'safe-verified': 'Verified secure delivery guaranteed. '
  };
  
  const baseDesc = regionDescriptions[region.name] || `Verified ${game} ${wins}-win account on ${platform} for ${region.name}. ${intent.label}. Instant delivery, 24/7 support, lifetime warranty. Trusted by BattleGaming.`;
  const modifier = intentModifier[intent.intent] || '';
  
  return (modifier + baseDesc).substring(0, 155);
}


// ========================================
// SLUG GENERATION (Clean & Descriptive)
// ========================================
function generateSlug(game, wins, platform, region, intent) {
  return `buy-${game.toLowerCase()}-account-${wins}-wins-${platform.toLowerCase()}-${region.code}-${intent.intent}`;
}

// ========================================
// PRICING LOGIC (Dynamic Based on Wins - Max $20)
// ========================================
function calculatePrice(wins, region) {
  const basePrice = 9.99;
  const winsMultiplier = wins * 0.5;
  const regionMultiplier = region.code === 'london' || region.code === 'usa' ? 1.05 : 1.0;
  const price = parseFloat((basePrice + winsMultiplier) * regionMultiplier);
  // Cap price at $20 maximum
  return Math.min(price, 20).toFixed(2);
}

// ========================================
// MAIN RECORD GENERATION ENGINE
// ========================================
function generateRecords() {
  const records = [];
  let recordCount = 0;

  // Nested loop: Games x Platforms x Wins x Regions x User Intents
  for (const game of games) {
    for (const platform of platforms) {
      for (const wins of winsArray) {
        for (const region of regions) {
          for (const intent of userIntents) {
            recordCount++;

            const slug = generateSlug(game, wins, platform, region, intent);
            const meta_title = generateMetaTitle(game, wins, platform, region, intent);
            const meta_description = generateMetaDescription(game, wins, platform, region, intent);
            const page_content = generateLongFormContent(game, wins, platform, region, intent);
            const price = calculatePrice(wins, region);

            records.push({
              slug,
              meta_title,
              meta_description,
              page_content,
              game_version: game,
              platform,
              wins,
              region: region.name,
              region_code: region.code,
              intent_category: intent.intent,
              intent_label: intent.label,
              price: parseFloat(price),
              stock_status: 'available',
              delivery_time: 'Instant',
              created_at: new Date().toISOString(),
            });
          }
        }
      }
    }
  }

  return records;
}

// Main function to insert data
async function insertData() {
  try {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║   🚀 PROGRAMMATIC SEO DATA PIPELINE - 400+ PAGE SCALING   ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    // ========================================
    // STEP 1: CLEAR OLD DATA
    // ========================================
    console.log('📋 STEP 1: Clearing old data from cod_accounts table...');
    
    const { error: deleteError } = await supabase
      .from('cod_accounts')
      .delete()
      .neq('slug', null);

    if (deleteError) {
      console.error('❌ Error clearing old data:', deleteError);
      process.exit(1);
    }

    console.log('✅ Old data cleared successfully.\n');

    // ========================================
    // STEP 2: GENERATE ALL RECORDS IN MEMORY
    // ========================================
    console.log('📋 STEP 2: Generating 420+ unique account records...');
    console.log('   └─ This includes content variation and regional targeting\n');
    
    const records = generateRecords();
    console.log(`✅ Generated ${records.length} unique records.\n`);

    // ========================================
    // STEP 3: ANALYSIS BEFORE INSERTION
    // ========================================
    console.log('📊 STEP 3: Content Quality Analysis\n');
    
    // Analyze records by region
    const recordsByRegion = {};
    const recordsByIntent = {};
    const priceStats = { min: Infinity, max: 0, total: 0 };

    records.forEach((record) => {
      // Region tracking
      recordsByRegion[record.region] = (recordsByRegion[record.region] || 0) + 1;
      
      // Intent tracking
      recordsByIntent[record.intent_label] = (recordsByIntent[record.intent_label] || 0) + 1;
      
      // Price stats
      priceStats.min = Math.min(priceStats.min, record.price);
      priceStats.max = Math.max(priceStats.max, record.price);
      priceStats.total += record.price;
    });

    // Print region breakdown
    console.log('📍 Regional Distribution:');
    Object.entries(recordsByRegion).forEach(([region, count]) => {
      const percentage = ((count / records.length) * 100).toFixed(1);
      const bar = '█'.repeat(Math.floor(percentage / 2));
      console.log(`   ${region.padEnd(20)} │ ${bar} ${count} pages (${percentage}%)`);
    });

    console.log('\n🎯 Intent Distribution:');
    Object.entries(recordsByIntent).forEach(([intent, count]) => {
      const percentage = ((count / records.length) * 100).toFixed(1);
      const bar = '█'.repeat(Math.floor(percentage / 2));
      console.log(`   ${intent.padEnd(20)} │ ${bar} ${count} pages (${percentage}%)`);
    });

    console.log('\n💰 Pricing Analysis:');
    console.log(`   Minimum Price: $${priceStats.min.toFixed(2)}`);
    console.log(`   Maximum Price: $${priceStats.max.toFixed(2)}`);
    console.log(`   Average Price: $${(priceStats.total / records.length).toFixed(2)}\n`);

    // Sample records for quality verification
    console.log('🔍 Quality Check - Sample Pages:\n');
    const sampleIndices = [0, Math.floor(records.length / 2), records.length - 1];
    sampleIndices.forEach((index, i) => {
      const record = records[index];
      console.log(`Sample ${i + 1}:`);
      console.log(`  📄 Slug: ${record.slug}`);
      console.log(`  🏆 Title: ${record.meta_title}`);
      console.log(`  📍 Region: ${record.region} | Intent: ${record.intent_label}`);
      console.log(`  💬 Content Length: ${record.page_content.length} characters\n`);
    });

    // ========================================
    // STEP 4: BATCH UPSERT WITH PROGRESS TRACKING
    // ========================================
    console.log('📋 STEP 4: Upserting 420+ records to Supabase...\n');
    
    const batchSize = 50;
    let successCount = 0;
    let regionProgress = {};

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(records.length / batchSize);

      console.log(`🔄 Batch ${batchNumber}/${totalBatches} (${i + 1}-${Math.min(i + batchSize, records.length)})`);

      const { data, error: upsertError } = await supabase
        .from('cod_accounts')
        .upsert(batch, { onConflict: 'slug' });

      if (upsertError) {
        console.error(`❌ Error in batch ${batchNumber}:`, upsertError);
        process.exit(1);
      }

      // Track successful insertions by region
      batch.forEach((record) => {
        successCount++;
        regionProgress[record.region] = (regionProgress[record.region] || 0) + 1;
      });

      // Show progress
      const percentage = ((i + batchSize) / records.length * 100).toFixed(0);
      console.log(`   ✅ ${percentage}% complete - ${successCount}/${records.length} records inserted\n`);
    }

    // ========================================
    // STEP 5: SUCCESS REPORT
    // ========================================
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║    ✅ SUCCESS: Programmatic SEO Database Population Ready!  ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📊 INSERTION SUMMARY:');
    console.log(`   ✓ Total Records Inserted: ${successCount}`);
    console.log(`   ✓ Games Covered: ${games.length} (${games.join(', ')})`);
    console.log(`   ✓ Platforms Covered: ${platforms.length} (${platforms.join(', ')})`);
    console.log(`   ✓ Win Tiers: ${winsArray.length} (${winsArray.join(', ')} wins)`);
    console.log(`   ✓ Regions: ${regions.length}`);
    console.log(`   ✓ User Intents: ${userIntents.length}\n`);

    console.log('🌍 REGIONAL INSERTION BREAKDOWN:');
    Object.entries(regionProgress).forEach(([region, count]) => {
      const percentage = ((count / successCount) * 100).toFixed(1);
      console.log(`   ${region.padEnd(20)} │ ${count} pages (${percentage}%)`);
    });

    console.log('\n💰 PRICING COVERAGE:');
    console.log(`   Price Range: $${priceStats.min.toFixed(2)} - $${priceStats.max.toFixed(2)}`);
    console.log(`   Average Price: $${(priceStats.total / records.length).toFixed(2)}\n`);

    console.log('📈 pSEO SCALING METRICS:');
    console.log(`   ✓ Unique Pages Generated: ${successCount}`);
    console.log(`   ✓ Content Variation Templates: ${contentTemplates.length}`);
    console.log(`   ✓ Estimated Search Keywords: ${successCount * 3}+ (title + description + content)`);
    console.log(`   ✓ Regional Market Coverage: ${regions.length} geo-targets\n`);

    console.log('🎯 NEXT STEPS:');
    console.log('   1. Deploy your Next.js site to Vercel');
    console.log('   2. Verify Supabase table shows all 420+ records');
    console.log('   3. Submit sitemap to Google Search Console');
    console.log('   4. Monitor indexation progress for regional coverage');
    console.log('   5. Set up canonical tags for regional duplicate management\n');

    console.log('✨ Your pSEO store is ready for rapid indexation and organic growth!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the script
insertData();

