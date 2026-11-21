import { NextRequest, NextResponse } from 'next/server';
import { getAirQualityData } from '@/lib/openweather';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');
    const city = searchParams.get('city') || 'Delhi NCR';
    const country = searchParams.get('country') || 'India';

    // Default coordinates to Delhi NCR if none provided
    const lat = latParam ? parseFloat(latParam) : 28.6139;
    const lon = lonParam ? parseFloat(lonParam) : 77.2090;

    const data = await getAirQualityData(lat, lon, city, country);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Error /api/air-quality:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch air quality data' },
      { status: 500 }
    );
  }
}
