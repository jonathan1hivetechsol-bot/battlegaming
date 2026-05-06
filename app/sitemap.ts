import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com';

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
  ];
}
