import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkvpfqxqhvyzmcjbplwx.supabase.co';
const supabaseKey = 'sb_publishable_LxyKQcw2PVKhh_-pjWQbyw_5j3t2zaz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPrices() {
  const { data, error } = await supabase
    .from('cod_accounts')
    .select('id, slug, meta_title, price, average_rating, review_count')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('📊 FIRST 5 ACCOUNTS:');
  console.log(JSON.stringify(data, null, 2));
}

checkPrices();
