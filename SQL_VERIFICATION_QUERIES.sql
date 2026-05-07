-- Verification & Testing Queries for Account Enhancement

-- ========================================
-- 1. VERIFY DATABASE STRUCTURE
-- ========================================

-- Check if new columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cod_accounts' 
AND column_name IN ('unique_description', 'average_rating', 'review_count', 'reviews', 'buying_amount')
ORDER BY column_name;

-- Expected Output:
-- column_name         | data_type
-- ─────────────────────────────────
-- unique_description  | text
-- average_rating      | numeric
-- buying_amount       | integer
-- review_count        | integer
-- reviews             | jsonb


-- ========================================
-- 2. VERIFY REVIEWS TABLE
-- ========================================

-- Check if account_reviews table exists
SELECT table_name FROM information_schema.tables 
WHERE table_name = 'account_reviews';

-- Get reviews table structure
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'account_reviews'
ORDER BY ordinal_position;


-- ========================================
-- 3. CHECK DATA AFTER SCRIPT EXECUTION
-- ========================================

-- Count updated accounts
SELECT COUNT(*) as total_updated
FROM cod_accounts 
WHERE unique_description IS NOT NULL 
AND buying_amount > 0;

-- Get sample of updated accounts
SELECT 
  id,
  slug,
  meta_title,
  price,
  average_rating,
  review_count,
  buying_amount,
  SUBSTRING(unique_description, 1, 100) as description_preview
FROM cod_accounts
WHERE unique_description IS NOT NULL
LIMIT 10;

-- Price distribution check
SELECT 
  CASE 
    WHEN price < 10 THEN '$8-9'
    WHEN price < 12 THEN '$10-11'
    WHEN price < 14 THEN '$12-13'
    WHEN price < 16 THEN '$14-15'
    WHEN price < 18 THEN '$16-17'
    WHEN price < 20 THEN '$18-19'
    ELSE '$20+'
  END as price_range,
  COUNT(*) as account_count,
  ROUND(AVG(price)::numeric, 2) as avg_price
FROM cod_accounts
WHERE price > 0
GROUP BY price_range
ORDER BY avg_price;


-- ========================================
-- 4. RATING & REVIEW ANALYSIS
-- ========================================

-- Average ratings distribution
SELECT 
  ROUND(average_rating::numeric, 1) as rating,
  COUNT(*) as account_count,
  ROUND(AVG(buying_amount)::numeric, 1) as avg_purchases
FROM cod_accounts
WHERE average_rating > 0
GROUP BY ROUND(average_rating::numeric, 1)
ORDER BY rating DESC;

-- Accounts with most reviews
SELECT 
  slug,
  meta_title,
  review_count,
  average_rating,
  buying_amount,
  price
FROM cod_accounts
WHERE review_count > 0
ORDER BY review_count DESC
LIMIT 10;

-- Accounts with most purchases
SELECT 
  slug,
  meta_title,
  buying_amount,
  average_rating,
  review_count,
  price
FROM cod_accounts
WHERE buying_amount > 0
ORDER BY buying_amount DESC
LIMIT 10;


-- ========================================
-- 5. SAMPLE REVIEW DATA CHECK
-- ========================================

-- See structure of reviews JSONB
SELECT 
  slug,
  reviews,
  jsonb_array_length(reviews) as review_count_check
FROM cod_accounts
WHERE reviews IS NOT NULL 
AND jsonb_array_length(reviews) > 0
LIMIT 1;

-- Extract individual reviews (PostgreSQL 15+)
SELECT 
  cod.slug,
  review->>'reviewer_name' as reviewer,
  (review->>'rating')::int as rating,
  review->>'review_text' as review_text,
  (review->>'verified_purchase')::boolean as verified
FROM cod_accounts cod,
  jsonb_array_elements(cod.reviews) as review
WHERE cod.reviews IS NOT NULL
LIMIT 5;


-- ========================================
-- 6. QUALITY METRICS
-- ========================================

-- High-quality accounts (highly rated & popular)
SELECT 
  slug,
  meta_title,
  price,
  average_rating,
  review_count,
  buying_amount,
  ROUND(average_rating * 20, 0) as quality_score
FROM cod_accounts
WHERE average_rating >= 4.5
AND buying_amount >= 50
ORDER BY quality_score DESC
LIMIT 20;

-- Top performers
SELECT 
  slug,
  game_version,
  platform,
  wins,
  price,
  average_rating,
  buying_amount,
  ROUND((buying_amount * price)::numeric, 2) as estimated_revenue
FROM cod_accounts
WHERE buying_amount > 0
ORDER BY estimated_revenue DESC
LIMIT 15;


-- ========================================
-- 7. UPDATE SPECIFIC ACCOUNT (MANUAL)
-- ========================================

-- Update single account with new price
UPDATE cod_accounts
SET price = 15.99
WHERE slug = 'your-account-slug-here';

-- Add custom description to account
UPDATE cod_accounts
SET unique_description = 'Your custom description here'
WHERE slug = 'your-account-slug-here';

-- Manually set review data
UPDATE cod_accounts
SET 
  average_rating = 4.8,
  review_count = 5,
  buying_amount = 120,
  reviews = '[
    {
      "reviewer_name": "Player_Name",
      "rating": 5,
      "review_text": "Excellent account!",
      "verified_purchase": true
    }
  ]'::jsonb
WHERE slug = 'your-account-slug-here';


-- ========================================
-- 8. BULK UPDATES
-- ========================================

-- Update all prices to be within $8-20 range (one time)
UPDATE cod_accounts
SET price = 8 + (RANDOM() * 12)
WHERE price > 0;

-- Add buying_amount to all accounts
UPDATE cod_accounts
SET buying_amount = 10 + (random() * 150)::int
WHERE buying_amount = 0;

-- Set average rating for all accounts
UPDATE cod_accounts
SET average_rating = 4 + (RANDOM() * 1)
WHERE average_rating = 0;


-- ========================================
-- 9. PERFORMANCE CHECK
-- ========================================

-- Index status
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan as index_usage_count,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE tablename IN ('cod_accounts', 'account_reviews')
ORDER BY idx_scan DESC;

-- Query performance (find slow queries)
SELECT 
  query,
  calls,
  total_time,
  mean_time
FROM pg_stat_statements
WHERE query LIKE '%cod_accounts%'
ORDER BY mean_time DESC;


-- ========================================
-- 10. DATA INTEGRITY CHECKS
-- ========================================

-- Find accounts with NULL data
SELECT COUNT(*) FROM cod_accounts WHERE unique_description IS NULL;
SELECT COUNT(*) FROM cod_accounts WHERE reviews IS NULL;
SELECT COUNT(*) FROM cod_accounts WHERE average_rating IS NULL;

-- Find accounts with invalid data
SELECT slug FROM cod_accounts WHERE price < 0 OR price > 100;
SELECT slug FROM cod_accounts WHERE average_rating > 5 OR average_rating < 0;
SELECT slug FROM cod_accounts WHERE buying_amount < 0;

-- Accounts needing updates
SELECT 
  COUNT(*) as accounts_without_descriptions,
  COUNT(*) as accounts_without_reviews
FROM cod_accounts
WHERE unique_description IS NULL
OR reviews IS NULL;
