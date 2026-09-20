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
  | 'upgrade';

type Message = { role: 'user' | 'sen'; text: string };

const partners = [
  {
    id: 'ativa',
    name: 'Ativa Reformer',
    area: 'Sudoeste',
    category: 'Reformer Pilates',
    distance: '11 min',
    state: 'Included',
    times: ['18:30', '19:30', '20:30'],
  },
  {
    id: 'aera',
    name: 'Aera Studio',
    area: 'Asa Sul',
    category: 'Pilates',
    distance: '13 min',
    state: 'Member Price',
    price: 'R$ 24',
    times: ['19:00', '20:00'],
  },
];

function Badge({ children, tone = 'sand' }: { children: React.ReactNode; tone?: 'sand' | 'olive' | 'dark' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function BottomNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'explore', label: 'Explore', icon: '⌕' },
    { id: 'sen', label: 'Sēn', icon: '✦' },
    { id: 'circles', label: 'Circles', icon: '◌' },
    { id: 'wallet', label: 'Wallet', icon: '◇' },
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

function Home({ setTab, open }: { setTab: (tab: Tab) => void; open: (view: View) => void }) {
  return (
    <div className="screen-scroll">
      <AppHeader />
      <section className="hero-copy">
        <p>Boa tarde.</p>
        <h1>What would make today feel better?</h1>
      </section>

      <button className="ask-sen" onClick={() => setTab('sen')}>
        <span>Ask Sēn anything…</span>
        <b>↗</b>
      </button>

      <SectionLabel>Your day</SectionLabel>
      <button className="surface booking-card" onClick={() => open('confirmed')}>
        <div className="time-pill">18:30</div>
        <div>
          <strong>Reformer · Ativa</strong>
          <span>Sudoeste · Included</span>
          <em>Leave around 18:08</em>
        </div>
      </button>

      <SectionLabel>For you today</SectionLabel>
      <button className="editorial-card" onClick={() => setTab('explore')}>
        <div>
          <Badge tone="dark">Included</Badge>
          <h2>A slower evening.</h2>
          <p>Yoga · 20:00 · 9 min away</p>
        </div>
        <span className="arrow">↗</span>
      </button>

      <div className="value-row">
        <div>
          <SectionLabel>Your value</SectionLabel>
          <strong className="value-number">R$ 612</strong>
          <span>used this month</span>
        </div>
        <button className="text-link" onClick={() => setTab('wallet')}>View wallet →</button>
      </div>

      <SectionLabel>Happening</SectionLabel>
      <button className="surface compact-card" onClick={() => open('squad')}>
        <div>
          <Badge tone="olive">Squad</Badge>
          <strong>Beginner padel</strong>
          <span>Tomorrow · 10:30 · 2 spots left</span>
        </div>
        <span className="arrow dark">→</span>
      </button>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}

function Explore({ open }: { open: (view: View) => void }) {
  const [query, setQuery] = useState('reformer amanhã depois das 18h');
  const filtered = useMemo(() => partners.filter((p) => p.name.toLowerCase().includes(query.toLowerCase().split(' ')[0]) || query.includes('reformer')), [query]);

  return (
    <div className="screen-scroll">
      <AppHeader label="Explore" />
      <div className="searchbox">
        <span>⌕</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="chip-row">
        {['Reformer', 'Yoga', 'HIIT', 'Boxing'].map((chip, index) => (
          <button key={chip} className={index === 0 ? 'chip selected' : 'chip'}>{chip}</button>
        ))}
      </div>

      <SectionLabel>Best matches</SectionLabel>

      {filtered.map((partner, index) => (
        <button key={partner.id} className="partner-card" onClick={() => open('partner')}>
          <div className={index === 0 ? 'partner-art art-one' : 'partner-art art-two'}>
            <span>{index === 0 ? 'R' : 'A'}</span>
          </div>
          <div className="partner-copy">
            <Badge>{partner.state}</Badge>
            <strong>{partner.name}</strong>
            <span>{partner.area} · {partner.distance}</span>
            <em>{partner.times.join('   ')}{partner.price ? ` · ${partner.price}` : ''}</em>
          </div>
        </button>
      ))}

      <div className="collection-card">
        <small>SĒN EDIT</small>
        <h3>After-work, without the rush.</h3>
        <p>Five places with genuinely calm 19h–21h availability.</p>
      </div>
    </div>
  );
}

function SenAI({ open }: { open: (view: View) => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'sen', text: 'What are you in the mood for?' },
  ]);

  function send(e?: FormEvent) {
    e?.preventDefault();
    const value = input.trim();
    if (!value) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: value },
      {
        role: 'sen',
        text: value.toLowerCase().includes('cans')
          ? 'Eu deixaria hoje mais leve. Achei uma yoga às 20h, a 9 min, Included no seu plano.'
          : 'Entendi. Posso organizar isso pelo seu horário, distância e o que já entra no plano.',
      },
    ]);
    setInput('');
  }

  function quickFind() {
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: 'Quero fazer alguma coisa hoje depois das 19h, mas tô cansada.' },
      { role: 'sen', text: 'Eu deixaria hoje mais leve. Yoga às 20h · 9 min de você · Included.' },
    ]);
  }

  return (
    <div className="sen-screen">
      <div className="screen-scroll sen-scroll">
        <AppHeader label="Sēn" />
        <div className="sen-intro">
          <h1>Think less about logistics.</h1>
          <p>Tell me what you need. I’ll work around your real day.</p>
        </div>

        <div className="chip-row">
          <button className="chip" onClick={() => setMessages((p) => [...p, { role: 'sen', text: 'Me manda sua semana do jeito que estiver na cabeça. Eu organizo antes de salvar qualquer coisa.' }])}>Plan my week</button>
          <button className="chip" onClick={quickFind}>Find something now</button>
          <button className="chip">Use my benefits</button>
        </div>

        <div className="chat">
          {messages.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'message user-message' : 'message sen-message'}>
              {message.text}
              {message.role === 'sen' && index === messages.length - 1 && messages.length > 2 ? (
                <button className="inline-action" onClick={() => open('partner')}>View best option →</button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <form className="composer" onSubmit={send}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message Sēn…" />
        <button type="submit">↗</button>
      </form>
    </div>
  );
}

function Circles({ open }: { open: (view: View) => void }) {
  return (
    <div className="screen-scroll">
      <AppHeader label="Circles" />
      <section className="hero-copy">
        <p>Community, minus the performance.</p>
        <h1>Do more things with people.</h1>
      </section>

      <SectionLabel>Your circles</SectionLabel>
      <div className="surface circle-card">
        <div className="circle-icon">R</div>
        <div>
          <strong>Running Brasília</strong>
          <span>Saturday · 8:00 · Parque da Cidade</span>
          <Badge tone="olive">12 going</Badge>
        </div>
      </div>

      <SectionLabel>Happening near you</SectionLabel>
      <button className="editorial-card padel" onClick={() => open('squad')}>
        <div>
          <Badge tone="dark">Squad</Badge>
          <h2>Beginner padel</h2>
          <p>Tomorrow · 10:30 · Lago Sul · 2 spots left</p>
        </div>
        <span className="arrow">↗</span>
      </button>

      <SectionLabel>Discover</SectionLabel>
      <div className="discover-grid">
        {['Reformer', 'Boxing', 'Yoga', 'Study sessions'].map((item) => (
          <div className="discover-tile" key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function Wallet({ open }: { open: (view: View) => void }) {
  return (
    <div className="screen-scroll">
      <AppHeader label="Wallet" />
      <section className="hero-copy">
        <p>Your membership,</p>
        <h1>working for you.</h1>
      </section>

      <div className="wallet-hero">
        <small>This month</small>
        <strong>R$ 612</strong>
        <span>value used</span>
        <div className="wallet-meta">
          <span>Plus plan</span>
          <span>R$ 799 / month</span>
        </div>
      </div>

      <SectionLabel>Your privileges</SectionLabel>
      <button className="surface privilege-card" onClick={() => open('privilege')}>
        <div>
          <Badge>1 available</Badge>
          <strong>Recovery massage</strong>
          <span>50 min · expires Sep 30</span>
        </div>
        <span className="arrow dark">→</span>
      </button>

      <SectionLabel>Recent</SectionLabel>
      <div className="transaction-list">
        <div><span>Ativa Reformer</span><b>Included</b></div>
        <div><span>Member Price · Tennis</span><b>R$ 34</b></div>
        <div><span>Privilege · Recovery</span><b>R$ 0</b></div>
      </div>

      <button className="upgrade-card" onClick={() => open('upgrade')}>
        <span>PLUS → BLACK</span>
        <strong>See what would actually change for you</strong>
        <em>Not just more features. More access.</em>
      </button>
    </div>
  );
}

function PartnerView({ close, open }: { close: () => void; open: (view: View) => void }) {
  const [time, setTime] = useState('18:30');
  return (
    <Overlay close={close}>
      <div className="partner-hero">
        <button className="back" onClick={close}>←</button>
        <Badge tone="dark">Included</Badge>
        <div className="partner-monogram">R</div>
      </div>
      <div className="overlay-body">
        <h1>Ativa Reformer</h1>
        <p className="muted-line">Sudoeste · Reformer Pilates · 4.9</p>

        <SectionLabel>Why Sēn picked this</SectionLabel>
        <p className="body-copy">Fits your evening, 11 min away, and the selected slot is included in your plan.</p>

        <SectionLabel>Tomorrow</SectionLabel>
        <div className="time-row">
          {['18:30', '19:30', '20:30'].map((item) => (
            <button key={item} onClick={() => setTime(item)} className={time === item ? 'time-option active' : 'time-option'}>{item}</button>
          ))}
        </div>

        <SectionLabel>What to know</SectionLabel>
        <div className="rules">
          <div><span>Free cancellation</span><b>until 06:30 tomorrow</b></div>
          <div><span>Arrival</span><b>10 minutes early</b></div>
          <div><span>Bring</span><b>grip socks</b></div>
        </div>

        <button className="primary" onClick={() => open('booking')}>Reserve {time}</button>
      </div>
    </Overlay>
  );
}

function BookingView({ close, open }: { close: () => void; open: (view: View) => void }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Confirm</small>
        <h1>Almost yours.</h1>

        <div className="surface summary-card">
          <Badge>Included</Badge>
          <strong>Ativa Reformer</strong>
          <span>Tomorrow · 18:30–19:20</span>
          <span>Sudoeste</span>
        </div>

        <div className="summary-lines">
          <div><span>Your cost today</span><b>R$ 0</b></div>
          <div><span>Plan impact</span><b>1 studio visit</b></div>
          <div><span>Free cancellation until</span><b>06:30 tomorrow</b></div>
        </div>
        <p className="fine-print">Late cancel or no-show consumes this studio visit.</p>

        <button className="primary" onClick={() => open('confirmed')}>Confirm reservation</button>
        <p className="center-note">Nothing is booked until you confirm.</p>
      </div>
    </Overlay>
  );
}

function ConfirmedView({ close, open }: { close: () => void; open: (view: View) => void }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Booked</small>
        <h1>You’re in.</h1>
        <p className="muted-line">Tomorrow · 18:30 · Ativa Reformer</p>

        <div className="ticket">
          <strong>18:30</strong>
          <small>ARRIVE BY 18:20</small>
          <span>Included · 1 studio visit</span>
          <button>Add to calendar</button>
        </div>

        <div className="two-actions">
          <button><b>Directions</b><span>11 min</span></button>
          <button><b>Invite someone</b><span>Share details</span></button>
        </div>

        <button className="secondary" onClick={() => open('recovery')}>Simulate partner cancellation</button>
        <button className="primary pale" onClick={close}>Back to Home</button>
      </div>
    </Overlay>
  );
}

function RecoveryView({ close }: { close: () => void }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <small className="eyebrow">We fixed the important part first</small>
        <h1>Your booking was cancelled by the partner.</h1>
        <div className="resolution-card">
          <div><span>Studio visit</span><b>Restored</b></div>
          <div><span>Amount charged</span><b>R$ 0</b></div>
          <div><span>Your fault?</span><b>No</b></div>
        </div>
        <SectionLabel>Closest alternatives</SectionLabel>
        <button className="surface alt-card">
          <div><strong>Aera Studio · 19:00</strong><span>Asa Sul · Member Price R$ 24</span></div><span>→</span>
        </button>
        <button className="surface alt-card">
          <div><strong>Studio Alma · 20:00</strong><span>Asa Sul · Included</span></div><span>→</span>
        </button>
        <button className="primary" onClick={close}>Back to Home</button>
      </div>
    </Overlay>
  );
}

function PrivilegeView({ close }: { close: () => void }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <Badge>Available</Badge>
        <h1>Recovery massage</h1>
        <p className="muted-line">50 minutes · one use</p>
        <div className="surface detail-card">
          <div><span>Reference value</span><b>R$ 240</b></div>
          <div><span>Your cost</span><b>R$ 0</b></div>
          <div><span>Expires</span><b>Sep 30</b></div>
        </div>
        <p className="body-copy">Curated monthly value, not a coupon. Availability is controlled so the partner can keep a premium experience.</p>
        <button className="primary">Find available times</button>
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
        <Badge>Beginner</Badge>
        <h1>Padel tomorrow.</h1>
        <p className="muted-line">10:30 · Lago Sul</p>

        <div className="surface squad-detail">
          <strong>{joined ? '4 / 4 people' : '3 / 4 people'}</strong>
          <span>Beginner-friendly · casual</span>
          <hr />
          <small>Court booking</small>
          <b>Not included yet</b>
          <p>Joining the Squad does not reserve the court.</p>
        </div>

        <div className="avatar-row">
          <span>LM</span><span>JP</span><span>AS</span>{joined ? <span>YOU</span> : <i>+1</i>}
        </div>
        <button className={joined ? 'primary pale' : 'primary'} onClick={() => setJoined(!joined)}>{joined ? 'Joined · Leave Squad' : 'Join Squad'}</button>
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
        <h1>More rarity. Not just more usage.</h1>
        <div className="comparison">
          <div><span>Studios / week</span><b>4 → 6</b></div>
          <div><span>Signature access</span><b>1–2 → 3–4 / mo</b></div>
          <div><span>Privileges</span><b>2 → 3 / mo</b></div>
          <div><span>Sēn concierge</span><b>More proactive</b></div>
        </div>
        <div className="black-welcome">
          <small>BLACK WELCOME</small>
          <strong>A curated first-month moment, not a discount code.</strong>
        </div>
        <button className="primary">Continue · R$ 1.299 / month</button>
      </div>
    </Overlay>
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

export default function HomePage() {
  const [tab, setTab] = useState<Tab>('home');
  const [view, setView] = useState<View>(null);

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
        <p>Clickable MVP prototype</p>
        <h2>Access + AI + Community + Value.</h2>
        <ul>
          <li>Explore → booking → recovery</li>
          <li>Natural Sēn AI conversation</li>
          <li>Wallet & Privileges</li>
          <li>Circles & Squads</li>
        </ul>
        <span>Brasília · V1 · 18+</span>
      </aside>

      <div className="device-wrap">
        <div className="device">
          <div className="statusbar"><span>13:10</span><span>● ● ◒</span></div>
          <div className="app">
            {tab === 'home' && <Home setTab={changeTab} open={open} />}
            {tab === 'explore' && <Explore open={open} />}
            {tab === 'sen' && <SenAI open={open} />}
            {tab === 'circles' && <Circles open={open} />}
            {tab === 'wallet' && <Wallet open={open} />}
            <BottomNav active={tab} onChange={changeTab} />
          </div>
          <div className="home-indicator" />
        </div>
      </div>

      <aside className="prototype-side">
        <span>TEST</span>
        <strong>Try these flows</strong>
        <button onClick={() => { setTab('explore'); setView(null); }}>Book a reformer</button>
        <button onClick={() => { setTab('sen'); setView(null); }}>Talk to Sēn</button>
        <button onClick={() => { setTab('wallet'); setView(null); }}>Open a Privilege</button>
        <button onClick={() => { setTab('circles'); setView('squad'); }}>Join a Squad</button>
      </aside>

      {view === 'partner' && <PartnerView close={() => setView(null)} open={open} />}
      {view === 'booking' && <BookingView close={() => setView(null)} open={open} />}
      {view === 'confirmed' && <ConfirmedView close={() => setView(null)} open={open} />}
      {view === 'recovery' && <RecoveryView close={() => setView(null)} />}
      {view === 'privilege' && <PrivilegeView close={() => setView(null)} />}
      {view === 'squad' && <SquadView close={() => setView(null)} />}
      {view === 'upgrade' && <UpgradeView close={() => setView(null)} />}
    </main>
  );
}
