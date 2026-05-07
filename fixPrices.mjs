const supabaseUrl = 'https://pkvpfqxqhvyzmcjbplwx.supabase.co';
const supabaseKey = 'sb_publishable_LxyKQcw2PVKhh_-pjWQbyw_5j3t2zaz';

// Pricing formula
function calculatePrice(wins, regionCode) {
  const basePrice = 9.99;
  const winsMultiplier = wins * 0.5;
  const regionMultiplier = (regionCode === 'london' || regionCode === 'usa') ? 1.05 : 1.0;
  const price = parseFloat(((basePrice + winsMultiplier) * regionMultiplier).toFixed(2));
  return Math.min(price, 20);
}

async function fixAllPrices() {
  try {
    console.log('🔄 Fetching all accounts...');
    
    // Fetch all accounts
    const response = await fetch(`${supabaseUrl}/rest/v1/cod_accounts?select=id,wins,region_code`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const accounts = await response.json();
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

    console.log('📊 Price Updates Sample (first 5):');
    console.log('━'.repeat(60));
    
    for (const update of updates.slice(0, 5)) {
      console.log(`ID: ${update.id}`);
      console.log(`  Wins: ${update.wins}, Region: ${update.region_code}`);
      console.log(`  ✨ New Price: $${update.price.toFixed(2)}\n`);
    }
    
    if (updates.length > 5) {
      console.log(`... and ${updates.length - 5} more accounts\n`);
    }

    // Update in batches using REST API
    console.log('🚀 Updating prices in Supabase...');
    for (let i = 0; i < updates.length; i += 100) {
      const batch = updates.slice(i, i + 100);
      
      for (const update of batch) {
        const patchResponse = await fetch(
          `${supabaseUrl}/rest/v1/cod_accounts?id=eq.${update.id}`,
          {
            method: 'PATCH',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: update.price })
          }
        );

        if (patchResponse.ok) {
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

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixAllPrices();
