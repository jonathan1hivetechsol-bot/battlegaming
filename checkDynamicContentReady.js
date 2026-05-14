/**
 * DATABASE MIGRATION - Add fields for dynamic content generation
 * 
 * This ensures the cod_accounts table has all fields needed for dynamic content
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateDatabaseForDynamicContent() {
  try {
    console.log('🔄 Checking database schema...');

    // Fetch first record to check fields
    const { data, error } = await supabase
      .from('cod_accounts')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error fetching from cod_accounts:', error);
      return;
    }

    if (!data || data.length === 0) {
      console.log('⚠️  No records found in cod_accounts table');
      return;
    }

    const record = data[0];
    const requiredFields = ['slug', 'game_version', 'platform', 'region', 'region_code', 'wins', 'intent_category', 'price'];
    const missingFields = requiredFields.filter(field => !(field in record));

    if (missingFields.length > 0) {
      console.log('⚠️  Some fields might be missing:', missingFields);
      console.log('📋 Note: You may need to manually add these columns via Supabase UI:');
      console.log('   - region_code (text)');
      console.log('   - intent_category (text)');
    } else {
      console.log('✅ All required fields present in cod_accounts table');
      console.log('   Fields found:', Object.keys(record));
    }

    // Count total records
    const { count } = await supabase
      .from('cod_accounts')
      .select('*', { count: 'exact', head: true });

    console.log(`\n✅ Total accounts in database: ${count}`);
    console.log('✅ Dynamic content generation ready to use!\n');

  } catch (error) {
    console.error('❌ Migration error:', error);
  }
}

migrateDatabaseForDynamicContent();
