import { NextResponse } from 'next/server';
import { getActiveEtsyListings } from '../../../../lib/etsy';

export async function GET() {
  try {
    const data = await getActiveEtsyListings();
    return NextResponse.json({ configured: Boolean(data), data });
  } catch (error) {
    return NextResponse.json({ configured: true, error: error.message }, { status: 502 });
  }
}
