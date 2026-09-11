import { NextResponse } from 'next/server';
import { parseIntent } from '@/lib/intent';
import { createQuote } from '@/lib/pricing';
import { listMissions, saveMission } from '@/lib/store';
import type { Mission } from '@/lib/types';

export async function GET() {
  const missions = await listMissions();
  return NextResponse.json({ missions });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const request = String(body.request ?? '').trim();
    if (request.length < 8) return NextResponse.json({ error: 'Descreva melhor a Mission.' }, { status: 400 });
    const intent = await parseIntent(request);
    if (!intent.allowed) return NextResponse.json({ error: intent.refusalReason ?? 'Mission bloqueada.', intent }, { status: 422 });
    const quote = createQuote(intent);
    const now = new Date().toISOString();
    const mission: Mission = {
      id: crypto.randomUUID(),
      request,
      customerName: body.customerName,
      customerWhatsapp: body.customerWhatsapp,
      region: body.region ?? 'Brasília',
      status: 'triage',
      intent,
      quote,
      createdAt: now,
      updatedAt: now,
    };
    await saveMission(mission);
    return NextResponse.json({ mission }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Não foi possível criar a Mission.' }, { status: 500 });
  }
}
