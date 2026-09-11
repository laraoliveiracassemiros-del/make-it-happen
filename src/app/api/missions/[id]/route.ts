import { NextResponse } from 'next/server';
import { getMission } from '@/lib/store';

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const mission = await getMission(id);
  if (!mission) return NextResponse.json({ error: 'Mission não encontrada.' }, { status: 404 });
  return NextResponse.json({ mission });
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  return NextResponse.json({
    id,
    accepted: true,
    requestedStatus: body.status ?? 'paid',
    note: 'PATCH demo. Conecte Supabase para persistir mudanças reais de status.',
  });
}
