export const maxDuration = 60;
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { analyzeFilterImage } from '@/lib/gemini';
import { SupportedLanguage } from '@/types/air';

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
  } catch (error: unknown) {
    console.error('[POST /api/vision] Error analyzing filter image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze filter image';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
