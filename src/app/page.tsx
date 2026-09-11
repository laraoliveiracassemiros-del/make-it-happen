import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { FeatureCard } from '@/components/FeatureCard';
import { Metric } from '@/components/Metric';
import { MissionTimeline } from '@/components/MissionTimeline';

export default function HomePage() {
  return (
    <main className="shell">
      <Nav />
      <section className="container hero">
        <div>
          <div className="kicker">Outcome Execution Platform</div>
          <h1 className="display">Você pede. O mundo responde.</h1>
          <p>Make It Happen transforma intenções em missões executadas: buscar, comprar, verificar, entregar, resolver e concluir com tracking, Operators e inteligência operacional.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <Link className="btn" href="/make">Criar uma Mission →</Link>
            <Link className="btn-dark" href="/operator">Ver Operator Network</Link>
          </div>
          <div className="stats">
            <Metric value="01" label="intenção" />
            <Metric value="04" label="camadas de execução" />
            <Metric value="0" label="incidentes aceitáveis" />
            <Metric value="Done" label="estado final" />
          </div>
        </div>
        <div className="hero-panel glass">
          <div className="phone">
            <div className="phone-screen">
              <div className="phone-top"><span>MIH</span><span>17:42</span></div>
              <div className="kicker">Mission Live</div>
              <h2 className="display" style={{ fontSize: 48, lineHeight: .95 }}>Já estamos cuidando disso.</h2>
              <p className="muted">Vestido retirado, ajuste confirmado, Operator em rota para entrega.</p>
              <MissionTimeline active={3} />
              <div style={{ marginTop: 22 }} className="mapfake">
                <span className="map-pin" style={{ left: '32%', top: '48%' }} />
                <span className="map-pin" style={{ left: '67%', top: '31%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="kicker">Produto</div>
        <h2 className="display">Não é delivery. É execução.</h2>
        <p className="lead">A pessoa não escolhe uma categoria. Ela declara o resultado. O sistema interpreta, precifica, encontra a melhor rede de execução e acompanha até Done.</p>
        <div className="grid four" style={{ marginTop: 28 }}>
          <FeatureCard icon="✦" title="Intent Engine" text="Transforma linguagem natural em missão estruturada." />
          <FeatureCard icon="◇" title="Mission Engine" text="Quebra o resultado em etapas executáveis." />
          <FeatureCard icon="◉" title="Operator Network" text="Pessoas verificadas, treinadas e graduadas por confiança." />
          <FeatureCard icon="✓" title="Done Layer" text="Tracking, evidência, suporte e recuperação de falhas." />
        </div>
      </section>
      <section className="container section">
        <div className="grid two">
          <div>
            <div className="kicker">Cultura</div>
            <h2 className="display">Quem faz acontecer também prospera.</h2>
            <p className="lead">Operators não são tratados como entregadores descartáveis. Eles têm níveis, academy, uniformes, protocolos, score, benefícios futuros e caminho real de crescimento.</p>
          </div>
          <div className="glass card">
            <span className="badge gold">Operator Elite</span>
            <h3 className="display" style={{ fontSize: 52, margin: '16px 0' }}>Rafael M.</h3>
            <div className="grid two">
              <div><div className="soft">Execution Score</div><strong>984/1000</strong></div>
              <div><div className="soft">Missions</div><strong>1.247</strong></div>
              <div><div className="soft">Rating</div><strong>4,98★</strong></div>
              <div><div className="soft">Modal</div><strong>Car</strong></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
