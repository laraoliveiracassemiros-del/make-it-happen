import { NextResponse } from 'next/server';
import { parseIntent } from '@/lib/intent';
import { createQuote } from '@/lib/pricing';
import { recommendOperator } from '@/lib/operators';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const request = String(body.request ?? '').trim();
    if (request.length < 8) return NextResponse.json({ error: 'Descreva melhor a Mission.' }, { status: 400 });
    const intent = await parseIntent(request);
    if (!intent.allowed) return NextResponse.json({ error: intent.refusalReason ?? 'Mission não permitida no V0.', intent }, { status: 422 });
    const quote = createQuote(intent);
    const operator = recommendOperator(intent.complexity, intent.risk);
    return NextResponse.json({ intent, quote, operator });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Falha ao gerar orçamento.' }, { status: 500 });
  }
}
