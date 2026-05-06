-- Supabase SQL Migration: Create user_profiles table for BattleGaming Auth System
-- This script creates the user_profiles table to store user information

-- Create user_profiles table
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

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert their own profile (for signup)
CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create purchases table to track user purchases
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
CREATE INDEX IF NOT EXISTS idx_user_purchases_created_at ON user_purchases(created_at);

-- Enable RLS for purchases
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;

-- RLS policies for purchases
CREATE POLICY "Users can view their own purchases" ON user_purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases" ON user_purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Grant default permissions
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_purchases TO authenticated;

-- Add comment to tables
COMMENT ON TABLE user_profiles IS 'Stores user profile information for BattleGaming users';
COMMENT ON TABLE user_purchases IS 'Tracks all purchases made by users on the platform';
