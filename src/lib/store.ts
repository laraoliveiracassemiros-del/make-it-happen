import type { Mission } from './types';

const memory = new Map<string, Mission>();

export async function saveMission(mission: Mission) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    const res = await fetch(`${supabaseUrl}/rest/v1/missions`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
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
      }),
    });
    if (!res.ok) throw new Error(`Supabase save failed: ${await res.text()}`);
    const data = await res.json();
    return data?.[0] ?? mission;
  }

  memory.set(mission.id, mission);
  return mission;
}

export async function listMissions(): Promise<Mission[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const res = await fetch(`${supabaseUrl}/rest/v1/missions?select=*&order=created_at.desc&limit=50`, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const rows = await res.json();
    return rows.map((row: Record<string, any>) => ({
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
    }));
  }
  return Array.from(memory.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getMission(id: string): Promise<Mission | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const res = await fetch(`${supabaseUrl}/rest/v1/missions?id=eq.${id}&select=*&limit=1`, {
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const rows = await res.json();
    const row = rows?.[0];
    if (!row) return null;
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
  return memory.get(id) ?? null;
}
