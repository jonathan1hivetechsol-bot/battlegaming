import { supabase } from '../../../lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return Response.json({ error: 'slug required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('cod_accounts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({
    slug: data.slug,
    meta_title: data.meta_title,
    price: data.price,
    unique_description: data.unique_description,
    average_rating: data.average_rating,
    review_count: data.review_count,
    reviews: data.reviews,
    buying_amount: data.buying_amount,
    full_data: data
  });
}
