// verify-schema.js
// Run this to verify your Supabase schema

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySchema() {
  console.log('\n🔍 VERIFYING SUPABASE SCHEMA...\n');

  try {
    // Try to fetch one record to see what columns exist
    const { data, error } = await supabase
      .from('cod_accounts')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error fetching from table:', error.message);
      process.exit(1);
    }

    if (!data || data.length === 0) {
      console.log('⚠️  Table is empty. Running script first...');
      return;
    }

    const record = data[0];
    const columns = Object.keys(record);

    console.log('✅ Table exists with these columns:\n');
    columns.forEach((col, i) => {
      console.log(`  ${i + 1}. ${col}`);
    });

    // Check for required new columns
    const requiredColumns = [
      'region',
      'region_code',
      'intent_category',
      'intent_label',
      'created_at'
    ];

    console.log('\n📋 CHECKING FOR NEW pSEO COLUMNS:\n');
    requiredColumns.forEach((col) => {
      const exists = columns.includes(col);
      const status = exists ? '✅' : '❌';
      console.log(`  ${status} ${col}`);
    });

    const allPresent = requiredColumns.every(col => columns.includes(col));

    if (allPresent) {
      console.log('\n✨ ALL COLUMNS PRESENT! Ready to run generateData.js\n');
    } else {
      console.log('\n⚠️  MISSING COLUMNS! You need to run the SQL migration in Supabase.\n');
      console.log('📝 Go to Supabase Dashboard → SQL Editor and run:\n');
      console.log(`
ALTER TABLE cod_accounts
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS region_code TEXT,
ADD COLUMN IF NOT EXISTS intent_category TEXT,
ADD COLUMN IF NOT EXISTS intent_label TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_cod_accounts_region ON cod_accounts(region);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_region_code ON cod_accounts(region_code);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_intent_category ON cod_accounts(intent_category);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_intent_label ON cod_accounts(intent_label);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_created_at ON cod_accounts(created_at DESC);
      `);
    }

  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
}

verifySchema();
