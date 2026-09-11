import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { listMissions, getRuntimeMode } from '@/lib/store';

export const dynamic = 'force-dynamic';

function statusLabel(status: string) {
  return {
    draft: 'Rascunho',
    triage: 'Triagem',
    quoted: 'Proposta',
    paid: 'Pago',
    matching: 'Matching',
    assigned: 'Atribuída',
    in_progress: 'Em execução',
    done: 'Done',
    cancelled: 'Cancelada',
    rejected: 'Recusada',
  }[status] ?? status;
}

function riskLabel(risk: string) {
  return {
    low: 'Baixo',
    medium: 'Moderado',
    high: 'Alto controle',
    restricted: 'Restrito',
  }[risk] ?? risk;
}

export default async function ControlCenterPage() {
  const missions = await listMissions();
  const runtime = getRuntimeMode();
  const openMissions = missions.filter((mission) => !['done', 'cancelled', 'rejected'].includes(mission.status));
  const gmv = missions.reduce((sum, mission) => sum + mission.quote.estimatedTotal, 0);
  const highControl = missions.filter((mission) => mission.intent.risk === 'high' || mission.intent.risk === 'restricted').length;

  return (
    <main className="shell">
      <Nav />
      <section className="container section" style={{ borderTop: 0 }}>
        <div className="kicker">Control Center</div>
        <h1 className="display" style={{ fontSize: 'clamp(58px, 8vw, 108px)', lineHeight: .9, margin: '16px 0' }}>Tudo em movimento.</h1>
        <p className="lead">Painel interno para triagem, matching, Operators, volume estimado e missões que exigem mais atenção.</p>

        <div className="grid four" style={{ marginTop: 28 }}>
          <Metric title="Missions" value={String(missions.length)} detail={runtime.database === 'supabase' ? 'banco real' : 'modo temporário'} />
          <Metric title="Em aberto" value={String(openMissions.length)} detail="aguardando execução" />
          <Metric title="Alto controle" value={String(highControl)} detail="exigem atenção" />
          <Metric title="GMV" value={`R$ ${gmv}`} detail="volume estimado" />
        </div>

        <div className="dashboard" style={{ marginTop: 34 }}>
          <aside className="glass sidebar"><div className="sideitem active">Missions</div><div className="sideitem">Operators</div><div className="sideitem">Controle</div><div className="sideitem">Pagamentos</div><div className="sideitem">Suporte</div><Link className="btn" href="/setup" style={{ marginTop: 18, width: '100%' }}>Setup →</Link></aside>
          <div className="glass card">
            {missions.length === 0 ? (
              <div className="empty-state">
                <span className="badge gold">Sem Missions reais ainda</span>
                <h2 className="display" style={{ fontSize: 48, margin: '18px 0 8px' }}>Crie a Mission #001.</h2>
                <p className="muted">Quando alguém pedir pelo fluxo de criação, a Mission aparece aqui. Com Supabase conectado, ela não desaparece entre deploys.</p>
                <Link className="btn" href="/make" style={{ marginTop: 20 }}>Criar primeira Mission</Link>
              </div>
            ) : (
              <table className="table"><thead><tr><th>ID</th><th>Mission</th><th>Status</th><th>Valor</th><th>Controle</th></tr></thead><tbody>{missions.map((mission) => <tr key={mission.id}><td><Link href={`/missions/${mission.id}`}>#{mission.id.slice(0, 8)}</Link></td><td>{mission.intent.objective}</td><td><span className="badge gold">{statusLabel(mission.status)}</span></td><td>R$ {mission.quote.estimatedTotal}</td><td>{riskLabel(mission.intent.risk)}</td></tr>)}</tbody></table>
            )}
          </div>
          <div className="glass card"><div className="kicker">Live Map</div><div className="mapfake" style={{ marginTop: 18 }}><span className="map-pin" style={{ left: '28%', top: '40%' }} /><span className="map-pin" style={{ left: '59%', top: '61%' }} /><span className="map-pin" style={{ left: '44%', top: '28%' }} /></div></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Metric({ title, value, detail }: { title: string; value: string; detail: string }) {
  return <div className="glass card"><div className="soft">{title}</div><strong style={{ fontSize: 32, display: 'block', marginTop: 8 }}>{value}</strong><span className="muted">{detail}</span></div>;
}
