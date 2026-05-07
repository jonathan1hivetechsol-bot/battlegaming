# 🔐 VERCEL ENVIRONMENT VARIABLES - SETUP & VERIFICATION GUIDE

**Date**: May 6, 2026  
**Status**: Complete Configuration  
**Project**: BattleGaming.store  

---

## ✅ REQUIRED ENVIRONMENT VARIABLES (4 Total)

### **1️⃣ NEXT_PUBLIC_SUPABASE_URL**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://pkvpfqxqhvyzmcjbplwx.supabase.co
Scope: Production, Preview, Development
```

**Purpose**: Supabase database connection URL  
**Usage**: Database queries for 1,260 account pages  
**Public**: ✅ YES (NEXT_PUBLIC prefix means it's safe to expose)

---

### **2️⃣ NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: sb_publishable_LxyKQcw2PVKhh_-pjWQbyw_5j3t2zaz
Scope: Production, Preview, Development
```

**Purpose**: Supabase anonymous key for authentication  
**Usage**: Read access to cod_accounts table  
**Public**: ✅ YES (Anonymous key, limited permissions)

---

### **3️⃣ RESEND_API_KEY** ⚠️ SENSITIVE
```
Name: RESEND_API_KEY
Value: re_hStr8Rrc_LTgMxqktYFsASvoXUgGBuAc4
Scope: Production, Preview, Development
```

**Purpose**: Email service API for contact form  
**Usage**: Sends contact form submissions to digizaro.co@gmail.com  
**Public**: ❌ NO (Keep private - server-side only)  
**Where Used**: `/app/api/contact/route.ts` (backend only)

---

### **4️⃣ NEXT_PUBLIC_SITE_URL**
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://battlegaming.store
Scope: Production, Preview, Development
```

**Purpose**: Site URL for canonical tags and schema markup  
**Usage**: Dynamic canonical URLs on all 1,260 pages  
**Public**: ✅ YES (It's just the domain)

---

## 🛠️ HOW TO ADD TO VERCEL (Step-by-Step)

### **Method 1: Via Vercel Dashboard**

1. **Go to Project Dashboard**:
   - URL: https://vercel.com/dashboard
   - Find: "BattleGaming" project
   - Click: Project name

2. **Navigate to Settings**:
   - Click: **Settings** tab (top menu)
   - Left sidebar: Click **Environment Variables**

3. **Add Variable 1: NEXT_PUBLIC_SUPABASE_URL**
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://pkvpfqxqhvyzmcjbplwx.supabase.co
   Select Environments:
   ☑ Production
   ☑ Preview
   ☑ Development
   Click: Save
   ```

4. **Add Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY**
   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: sb_publishable_LxyKQcw2PVKhh_-pjWQbyw_5j3t2zaz
   Select Environments:
   ☑ Production
   ☑ Preview
   ☑ Development
   Click: Save
   ```

5. **Add Variable 3: RESEND_API_KEY** (⚠️ IMPORTANT)
   ```
   Name: RESEND_API_KEY
   Value: re_hStr8Rrc_LTgMxqktYFsASvoXUgGBuAc4
   Select Environments:
   ☑ Production
   ☑ Preview
   ☑ Development
   Click: Save
   ```

6. **Add Variable 4: NEXT_PUBLIC_SITE_URL**
   ```
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://battlegaming.store
   Select Environments:
   ☑ Production
   ☑ Preview
   ☑ Development
   Click: Save
   ```

---

### **Method 2: Via CLI (Advanced)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to project
cd /path/to/cod-store

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://pkvpfqxqhvyzmcjbplwx.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste: sb_publishable_LxyKQcw2PVKhh_-pjWQbyw_5j3t2zaz

vercel env add RESEND_API_KEY
# Paste: re_hStr8Rrc_LTgMxqktYFsASvoXUgGBuAc4

vercel env add NEXT_PUBLIC_SITE_URL
# Paste: https://battlegaming.store

# Deploy with new env vars
vercel deploy --prod
```

---

## ✅ VERIFICATION CHECKLIST

### **Pre-Deployment Verification**

- ✅ All 4 variables added to Vercel dashboard
- ✅ All variables have correct values (copy-paste, not typed)
- ✅ All 3 environment scopes selected (Production, Preview, Development)
- ✅ RESEND_API_KEY is marked as sensitive
- ✅ No typos in variable names (CASE SENSITIVE)
- ✅ Local .env.local matches Vercel values

---

### **Post-Deployment Verification**

#### **1. Check Environment Variables Loaded**

Go to: **Deployments → Latest Deployment → Environment**

You should see:
```
NEXT_PUBLIC_SUPABASE_URL: https://pkvpfqxqhvyzmcjbplwx.supabase.co ✅
NEXT_PUBLIC_SUPABASE_ANON_KEY: sb_publishable_... ✅
RESEND_API_KEY: re_hStr8Rrc_... ✅
NEXT_PUBLIC_SITE_URL: https://battlegaming.store ✅
```

---

#### **2. Test Database Connection**

Visit live site: `https://battlegaming.store`

Check:
- ✅ Homepage loads (uses Supabase)
- ✅ Click any account page (database query works)
- ✅ Page shows account details (database read success)

---

#### **3. Test Contact Form Email**

Visit: `https://battlegaming.store/contact`

Fill form:
```
Name: Test User
Email: your-email@gmail.com
Phone: +1-780-000-0000
Subject: Test Contact
Message: Testing contact form with Resend API
```

Submit and verify:
- ✅ Form submits successfully
- ✅ Success message appears
- ✅ Check digizaro.co@gmail.com inbox (may take 30 seconds)
- ✅ Email arrives with all form data

**If email doesn't arrive**:
- Check Vercel logs: **Deployments → Latest → Logs**
- Search for "Resend" or "error"
- Verify API key is correct

---

#### **4. Test Canonical Tags**

Visit any account page: `https://battlegaming.store/accounts/buy-bo7-account-10-wins-ps5-usa-instant-delivery`

Open DevTools (F12 → Elements):
```html
<link rel="canonical" href="https://battlegaming.store/accounts/buy-bo7-account-10-wins-ps5-usa-instant-delivery" />
```

✅ **Must show your NEXT_PUBLIC_SITE_URL value**

---

#### **5. Test Schema Markup**

Visit same account page, view source (Ctrl+U):

Search for: `"@type": "Product"`

You should see:
```json
{
  "@type": "Product",
  "name": "Buy Verified BO7 Account 10 Wins...",
  "offers": {
    "price": "14.94",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
```

✅ **Schema must render with product data**

---

#### **6. Test WhatsApp Button**

Visit homepage: `https://battlegaming.store`

Check bottom-right corner:
- ✅ Green WhatsApp button visible
- ✅ Hover effect works (scales up)
- ✅ Click opens: `https://wa.me/15795507750`

---

#### **7. Test Sitemap**

Visit: `https://battlegaming.store/sitemap.xml`

You should see:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://battlegaming.store/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 1,260+ account pages listed -->
</urlset>
```

✅ **Sitemap must be valid XML with all 1,260 pages**

---

## 🔍 ENVIRONMENT VARIABLES - WHERE THEY'RE USED

| Variable | Used In | Type | Example Usage |
|----------|---------|------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase.ts` | Server/Client | Initialize Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase.ts` | Server/Client | Authenticate with Supabase |
| `RESEND_API_KEY` | `app/api/contact/route.ts` | Server-Side Only | Send emails via Resend |
| `NEXT_PUBLIC_SITE_URL` | `app/accounts/[slug]/page.tsx` | Server/Client | Generate canonical URLs |

---

## ⚠️ TROUBLESHOOTING

### **Issue: "Supabase connection failed"**

**Cause**: Wrong URL or key  
**Fix**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Click edit on `NEXT_PUBLIC_SUPABASE_URL`
3. Verify value: `https://pkvpfqxqhvyzmcjbplwx.supabase.co`
4. Redeploy: Click "Deploy" or push to GitHub

---

### **Issue: "Contact form doesn't send email"**

**Cause**: Resend API key invalid or not set  
**Fix**:
1. Check Vercel Logs: Deployments → Latest → Logs → Search "Resend"
2. Verify API key in Vercel Settings
3. Ensure it starts with `re_`
4. Redeploy after fixing

---

### **Issue: "Canonical URLs show old domain"**

**Cause**: `NEXT_PUBLIC_SITE_URL` not updated  
**Fix**:
1. Go to Vercel Settings → Environment Variables
2. Update `NEXT_PUBLIC_SITE_URL` to `https://battlegaming.store`
3. Redeploy: `git push origin master` (triggers auto-deploy)
4. Wait 2-3 minutes for new deployment

---

### **Issue: "Database shows no pages"**

**Cause**: Supabase key doesn't have read permissions  
**Fix**:
1. Go to Supabase Dashboard: https://app.supabase.com
2. Project: "pkvpfqxqhvyzmcjbplwx"
3. Check `cod_accounts` table has data
4. Verify key has RLS policies allowing anonymous read
5. Run generateData.js locally: `node generateData.js`

---

## 🚀 FINAL DEPLOYMENT CHECKLIST

### Before Going Live

- ✅ All 4 environment variables added to Vercel
- ✅ Values are **exactly** as specified (no typos)
- ✅ All 3 environments selected (Production, Preview, Dev)
- ✅ `npm run build` successful locally
- ✅ `git push` to GitHub (triggers Vercel deployment)
- ✅ Vercel deployment succeeds (green checkmark)

### After Deployment

- ✅ Visit https://battlegaming.store
- ✅ Homepage loads with database data
- ✅ Click account page - shows product info
- ✅ Fill contact form - email arrives in inbox
- ✅ WhatsApp button works
- ✅ View source - canonical tags correct
- ✅ View source - schema markup present
- ✅ Check sitemap - 1,260+ URLs listed

### Production Monitoring

- ✅ Monitor Vercel Analytics
- ✅ Check function logs for errors
- ✅ Monitor Resend email delivery
- ✅ Track Google Search Console crawls
- ✅ Monitor contact form submissions

---

## 📞 QUICK REFERENCE

**Vercel Dashboard**: https://vercel.com/dashboard  
**Environment Variables Path**: Settings → Environment Variables  
**Resend API Key Path**: https://resend.com/api-keys  
**Supabase Project**: https://app.supabase.com/project/pkvpfqxqhvyzmcjbplwx  

---

## ✨ STATUS

**Configuration**: ✅ **COMPLETE**  
**Testing**: ✅ **READY**  
**Deployment**: ✅ **READY**  
**Live**: ⏳ **PENDING VERCEL SETUP**

---

**Last Updated**: May 6, 2026  
**All Systems Ready for Production Deployment** 🎉
