-- SQL Migration: Add Unique Descriptions, Reviews, and Variable Pricing to cod_accounts
-- Run this in Supabase SQL Editor

-- Add new columns to cod_accounts table
ALTER TABLE cod_accounts
ADD COLUMN IF NOT EXISTS unique_description TEXT,
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3, 2) DEFAULT 5.0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS reviews JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS buying_amount INTEGER DEFAULT 0;

-- Create index for better performance on reviews
CREATE INDEX IF NOT EXISTS idx_cod_accounts_average_rating ON cod_accounts(average_rating DESC);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_review_count ON cod_accounts(review_count DESC);
CREATE INDEX IF NOT EXISTS idx_cod_accounts_buying_amount ON cod_accounts(buying_amount);

-- Reviews table structure (alternative approach - separate table)
CREATE TABLE IF NOT EXISTS account_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES cod_accounts(id) ON DELETE CASCADE,
  reviewer_name VARCHAR(100) NOT NULL,
  reviewer_email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  verified_purchase BOOLEAN DEFAULT true,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for reviews table
CREATE INDEX IF NOT EXISTS idx_account_reviews_account_id ON account_reviews(account_id);
CREATE INDEX IF NOT EXISTS idx_account_reviews_rating ON account_reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_account_reviews_created_at ON account_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_account_reviews_verified ON account_reviews(verified_purchase);

-- Enable RLS for reviews if needed
ALTER TABLE account_reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to reviews (drop if exists to avoid conflicts)
DROP POLICY IF EXISTS "Public can read account reviews" ON account_reviews;
CREATE POLICY "Public can read account reviews" ON account_reviews
  FOR SELECT USING (true);

-- Comment on new columns
COMMENT ON COLUMN cod_accounts.unique_description IS 'Unique, high-quality description for this specific account';
COMMENT ON COLUMN cod_accounts.average_rating IS 'Average customer rating (1-5)';
COMMENT ON COLUMN cod_accounts.review_count IS 'Total number of reviews for this account';
COMMENT ON COLUMN cod_accounts.reviews IS 'Embedded reviews data as JSONB for quick access';
COMMENT ON COLUMN cod_accounts.buying_amount IS 'Number of purchases this account has had';
COMMENT ON TABLE account_reviews IS 'Stores detailed customer reviews for each account';
