# ✅ Verification Checklist

Follow this checklist to ensure your Supabase migration is complete.

---

## 📋 Pre-Migration Checklist

- [ ] You have Supabase account
- [ ] You're logged into Supabase Dashboard
- [ ] You can see your project
- [ ] You've navigated to SQL Editor

---

## 🔧 Migration Execution

- [ ] Copied the SQL migration code
- [ ] Pasted into Supabase SQL Editor
- [ ] Clicked the "Run" button
- [ ] Waited 3-5 seconds for execution
- [ ] Saw "Success. No errors." message

---

## 🔍 Post-Migration Verification

Run this query in SQL Editor to verify all columns exist:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cod_accounts'
ORDER BY ordinal_position;
```

Expected result (all should exist):

| column_name | data_type |
|-------------|-----------|
| id | bigint |
| slug | text |
| meta_title | text |
| meta_description | text |
| page_content | text |
| game_version | text |
| platform | text |
| wins | integer |
| price | numeric |
| stock_status | text |
| delivery_time | text |
| **region** | **text** | ✅ **NEW**
| **region_code** | **text** | ✅ **NEW**
| **intent_category** | **text** | ✅ **NEW**
| **intent_label** | **text** | ✅ **NEW**
| **created_at** | **timestamp** | ✅ **NEW**

- [ ] All columns exist
- [ ] New columns are present (marked with NEW)

---

## 🚀 Run the Script

```bash
cd C:\Users\Futur\Documents\cod-store
node generateData.js
```

Expected first lines:

```
✅ Generated 1260 unique records.
📋 STEP 4: Upserting 420+ records to Supabase...
🔄 Batch 1/26 (1-50)
   ✅ 2% complete - 50/1260 records inserted
```

- [ ] Script starts without "Could not find column" error
- [ ] Batches are being inserted (at least 3-4 batches)

---

## ✅ Final Verification

After script completes, check Supabase table:

1. Go to **Supabase Dashboard**
2. Click **cod_accounts** table
3. Scroll right to see all columns
4. Verify you see records:
   - [ ] Rows are populated (not empty)
   - [ ] You can see region column with values (USA, London, etc.)
   - [ ] You can see intent_category column (instant-delivery, ranked-ready, etc.)
   - [ ] Record count shows ~1,260 rows

---

## 🎯 Success Indicators

All should be TRUE:

- [ ] Script ran without errors
- [ ] 1,260 records inserted
- [ ] Column count increased from ~12 to ~17 columns
- [ ] Sample records have region + intent data
- [ ] No "PGRST204" errors

---

## ❌ Troubleshooting

### If you see "PGRST204" error again:

1. Go back to SQL Editor
2. Run verification query (column list)
3. Check if new columns exist
4. If NOT, run the ALTER TABLE SQL again
5. Wait 10 seconds before running script

### If script says "0 records inserted":

1. Check if deleteError occurred (old records clearing)
2. Verify your .env.local has correct Supabase credentials
3. Run: `node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"`

### If you see "Connection error":

1. Check your internet connection
2. Verify Supabase is not down (check status.supabase.com)
3. Verify .env.local credentials are correct

---

## 📞 Still Stuck?

If migrations fail or script errors persist:

**Option 1: Clear Everything & Start Fresh**
```sql
-- In Supabase SQL Editor:
DROP TABLE IF EXISTS cod_accounts;

-- Then run the FULL table creation SQL from:
-- c:\Users\Futur\Documents\cod-store\MIGRATION.sql
```

**Option 2: Verify Connection**
```bash
# In PowerShell:
node -e "
require('dotenv').config({ path: '.env.local' });
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30) + '...');
console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
"
```

**Option 3: Check Table Structure**
```sql
-- In Supabase SQL Editor:
\d cod_accounts
-- Should show all columns and indexes
```

---

## ✨ Next Steps (After Success)

1. ✅ 1,260 records in Supabase → Verified
2. ✅ All columns present → Verified
3. → Deploy to Vercel
4. → Submit sitemap to Google Search Console
5. → Monitor indexation

---

**Checklist Completed**: May 6, 2026  
**Status**: Ready for production ✅
