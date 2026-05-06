require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws');

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
  // Template 1: Technical Focus
  {
    intro: (game, wins, platform, region, intent) =>
      `Purchase a verified ${game} account with ${wins} competitive wins on ${platform} in ${region.name}. This premium gaming account features `,
    body: (game, wins, platform, region, intent) => {
      const templates = [
        `a proven K/D ratio of ${(Math.random() * 2 + 1.5).toFixed(2)}, anti-cheat clearance, and full account security verification. Our ${region.name} players benefit from optimized ${region.latency}, ensuring zero lag during ranked matches. The account is equipped with ${Math.floor(Math.random() * 15 + 20)} unlocked weapons, premium blueprints, and seasonal battle pass progression.`,
        `extensive ranked ladder presence with consistent performance metrics across all ${game} multiplayer modes. Every account undergoes rigorous account safety audits, two-factor authentication setup, and region-specific optimization for ${region.name} connectivity. We guarantee no phone verification requirements and instant access within minutes of purchase.`,
        `a comprehensive account history free from bans or red flags, perfect for ${region.name} competitive play. Our 24/7 support team provides post-purchase assistance, account customization services, and lifetime warranty coverage. ${region.country} customers enjoy dedicated account managers and priority delivery slots.`,
      ];
      return templates[Math.floor(Math.random() * templates.length)];
    },
    trust: (game, wins, platform, region, intent) => {
      const signals = [
        `Our ${region.name}-based support team provides 24/7 customer assistance with verified live chat response times under 2 minutes. We've maintained a 99.8% account delivery success rate for ${region.country} buyers, backed by a lifetime warranty and 30-day money-back guarantee.`,
        `Trusted by over 50,000+ gamers across ${region.country} since 2021. Every account purchase includes 24/7 technical support, instant delivery verification, and lifetime account security guarantees. We maintain compliance with platform terms of service and regional consumer protection laws.`,
        `BattleGaming offers industry-leading account security protocols, 24-hour fraud protection, and region-optimized delivery logistics for ${region.name}. Our verified seller status and lifetime warranty demonstrate our commitment to ${region.country} player satisfaction.`,
      ];
      return signals[Math.floor(Math.random() * signals.length)];
    },
  },
  // Template 2: Regional Benefits Focus
  {
    intro: (game, wins, platform, region, intent) =>
      `Get your ${game} ${platform} account in ${region.name} with ${wins} verified wins and instant delivery. Specially optimized for ${region.country} `,
    body: (game, wins, platform, region, intent) => {
      const templates = [
        `players seeking competitive advantage. Our ${region.name} warehouse maintains dedicated server optimization, ensuring sub-20ms latency for ranked matchmaking. This ${game} account includes seasonal rewards, ${Math.floor(Math.random() * 10 + 8)} premium operators, and full cosmetic unlocks valued at $${Math.floor(Math.random() * 150 + 100)}.`,
        `gameplay experience with region-specific benefits. ${region.name} accounts receive priority matchmaking in regional servers, exclusive cosmetic drops for ${region.country} players, and integrated regional payment support. Your account is pre-configured for ${region.latency}.`,
        `gamers seeking regional server optimization. ${region.name}-verified accounts come with automatic regional routing, timezone-aligned support, and exclusive ${region.country} seasonal cosmetics. We've optimized every account for ${game}'s regional server infrastructure.`,
      ];
      return templates[Math.floor(Math.random() * templates.length)];
    },
    trust: (game, wins, platform, region, intent) => {
      const signals = [
        `Established reputation for ${region.name} account delivery with average fulfillment time of 3 minutes. Our ${region.country}-compliant business model includes regulatory compliance, buyer protection, and 24/7 regional support staff fluent in local market standards.`,
        `Verified seller with dedicated ${region.name} customer base and 4.9-star rating from ${region.country} buyers. We guarantee 24/7 support, instant delivery, and lifetime account protection. Every purchase includes region-specific terms and money-back guarantee.`,
        `${region.name}'s leading verified account provider with certified anti-cheat compliance and secure delivery protocols. ${region.country} players trust BattleGaming for immediate account access, lifetime technical support, and absolute anonymity protection.`,
      ];
      return signals[Math.floor(Math.random() * signals.length)];
    },
  },
  // Template 3: Intent-Driven Focus
  {
    intro: (game, wins, platform, region, intent) =>
      `${intent.label} with a verified ${game} account on ${platform} - ${wins} wins ready in ${region.name}. `,
    body: (game, wins, platform, region, intent) => {
      const templates = [
        `Perfect for ${region.name} players looking to ${intent.cta} immediately. This premium ${game} account is battle-ready with ${wins} ranked victories, optimized for ${region.latency}, and equipped with meta-loadouts for current seasonal meta. No setup time required - simply log in and compete at your new skill level.`,
        `Designed for ${region.country} competitive players who demand quality. Our ${region.name} delivery system ensures your account reaches you in minutes, pre-configured for regional servers, with full cosmetic access and ${Math.floor(Math.random() * 5 + 2)} premium seasons of cosmetics unlocked.`,
        `Achieve competitive goals faster with an account that already has ${wins} verified wins on ${platform}. Located for ${region.name} players, this ${game} account is ready to ${intent.cta}. Full regional server optimization included with 24/7 support from our ${region.name} team.`,
      ];
      return templates[Math.floor(Math.random() * templates.length)];
    },
    trust: (game, wins, platform, region, intent) => {
      const signals = [
        `Thousands of ${region.country} gamers have achieved their competitive goals using BattleGaming accounts. We provide 24/7 support, lifetime guarantees, and 100% verified account security. Your ${intent.label} goal comes with no-hassle fulfillment and regional payment options.`,
        `Trusted by competitive ${region.name} communities for verified account delivery. Every purchase comes with 24/7 support, lifetime account protection, and 30-day satisfaction guarantee. We've delivered over 100,000 accounts to ${region.country} players with zero fraud incidents.`,
        `BattleGaming's verified accounts help ${region.country} players achieve ${intent.label} consistently. We guarantee 24/7 support, instant delivery, account security certification, and lifetime warranty. Your purchase is protected by regional consumer safeguards.`,
      ];
      return signals[Math.floor(Math.random() * signals.length)];
    },
  },
];

// ========================================
// CONTENT GENERATION ENGINE (Anti-Doorway)
// ========================================
function generateLongFormContent(game, wins, platform, region, intent) {
  // Select random template for variation
  const template = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];

  const intro = template.intro(game, wins, platform, region, intent);
  const body = template.body(game, wins, platform, region, intent);
  const trust = template.trust(game, wins, platform, region, intent);

  return `${intro}${body} ${trust}`;
}

// ========================================
// SEO TITLE GENERATION (Click-Magnet)
// ========================================
function generateMetaTitle(game, wins, platform, region, intent) {
  const titleVariations = [
    `Buy Verified ${game} Account ${wins} Wins ${region.name} | ${intent.label} | BattleGaming`,
    `${game} ${platform} Account for ${region.name} - ${intent.label} | Instant Delivery`,
    `Premium ${game} ${wins}-Win Account ${region.name} - ${intent.label} Ready | BattleGaming`,
    `${intent.label} ${game} Account on ${platform} - ${region.name} Verified | BattleGaming`,
  ];
  return titleVariations[Math.floor(Math.random() * titleVariations.length)];
}

// ========================================
// META DESCRIPTION GENERATION (CTA Focus)
// ========================================
function generateMetaDescription(game, wins, platform, region, intent) {
  const ctaVariations = [
    `Get verified ${game} on ${platform} with ${wins} wins in ${region.name}. ${intent.label} - ${intent.cta.charAt(0).toUpperCase() + intent.cta.slice(1)}. 24/7 support & lifetime warranty. Order now!`,
    `${game} ${wins}-win account for ${platform} in ${region.name}. ${intent.label}. Verified, instant delivery, zero ban risk. 30-day money-back guarantee. Buy securely now.`,
    `Premium ${game} account (${wins} wins) on ${platform}, optimized for ${region.name}. ${intent.label}. Instant delivery, 24/7 support, lifetime protection. Shop verified accounts today.`,
    `Buy ${game} account with ${wins} verified wins on ${platform} for ${region.name}. ${intent.label}. Trusted by ${region.country} gamers. Instant access, 24/7 support. Secure checkout.`,
  ];
  return ctaVariations[Math.floor(Math.random() * ctaVariations.length)];
}

// ========================================
// SLUG GENERATION (Clean & Descriptive)
// ========================================
function generateSlug(game, wins, platform, region, intent) {
  return `buy-${game.toLowerCase()}-account-${wins}-wins-${platform.toLowerCase()}-${region.code}-${intent.intent}`;
}

// ========================================
// PRICING LOGIC (Dynamic Based on Wins)
// ========================================
function calculatePrice(wins, region) {
  const basePrice = 9.99;
  const winsMultiplier = wins * 0.5;
  const regionMultiplier = region.code === 'london' || region.code === 'usa' ? 1.05 : 1.0;
  return parseFloat((basePrice + winsMultiplier) * regionMultiplier).toFixed(2);
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

