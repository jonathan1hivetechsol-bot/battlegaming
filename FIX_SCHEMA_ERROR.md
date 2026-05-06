# ⚡ Quick Fix: Supabase Schema Migration

## Problem
```
Error: Could not find the 'intent_category' column of 'cod_accounts' in the schema cache
```

Your Supabase table is missing the new pSEO columns. The script tried to insert data with columns that don't exist yet.

---

## ✅ Solution (3 Steps)

### Step 1: Run SQL Migration in Supabase

1. Open **Supabase Dashboard** → Your Project
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy & paste the entire contents of `MIGRATION.sql` (in your workspace)
5. Click **Run** button

```sql
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
```

✅ **Expected Result**: "Success - no errors"

---

### Step 2: Verify Migration

Still in **SQL Editor**, run:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cod_accounts'
ORDER BY ordinal_position;
```

✅ **Expected Result**: You should see all these columns:
- id, slug, meta_title, meta_description, page_content
- game_version, platform, wins, price
- stock_status, delivery_time
- **region, region_code, intent_category, intent_label, created_at** (newly added)

---

### Step 3: Run the Script Again

```bash
cd C:\Users\Futur\Documents\cod-store
node generateData.js
```

✅ **Expected Result**:
```
✅ Generated 1260 unique records.
📋 STEP 4: Upserting 420+ records to Supabase...
🔄 Batch 1/26 (1-50)
   ✅ 2% complete - 50/1260 records inserted
[... continues successfully ...]
✅ SUCCESS: Programmatic SEO Database Population Ready!
```

---

## 🔍 Troubleshooting

### If you still get an error:

**Option A: Check column names are lowercase**
- Supabase columns are case-sensitive
- Make sure column names in migration match exactly

**Option B: Drop and recreate table**
```sql
-- Backup first!
-- Then if needed:
DROP TABLE IF EXISTS cod_accounts;

CREATE TABLE cod_accounts (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  page_content TEXT NOT NULL,
  game_version TEXT,
  platform TEXT,
  wins INT,
  price DECIMAL(10,2),
  stock_status TEXT,
  delivery_time TEXT,
  region TEXT,
  region_code TEXT,
  intent_category TEXT,
  intent_label TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create all indexes
CREATE INDEX idx_cod_accounts_slug ON cod_accounts(slug);
CREATE INDEX idx_cod_accounts_region ON cod_accounts(region);
CREATE INDEX idx_cod_accounts_intent_category ON cod_accounts(intent_category);
```

**Option C: Compare with Supabase UI**
1. Go to Supabase Dashboard
2. Click **cod_accounts** table
3. Scroll right to see all columns
4. Verify all columns exist

---

## ✨ What This Does

| Column | Purpose | Type |
|--------|---------|------|
| region | Display name (USA, London) | TEXT |
| region_code | Slug format (usa, london) | TEXT |
| intent_category | Machine format (instant-delivery) | TEXT |
| intent_label | Display format (Instant Delivery) | TEXT |
| created_at | Timestamp for sorting | TIMESTAMP |

These columns enable:
- ✅ Regional targeting for SEO
- ✅ Intent-based filtering
- ✅ Content freshness signals
- ✅ Analytics & reporting

---

## 📞 Still Having Issues?

**Check:**
1. ✓ Supabase credentials in .env.local
2. ✓ Table name is lowercase: `cod_accounts`
3. ✓ No special characters in column names
4. ✓ Using Supabase SQL Editor (not external tool)
5. ✓ Waited 5 seconds after running SQL before running script

**Run this to verify connection:**
```bash
node -e "
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
supabase.from('cod_accounts').select('*').limit(1).then(r => {
  console.log('✅ Connection OK');
  console.log('Columns:', Object.keys(r.data[0] || {}));
}).catch(e => console.error('❌ Error:', e.message));
"
```

---

**Next: Run `node generateData.js` again after migration! 🚀**
