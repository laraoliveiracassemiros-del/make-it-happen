'use client';

import { FormEvent, useMemo, useState } from 'react';

type Tab = 'home' | 'explore' | 'sen' | 'circles' | 'wallet';
type View =
  | null
  | 'partner'
  | 'booking'
  | 'confirmed'
  | 'recovery'
  | 'privilege'
  | 'squad'
  | 'upgrade'
  | 'membership'
  | 'memory'
  | 'packs';

type Message = { role: 'user' | 'sen'; text: string };

const partners = [
  {
    id: 'ativa',
    name: 'Ativa Reformer',
    area: 'Sudoeste',
    category: 'Reformer Pilates',
    distance: '11 min',
    state: 'Incluído',
    times: ['18:30', '19:30', '20:30'],
  },
  {
    id: 'aera',
    name: 'Aera Studio',
    area: 'Asa Sul',
    category: 'Pilates',
    distance: '13 min',
    state: 'Preço de membro',
    price: 'R$ 24',
    times: ['19:00', '20:00'],
  },
];

function Badge({ children, tone = 'sand' }: { children: React.ReactNode; tone?: 'sand' | 'olive' | 'dark' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function BottomNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: 'home', label: 'Início', icon: '⌂' },
    { id: 'explore', label: 'Explorar', icon: '⌕' },
    { id: 'sen', label: 'Sēn', icon: '✦' },
    { id: 'circles', label: 'Círculos', icon: '◌' },
    { id: 'wallet', label: 'Carteira', icon: '◇' },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? 'nav-item active' : 'nav-item'}
          onClick={() => onChange(item.id)}
        >
          <span>{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}

function AppHeader({ label }: { label?: string }) {
  return (
    <header className="app-header">
      <div className="brand-word">Sēn</div>
      <div className="header-label">{label ?? 'Brasília'}</div>
    </header>
  );
}

function Início({ setTab, open, hasMembership }: { setTab: (tab: Tab) => void; open: (view: View) => void; hasMembership: boolean }) {
  return (
    <div className="screen-scroll">
      <AppHeader />
      <div className="account-state">
        <span>{hasMembership ? 'PLUS ATIVO' : 'CONTA SĒN'}</span>
        <b>{hasMembership ? 'Seus benefícios estão ativos' : 'Sem mensalidade · pague quando usar'}</b>
      </div>
      <section className="hero-copy">
        <p>Boa tarde.</p>
        <h1>Seu dia, com menos atrito.</h1>
      </section>

      <button className="ask-sen" onClick={() => setTab('sen')}>
        <span>Fale com a Sēn…</span>
        <b>↗</b>
      </button>

      <SectionLabel>Hoje</SectionLabel>
      <button className="surface booking-card" onClick={() => open(hasMembership ? 'confirmed' : 'partner')}>
        <div className="time-pill">18:30</div>
        <div>
          <strong>Reformer · Ativa</strong>
          <span>{hasMembership ? 'Sudoeste · Incluído' : 'Sudoeste · R$ 78 no Sēn'}</span>
          <em>{hasMembership ? 'Saia por volta de 18:08' : 'Core incluiria esta experiência'}</em>
        </div>
      </button>

      {!hasMembership && (
        <div className="free-state-strip">
          <div><span>CONTA SĒN</span><strong>Pague só quando reservar.</strong></div>
          <button onClick={() => setTab('wallet')}>Carteira & packs →</button>
        </div>
      )}

      <SectionLabel>Para você agora</SectionLabel>
      <button className="editorial-card" onClick={() => setTab('explore')}>
        <div>
          <Badge tone="dark">{hasMembership ? "Incluído" : "Acesso avulso"}</Badge>
          <h2>Uma noite mais leve.</h2>
          <p>Yoga · 20:00 · 9 min away</p>
        </div>
        <span className="arrow">↗</span>
      </button>

      <div className="value-row">
        <div>
          <SectionLabel>{hasMembership ? 'Seu valor' : 'Seu mês'}</SectionLabel>
          <strong className="value-number">{hasMembership ? 'R$ 612' : 'R$ 286'}</strong>
          <span>{hasMembership ? 'em valor usado neste mês' : 'em experiências neste mês'}</span>
        </div>
        <button className="text-link" onClick={() => hasMembership ? setTab('wallet') : open('membership')}>
          {hasMembership ? 'Ver carteira →' : 'Comparar com Core →'}
        </button>
      </div>

      {!hasMembership && (
        <button className="free-economics-card" onClick={() => setTab('wallet')}>
          <div>
            <span>4 EXPERIÊNCIAS NESTE MÊS</span>
            <strong>R$ 286 usados · R$ 32 de saldo</strong>
            <em>Com mais 1–2 experiências parecidas, Core começa a fazer mais sentido.</em>
          </div>
          <b>→</b>
        </button>
      )}

      <SectionLabel>Acontecendo</SectionLabel>
      <button className="surface compact-card" onClick={() => open('squad')}>
        <div>
          <Badge tone="olive">Squad</Badge>
          <strong>Padel iniciante</strong>
          <span>Amanhã · 10:30 · 2 vagas</span>
        </div>
        <span className="arrow dark">→</span>
      </button>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}

function Explorar({ open, hasMembership }: { open: (view: View) => void; hasMembership: boolean }) {
  const [query, setQuery] = useState('reformer amanhã depois das 18h');
  const filtered = useMemo(() => partners.filter((p) => p.name.toLowerCase().includes(query.toLowerCase().split(' ')[0]) || query.includes('reformer')), [query]);

  return (
    <div className="screen-scroll">
      <AppHeader label="Explorar" />
      <div className="searchbox">
        <span>⌕</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="chip-row">
        {['Reformer', 'Yoga', 'HIIT', 'Boxing'].map((chip, index) => (
          <button key={chip} className={index === 0 ? 'chip selected' : 'chip'}>{chip}</button>
        ))}
      </div>

      {!hasMembership && (
        <div className="price-legend">
          <span><i className="dot free" /> Preço Sēn</span>
          <span><i className="dot member" /> Preço de membro</span>
          <span><i className="dot included" /> Incluído with plan</span>
        </div>
      )}

      <SectionLabel>Melhores opções</SectionLabel>

      {filtered.map((partner, index) => (
        <button key={partner.id} className="partner-card" onClick={() => open('partner')}>
          <div className={index === 0 ? 'partner-art art-one' : 'partner-art art-two'}>
            <span>{index === 0 ? 'R' : 'A'}</span>
          </div>
          <div className="partner-copy">
            <Badge>{hasMembership ? partner.state : 'Preço Sēn'}</Badge>
            <strong>{partner.name}</strong>
            <span>{partner.area} · {partner.distance}</span>
            <em>{partner.times.join('   ')} · {hasMembership ? (partner.price || 'Incluído') : (index === 0 ? 'R$ 78' : 'R$ 64')}</em>
            {!hasMembership && <small className="retail-compare">{index === 0 ? 'Local R$ 90' : 'Local R$ 75'}</small>}
          </div>
        </button>
      ))}

      <div className="collection-card">
        <small>SĒN EDIT</small>
        <h3>Fim de tarde sem pressa.</h3>
        <p>Uma seleção tranquila para depois das 19h.</p>
      </div>
    </div>
  );
}

function SenAI({ open, hasMembership }: { open: (view: View) => void; hasMembership: boolean }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'sen', text: 'What are you in the mood for?' },
  ]);

  function send(e?: FormEvent) {
    e?.preventDefault();
    const value = input.trim();
    if (!value) return;

    const v = value.toLowerCase();
    let reply = 'Entendi. Me fala só o que pesa mais agora: horário, distância, preço ou tipo de atividade?';

    if (v.includes('cans') || v.includes('leve')) {
      reply = hasMembership ? 'Eu iria de algo leve hoje. Tem yoga às 20h a 9 min e reformer às 19:30 a 11 min. As duas entram no seu acesso elegível hoje. Pelo seu histórico, reformer costuma combinar mais com você — mas yoga é mais tranquila. Quer que eu compare?' : 'Eu iria de algo leve hoje. Tem yoga às 20h a 9 min por R$42 no Sēn Free e reformer às 19:30 a 11 min por R$78. Pelo seu histórico, reformer costuma combinar mais com você — mas yoga é mais tranquila. Quer que eu compare?';
    } else if (v.includes('barat') || v.includes('gastar') || v.includes('preço') || v.includes('dinheiro')) {
      reply = hasMembership ? 'Então eu priorizaria o que já está incluído no seu acesso hoje. Yoga e reformer estão elegíveis sem custo adicional nessa simulação. Quer a opção mais perto?' : 'Então eu cortaria as opções mais caras. Yoga está R$42 no Sēn Free, e você tem R$32 na Carteira. Seu custo final ficaria R$10. Quer que eu abra essa?';
    } else if (v.includes('boxe') && (v.includes('enjo') || v.includes('odeio') || v.includes('não gosto'))) {
      reply = 'Faz sentido. Posso reduzir boxe nas suas recomendações e aumentar Pilates/Reformer por enquanto. Isso não é permanente — você pode mudar depois em O que a Sēn lembra.';
    } else if (v.includes('plano') || v.includes('core') || v.includes('membership')) {
      reply = hasMembership ? 'Você já está com membership ativo. Posso comparar o valor que você usou neste mês com o que teria gasto no Free e te dizer se o plano continua fazendo sentido.' : 'Pelo seu uso atual, eu ainda ficaria no Free por mais um pouco. Você gastou R$286 em experiências elegíveis este mês; se fizer mais 1–2 visitas parecidas, Core começa a ficar mais interessante. Quer ver a conta exata?';
    } else if (v.includes('perto') || v.includes('agora')) {
      reply = 'Você está por volta da Asa Sul. Tem boxe às 16:30 a 12 min e yoga às 17:00 a 9 min. Posso filtrar pelo que cabe no seu tempo e orçamento.';
    }

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: value },
      { role: 'sen', text: reply },
    ]);
    setInput('');
  }

  function quickFind() {
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: 'Quero fazer alguma coisa hoje depois das 19h, mas tô cansada.' },
      { role: 'sen', text: hasMembership ? 'Eu deixaria hoje mais leve. Yoga às 20h · 9 min de você · Incluído.' : 'Eu deixaria hoje mais leve. Yoga às 20h · 9 min de você · R$42 no Sēn Free.' },
    ]);
  }

  return (
    <div className="sen-screen">
      <div className="screen-scroll sen-scroll">
        <AppHeader label="Sēn" />
        <div className="sen-intro">
          <h1>Pode falar do seu jeito.</h1>
          <p>Horário, preço, distância, vontade e mudança de ideia — eu acompanho.</p>
        </div>

        <div className="chip-row">
          <button className="chip" onClick={() => setMessages((p) => [...p, { role: 'sen', text: 'Me manda sua semana do jeito que estiver na cabeça. Eu organizo antes de salvar qualquer coisa.' }])}>Organizar minha semana</button>
          <button className="chip" onClick={quickFind}>Encontrar algo agora</button>
          <button className="chip" onClick={() => open('memory')}>O que a Sēn lembra</button>
        </div>

        <button className="proactive-card" onClick={() => open('partner')}>
          <span>PERTO DE VOCÊ · OPCIONAL</span>
          <strong>Boxe às 16:30</strong>
          <p>Você está por volta da Asa Sul. Começa em 50 min e combina com seu fim de tarde.</p>
          <em>Por que essa sugestão? →</em>
        </button>

        <div className="chat">
          {messages.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'message user-message' : 'message sen-message'}>
              {message.text}
              {message.role === 'sen' && index === messages.length - 1 && messages.length > 2 ? (
                <button className="inline-action" onClick={() => open('partner')}>Ver melhor opção →</button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <form className="composer" onSubmit={send}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Mensagem para Sēn…" />
        <button type="submit">↗</button>
      </form>
    </div>
  );
}

function Círculos({ open }: { open: (view: View) => void }) {
  return (
    <div className="screen-scroll">
      <AppHeader label="Círculos" />
      <section className="hero-copy">
        <p>Menos feed. Mais vida real.</p>
        <h1>Faça mais coisas com gente de verdade.</h1>
      </section>

      <SectionLabel>Seus círculos</SectionLabel>
      <div className="surface circle-card">
        <div className="circle-icon">R</div>
        <div>
          <strong>Corrida Brasília</strong>
          <span>Saturday · 8:00 · Parque da Cidade</span>
          <Badge tone="olive">12 indo</Badge>
        </div>
      </div>

      <SectionLabel>Acontecendo near you</SectionLabel>
      <button className="editorial-card padel" onClick={() => open('squad')}>
        <div>
          <Badge tone="dark">Squad</Badge>
          <h2>Padel iniciante</h2>
          <p>Amanhã · 10:30 · Lago Sul · 2 vagas</p>
        </div>
        <span className="arrow">↗</span>
      </button>

      <SectionLabel>Descobrir</SectionLabel>
      <div className="discover-grid">
        {['Reformer', 'Boxing', 'Yoga', 'Sessões de estudo'].map((item) => (
          <div className="discover-tile" key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function Carteira({ open, hasMembership, memberPlan }: { open: (view: View) => void; hasMembership: boolean; memberPlan: 'Core'|'Plus'|'Black'|null }) {
  return (
    <div className="screen-scroll">
      <AppHeader label="Carteira" />
      <div className="account-state wallet-state">
        <span>{hasMembership ? `${memberPlan?.toUpperCase()} ACTIVE` : 'CONTA SĒN'}</span>
        <b>{hasMembership ? 'Incluído access + privileges unlocked' : 'Pay-per-use + wallet credits + packs'}</b>
      </div>
      <section className="hero-copy">
        <p>{hasMembership ? 'Sua assinatura,' : 'Seu uso,'}</p>
        <h1>{hasMembership ? 'trabalhando por você.' : 'sem conta escondida.'}</h1>
      </section>

      <div className={hasMembership ? "wallet-hero" : "wallet-hero free-wallet"}>
        <small>{hasMembership ? 'Neste mês' : 'Pelo seu uso'}</small>
        <strong>{hasMembership ? 'R$ 612' : 'R$ 286'}</strong>
        <span>{hasMembership ? 'em valor usado' : 'em experiências'}</span>
        <div className="wallet-meta">
          <span>{hasMembership ? `${memberPlan} plan` : 'Sem assinatura'}</span>
          <span>{hasMembership ? (memberPlan === 'Core' ? 'R$ 399 / month' : memberPlan === 'Black' ? 'R$ 1.299 / month' : 'R$ 799 / month') : 'Use a Sēn sem mensalidade'}</span>
        </div>
      </div>

      {!hasMembership && (
        <>
          <div className="wallet-credit-card">
            <div><span>SĒN WALLET</span><strong>R$ 32</strong><em>de saldo disponível</em></div>
            <button>Usar na próxima reserva</button>
          </div>

          <button className="pack-card" onClick={() => open('packs')}>
            <span>FLEX PACK</span>
            <strong>Quer usar mais sem assinar?</strong>
            <em>Compre 3, 5 ou 10 experiências elegíveis →</em>
          </button>

          <div className="savings-meter">
            <div className="meter-head">
              <span>NESTE MÊS</span><b>R$ 286 usados</b>
            </div>
            <div className="meter-track"><i style={{width:'72%'}} /></div>
            <p>Por volta de 5 experiências elegíveis, Core costuma começar a valer mais.</p>
          </div>

          <button className="membership-nudge" onClick={() => open('membership')}>
            <span>PELO SEU USO</span>
            <strong>Você está chegando ao ponto em que Core começa a fazer sentido.</strong>
            <em>Ver comparação →</em>
          </button>

          <button className="earned-offer" onClick={() => open('membership')}>
            <span>OFERTA ATUAL</span>
            <strong>7% de desconto nos 3 primeiros meses de Core</strong>
            <em>Campanha ativa · regras visíveis antes da compra</em>
          </button>
        </>
      )}

      <SectionLabel>{hasMembership ? 'Seus privilégios' : 'Prévia de benefícios'}</SectionLabel>
      <button className="surface privilege-card" onClick={() => hasMembership ? open('privilege') : open('membership')}>
        <div>
          <Badge>{hasMembership ? '1 disponível' : 'Benefício Core'}</Badge>
          <strong>Massagem de recuperação</strong>
          <span>50 min · expira em 30 set</span>
        </div>
        <span className="arrow dark">→</span>
      </button>

      <SectionLabel>Recentes</SectionLabel>
      <div className="transaction-list">
        <div><span>Ativa Reformer</span><b>{hasMembership ? 'Incluído' : 'R$ 78'}</b></div>
        <div><span>Tennis · Preço Sēn</span><b>{hasMembership ? 'R$ 34' : 'R$ 49'}</b></div>
        <div><span>Carteira credit earned</span><b>+R$ 12</b></div>
      </div>

      <button className="upgrade-card" onClick={() => open(hasMembership ? 'upgrade' : 'membership')}>
        <span>{hasMembership ? 'PLUS → BLACK' : 'ASSINATURA, QUANDO FIZER SENTIDO'}</span>
        <strong>{hasMembership ? 'See what would actually change for you' : 'A Sēn continua útil sem assinatura.'}</strong>
        <em>{hasMembership ? 'Not just more features. More access.' : 'Assine quando o uso e o acesso justificarem.'}</em>
      </button>
    </div>
  );
}

function PartnerView({ close, open, hasMembership }: { close: () => void; open: (view: View) => void; hasMembership: boolean }) {
  const [time, setTime] = useState('18:30');
  return (
    <Overlay close={close}>
      <div className="partner-hero">
        <button className="back" onClick={close}>←</button>
        <Badge tone="dark">{hasMembership ? "Incluído" : "Acesso avulso"}</Badge>
        <div className="partner-monogram">R</div>
      </div>
      <div className="overlay-body">
        <h1>Ativa Reformer</h1>
        <p className="muted-line">Sudoeste · Reformer Pilates · 4.9</p>

        <SectionLabel>Por que a Sēn escolheu isso</SectionLabel>
        <p className="body-copy">{hasMembership ? "Encaixa no seu fim de tarde, fica a 11 min e está incluído no seu plano." : "Encaixa no seu fim de tarde e fica a 11 min. Você pode reservar agora por R$ 78; Core incluiria experiências elegíveis como esta."}</p>

        <SectionLabel>Amanhã</SectionLabel>
        <div className="time-row">
          {['18:30', '19:30', '20:30'].map((item) => (
            <button key={item} onClick={() => setTime(item)} className={time === item ? 'time-option active' : 'time-option'}>{item}</button>
          ))}
        </div>

        <SectionLabel>Antes de ir</SectionLabel>
        <div className="rules">
          <div><span>Cancelamento sem custo</span><b>until 06:30 tomorrow</b></div>
          <div><span>Chegue</span><b>10 minutes early</b></div>
          <div><span>Leve</span><b>grip socks</b></div>
        </div>

        <button className="primary" onClick={() => open('booking')}>Reservar {time}</button>
      </div>
    </Overlay>
  );
}

function BookingView({ close, open, hasMembership }: { close: () => void; open: (view: View) => void; hasMembership: boolean }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Confirmar</small>
        <h1>Quase pronto.</h1>

        <div className="surface summary-card">
          <Badge>{hasMembership ? 'Incluído' : 'Acesso avulso'}</Badge>
          <strong>Ativa Reformer</strong>
          <span>Amanhã · 18:30–19:20</span>
          <span>Sudoeste</span>
        </div>

        <div className="summary-lines">
          <div><span>Seu valor hoje</span><b>{hasMembership ? 'R$ 0' : 'R$ 78'}</b></div>
          <div><span>{hasMembership ? 'Impacto no plano' : 'Opção de assinatura'}</span><b>{hasMembership ? '1 studio visit' : 'Core · from R$ 399'}</b></div>
          <div><span>Cancelamento sem custo until</span><b>06:30 tomorrow</b></div>
        </div>
        <p className="fine-print">{hasMembership ? "Late cancel or no-show consumes this studio visit." : "Late cancellation follows the partner policy shown above."}</p>

        <button className="primary" onClick={() => open('confirmed')}>Confirmar reservation</button>
        <p className="center-note">Nada é reservado antes da sua confirmação.</p>
      </div>
    </Overlay>
  );
}

function ConfirmaredView({ close, open, hasMembership }: { close: () => void; open: (view: View) => void; hasMembership: boolean }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Reserva confirmada</small>
        <h1>Pronto.</h1>
        <p className="muted-line">Amanhã · 18:30 · Ativa Reformer</p>

        <div className="ticket">
          <strong>18:30</strong>
          <small>CHEGUE ÀS 18:20</small>
          <span>{hasMembership ? "Incluído · 1 studio visit" : "Paid · R$ 78"}</span>
          <button>Adicionar ao calendário</button>
        </div>

        <div className="two-actions">
          <button><b>Como chegar</b><span>11 min</span></button>
          <button><b>Convidar alguém</b><span>Compartilhar</span></button>
        </div>

        <button className="secondary" onClick={() => open('recovery')}>Simular cancelamento do parceiro</button>
        <button className="primary pale" onClick={close}>Back to Início</button>
      </div>
    </Overlay>
  );
}

function RecoveryView({ close, hasMembership }: { close: () => void; hasMembership: boolean }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <small className="eyebrow">A gente resolveu o essencial primeiro</small>
        <h1>O parceiro cancelou sua reserva.</h1>
        <div className="resolution-card">
          <div><span>{hasMembership ? 'Visita' : 'Pagamento'}</span><b>{hasMembership ? 'Restaurada' : 'Estornado'}</b></div>
          <div><span>Valor devolvido</span><b>{hasMembership ? 'R$ 0' : 'R$ 78'}</b></div>
          <div><span>Foi culpa sua?</span><b>No</b></div>
        </div>
        <SectionLabel>Alternativas próximas</SectionLabel>
        <button className="surface alt-card">
          <div><strong>Aera Studio · 19:00</strong><span>Asa Sul · Preço de membro R$ 24</span></div><span>→</span>
        </button>
        <button className="surface alt-card">
          <div><strong>Studio Alma · 20:00</strong><span>Asa Sul · Incluído</span></div><span>→</span>
        </button>
        <button className="primary" onClick={close}>Back to Início</button>
      </div>
    </Overlay>
  );
}

function PrivilegeView({ close }: { close: () => void }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <Badge>Disponível</Badge>
        <h1>Massagem de recuperação</h1>
        <p className="muted-line">50 minutes · um uso</p>
        <div className="surface detail-card">
          <div><span>Valor de referência</span><b>R$ 240</b></div>
          <div><span>Seu valor</span><b>R$ 0</b></div>
          <div><span>Expires</span><b>Sep 30</b></div>
        </div>
        <p className="body-copy">Curated monthly value, not a coupon. Availability is controlled so the partner can keep a premium experience.</p>
        <button className="primary">Ver horários disponíveis</button>
      </div>
    </Overlay>
  );
}

function SquadView({ close }: { close: () => void }) {
  const [joined, setJoined] = useState(false);
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <Badge>Iniciante</Badge>
        <h1>Padel tomorrow.</h1>
        <p className="muted-line">10:30 · Lago Sul</p>

        <div className="surface squad-detail">
          <strong>{joined ? '4 / 4 people' : '3 / 4 people'}</strong>
          <span>Iniciante-friendly · casual</span>
          <hr />
          <small>Reserva da quadra</small>
          <b>Ainda não incluída</b>
          <p>Entrar no Squad não reserva a quadra.</p>
        </div>

        <div className="avatar-row">
          <span>LM</span><span>JP</span><span>AS</span>{joined ? <span>YOU</span> : <i>+1</i>}
        </div>
        <button className={joined ? 'primary pale' : 'primary'} onClick={() => setJoined(!joined)}>{joined ? 'Você entrou · sair' : 'Entrar no Squad'}</button>
      </div>
    </Overlay>
  );
}

function UpgradeView({ close }: { close: () => void }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Plus → Black</small>
        <h1>Mais acesso especial. Não só mais uso.</h1>
        <div className="comparison">
          <div><span>Studios / semana</span><b>4 → 6</b></div>
          <div><span>Acesso Signature</span><b>1–2 → 3–4 / mo</b></div>
          <div><span>Privilégios</span><b>2 → 3 / mo</b></div>
          <div><span>Sēn concierge</span><b>Mais proativo</b></div>
        </div>
        <div className="black-welcome">
          <small>BOAS-VINDAS BLACK</small>
          <strong>A curated first-month moment, not a discount code.</strong>
        </div>
        <button className="primary">Continue · R$ 1.299 / month</button>
      </div>
    </Overlay>
  );
}





function PacksView({ close }: { close: () => void }) {
  const [selected, setSelected] = useState(5);
  const packs = [
    { qty: 3, price: 'R$ 219', expiry: '45 days', per: 'R$ 73 / visit' },
    { qty: 5, price: 'R$ 349', expiry: '45 days', per: 'R$ 69,80 / visit' },
    { qty: 10, price: 'R$ 649', expiry: '60 days', per: 'R$ 64,90 / visit' },
  ];
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced packs-view">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Flex Packs</small>
        <h1>More than avulso. Less than a membership.</h1>
        <p className="muted-line">Use eligible studio visits without a recurring subscription. Packs expire and do not include gym access or monthly Privilégios.</p>

        <div className="pack-stack">
          {packs.map((p)=>(
            <button key={p.qty} className={selected===p.qty?'pack-option selected':'pack-option'} onClick={()=>setSelected(p.qty)}>
              <div><strong>{p.qty} Studio Passes</strong><span>{p.expiry} validity · eligible inventory</span></div>
              <div><b>{p.price}</b><em>{p.per}</em></div>
            </button>
          ))}
        </div>

        <div className="pack-vs-core">
          <span>SMART COMPARISON</span>
          <strong>{selected >= 5 ? 'At this frequency, compare Core before buying.' : 'A pack still makes sense at lighter usage.'}</strong>
          <p>{selected >= 5 ? 'Core adds selected gym access, eligible studio visits and a monthly Privilege — recurring use is where membership should win.' : 'Use Free + Packs while your routine is occasional. Sēn will show you when that changes.'}</p>
        </div>

        <button className="primary">Buy {selected} passes no protótipo</button>
        <button className="quiet-button" onClick={close}>Not now</button>
      </div>
    </Overlay>
  );
}

function MemoryView({ close }: { close: () => void }) {
  const [boxing, setBoxing] = useState(true);
  const [pilates, setPilates] = useState(true);
  const [afternoon, setTarde] = useState(true);
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced memory-view">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">O que a Sēn lembra</small>
        <h1>Suas preferências podem mudar com você.</h1>
        <p className="muted-line">São sinais editáveis, não rótulos permanentes. A Sēn usa isso para melhorar sugestões.</p>

        <div className="memory-list">
          <button onClick={() => setBoxing(!boxing)} className={boxing ? 'memory-row active' : 'memory-row'}>
            <div><strong>Boxing</strong><span>Relevante agora</span></div><b>{boxing ? 'On' : 'Off'}</b>
          </button>
          <button onClick={() => setPilates(!pilates)} className={pilates ? 'memory-row active' : 'memory-row'}>
            <div><strong>Pilates / Reformer</strong><span>Preferência crescente</span></div><b>{pilates ? 'On' : 'Off'}</b>
          </button>
          <button onClick={() => setTarde(!afternoon)} className={afternoon ? 'memory-row active' : 'memory-row'}>
            <div><strong>Fim de tarde</strong><span>Costuma funcionar bem</span></div><b>{afternoon ? 'On' : 'Off'}</b>
          </button>
        </div>

        <div className="memory-note">
          <span>CONTROLE</span>
          <p>You can edit, remove or reset remembered preferences. Sensitive information should never become durable memory silently.</p>
        </div>
        <button className="primary pale" onClick={close}>Concluir</button>
      </div>
    </Overlay>
  );
}

function MembershipView({ close, activate }: { close: () => void; activate: (plan: 'Core'|'Plus'|'Black') => void }) {
  const [selected, setSelected] = useState<'Core'|'Plus'|'Black'>('Core');
  const plans = [
    { name: 'Core' as const, price: 'R$ 399', line: 'Para quem usa toda semana.', detail: 'Eligible studios ~2×/week · premium gyms · 1 Privilege' },
    { name: 'Plus' as const, price: 'R$ 799', line: 'Mais frequência e variedade.', detail: 'Studios ~4×/week · broader premium access · 2 Privilégios' },
    { name: 'Black' as const, price: 'R$ 1.299', line: 'Mais acesso especial e menos atrito.', detail: 'Studios ~6×/week · Acesso Signature · 3 Privilégios' },
  ];
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced membership-view">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Assinatura, quando fizer sentido</small>
        <h1>Você pode usar a Sēn sem assinatura.</h1>
        <p className="muted-line">A assinatura melhora acesso, preço e benefícios quando o seu uso justificar.</p>
        <div className="membership-proof">
          <span>PELO SEU USO ATUAL</span>
          <strong>Your current pattern: R$ 286 usados · ~4 eligible visits</strong>
          <em>At ~5+ eligible visits/month, Core typically becomes more attractive. Prototype estimate.</em>
        </div>
        <div className="membership-compare">
          <div className="compare-head"><span>FREE</span><span>CORE</span><span>PLUS</span><span>BLACK</span></div>
          <div><b>Studio access</b><span>Pay / pack</span><span>~8–9</span><span>~17–18</span><span>~25–26</span></div>
          <div><b>Premium gyms</b><span>—</span><span>Selected</span><span>More</span><span>+ Signature</span></div>
          <div><b>Privilégios</b><span>Preview</span><span>1 / mo</span><span>2 / mo</span><span>3 / mo</span></div>
          <div><b>Sēn AI</b><span>Full</span><span>Full</span><span>Full</span><span>+ concierge</span></div>
        </div>

        <div className="plan-stack compact-plans">
          {plans.map((item) => (
            <button key={item.name} className={selected===item.name?'plan-card selected':'plan-card'} onClick={()=>setSelected(item.name)}>
              <div><strong>{item.name}</strong><span>{item.line}<br />{item.detail}</span></div>
              <b>{item.price}</b>
            </button>
          ))}
        </div>
        <button className="primary" onClick={() => activate(selected)}>Simular {selected} no protótipo</button>
        <button className="quiet-button keep-free" onClick={close}>Continuar sem assinatura</button>
      </div>
    </Overlay>
  );
}

function Onboarding({ finish }: { finish: () => void }) {
  const questions = [
    { key: 'goal', q: 'O que você quer sentir mais na sua rotina?', options: ['Energia', 'Força', 'Calma', 'Foco'] },
    { key: 'routine', q: 'Quando costuma existir espaço de verdade?', options: ['Manhã cedo', 'Tarde', 'Noite', 'Muda muito'] },
    { key: 'movement', q: 'O que você realmente gosta de fazer?', options: ['Academia', 'Reformer', 'Yoga', 'Boxe / HIIT'] },
    { key: 'recovery', q: 'Recuperação faz parte da sua rotina?', options: ['Bastante', 'Às vezes', 'Quase nunca', 'Quero descobrir'] },
    { key: 'work', q: 'Você trabalha ou estuda fora de casa?', options: ['Quase todo dia', 'Às vezes', 'Quase nunca', 'Não'] },
    { key: 'social', q: 'Você faria mais coisas com as pessoas certas?', options: ['Sim', 'Talvez', 'Não muito', 'Depende'] },
    { key: 'distance', q: 'Quanto deslocamento ainda parece fácil?', options: ['Até 10 min', '15 min', '20 min', 'Qualidade importa mais'] },
    { key: 'spend', q: 'Quanto você já gasta por mês com isso?', options: ['Até R$ 300', 'R$ 300–600', 'R$ 600–1.000', 'R$1.000+'] },
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const done = step >= questions.length;
  const current = questions[Math.min(step, questions.length-1)];

  function choose(value: string) {
    setAnswers((prev)=>({...prev,[current.key]:value}));
    setTimeout(()=>setStep((s)=>s+1),120);
  }

  return (
    <div className="onboarding future-onboarding">
      <div className="onboarding-top">
        <div className="brand-word large">Sēn</div>
        <span>{done ? 'Pronto' : `${step + 1} / 8`}</span>
      </div>

      {!done ? (
        <div className="onboarding-stage quiz-stage" key={step}>
          <small className="eyebrow">Personalize sua Sēn</small>
          <h1>{current.q}</h1>
          <p>Sem plano e sem compromisso. Só contexto suficiente para deixar o app útil desde o começo.</p>
          <div className="quiz-options">
            {current.options.map((item)=>(
              <button key={item} className="quiz-option" onClick={()=>choose(item)}>
                <span>{item}</span><b>→</b>
              </button>
            ))}
          </div>
          {step>0 && <button className="quiet-button" onClick={()=>setStep((s)=>s-1)}>Back</button>}
        </div>
      ) : (
        <div className="onboarding-stage final personalization-reveal">
          <div className="welcome-orb">✦</div>
          <small className="eyebrow">Sua Sēn está pronta</small>
          <h1>A Sēn já consegue começar com você.</h1>
          <p>Ela aprende com o que você escolhe, ignora e muda. E você controla o que ela lembra.</p>
          <div className="first-win">
            <span>PARA VOCÊ</span>
            <strong>{answers.movement || 'Reformer'} · tomorrow after 18h</strong>
            <em>{answers.distance || '11 min away'} · acesso avulso</em>
          </div>
          <button className="primary" onClick={finish}>Entrar na Sēn</button>
        </div>
      )}
    </div>
  );
}
function Overlay({ children, close }: { children: React.ReactNode; close: () => void }) {
  return (
    <div className="overlay">
      <div className="overlay-panel">{children}</div>
      <button aria-label="Close" className="overlay-shade" onClick={close} />
    </div>
  );
}

export default function InícioPage() {
  const [tab, setTab] = useState<Tab>('home');
  const [view, setView] = useState<View>(null);
  const [onboarding, setOnboarding] = useState(true);
  const [memberPlan, setMemberPlan] = useState<'Core'|'Plus'|'Black'|null>(null);
  const hasMembership = memberPlan !== null;

  function changeTab(next: Tab) {
    setView(null);
    setTab(next);
  }

  function open(next: View) {
    setView(next);
  }

  return (
    <main className="prototype-shell">
      <aside className="prototype-notes">
        <div className="prototype-mark">Sēn</div>
        <p>Protótipo clicável</p>
        <h2>Access + AI + Community + Value.</h2>
        <ul>
          <li>Explorar → booking → recovery</li>
          <li>Natural Sēn AI conversation</li>
          <li>Carteira & Privilégios</li>
          <li>Círculos & Squads</li>
        </ul>
        <span>Brasília · V6 · 18+</span>
      </aside>

      <div className="device-wrap">
        <div className="device">
          <div className="statusbar"><span>13:10</span><span>● ● ◒</span></div>
          <div className="app">
            {onboarding && <Onboarding finish={() => setOnboarding(false)} />}
            {tab === 'home' && <Início setTab={changeTab} open={open} hasMembership={hasMembership} />}
            {tab === 'explore' && <Explorar open={open} hasMembership={hasMembership} />}
            {tab === 'sen' && <SenAI open={open} hasMembership={hasMembership} />}
            {tab === 'circles' && <Círculos open={open} />}
            {tab === 'wallet' && <Carteira open={open} hasMembership={hasMembership} memberPlan={memberPlan} />}
            <BottomNav active={tab} onChange={changeTab} />
          </div>
          <div className="home-indicator" />
        </div>
      </div>

      <aside className="prototype-side">
        <span>TEST</span>
        <strong>Teste estes fluxos</strong>
        <button onClick={() => { setTab('explore'); setView(null); }}>Reservar reformer</button>
        <button onClick={() => { setTab('sen'); setView(null); }}>Falar com a Sēn</button>
        <button onClick={() => { setTab('wallet'); setView(null); }}>Abrir benefício</button>
        <button onClick={() => { setTab('circles'); setView('squad'); }}>Entrar em Squad</button>
        <button onClick={() => { setView(null); setTab('home'); setOnboarding(true); setMemberPlan(null); }}>Refazer onboarding</button>
        <button onClick={() => setView('packs')}>Ver Flex Packs</button>
        <button onClick={() => setView('membership')}>Ver assinatura</button>
        <button onClick={() => { setMemberPlan('Plus'); setTab('home'); setView(null); setOnboarding(false); }}>Simular Plus</button>
        <button onClick={() => { setMemberPlan(null); setTab('home'); setView(null); setOnboarding(false); }}>Simular sem assinatura</button>
      </aside>

      {view === 'partner' && <PartnerView close={() => setView(null)} open={open} hasMembership={hasMembership} />}
      {view === 'booking' && <BookingView close={() => setView(null)} open={open} hasMembership={hasMembership} />}
      {view === 'confirmed' && <ConfirmaredView close={() => setView(null)} open={open} hasMembership={hasMembership} />}
      {view === 'recovery' && <RecoveryView close={() => setView(null)} hasMembership={hasMembership} />}
      {view === 'privilege' && <PrivilegeView close={() => setView(null)} />}
      {view === 'squad' && <SquadView close={() => setView(null)} />}
      {view === 'upgrade' && <UpgradeView close={() => setView(null)} />}
      {view === 'membership' && <MembershipView close={() => setView(null)} activate={(plan) => { setMemberPlan(plan); setView(null); setTab('wallet'); }} />}
      {view === 'memory' && <MemoryView close={() => setView(null)} />}
      {view === 'packs' && <PacksView close={() => setView(null)} />}
    </main>
  );
}
