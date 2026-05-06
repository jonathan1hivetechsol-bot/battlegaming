'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send message');
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full px-4 py-2 bg-[#1a1a3e] border border-[#FF7828]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7828] focus:outline-none transition-colors"
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="w-full px-4 py-2 bg-[#1a1a3e] border border-[#FF7828]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7828] focus:outline-none transition-colors"
        />
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (780) 851-1699"
          className="w-full px-4 py-2 bg-[#1a1a3e] border border-[#FF7828]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7828] focus:outline-none transition-colors"
        />
      </div>

      {/* Subject Field */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Subject *</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-[#1a1a3e] border border-[#FF7828]/30 rounded-lg text-white focus:border-[#FF7828] focus:outline-none transition-colors"
        >
          <option value="">Select a subject</option>
          <option value="account-issue">Account Issue</option>
          <option value="delivery-problem">Delivery Problem</option>
          <option value="refund-request">Refund Request</option>
          <option value="general-inquiry">General Inquiry</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Describe your inquiry in detail..."
          rows={5}
          className="w-full px-4 py-2 bg-[#1a1a3e] border border-[#FF7828]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#FF7828] focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-green-400 text-sm font-medium">
            ✓ Your message has been sent successfully! We'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm font-medium">✗ {error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-[#FF7828] text-black font-bold text-sm uppercase rounded-lg hover:bg-[#E86B1F] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF7828]/50 transition-all duration-300 hover:scale-105"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {/* Footer Note */}
      <p className="text-xs text-gray-400 text-center">
        We typically respond within 24 hours. For urgent matters, use WhatsApp below.
      </p>
    </form>
  );
}
