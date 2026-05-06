# BattleGaming Authentication System Setup Guide

## Overview
This guide walks you through setting up the complete authentication system for BattleGaming, including user registration, login, and profile management.

## System Architecture

### Components
1. **AuthContext** (`app/context/AuthContext.tsx`)
   - Centralized auth state management
   - User session handling
   - Sign up, sign in, sign out functions
   - User profile data fetching

2. **Sign Up Page** (`app/signup/page.tsx`)
   - User registration form
   - Email and password validation
   - Profile creation

3. **Sign In Page** (`app/signin/page.tsx`)
   - Login form
   - Email and password authentication
   - Session restoration

4. **Profile Page** (`app/profile/page.tsx`)
   - User dashboard
   - Purchase history
   - Account settings
   - Security preferences

5. **Updated Navbar** (`app/components/Navbar.tsx`)
   - Dynamic auth UI
   - Sign In/Sign Up buttons (not logged in)
   - Profile dropdown (logged in)
   - Mobile auth support

## Setup Steps

### Step 1: Run Database Migration

1. Go to **Supabase Dashboard** → Your Project
2. Click **SQL Editor** → **New Query**
3. Copy the entire content from `DATABASE_MIGRATION.sql`
4. Paste it into the SQL editor
5. Click **Run**
6. Verify tables are created: `user_profiles` and `user_purchases`

Expected tables after migration:
```
user_profiles:
  - id (bigserial)
  - user_id (UUID, foreign key to auth.users)
  - email (varchar)
  - display_name (varchar)
  - avatar_url (text, optional)
  - bio (text, optional)
  - total_purchases (integer)
  - total_spent (decimal)
  - account_status (varchar)
  - created_at (timestamp)
  - updated_at (timestamp)
  - last_login (timestamp)
  - notification_email (boolean)
  - marketing_consent (boolean)

user_purchases:
  - id (bigserial)
  - user_id (UUID, foreign key to auth.users)
  - account_slug (varchar)
  - account_title (varchar)
  - game_version (varchar)
  - platform (varchar)
  - wins (integer)
  - region (varchar)
  - price (decimal)
  - purchase_status (varchar)
  - delivery_status (varchar)
  - account_delivered_at (timestamp)
  - created_at (timestamp)
  - updated_at (timestamp)
```

### Step 2: Enable Supabase Auth

1. Go to **Supabase Dashboard** → **Authentication**
2. Go to **Providers** → **Email**
3. Enable **Email/Password** authentication
4. Configure email settings:
   - ✓ Confirm email required: Enable
   - ✓ Double confirm changes: Enable
   - ✓ Secure email change: Enable

### Step 3: Configure Supabase Client (Already Done)

The Supabase client is already configured in `lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

### Step 4: Verify Environment Variables

Make sure your `.env.local` contains:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 5: Test the Auth System Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test Sign Up:
   - Navigate to `http://localhost:3000/signup`
   - Create a test account with:
     - Display Name: `TestUser`
     - Email: `test@example.com`
     - Password: `SecurePass123!`
   - Verify you're redirected to `/profile` after signup

3. Test Sign In:
   - Go to `http://localhost:3000/signin`
   - Log in with your test account credentials
   - Verify you're redirected to `/profile`

4. Test Profile Page:
   - Verify your profile information is displayed
   - Check "Member Since" date
   - Verify "Verified" status badge

5. Test Sign Out:
   - Click "Sign Out" button
   - Verify you're redirected to home page
   - Try accessing `/profile` - should redirect to `/signin`

6. Test Navbar Auth UI:
   - Not logged in: See "Sign In" and "Sign Up" buttons
   - Logged in: See profile dropdown with avatar
   - Mobile view: Auth buttons should appear in mobile menu

## User Flow

### Registration (Sign Up)
```
User → Sign Up Page → Form Validation → Create Auth User → Create Profile → Dashboard
```

1. User enters: Display Name, Email, Password
2. Validation checks:
   - Display name is not empty
   - Valid email format
   - Password ≥ 6 characters
   - Passwords match
3. AuthContext calls `signUp()`:
   - Creates user in Supabase Auth
   - Creates user_profiles record
4. User redirected to `/profile`

### Authentication (Sign In)
```
User → Sign In Page → Form Validation → Authenticate → Restore Session → Dashboard
```

1. User enters: Email, Password
2. Validation checks:
   - Valid email format
   - Password is not empty
3. AuthContext calls `signIn()`:
   - Authenticates with Supabase Auth
   - Fetches user_profiles data
4. User redirected to `/profile`

### Session Management
- `AuthContext` uses Supabase's `onAuthStateChange()`
- Automatically syncs user state across tabs
- Persists session in browser localStorage
- User automatically logged in on page reload if session exists

### Protected Routes
- `/profile` - Redirects to `/signin` if not authenticated
- Any page can check `useAuth().isAuthenticated`

## Database Queries

### Get User Profile
```typescript
const { data: profile } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', user.id)
  .single();
```

### Get User Purchases
```typescript
const { data: purchases } = await supabase
  .from('user_purchases')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

### Update User Profile
```typescript
const { error } = await supabase
  .from('user_profiles')
  .update({
    display_name: 'New Name',
    bio: 'Updated bio',
  })
  .eq('user_id', user.id);
```

### Record Purchase
```typescript
const { error } = await supabase
  .from('user_purchases')
  .insert([
    {
      user_id: user.id,
      account_slug: 'buy-bo7-account-50-wins-ps5-usa-instant-delivery',
      account_title: 'BO7 Account 50 Wins PS5 USA',
      game_version: 'BO7',
      platform: 'PS5',
      wins: 50,
      region: 'USA',
      price: 39.99,
      purchase_status: 'pending',
    },
  ]);
```

## Security Features

### Authentication
- ✓ Password hashing with Supabase Auth
- ✓ Email verification (optional)
- ✓ Session tokens with expiration
- ✓ HTTPS enforcement

### Database
- ✓ Row Level Security (RLS) enabled
- ✓ Users can only access their own data
- ✓ Foreign key constraints
- ✓ Audit timestamps on all records

### Frontend
- ✓ Protected routes with auth checks
- ✓ Environment variables for API keys
- ✓ Client-side form validation
- ✓ Error handling and user feedback

## Troubleshooting

### Issue: "Auth context is not defined"
**Solution:** Make sure `AuthProvider` is wrapping your app in `app/layout.tsx`

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"
**Solution:** Check `.env.local` has correct Supabase credentials

### Issue: "user_profiles table doesn't exist"
**Solution:** Run the `DATABASE_MIGRATION.sql` script in Supabase SQL Editor

### Issue: "Users can't sign up"
**Solution:** 
1. Check Supabase Auth is enabled
2. Verify email/password provider is active
3. Check browser console for error messages

### Issue: "Session not persisting"
**Solution:**
1. Check browser localStorage is not disabled
2. Verify HTTPS (required for secure cookies)
3. Check Supabase session timeout settings

## Next Steps

### Integrate Purchases
1. Add "Buy Now" functionality on account pages
2. Create purchase recording in `user_purchases` table
3. Send delivery notifications to user email
4. Show purchase history in `/profile`

### Add Advanced Features
1. **Two-Factor Authentication (2FA)**
2. **Password Reset via Email**
3. **Profile Picture Upload**
4. **Email Preferences**
5. **Purchase Notifications**
6. **Account Deactivation**

### Marketing Features
1. **Referral System**
2. **User Reviews/Testimonials**
3. **Account Upgrade Path**
4. **Promotional Codes**
5. **Loyalty Points**

## API Reference

### useAuth() Hook

```typescript
const {
  user,              // Current auth user (Supabase User type)
  userProfile,       // User's profile data from user_profiles table
  loading,           // Boolean indicating if auth state is loading
  error,             // Error message if auth fails
  signUp,            // Function to sign up new user
  signIn,            // Function to sign in existing user
  signOut,           // Function to sign out current user
  isAuthenticated,   // Boolean indicating if user is logged in
} = useAuth();
```

### signUp(email, password, displayName)
```typescript
await signUp('user@example.com', 'Password123!', 'John Doe');
// Creates auth user and user_profiles record
// Redirects to /profile on success
```

### signIn(email, password)
```typescript
await signIn('user@example.com', 'Password123!');
// Authenticates user and loads profile
// Redirects to /profile on success
```

### signOut()
```typescript
await signOut();
// Clears session and logs out user
// Redirects to home page
```

## Files Reference

- `app/context/AuthContext.tsx` - Auth state management
- `app/signup/page.tsx` - Sign up page
- `app/signin/page.tsx` - Sign in page
- `app/profile/page.tsx` - User dashboard
- `app/components/Navbar.tsx` - Updated navbar with auth UI
- `app/layout.tsx` - Updated with AuthProvider
- `lib/supabase.ts` - Supabase client configuration
- `DATABASE_MIGRATION.sql` - Database setup script

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Supabase documentation: https://supabase.com/docs
3. Check browser console for error messages
4. Contact BattleGaming support at support@battlegaming.store
