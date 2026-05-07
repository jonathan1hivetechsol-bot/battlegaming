import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// High-quality, unique descriptions for different account types
const descriptions: { [key: string]: string[] } = {
  warzone: [
    "Pro-level Warzone account with 2.5+ KD and 850+ wins. Fully verified with premium weapon loadouts, tier 1 operators, and optimized classes. This account features unlocked Dual-Wield builds and Damascus camo. Perfect for competitive play.",
    "High-rank Warzone account featuring 1200+ wins, 2.8 KD ratio, and all latest season blueprints. Pre-configured with meta loadouts, mastered SMG/AR combinations, and ready for immediate competitive matches.",
    "Elite Warzone account with 3.2 KD, 1500+ wins, and full operator collection. Includes exclusive Mastery Camo challenges completed, top-tier custom loadouts, and rare operator skins from previous seasons.",
    "Sweaty Warzone account ready for tournaments. 2.1 KD, 950 wins, all weapons unlocked and leveled. Features optimized controller settings, platinum camo progress, and competition-ready setups.",
    "Casual-friendly Warzone account with 1.8 KD and 600+ wins. Great for learning strategies with unlocked operators, custom loadouts available, and completed seasonal challenges."
  ],
  mw2: [
    "Modern Warfare II account at Prestige 4 with 95+ hours playtime. Unlocked all weapons, camos, and operator skins. Features mastered assault rifle and SMG setup with optimal sensitivity settings configured.",
    "MP-focused MW2 account with 2.1 KD ratio in multiplayer. All maps mastered, complete gun attachments library, and tournament-ready loadouts. Prestige 3 with 1200+ multiplayer matches.",
    "Competitive MW2 account with 2.7 KD and all meta weapons leveled to max. Features Damascus Camo progress, exclusive operator bundles, and pre-configured for ranked seasons.",
    "Casual MW2 account suitable for story mode and multiplayer. Prestige 2 with balanced loadouts, campaign completed on veteran difficulty, and all cosmetics unlocked.",
    "Tactical MW2 account optimized for strategic gameplay. Features sniper/tactical rifle mastery, complete camo unlock, and advanced campaign challenges completed."
  ],
  cold_war: [
    "Cold War account with Prestige 3, 75+ hours playtime, and 2.3 KD multiplayer ratio. All weapons mastered, dark matter camo progress at 80%, complete operator roster.",
    "Zombies-focused Cold War account with highest round reached: 128. All perks unlocked, all weapons pack-a-punched progression, Easter eggs discovered, and max prestige.",
    "Balanced Cold War account suitable for all modes. Prestige 2 with complete campaign (Veteran), 1.9 KD multiplayer, and 45+ rounds in zombies. All DLC content included.",
    "Multiplayer-dominant Cold War account with 2.8 KD, 900+ matches, and elite controller settings. Prestige 4 with complete weapon arsenal, all operator skins, and ranked season progress.",
    "Casual Cold War account perfect for beginners. Prestige 1 with tutorial completed, basic weapon unlocks, and fun multiplayer stats. Great starter account."
  ],
  vanguard: [
    "Vanguard account with Prestige 5, 2.5 KD ratio, and complete weapon camo collection. All operators unlocked, max battle pass completion, and meta loadout configurations ready.",
    "Multiplayer-focused Vanguard with 1.8 KD and 1100+ matches. Prestige 3, all attachments discovered, complete cosmetic bundle, and sensitivity settings optimized for competitive.",
    "Warzone integration-ready Vanguard account with full weapon progression. Prestige 2, 2.1 KD, complete camo unlocks, and pre-synced loadouts for seamless Warzone gameplay.",
    "Campaign-completed Vanguard with Prestige progression. All multiplayer weapons mastered, complete operator roster, and tournament-ready setups configured.",
    "New Vanguard account with fresh perspective. Prestige 1, basic unlocks, clean stats, perfect for players wanting to experience the game from the start with cosmetics pre-purchased."
  ],
  black_ops_4: [
    "Black Ops 4 account with Master Prestige and 3+ years of consistent playtime. All specialists unlocked and prestiged, complete weapon camo collection including Dark Matter.",
    "Blackout mode specialist account. Master Prestige with 500+ blackout wins, all characters unlocked, and complete battle armor customization. Ready for squad gameplay.",
    "Multiplayer powerhouse BO4 with 2.6 KD, Master Prestige, and elite controller sensitivity settings. All weapons gold, complete operator customization, tournament configs.",
    "Zombies expert account with record rounds 150+ on multiple maps. Master Prestige, all wonder weapons discovered, Easter eggs completed, and gobblegums fully upgraded.",
    "Balanced Black Ops 4 account great for all playstyles. High Prestige with solid KD, complete weapon arsenal, and diverse loadout options for multiplayer, Blackout, and Zombies."
  ]
};

// High-quality, realistic reviews
const reviews: { [key: string]: any[] } = {
  high_rating: [
    {
      reviewer_name: "Alex_Gaming",
      rating: 5,
      review_text: "Amazing account! Exactly as described. Fast delivery and already ranked up. Highly recommended for serious players.",
      verified_purchase: true
    },
    {
      reviewer_name: "Pro_Player_2024",
      rating: 5,
      review_text: "Perfect account with all the loadouts optimized. Already competed in matches with this setup. Great value!",
      verified_purchase: true
    },
    {
      reviewer_name: "Gaming_Enthusiast",
      rating: 5,
      review_text: "Legit account. All cosmetics work perfectly. The KD ratio matches exactly. Will buy again!",
      verified_purchase: true
    },
    {
      reviewer_name: "Casual_Gamer88",
      rating: 4,
      review_text: "Good account, very satisfied. Took about 30 mins for delivery but worth the wait. All features working.",
      verified_purchase: true
    },
    {
      reviewer_name: "Competitive_Edge",
      rating: 5,
      review_text: "This is the best investment for ranked play. Account performs exactly as advertised. Zero issues.",
      verified_purchase: true
    }
  ],
  medium_rating: [
    {
      reviewer_name: "Player_1987",
      rating: 4,
      review_text: "Good account with decent stats. Delivery was quick. Recommend for players wanting a head start.",
      verified_purchase: true
    },
    {
      reviewer_name: "Multiplayer_Fan",
      rating: 4,
      review_text: "Solid account. All weapons working as expected. Good balance of cosmetics and progression.",
      verified_purchase: true
    },
    {
      reviewer_name: "Gaming_Squad",
      rating: 5,
      review_text: "Purchased for my friend. He's loving it! Perfect for squads and casual play.",
      verified_purchase: true
    },
    {
      reviewer_name: "Next_Gen_Player",
      rating: 4,
      review_text: "Great experience. Account is clean and verified. Would buy again.",
      verified_purchase: true
    },
    {
      reviewer_name: "FPS_Master",
      rating: 5,
      review_text: "Exceeded expectations. Incredible value. The customization options are endless!",
      verified_purchase: true
    }
  ],
  premium_accounts: [
    {
      reviewer_name: "Esports_Team_Member",
      rating: 5,
      review_text: "Professional quality account. Used immediately in competitive matches. Flawless execution.",
      verified_purchase: true
    },
    {
      reviewer_name: "Streamer_Pro",
      rating: 5,
      review_text: "Perfect for streaming. Account history is clean, all cosmetics visible, great for content creation.",
      verified_purchase: true
    },
    {
      reviewer_name: "Tournament_Ready",
      rating: 5,
      review_text: "Exactly what we needed for tournament preparation. Stats verified, everything legitimate.",
      verified_purchase: true
    },
    {
      reviewer_name: "Elite_Gamer",
      rating: 5,
      review_text: "Premium account with premium service. Delivery faster than expected. Absolutely satisfied.",
      verified_purchase: true
    },
    {
      reviewer_name: "Gaming_Legend",
      rating: 5,
      review_text: "This is what world-class gaming accounts look like. Highly professional service throughout.",
      verified_purchase: true
    }
  ]
};

// Price ranges based on account value
const priceRanges = {
  beginner: { min: 8, max: 12 },      // 8-12$
  intermediate: { min: 12, max: 16 }, // 12-16$
  advanced: { min: 16, max: 20 },     // 16-20$
  elite: { min: 18, max: 20 }         // 18-20$
};

function getRandomPrice(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomReviews(): any[] {
  const reviewCategories = Object.values(reviews);
  const selectedReviews = getRandomElement(reviewCategories);
  // Return 2-5 random reviews
  const count = Math.floor(Math.random() * 4) + 2;
  return selectedReviews.sort(() => Math.random() - 0.5).slice(0, count);
}

function calculateAverageRating(reviewList: any[]): number {
  const total = reviewList.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviewList.length) * 100) / 100;
}

async function updateAccountsData() {
  try {
    console.log('Fetching all accounts...');
    
    const { data: accounts, error: fetchError } = await supabase
      .from('cod_accounts')
      .select('id, slug, game_version, platform, wins, meta_title, price')
      .limit(1000);

    if (fetchError) {
      console.error('Error fetching accounts:', fetchError);
      return;
    }

    if (!accounts || accounts.length === 0) {
      console.log('No accounts found');
      return;
    }

    console.log(`Found ${accounts.length} accounts to update`);

    let updatedCount = 0;

    for (const account of accounts) {
      // Determine game type for description
      const gameType = account.game_version?.toLowerCase().replace(/\s+/g, '_') || 'warzone';
      const gameDescriptions = descriptions[gameType] || descriptions.warzone;
      
      // Select unique description
      const uniqueDescription = getRandomElement(gameDescriptions);
      
      // Get reviews and calculate average
      const accountReviews = getRandomReviews();
      const averageRating = calculateAverageRating(accountReviews);
      
      // Determine price tier based on wins and KD
      let priceRange = priceRanges.beginner;
      if (account.wins > 1000) {
        priceRange = priceRanges.elite;
      } else if (account.wins > 500) {
        priceRange = priceRanges.advanced;
      } else if (account.wins > 200) {
        priceRange = priceRanges.intermediate;
      }
      
      const newPrice = getRandomPrice(priceRange.min, priceRange.max);
      const buyingAmount = Math.floor(Math.random() * 150) + 10; // 10-160 purchases

      const { error: updateError } = await supabase
        .from('cod_accounts')
        .update({
          unique_description: uniqueDescription,
          average_rating: averageRating,
          review_count: accountReviews.length,
          reviews: accountReviews,
          buying_amount: buyingAmount,
          price: newPrice
        })
        .eq('id', account.id);

      if (updateError) {
        console.error(`Error updating account ${account.slug}:`, updateError);
      } else {
        updatedCount++;
        console.log(`✓ Updated ${account.slug}: $${newPrice} | ${accountReviews.length} reviews | ${buyingAmount} purchases`);
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n✅ Successfully updated ${updatedCount} accounts!`);

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the update
updateAccountsData();
