import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MissionTimeline } from '@/components/MissionTimeline';

export default async function MissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="shell">
      <Nav />
      <section className="container section" style={{ borderTop: 0 }}>
        <div className="grid two">
          <div className="glass card" style={{ borderRadius: 38 }}>
            <div className="kicker">Mission #{id.slice(0, 8)}</div>
            <h1 className="display" style={{ fontSize: 'clamp(58px, 8vw, 108px)', lineHeight: .9, margin: '16px 0' }}>Já estamos cuidando disso.</h1>
            <p className="lead">Tracking demo. Com Supabase conectado, esta tela passa a ler status real da Mission.</p>
            <MissionTimeline active={3} />
            <div style={{ marginTop: 24 }}><Link className="btn" href="/make">Criar outra Mission</Link></div>
          </div>
          <div className="mapfake"><span className="map-pin" style={{ left: '30%', top: '52%' }} /><span className="map-pin" style={{ left: '68%', top: '38%' }} /></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
