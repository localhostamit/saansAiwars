export const maxDuration = 60;
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { askGeminiChat } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { history, currentContext } = body;

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: 'Invalid history parameter' }, { status: 400 });
    }

    const response = await askGeminiChat(history, currentContext);
    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error('[POST /api/chat] Error handling chat request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error in chat handler';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
