'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, error: authError, loading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      setError('Display name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Valid email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      await signUp(formData.email, formData.password, formData.displayName);
      
      // Redirect to profile page on successful signup
      router.push('/profile');
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d071a] to-[#1a0f2e] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">BattleGaming</h1>
          <h2 className="text-2xl font-bold text-[#FF7828] mb-2">Create Account</h2>
          <p className="text-gray-400">Join BattleGaming community to buy verified accounts</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1a0f2e] border border-[#FF7828]/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Your gaming username"
                className="w-full px-4 py-3 bg-[#0d071a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7828] focus:outline-none transition"
                disabled={loading || authLoading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-[#0d071a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7828] focus:outline-none transition"
                disabled={loading || authLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#0d071a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7828] focus:outline-none transition"
                disabled={loading || authLoading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#0d071a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7828] focus:outline-none transition"
                disabled={loading || authLoading}
              />
            </div>

            {/* Error Messages */}
            {(error || authError) && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error || authError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || authLoading}
              className="w-full py-3 bg-[#FF7828] hover:bg-[#ff6b00] text-white font-bold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || authLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/signin" className="text-[#FF7828] hover:text-[#ff6b00] font-semibold">
                Sign In
              </Link>
            </p>
          </div>

          {/* Trust Signals */}
          <div className="mt-6 pt-6 border-t border-gray-700/50 space-y-2">
            <div className="flex items-center text-sm text-gray-400">
              <span className="text-[#45f882] mr-2">✓</span>
              <span>Secure account creation with BattleGaming</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span className="text-[#45f882] mr-2">✓</span>
              <span>24/7 customer support access</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span className="text-[#45f882] mr-2">✓</span>
              <span>Verified account marketplace</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
