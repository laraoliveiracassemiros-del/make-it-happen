import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

const courses = [
  ['Atendimento premium', 'Eleve a experiência em cada contato.', '65%'],
  ['Segurança operacional', 'Proteja pessoas, itens e reputação.', '30%'],
  ['Missões de alto valor', 'Cadeia de custódia e protocolos premium.', '0%'],
  ['Vendas consultivas', 'Transforme conversas em resultados.', '75%'],
];

export default function AcademyPage() {
  return (
    <main className="shell">
      <Nav />
      <section className="container hero">
        <div>
          <div className="kicker">MIH Academy</div>
          <h1 className="display">Conhecimento que vira renda.</h1>
          <p>Treinamentos, certificações e trilhas para Operators crescerem de forma séria dentro da Make It Happen.</p>
        </div>
        <div className="glass card" style={{ borderRadius: 40 }}>
          <div className="kicker">Operador Nível 3</div>
          <h2 className="display" style={{ fontSize: 56, margin: '16px 0' }}>Continue evoluindo.</h2>
          <div style={{ height: 12, borderRadius: 999, background: 'rgba(255,255,255,.1)' }}><div style={{ width: '78%', height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--gold), var(--gold-2))' }} /></div>
          <p className="muted">2.350 / 3.000 XP para o próximo nível.</p>
          <div className="grid two" style={{ marginTop: 26 }}>{courses.map(([title, text, progress]) => <div className="glass card" style={{ borderRadius: 22 }} key={title}><span className="badge gold">{progress}</span><h3>{title}</h3><p className="muted" style={{ lineHeight: 1.6 }}>{text}</p></div>)}</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
