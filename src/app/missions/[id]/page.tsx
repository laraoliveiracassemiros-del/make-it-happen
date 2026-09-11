import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MissionTimeline } from '@/components/MissionTimeline';
import { getMission } from '@/lib/store';

export const dynamic = 'force-dynamic';

function missionStatusLabel(status?: string) {
  return {
    draft: 'Rascunho',
    triage: 'Em triagem',
    quoted: 'Proposta criada',
    paid: 'Pagamento confirmado',
    matching: 'Encontrando Operator',
    assigned: 'Operator selecionado',
    in_progress: 'Em execução',
    done: 'Done',
    cancelled: 'Cancelada',
    rejected: 'Não executável',
  }[status ?? ''] ?? 'Em execução';
}

function activeForStatus(status?: string) {
  if (status === 'done') return 5;
  if (status === 'assigned' || status === 'in_progress') return 3;
  if (status === 'matching' || status === 'paid') return 2;
  return 1;
}

function riskLabel(risk?: string) {
  return {
    low: 'Baixo',
    medium: 'Moderado',
    high: 'Alto controle',
    restricted: 'Restrito',
  }[risk ?? ''] ?? 'A avaliar';
}

export default async function MissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mission = await getMission(id);
  const active = activeForStatus(mission?.status);

  return (
    <main className="shell">
      <Nav />
      <section className="container section mission-section" style={{ borderTop: 0 }}>
        <div className="grid two mission-grid">
          <div className="glass card" style={{ borderRadius: 38 }}>
            <div className="kicker">Mission #{id.slice(0, 8)}</div>
            <span className="badge gold" style={{ marginTop: 12 }}>{missionStatusLabel(mission?.status)}</span>
            <h1 className="display mission-card-title">Já estamos cuidando disso.</h1>
            <p className="lead">
              {mission ? mission.request : 'Mission registrada visualmente. Conecte o banco para manter histórico permanente e status em tempo real.'}
            </p>
            <MissionTimeline active={active} />
            {mission && (
              <div className="grid two compact-info" style={{ marginTop: 24 }}>
                <Info label="Total estimado" value={`R$ ${mission.quote.estimatedTotal}`} />
                <Info label="ETA" value={`${mission.quote.etaMinutes} min`} />
                <Info label="Prazo" value={mission.intent.deadline} />
                <Info label="Risco" value={riskLabel(mission.intent.risk)} />
              </div>
            )}
            <div className="action-footer">
              <Link className="btn" href="/make">Criar outra Mission</Link>
              <Link className="btn-dark" href="/control-center">Abrir Control Center</Link>
            </div>
          </div>
          <div className="mapfake live-map">
            <span className="map-pin" style={{ left: '30%', top: '52%' }} />
            <span className="map-pin" style={{ left: '68%', top: '38%' }} />
            <span className="map-pin" style={{ left: '50%', top: '65%' }} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="info-tile"><div className="soft">{label}</div><strong>{value}</strong></div>;
}
