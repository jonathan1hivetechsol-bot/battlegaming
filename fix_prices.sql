-- Fix all account prices using correct formula
-- Formula: price = MIN(((9.99 + (wins * 0.5)) * region_multiplier), 20)
-- region_multiplier: 1.05 for USA/London, 1.0 for others

UPDATE cod_accounts
SET price = CASE
  WHEN region_code IN ('usa', 'london') THEN 
    LEAST(ROUND(((9.99::numeric + (wins::numeric * 0.5)) * 1.05)::numeric, 2), 20)
  ELSE 
    LEAST(ROUND((9.99::numeric + (wins::numeric * 0.5))::numeric, 2), 20)
END;

-- Verify prices were updated
SELECT 
  id,
  wins,
  region_code,
  price,
  CASE
    WHEN region_code IN ('usa', 'london') THEN 
      LEAST(ROUND(((9.99::numeric + (wins::numeric * 0.5)) * 1.05)::numeric, 2), 20)
    ELSE 
      LEAST(ROUND((9.99::numeric + (wins::numeric * 0.5))::numeric, 2), 20)
  END as calculated_price
FROM cod_accounts
LIMIT 10;
