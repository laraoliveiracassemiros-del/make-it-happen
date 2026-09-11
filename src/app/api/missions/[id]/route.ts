import { NextResponse } from 'next/server';
import { getMission, updateMissionStatus } from '@/lib/store';
import type { MissionStatus } from '@/lib/types';

const allowedStatuses: MissionStatus[] = [
  'draft',
  'triage',
  'quoted',
  'paid',
  'matching',
  'assigned',
  'in_progress',
  'done',
  'cancelled',
  'rejected',
];

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const mission = await getMission(id);
  if (!mission) return NextResponse.json({ error: 'Mission não encontrada.' }, { status: 404 });
  return NextResponse.json({ mission });
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const status = String(body.status ?? '') as MissionStatus;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: 'Status inválido.' }, { status: 400 });
    }

    const mission = await updateMissionStatus(id, status);
    if (!mission) return NextResponse.json({ error: 'Mission não encontrada.' }, { status: 404 });

    return NextResponse.json({ mission });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Não foi possível atualizar a Mission.' }, { status: 500 });
  }
}
