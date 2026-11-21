import { NextRequest, NextResponse } from 'next/server';
import { askGeminiChat } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { history, currentContext } = body;

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: 'Invalid history parameter' }, { status: 400 });
    }

    const response = await askGeminiChat(history, currentContext);
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('API Error /api/chat:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
