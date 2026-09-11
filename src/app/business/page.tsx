import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { FeatureCard } from '@/components/FeatureCard';

export default function BusinessPage() {
  return (
    <main className="shell">
      <Nav />
      <section className="container hero">
        <div>
          <div className="kicker">MIH Business</div>
          <h1 className="display">Execução local para empresas.</h1>
          <p>Inspeções, coletas, entregas especiais, verificação de pontos físicos e missões multi-etapas acionadas por software.</p>
        </div>
        <div className="glass card" style={{ borderRadius: 40 }}>
          <div className="kicker">API Futuro</div>
          <h2 className="display" style={{ fontSize: 52 }}>POST /mission</h2>
          <pre className="muted" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{`need: verificar 10 lojas\ndeadline: hoje 18h\nevidence: fotos + relatório\nstatus: accepted`}</pre>
        </div>
      </section>
      <section className="container section"><div className="grid three"><FeatureCard icon="◉" title="Inspeções" text="Fotos, confirmação e relatório em campo." /><FeatureCard icon="✓" title="Execução" text="Coletas, entregas e operações locais." /><FeatureCard icon="↗" title="Escala" text="Missions repetíveis por cidade e por cluster." /></div></section>
      <Footer />
    </main>
  );
}
