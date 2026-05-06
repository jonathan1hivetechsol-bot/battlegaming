# ⚡ QUICK REFERENCE CARD

## The Issue
❌ `Could not find the 'intent_category' column of 'cod_accounts'`

## The Solution
✅ Run SQL migration in Supabase, then run script again

---

## PART 1: SQL Migration (5 min)

### Location
**Supabase Dashboard** → **SQL Editor** → **New Query**

### The SQL to Run
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

### Steps
1. Copy SQL above
2. Paste into SQL Editor
3. Click **Run** button
4. Wait for "Success" message
5. ✅ Done!

---

## PART 2: Run Script (30 sec)

### Command
```bash
node generateData.js
```

### Expected Output
```
✅ Generated 1260 unique records.
📋 STEP 4: Upserting 420+ records to Supabase...
🔄 Batch 1/26 (1-50)
   ✅ 2% complete
🔄 Batch 2/26 (51-100)
   ✅ 4% complete
[continues for ~25 batches]
✅ SUCCESS: Programmatic SEO Database Population Ready!
   ✓ Total Records Inserted: 1260
```

---

## Verification
✅ All 1,260 records in Supabase  
✅ 7 regions × 3 games × 3 platforms × 5 wins × 4 intents  
✅ Ready for Next.js dynamic routes  
✅ Ready for Google indexation  

---

## Files Reference

| File | Purpose |
|------|---------|
| SUPABASE_MIGRATION_GUIDE.md | Detailed step-by-step |
| VERIFICATION_CHECKLIST.md | Full checklist |
| MIGRATION.sql | Just the SQL code |
| generateData.js | The main script |

---

## 🚀 After Migration

Next steps:
1. Deploy to Vercel: `git push origin main`
2. Visit: https://battlegraming.store
3. Submit sitemap to Google Search Console
4. Monitor indexation for 2-4 weeks
5. Watch organic traffic grow

---

**Time to completion**: ~10 minutes total  
**Estimated organic traffic**: 5,000-15,000/month (Month 6+)  
**Status**: Almost there! 🎯
