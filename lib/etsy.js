const ETSY_API_BASE = 'https://api.etsy.com/v3/application';

export function etsyConfigured() {
  return Boolean(process.env.ETSY_API_KEY && process.env.ETSY_SHOP_ID);
}

export async function getActiveEtsyListings() {
  if (!etsyConfigured()) return null;

  const headers = {
    'x-api-key': process.env.ETSY_API_KEY
  };

  if (process.env.ETSY_ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${process.env.ETSY_ACCESS_TOKEN}`;
  }

  const response = await fetch(
    `${ETSY_API_BASE}/shops/${process.env.ETSY_SHOP_ID}/listings/active?limit=100`,
    { headers, next: { revalidate: 900 } }
  );

  if (!response.ok) {
    throw new Error(`Etsy listings request failed: ${response.status}`);
  }

  return response.json();
}
