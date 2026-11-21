export const maxDuration = 60;
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { askGeminiChat } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] [POST /api/chat] Request started`);

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn(`[${new Date().toISOString()}] [POST /api/chat] GEMINI_API_KEY environment variable is not defined`);
    }

    const body = await req.json();
    const { history, currentContext } = body;

    if (!history || !Array.isArray(history)) {
      console.warn(`[${new Date().toISOString()}] [POST /api/chat] Invalid history payload provided`);
      return NextResponse.json({ error: 'Invalid history parameter' }, { status: 400 });
    }

    const response = await askGeminiChat(history, currentContext);
    console.log(`[${new Date().toISOString()}] [POST /api/chat] Request completed successfully in ${Date.now() - startTime}ms`);
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error(`[${new Date().toISOString()}] [POST /api/chat] Exception caught in handler (${Date.now() - startTime}ms):`, error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error in chat handler' },
      { status: 500 }
    );
  }
}
