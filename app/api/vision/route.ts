import { NextRequest, NextResponse } from 'next/server';
import { analyzeFilterImage } from '@/lib/gemini';
import { SupportedLanguage } from '@/types/air';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, language } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Strip prefix if user passed full data URI (data:image/jpeg;base64,...)
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const result = await analyzeFilterImage(
      cleanBase64, 
      mimeType || 'image/jpeg', 
      (language as SupportedLanguage) || 'en'
    );
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error /api/vision:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
