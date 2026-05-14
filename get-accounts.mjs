import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const { data } = await supabase
  .from('cod_accounts')
  .select('*')
  .order('created_at', { ascending: false });

console.log('TOTAL_ACCOUNTS:', data?.length);
console.log('ACCOUNT_SAMPLES:');
data?.slice(0, 3).forEach(acc => {
  console.log(`- ${acc.slug}: ${acc.game_version} (${acc.platform}) - ${acc.wins} wins - $${acc.price}`);
});
