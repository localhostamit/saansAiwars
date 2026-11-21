export const maxDuration = 60;
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { analyzeFilterImage } from '@/lib/gemini';
import { SupportedLanguage } from '@/types/air';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] [POST /api/vision] Request started`);

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn(`[${new Date().toISOString()}] [POST /api/vision] GEMINI_API_KEY environment variable is not defined`);
    }

    const body = await req.json();
    const { imageBase64, mimeType, language } = body;

    if (!imageBase64) {
      console.warn(`[${new Date().toISOString()}] [POST /api/vision] Missing imageBase64 parameter`);
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Strip prefix if user passed full data URI (data:image/jpeg;base64,...)
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const result = await analyzeFilterImage(
      cleanBase64, 
      mimeType || 'image/jpeg', 
      (language as SupportedLanguage) || 'en'
    );

    console.log(`[${new Date().toISOString()}] [POST /api/vision] Completed in ${Date.now() - startTime}ms`);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error(`[${new Date().toISOString()}] [POST /api/vision] Exception caught in handler (${Date.now() - startTime}ms):`, error);
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze filter image' },
      { status: 500 }
    );
  }
}
