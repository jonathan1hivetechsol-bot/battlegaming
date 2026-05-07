import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import ws from 'ws';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    realtime: {
      transport: ws
    }
  }
);

async function verifyData() {
  console.log('🔍 Verifying data in database...\n');
  
  const { data: accounts, error } = await supabase
    .from('cod_accounts')
    .select('slug, price, average_rating, review_count, reviews, buying_amount')
    .limit(5);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('✅ Sample accounts from database:\n');
  accounts.forEach((acc, i) => {
    console.log(`${i + 1}. ${acc.slug}`);
    console.log(`   Price: $${acc.price}`);
    console.log(`   Rating: ${acc.average_rating}`);
    console.log(`   Reviews: ${acc.review_count}`);
    console.log(`   Sold: ${acc.buying_amount}+`);
    console.log(`   Review data: ${acc.reviews?.length || 0} items`);
    console.log('');
  });
}

verifyData();
