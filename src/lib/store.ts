import type { Mission, MissionStatus } from './types';

const memory = new Map<string, Mission>();

type MissionRow = {
  id: string;
  request: string;
  customer_name: string | null;
  customer_whatsapp: string | null;
  region: string | null;
  status: MissionStatus;
  intent: Mission['intent'];
  quote: Mission['quote'];
  created_at: string;
  updated_at: string;
};

function normalizeSupabaseUrl(raw?: string) {
  if (!raw) return undefined;
  return raw.trim().replace(/\/+$/, '').replace(/\/rest\/v1$/i, '');
}

function getSupabaseConfig() {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return { url, serviceKey, enabled: Boolean(url && serviceKey) };
}

function headers(serviceKey: string) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
  };
}

function toRow(mission: Mission) {
  return {
    id: mission.id,
    request: mission.request,
    customer_name: mission.customerName ?? null,
    customer_whatsapp: mission.customerWhatsapp ?? null,
    region: mission.region ?? null,
    status: mission.status,
    intent: mission.intent,
    quote: mission.quote,
    created_at: mission.createdAt,
    updated_at: mission.updatedAt,
  };
}

function fromRow(row: MissionRow): Mission {
  return {
    id: row.id,
    request: row.request,
    customerName: row.customer_name ?? undefined,
    customerWhatsapp: row.customer_whatsapp ?? undefined,
    region: row.region ?? undefined,
    status: row.status,
    intent: row.intent,
    quote: row.quote,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function writeMissionEvent(missionId: string, eventType: string, label: string, payload: Record<string, unknown> = {}) {
  const { url, serviceKey, enabled } = getSupabaseConfig();
  if (!enabled || !url || !serviceKey) return;

  await fetch(`${url}/rest/v1/mission_events`, {
    method: 'POST',
    headers: { ...headers(serviceKey), Prefer: 'return=minimal' },
    body: JSON.stringify({
      mission_id: missionId,
      event_type: eventType,
      label,
      payload,
    }),
  });
}

export async function saveMission(mission: Mission) {
  const { url, serviceKey, enabled } = getSupabaseConfig();

  if (enabled && url && serviceKey) {
    const res = await fetch(`${url}/rest/v1/missions`, {
      method: 'POST',
      headers: { ...headers(serviceKey), Prefer: 'return=representation' },
      body: JSON.stringify(toRow(mission)),
    });
    if (!res.ok) throw new Error(`Supabase save failed: ${await res.text()}`);
    const data = await res.json();
    await writeMissionEvent(mission.id, 'created', 'Mission criada', { source: 'web' });
    return data?.[0] ? fromRow(data[0]) : mission;
  }

  memory.set(mission.id, mission);
  return mission;
}

export async function listMissions(): Promise<Mission[]> {
  const { url, serviceKey, enabled } = getSupabaseConfig();

  if (enabled && url && serviceKey) {
    const res = await fetch(`${url}/rest/v1/missions?select=*&order=created_at.desc&limit=100`, {
      headers: headers(serviceKey),
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as MissionRow[];
    return rows.map(fromRow);
  }

  return Array.from(memory.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getMission(id: string): Promise<Mission | null> {
  const { url, serviceKey, enabled } = getSupabaseConfig();

  if (enabled && url && serviceKey) {
    const res = await fetch(`${url}/rest/v1/missions?id=eq.${encodeURIComponent(id)}&select=*&limit=1`, {
      headers: headers(serviceKey),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as MissionRow[];
    const row = rows?.[0];
    return row ? fromRow(row) : null;
  }

  return memory.get(id) ?? null;
}

export async function updateMissionStatus(id: string, status: MissionStatus) {
  const { url, serviceKey, enabled } = getSupabaseConfig();
  const now = new Date().toISOString();

  if (enabled && url && serviceKey) {
    const res = await fetch(`${url}/rest/v1/missions?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { ...headers(serviceKey), Prefer: 'return=representation' },
      body: JSON.stringify({ status, updated_at: now }),
    });
    if (!res.ok) throw new Error(`Supabase update failed: ${await res.text()}`);
    await writeMissionEvent(id, 'status_changed', `Status alterado para ${status}`, { status });
    const rows = (await res.json()) as MissionRow[];
    return rows?.[0] ? fromRow(rows[0]) : null;
  }

  const mission = memory.get(id);
  if (!mission) return null;
  const updated = { ...mission, status, updatedAt: now };
  memory.set(id, updated);
  return updated;
}

export function getRuntimeMode() {
  const { enabled } = getSupabaseConfig();
  return {
    database: enabled ? 'supabase' : 'demo-memory',
    supabaseConnected: enabled,
    aiConnected: Boolean(process.env.OPENAI_API_KEY),
    paymentConnected: Boolean(process.env.STRIPE_SECRET_KEY || process.env.MERCADO_PAGO_ACCESS_TOKEN),
  };
}
