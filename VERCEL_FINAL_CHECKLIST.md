# ✅ VERCEL ENVIRONMENT SETUP - FINAL VERIFICATION CHECKLIST

**Last Updated**: May 6, 2026  
**Status**: Ready for Production  
**Project**: BattleGaming.store

---

## 📋 YOUR 4 ENVIRONMENT VARIABLES

### **Copy These Exact Values** (No Typos!)

```
1️⃣  Name: NEXT_PUBLIC_SUPABASE_URL
    Value: https://pkvpfqxqhvyzmcjbplwx.supabase.co

2️⃣  Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
    Value: sb_publishable_LxyKQcw2PVKhh_-pjWQbyw_5j3t2zaz

3️⃣  Name: RESEND_API_KEY
    Value: re_hStr8Rrc_LTgMxqktYFsASvoXUgGBuAc4

4️⃣  Name: NEXT_PUBLIC_SITE_URL
    Value: https://battlegaming.store
```

---

## 🚀 VERCEL SETUP STEPS (Exact Path)

### **Step 1: Open Vercel Dashboard**
```
URL: https://vercel.com/dashboard
Action: Login with GitHub
```

### **Step 2: Select Your Project**
```
Look for: "BattleGaming" or "battlegaming" or "cod-store"
Click: Project name
```

### **Step 3: Go to Settings**
```
Top Menu: Settings tab
Left Sidebar: Environment Variables
```

### **Step 4: Add Variables One by One**

#### **Variable 1: NEXT_PUBLIC_SUPABASE_URL**
```
Click: "Add New Environment Variable"
Name Field: NEXT_PUBLIC_SUPABASE_URL
Value Field: https://pkvpfqxqhvyzmcjbplwx.supabase.co
Environment Selection:
  ☑ Production
  ☑ Preview  
  ☑ Development
Button: Save / Add
```

#### **Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
Click: "Add New Environment Variable"
Name Field: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value Field: sb_publishable_LxyKQcw2PVKhh_-pjWQbyw_5j3t2zaz
Environment Selection:
  ☑ Production
  ☑ Preview  
  ☑ Development
Button: Save / Add
```

#### **Variable 3: RESEND_API_KEY** ⚠️ CRITICAL
```
Click: "Add New Environment Variable"
Name Field: RESEND_API_KEY
Value Field: re_hStr8Rrc_LTgMxqktYFsASvoXUgGBuAc4
Environment Selection:
  ☑ Production
  ☑ Preview  
  ☑ Development
Button: Save / Add
```

#### **Variable 4: NEXT_PUBLIC_SITE_URL**
```
Click: "Add New Environment Variable"
Name Field: NEXT_PUBLIC_SITE_URL
Value Field: https://battlegaming.store
Environment Selection:
  ☑ Production
  ☑ Preview  
  ☑ Development
Button: Save / Add
```

---

## ✅ VERIFICATION AFTER ADDING ALL VARIABLES

### **You Should See All 4 Listed**

```
Environment Variables (4 total):

✅ NEXT_PUBLIC_SUPABASE_URL
   Environments: Production, Preview, Development

✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   Environments: Production, Preview, Development

✅ RESEND_API_KEY
   Environments: Production, Preview, Development
   (Shows as: re_hStr8Rrc_... for security)

✅ NEXT_PUBLIC_SITE_URL
   Environments: Production, Preview, Development
```

---

## 🔄 REDEPLOY AFTER ADDING VARIABLES

### **Option 1: Via Vercel Dashboard (Easiest)**

```
1. Go to: Deployments (top menu)
2. Find: Latest deployment
3. Click: 3-dot menu (⋮)
4. Select: "Redeploy"
5. Wait: Green checkmark (2-5 minutes)
```

### **Option 2: Via GitHub (Auto-Trigger)**

```
1. Open: https://github.com/jonathan1hivetechsol-bot/battlegaming
2. Make any small change (or just run: git push)
3. Vercel auto-detects GitHub push
4. Auto-deploys with new env vars
```

### **Status Tracking**

```
Building... ⏳
   ↓
Verifying... ⏳
   ↓
Ready ✅ (Green checkmark)
```

---

## 🧪 POST-DEPLOYMENT TESTS (Do These After Redeploy)

### **Test 1: Homepage Loads**
```
Open: https://battlegaming.store
Expected: Homepage with account grid
Result: ✅ or ❌
```

### **Test 2: Account Page Loads Database**
```
Open: https://battlegaming.store/accounts/buy-bo7-account-10-wins-ps5-usa-instant-delivery
Expected: Product page with price, description, schema
Result: ✅ or ❌
```

### **Test 3: Contact Form Works**
```
1. Go to: https://battlegaming.store/contact
2. Fill form:
   - Name: Test User
   - Email: your-email@gmail.com
   - Phone: +1-780-000-0000
   - Subject: Test
   - Message: Testing contact form
3. Click: Send
4. Expected: Success message
5. Check Email: digizaro.co@gmail.com (wait 30 seconds)
Result: ✅ Email arrived or ❌ Failed
```

**If Email Doesn't Arrive**:
```
1. Check Vercel Logs:
   - Deployments → Latest → Logs
   - Search: "Resend" or "error"
2. Verify API Key: re_hStr8Rrc_... (must be exact)
3. Redeploy project
```

### **Test 4: Canonical Tags Present**
```
1. Go to any product page
2. Right-click → View Page Source (Ctrl+U)
3. Search: canonical
4. Should see: <link rel="canonical" href="https://battlegaming.store/accounts/...">
Result: ✅ Found or ❌ Missing
```

### **Test 5: Schema Markup Present**
```
1. Same product page source (Ctrl+U)
2. Search: "@type": "Product"
3. Should see: JSON-LD schema with price, brand, rating
Result: ✅ Found or ❌ Missing
```

### **Test 6: WhatsApp Button Works**
```
1. Homepage: https://battlegaming.store
2. Look bottom-right corner
3. Click: Green "WhatsApp Only" button
4. Should open: WhatsApp Web/App with message pre-filled
Result: ✅ Works or ❌ Broken
```

### **Test 7: Sitemap Valid**
```
Open: https://battlegaming.store/sitemap.xml
Expected: XML with 1,260+ URL entries
Result: ✅ Valid or ❌ Empty
```

---

## ⚠️ COMMON ISSUES & FIXES

### **Issue 1: "Supabase connection failed"**

**Symptoms**:
- Blank homepage
- 500 error pages
- No product data showing

**Fix**:
```
1. Vercel Settings → Environment Variables
2. Edit: NEXT_PUBLIC_SUPABASE_URL
3. Verify: https://pkvpfqxqhvyzmcjbplwx.supabase.co
4. Save
5. Redeploy: git push origin master
6. Test: Homepage loads
```

---

### **Issue 2: "Contact form doesn't send email"**

**Symptoms**:
- Form shows success message
- But email never arrives
- No error shown to user

**Fix**:
```
1. Vercel Deployments → Latest → Logs
2. Search: "Resend" or "error"
3. Check API key: re_hStr8Rrc_...
4. If wrong, update in Settings → Environment Variables
5. Redeploy
6. Test form again
```

---

### **Issue 3: "Environment variable not found"**

**Symptoms**:
- Build fails
- "NEXT_PUBLIC_SUPABASE_URL is undefined"

**Fix**:
```
1. Check variable is saved (appears in list)
2. Verify all 3 environments selected:
   ☑ Production
   ☑ Preview
   ☑ Development
3. Redeploy
```

---

### **Issue 4: "Canonical URL shows wrong domain"**

**Symptoms**:
- Canonical shows: https://yourvercelapp.vercel.app
- Should be: https://battlegaming.store

**Fix**:
```
1. Settings → Environment Variables
2. Edit: NEXT_PUBLIC_SITE_URL
3. Change to: https://battlegaming.store
4. Redeploy
```

---

## 📊 SUMMARY TABLE

| Variable | Value | Purpose | Status |
|----------|-------|---------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://pkvpfqxqhvyzmcjbplwx.supabase.co` | Database connection | ⏳ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...` | Database auth | ⏳ |
| `RESEND_API_KEY` | `re_hStr8Rrc_...` | Email service | ⏳ |
| `NEXT_PUBLIC_SITE_URL` | `https://battlegaming.store` | Canonical URLs | ⏳ |

---

## 🎯 QUICK REFERENCE LINKS

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/jonathan1hivetechsol-bot/battlegaming
- **BattleGaming Site**: https://battlegaming.store
- **Resend Dashboard**: https://resend.com/emails
- **Supabase Dashboard**: https://app.supabase.com

---

## ✨ FINAL STATUS

```
✅ Code: Ready (Last commit: aef29a1)
✅ GitHub: All pushed
✅ .env.local: Configured
✅ Vercel Variables: READY TO ADD
⏳ Vercel Deployment: PENDING
⏳ Live Site: PENDING DEPLOYMENT
```

---

## 🚀 NEXT ACTION

**Add 4 environment variables to Vercel Settings, then redeploy!**

**Time Required**: 5 minutes  
**Difficulty**: Easy  
**Risk**: None (variables are safe)

---

**Ready to make it live? Let's go! 🎉**
