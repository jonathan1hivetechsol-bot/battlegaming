import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all accounts from Supabase
  const { data: accounts, error } = await supabase
    .from('cod_accounts')
    .select('slug, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching accounts for sitemap:', error);
    // Return only static routes if there's an error
    return getStaticRoutes(baseUrl);
  }

  // Static routes
  const staticRoutes = getStaticRoutes(baseUrl);

  // Dynamic account routes
  const accountRoutes: MetadataRoute.Sitemap = (accounts || []).map(
    (account) => ({
      url: `${baseUrl}/accounts/${account.slug}`,
      lastModified: account.created_at
        ? new Date(account.created_at).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...accountRoutes];
}

function getStaticRoutes(baseUrl: string): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tournament`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];
}
