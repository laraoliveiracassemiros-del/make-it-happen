import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const rows = [
  ['MIH-001', 'Presente até 18h', 'matching', 'R$ 138', 'low'],
  ['MIH-002', 'Vestido + costureira', 'in_progress', 'R$ 92', 'medium'],
  ['MIH-003', 'Verificar produto', 'triage', 'R$ 47', 'low'],
  ['MIH-004', 'Evento pequeno', 'review', 'R$ 420', 'high'],
];

export default function ControlCenterPage() {
  return (
    <main className="shell">
      <Nav />
      <section className="container section" style={{ borderTop: 0 }}>
        <div className="kicker">Control Center</div>
        <h1 className="display" style={{ fontSize: 'clamp(58px, 8vw, 108px)', lineHeight: .9, margin: '16px 0' }}>A cidade em execução.</h1>
        <p className="lead">Painel interno para triagem, risco, matching, Operators, GMV, atrasos e incidentes.</p>
        <div className="dashboard" style={{ marginTop: 34 }}>
          <aside className="glass sidebar"><div className="sideitem active">Missions</div><div className="sideitem">Operators</div><div className="sideitem">Risk</div><div className="sideitem">Payments</div><div className="sideitem">Incidents</div></aside>
          <div className="glass card"><table className="table"><thead><tr><th>ID</th><th>Mission</th><th>Status</th><th>GMV</th><th>Risk</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td><span className="badge gold">{r[2]}</span></td><td>{r[3]}</td><td>{r[4]}</td></tr>)}</tbody></table></div>
          <div className="glass card"><div className="kicker">Live Map</div><div className="mapfake" style={{ marginTop: 18 }}><span className="map-pin" style={{ left: '28%', top: '40%' }} /><span className="map-pin" style={{ left: '59%', top: '61%' }} /></div></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
