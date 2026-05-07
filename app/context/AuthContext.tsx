'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);

        // If user exists, fetch their profile
        if (session?.user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          setUserProfile(profile);
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setLoading(true);

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Sign up with Supabase Auth
      const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        // Handle specific Supabase errors
        if (signUpError.message.includes('already registered')) {
          throw new Error('This email is already registered. Please sign in instead.');
        }
        if (signUpError.message.includes('invalid')) {
          throw new Error('Invalid email address. Please check and try again.');
        }
        throw new Error(signUpError.message || 'Sign up failed');
      }
      
      if (!newUser) throw new Error('Sign up failed. Please try again.');

      // Create user profile in database
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          {
            user_id: newUser.id,
            email,
            display_name: displayName,
            created_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        // Log the error but don't block signup - user can still sign in
        console.warn('Profile creation warning:', profileError);
        // Only throw if it's a critical error
        if (profileError.message && profileError.message.includes('permission')) {
          throw new Error('Account created but profile setup failed. Please contact support.');
        }
      }

      setUser(newUser);
    } catch (err: any) {
      const errorMsg = err.message || 'Sign up failed. Please try again.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const { data: { user: signedInUser }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Handle specific Supabase errors
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please try again.');
        }
        if (signInError.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email first. Check your inbox for the verification link.');
        }
        throw new Error(signInError.message || 'Sign in failed');
      }
      
      if (!signedInUser) throw new Error('Sign in failed. Please try again.');

      // Fetch user profile (optional - user can still sign in if profile missing)
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', signedInUser.id)
        .single();

      setUser(signedInUser);
      setUserProfile(profile || null);
    } catch (err: any) {
      const errorMsg = err.message || 'Sign in failed. Please try again.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);

      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      setError(err.message || 'Sign out failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
