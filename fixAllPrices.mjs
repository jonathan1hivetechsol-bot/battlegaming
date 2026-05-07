import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkvpfqxqhvyzmcjbplwx.supabase.co';
const supabaseKey = 'sb_publishable_LxyKQcw2PVKhh_-pjWQbyw_5j3t2zaz';
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { params: { eventsPerSecond: 0 } }
});

// Pricing formula (matching generateData.js)
function calculatePrice(wins, regionCode) {
  const basePrice = 9.99;
  const winsMultiplier = wins * 0.5;
  const regionMultiplier = (regionCode === 'london' || regionCode === 'usa') ? 1.05 : 1.0;
  const price = parseFloat(((basePrice + winsMultiplier) * regionMultiplier).toFixed(2));
  return Math.min(price, 20); // Cap at $20 max
}

async function fixAllPrices() {
  console.log('🔄 Fetching all accounts...');
  
  const { data: accounts, error } = await supabase
    .from('cod_accounts')
    .select('id, wins, region_code');

  if (error) {
    console.error('❌ Error fetching accounts:', error.message);
    return;
  }

  console.log(`✅ Found ${accounts.length} accounts\n`);
  
  let updateCount = 0;
  const updates = [];

  for (const account of accounts) {
    const newPrice = calculatePrice(account.wins, account.region_code);
    updates.push({
      id: account.id,
      price: newPrice,
      wins: account.wins,
      region_code: account.region_code
    });
  }

  console.log('📊 Price Updates Summary:');
  console.log('━'.repeat(60));
  
  for (const update of updates.slice(0, 5)) {
    console.log(`ID: ${update.id}`);
    console.log(`  Wins: ${update.wins}, Region: ${update.region_code}`);
    console.log(`  ✨ New Price: $${update.price.toFixed(2)}\n`);
  }
  
  if (updates.length > 5) {
    console.log(`... and ${updates.length - 5} more accounts\n`);
  }

  // Update in batches
  console.log('🚀 Updating prices in Supabase...');
  for (let i = 0; i < updates.length; i += 100) {
    const batch = updates.slice(i, i + 100);
    
    for (const update of batch) {
      const { error: updateError } = await supabase
        .from('cod_accounts')
        .update({ price: update.price })
        .eq('id', update.id);
      
      if (!updateError) {
        updateCount++;
      }
    }
    
    console.log(`  ✅ Updated ${Math.min(i + 100, updates.length)}/${updates.length}`);
  }

  console.log(`\n✅ Successfully updated ${updateCount} account prices!`);
  
  // Show price stats
  const prices = updates.map(u => u.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
  
  console.log('\n💰 Price Distribution:');
  console.log(`   Min: $${minPrice.toFixed(2)}`);
  console.log(`   Max: $${maxPrice.toFixed(2)}`);
  console.log(`   Avg: $${avgPrice}`);
}

fixAllPrices();
