import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MissionTimeline } from '@/components/MissionTimeline';

export default async function MissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="shell">
      <Nav />
      <section className="container section mission-section" style={{ borderTop: 0 }}>
        <div className="grid two mission-grid">
          <div className="glass card" style={{ borderRadius: 38 }}>
            <div className="kicker">Mission #{id.slice(0, 8)}</div>
            <h1 className="display mission-card-title">Já estamos cuidando disso.</h1>
            <p className="lead">Acompanhe cada etapa até o estado final: Done.</p>
            <MissionTimeline active={3} />
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
