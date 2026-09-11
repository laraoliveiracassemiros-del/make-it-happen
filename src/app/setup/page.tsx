import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { getRuntimeMode } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default function SetupPage() {
  const runtime = getRuntimeMode();
  const items = [
    {
      title: 'Banco de dados',
      status: runtime.supabaseConnected ? 'Conectado' : 'Aguardando Supabase',
      ok: runtime.supabaseConnected,
      detail: runtime.supabaseConnected ? 'Missions persistem entre sessões e deploys.' : 'Crie o projeto no Supabase e adicione SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY na Vercel.',
    },
    {
      title: 'IA real',
      status: runtime.aiConnected ? 'Conectada' : 'Modo parser local',
      ok: runtime.aiConnected,
      detail: runtime.aiConnected ? 'Intent Engine pode usar modelo externo.' : 'Hoje a interpretação usa regras locais. Depois entra OPENAI_API_KEY.',
    },
    {
      title: 'Pagamento',
      status: runtime.paymentConnected ? 'Conectado' : 'Modo seguro sem cobrança real',
      ok: runtime.paymentConnected,
      detail: runtime.paymentConnected ? 'Checkout real pode ser ativado.' : 'Não cobrar clientes até estrutura legal, responsável e conta de pagamento estarem claras.',
    },
  ];

  return (
    <main className="shell">
      <Nav />
      <section className="container section" style={{ borderTop: 0 }}>
        <div className="kicker">Setup operacional</div>
        <h1 className="display" style={{ fontSize: 'clamp(58px, 8vw, 108px)', lineHeight: .9, margin: '16px 0' }}>Pronto para rodar?</h1>
        <p className="lead">Esta página mostra o que já está conectado sem expor nenhuma chave secreta. O objetivo é sair do modo demo e chegar em Mission real: criada, salva, acompanhada e paga.</p>
        <div className="grid three" style={{ marginTop: 32 }}>
          {items.map((item) => (
            <div className="glass card" key={item.title}>
              <span className={`badge ${item.ok ? 'green' : 'gold'}`}>{item.status}</span>
              <h2 className="display" style={{ fontSize: 42, margin: '18px 0 8px' }}>{item.title}</h2>
              <p className="muted" style={{ lineHeight: 1.7 }}>{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="glass card" style={{ marginTop: 28 }}>
          <div className="kicker">Próximo passo</div>
          <h2 className="display" style={{ fontSize: 48, margin: '14px 0' }}>Conectar Supabase.</h2>
          <p className="muted">Depois disso, o Control Center começa a listar Missions reais. Aí conseguimos operar a primeira venda com histórico, status e painel interno.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
