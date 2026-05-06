'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const { user, userProfile, loading, signOut, isAuthenticated } = useAuth();

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d071a] to-[#1a0f2e] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#FF7828] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d071a] to-[#1a0f2e] pt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-[#1a0f2e] border border-[#FF7828]/20 rounded-2xl p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {userProfile?.display_name || 'BattleGaming User'}
                </h1>
                <p className="text-gray-400 mb-4">{user?.email}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-[#0d071a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Member Since</p>
                    <p className="text-[#FF7828] font-bold">
                      {new Date(userProfile?.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-[#0d071a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Account Status</p>
                    <p className="text-[#45f882] font-bold">✓ Verified</p>
                  </div>
                  <div className="bg-[#0d071a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Total Purchases</p>
                    <p className="text-white font-bold">0</p>
                  </div>
                </div>
              </div>

              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#FF7828] to-[#45f882] rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {userProfile?.display_name?.charAt(0).toUpperCase() || 'B'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1a0f2e] border border-[#FF7828]/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/" className="block w-full bg-[#FF7828] hover:bg-[#ff6b00] text-white font-bold py-3 rounded-lg text-center transition">
                Browse Accounts
              </Link>
              <button className="w-full bg-[#45f882]/10 hover:bg-[#45f882]/20 text-[#45f882] font-bold py-3 rounded-lg transition">
                My Purchases
              </button>
              <button
                onClick={handleSignOut}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-3 rounded-lg transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Email & Security */}
          <div className="bg-[#1a0f2e] border border-[#FF7828]/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Email & Security</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Email Address</label>
                <p className="text-white font-semibold">{user?.email}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Two-Factor Authentication</label>
                <div className="flex items-center mt-2">
                  <span className="text-gray-400">Status: </span>
                  <span className="text-yellow-400 ml-2">Not Enabled</span>
                </div>
              </div>
              <button className="mt-4 text-[#FF7828] hover:text-[#ff6b00] font-semibold">
                Enable 2FA
              </button>
            </div>
          </div>

          {/* Purchase History */}
          <div className="bg-[#1a0f2e] border border-[#FF7828]/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Purchases</h3>
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No purchases yet</p>
              <Link href="/" className="text-[#FF7828] hover:text-[#ff6b00] font-semibold">
                Start browsing accounts →
              </Link>
            </div>
          </div>
        </div>

        {/* Account Preferences */}
        <div className="bg-[#1a0f2e] border border-[#FF7828]/20 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">Email Notifications</label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="notifications"
                  defaultChecked
                  className="w-5 h-5 rounded accent-[#FF7828]"
                />
                <label htmlFor="notifications" className="ml-3 text-white">
                  Receive order and delivery updates
                </label>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm">Marketing Communications</label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="marketing"
                  className="w-5 h-5 rounded accent-[#FF7828]"
                />
                <label htmlFor="marketing" className="ml-3 text-white">
                  Receive promotions and exclusive offers
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-r from-[#FF7828]/10 to-[#45f882]/10 border border-[#FF7828]/20 rounded-2xl p-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Need Help?</h3>
              <p className="text-gray-400">Contact BattleGaming's 24/7 support team for assistance</p>
            </div>
            <Link href="/contact" className="bg-[#FF7828] hover:bg-[#ff6b00] text-white font-bold px-6 py-3 rounded-lg transition">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
