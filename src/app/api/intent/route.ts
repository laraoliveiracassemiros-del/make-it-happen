import { NextResponse } from 'next/server';
import { parseIntent } from '@/lib/intent';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const request = String(body.request ?? '').trim();
    if (request.length < 8) return NextResponse.json({ error: 'Descreva melhor o que precisa acontecer.' }, { status: 400 });
    const intent = await parseIntent(request);
    return NextResponse.json({ intent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Não foi possível interpretar a missão.' }, { status: 500 });
  }
}
