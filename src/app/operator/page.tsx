import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const levels = [
  ['Core', 'Missões simples e seguras', 'Kit essencial + onboarding'],
  ['Pro', 'Multi-stop e urgência', 'Prioridade + ganhos maiores'],
  ['Elite', 'Alto cuidado e premium', 'Uniforme premium + missões melhores'],
  ['Signature', 'Execução complexa', 'Clientes e empresas especiais'],
];

export default function OperatorPage() {
  return (
    <main className="shell">
      <Nav />
      <section className="container hero">
        <div>
          <div className="kicker">Operator Network</div>
          <h1 className="display">Não é entrega. É carreira de execução.</h1>
          <p>Operators são treinados, graduados e remunerados por confiança, responsabilidade, tempo e complexidade — não apenas por quilômetro.</p>
          <div className="stats"><div className="stat"><strong>4</strong><span>níveis</span></div><div className="stat"><strong>984</strong><span>Execution Score elite</span></div><div className="stat"><strong>+18%</strong><span>crescimento mensal demo</span></div><div className="stat"><strong>MIH</strong><span>Academy</span></div></div>
        </div>
        <div className="glass card" style={{ borderRadius: 40 }}>
          <span className="badge gold">Operator Elite</span>
          <h2 className="display" style={{ fontSize: 58, margin: '18px 0 4px' }}>Rafael M.</h2>
          <p className="muted">Car · high-value · multi-stop · gift missions.</p>
          <div className="grid two" style={{ marginTop: 26 }}>
            <Info label="Score" value="984/1000" />
            <Info label="Rating" value="4,98★" />
            <Info label="Missions" value="1.247" />
            <Info label="Nível" value="Elite" />
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="kicker">Progressão</div>
        <h2 className="display">Todo mundo entra com dignidade. Os melhores desbloqueiam mais.</h2>
        <div className="grid four" style={{ marginTop: 28 }}>{levels.map(([level, title, text]) => <div className="glass card" key={level}><span className="badge gold">{level}</span><h3>{title}</h3><p className="muted">{text}</p></div>)}</div>
      </section>
      <Footer />
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><div className="soft" style={{ fontSize: 12 }}>{label}</div><strong style={{ fontSize: 22 }}>{value}</strong></div>;
}
