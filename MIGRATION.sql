-- SQL Migration: Add pSEO Columns to cod_accounts table
-- Run this in Supabase SQL Editor

-- Add missing columns if they don't exist
ALTER TABLE cod_accounts
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS region_code TEXT,
ADD COLUMN IF NOT EXISTS intent_category TEXT,
ADD COLUMN IF NOT EXISTS intent_label TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cod_accounts_region ON cod_accounts(region);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_region_code ON cod_accounts(region_code);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_intent_category ON cod_accounts(intent_category);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_intent_label ON cod_accounts(intent_label);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_created_at ON cod_accounts(created_at DESC);

-- Verify table structure
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'cod_accounts';

-- Optional: Set NOT NULL constraints if you want
-- ALTER TABLE cod_accounts ALTER COLUMN region SET NOT NULL;
-- ALTER TABLE cod_accounts ALTER COLUMN intent_category SET NOT NULL;
