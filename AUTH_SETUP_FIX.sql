-- ============================================
-- SUPABASE AUTH SETUP - COMPLETE FIX
-- ============================================
-- Run this in Supabase SQL Editor to fix authentication issues

-- ====================
-- 1. CREATE USER_PROFILES TABLE
-- ====================
CREATE TABLE IF NOT EXISTS user_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  total_purchases INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  account_status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE,
  notification_email BOOLEAN DEFAULT true,
  marketing_consent BOOLEAN DEFAULT false
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at DESC);

-- ====================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ====================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- ====================
-- 3. DROP EXISTING POLICIES (if any) TO AVOID CONFLICTS
-- ====================
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Public can view profiles" ON user_profiles;

-- ====================
-- 4. CREATE NEW RLS POLICIES
-- ====================

-- Users can SELECT their own profile
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can UPDATE their own profile
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can INSERT their own profile (for signup)
CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own profile
CREATE POLICY "Users can delete their own profile" ON user_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- ====================
-- 5. CREATE USER_PURCHASES TABLE
-- ====================
CREATE TABLE IF NOT EXISTS user_purchases (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_slug VARCHAR(255) NOT NULL,
  account_title VARCHAR(255),
  game_version VARCHAR(50),
  platform VARCHAR(50),
  wins INTEGER,
  region VARCHAR(50),
  price DECIMAL(10, 2) NOT NULL,
  purchase_status VARCHAR(50) DEFAULT 'pending',
  delivery_status VARCHAR(50) DEFAULT 'pending',
  account_delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for purchases
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON user_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_purchase_status ON user_purchases(purchase_status);
CREATE INDEX IF NOT EXISTS idx_user_purchases_created_at ON user_purchases(created_at DESC);

-- ====================
-- 6. ENABLE RLS FOR PURCHASES
-- ====================
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;

-- ====================
-- 7. DROP EXISTING PURCHASE POLICIES
-- ====================
DROP POLICY IF EXISTS "Users can view their own purchases" ON user_purchases;
DROP POLICY IF EXISTS "Users can insert their own purchases" ON user_purchases;

-- ====================
-- 8. CREATE PURCHASE RLS POLICIES
-- ====================

-- Users can SELECT their own purchases
CREATE POLICY "Users can view their own purchases" ON user_purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Users can INSERT their own purchases
CREATE POLICY "Users can insert their own purchases" ON user_purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can UPDATE their own purchases
CREATE POLICY "Users can update their own purchases" ON user_purchases
  FOR UPDATE USING (auth.uid() = user_id);

-- ====================
-- 9. GRANT PERMISSIONS
-- ====================
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_purchases TO authenticated;

-- ====================
-- 10. ADD TABLE COMMENTS
-- ====================
COMMENT ON TABLE user_profiles IS 'Stores user profile information for BattleGaming authenticated users';
COMMENT ON TABLE user_purchases IS 'Tracks all purchases and deliveries for BattleGaming users';

-- ====================
-- VERIFICATION QUERIES
-- ====================
-- Run these to verify setup:

-- Check user_profiles table structure:
-- SELECT column_name, data_type, is_nullable FROM information_schema.columns 
-- WHERE table_name = 'user_profiles' ORDER BY ordinal_position;

-- Check RLS policies on user_profiles:
-- SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check 
-- FROM pg_policies WHERE tablename = 'user_profiles';

-- Check RLS policies on user_purchases:
-- SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check 
-- FROM pg_policies WHERE tablename = 'user_purchases';

-- Test user profile insert (replace UUID with real auth.uid()):
-- INSERT INTO user_profiles (user_id, email, display_name) 
-- VALUES ('your-uuid-here', 'test@test.com', 'TestUser');

-- ====================
-- COMMON ISSUES & FIXES
-- ====================

-- If you get "Permission denied" error:
-- 1. Make sure RLS is ENABLED on the table
-- 2. Make sure the policies are created correctly
-- 3. Try again after 30 seconds (cache)

-- If email validation fails in Supabase:
-- Supabase accepts any email format that passes RFC 5322
-- The application should validate email format before sending

-- If users can't sign up:
-- 1. Check user_profiles table exists
-- 2. Check RLS policies allow INSERT
-- 3. Check auth.users table exists
-- 4. Verify Supabase project has auth enabled
