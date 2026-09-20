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

function Home({ setTab, open, hasMembership }: { setTab: (tab: Tab) => void; open: (view: View) => void; hasMembership: boolean }) {
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
      <button className="surface booking-card" onClick={() => open(hasMembership ? 'confirmed' : 'partner')}>
        <div className="time-pill">18:30</div>
        <div>
          <strong>Reformer · Ativa</strong>
          <span>{hasMembership ? 'Sudoeste · Included' : 'Sudoeste · R$ 78 today'}</span>
          <em>{hasMembership ? 'Leave around 18:08' : 'Core would include this visit'}</em>
        </div>
      </button>

      {!hasMembership && (
        <div className="free-state-strip">
          <div><span>SĒN FREE</span><strong>Pay only when you book.</strong></div>
          <button onClick={() => setTab('wallet')}>Wallet & packs →</button>
        </div>
      )}

      <SectionLabel>For you today</SectionLabel>
      <button className="editorial-card" onClick={() => setTab('explore')}>
        <div>
          <Badge tone="dark">{hasMembership ? "Included" : "Open access"}</Badge>
          <h2>A slower evening.</h2>
          <p>Yoga · 20:00 · 9 min away</p>
        </div>
        <span className="arrow">↗</span>
      </button>

      <div className="value-row">
        <div>
          <SectionLabel>{hasMembership ? 'Your value' : 'Your Sēn potential'}</SectionLabel>
          <strong className="value-number">{hasMembership ? 'R$ 612' : 'R$ 286'}</strong>
          <span>{hasMembership ? 'used this month' : 'possible monthly savings based on your picks'}</span>
        </div>
        <button className="text-link" onClick={() => hasMembership ? setTab('wallet') : open('membership')}>
          {hasMembership ? 'View wallet →' : 'See why Core fits →'}
        </button>
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

function Explore({ open, hasMembership }: { open: (view: View) => void; hasMembership: boolean }) {
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
            <Badge>{hasMembership ? partner.state : 'Sēn Price'}</Badge>
            <strong>{partner.name}</strong>
            <span>{partner.area} · {partner.distance}</span>
            <em>{partner.times.join('   ')} · {hasMembership ? (partner.price || 'Included') : (index === 0 ? 'R$ 78' : 'R$ 64')}</em>
            {!hasMembership && <small className="retail-compare">{index === 0 ? 'Public R$ 90' : 'Public R$ 75'}</small>}
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
          <button className="chip" onClick={() => open('memory')}>What Sēn remembers</button>
        </div>

        <button className="proactive-card" onClick={() => open('partner')}>
          <span>NEAR YOU · OPTIONAL</span>
          <strong>Boxing at 16:30</strong>
          <p>You’re around Asa Sul. This starts in 50 min and fits your usual afternoon window.</p>
          <em>Why this suggestion →</em>
        </button>

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

function Wallet({ open, hasMembership }: { open: (view: View) => void; hasMembership: boolean }) {
  return (
    <div className="screen-scroll">
      <AppHeader label="Wallet" />
      <section className="hero-copy">
        <p>{hasMembership ? 'Your membership,' : 'Your Sēn account,'}</p>
        <h1>{hasMembership ? 'working for you.' : 'already learning your life.'}</h1>
      </section>

      <div className={hasMembership ? "wallet-hero" : "wallet-hero free-wallet"}>
        <small>{hasMembership ? 'This month' : 'Based on your activity'}</small>
        <strong>{hasMembership ? 'R$ 612' : 'R$ 286'}</strong>
        <span>{hasMembership ? 'value used' : 'potential monthly savings with Core'}</span>
        <div className="wallet-meta">
          <span>{hasMembership ? 'Plus plan' : 'No membership yet'}</span>
          <span>{hasMembership ? 'R$ 799 / month' : 'Use Sēn free'}</span>
        </div>
      </div>

      {!hasMembership && (
        <>
          <div className="wallet-credit-card">
            <div><span>SĒN WALLET</span><strong>R$ 32</strong><em>available credit</em></div>
            <button>Use on next booking</button>
          </div>

          <button className="pack-card" onClick={() => open('packs')}>
            <span>FLEX PACK</span>
            <strong>Not ready for Core?</strong>
            <em>Buy 3, 5 or 10 eligible studio passes without subscribing →</em>
          </button>

          <div className="savings-meter">
            <div className="meter-head">
              <span>THIS MONTH</span><b>R$ 286 spent</b>
            </div>
            <div className="meter-track"><i style={{width:'72%'}} /></div>
            <p>At around 5 eligible studio visits, Core usually becomes the stronger deal.</p>
          </div>

          <button className="membership-nudge" onClick={() => open('membership')}>
            <span>BASED ON YOUR USE</span>
            <strong>You’re getting close to Core territory.</strong>
            <em>See the exact comparison →</em>
          </button>

          <button className="earned-offer" onClick={() => open('membership')}>
            <span>YOUR CURRENT OFFER</span>
            <strong>7% off your first 3 months of Core</strong>
            <em>Active-use campaign · terms visible before purchase</em>
          </button>
        </>
      )}

      <SectionLabel>{hasMembership ? 'Your privileges' : 'Member-only preview'}</SectionLabel>
      <button className="surface privilege-card" onClick={() => hasMembership ? open('privilege') : open('membership')}>
        <div>
          <Badge>{hasMembership ? '1 available' : 'Core benefit'}</Badge>
          <strong>Recovery massage</strong>
          <span>50 min · expires Sep 30</span>
        </div>
        <span className="arrow dark">→</span>
      </button>

      <SectionLabel>Recent</SectionLabel>
      <div className="transaction-list">
        <div><span>Ativa Reformer</span><b>{hasMembership ? 'Included' : 'R$ 78'}</b></div>
        <div><span>Tennis · Sēn Price</span><b>{hasMembership ? 'R$ 34' : 'R$ 49'}</b></div>
        <div><span>Wallet credit earned</span><b>+R$ 12</b></div>
      </div>

      <button className="upgrade-card" onClick={() => open(hasMembership ? 'upgrade' : 'membership')}>
        <span>{hasMembership ? 'PLUS → BLACK' : 'MEMBERSHIP, WHEN IT EARNS IT'}</span>
        <strong>{hasMembership ? 'See what would actually change for you' : 'Sēn stays useful before you subscribe.'}</strong>
        <em>{hasMembership ? 'Not just more features. More access.' : 'Upgrade when the savings and access become obvious.'}</em>
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
        <Badge tone="dark">{hasMembership ? "Included" : "Open access"}</Badge>
        <div className="partner-monogram">R</div>
      </div>
      <div className="overlay-body">
        <h1>Ativa Reformer</h1>
        <p className="muted-line">Sudoeste · Reformer Pilates · 4.9</p>

        <SectionLabel>Why Sēn picked this</SectionLabel>
        <p className="body-copy">{hasMembership ? "Fits your evening, 11 min away, and this slot is included in your plan." : "Fits your evening and is 11 min away. You can book it now for R$ 78 — or Core would include eligible visits like this."}</p>

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

function BookingView({ close, open, hasMembership }: { close: () => void; open: (view: View) => void; hasMembership: boolean }) {
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Confirm</small>
        <h1>Almost yours.</h1>

        <div className="surface summary-card">
          <Badge>{hasMembership ? 'Included' : 'Open access'}</Badge>
          <strong>Ativa Reformer</strong>
          <span>Tomorrow · 18:30–19:20</span>
          <span>Sudoeste</span>
        </div>

        <div className="summary-lines">
          <div><span>Your cost today</span><b>{hasMembership ? 'R$ 0' : 'R$ 78'}</b></div>
          <div><span>{hasMembership ? 'Plan impact' : 'Membership option'}</span><b>{hasMembership ? '1 studio visit' : 'Core · from R$ 399'}</b></div>
          <div><span>Free cancellation until</span><b>06:30 tomorrow</b></div>
        </div>
        <p className="fine-print">{hasMembership ? "Late cancel or no-show consumes this studio visit." : "Late cancellation follows the partner policy shown above."}</p>

        <button className="primary" onClick={() => open('confirmed')}>Confirm reservation</button>
        <p className="center-note">Nothing is booked until you confirm.</p>
      </div>
    </Overlay>
  );
}

function ConfirmedView({ close, open, hasMembership }: { close: () => void; open: (view: View) => void; hasMembership: boolean }) {
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
          <span>{hasMembership ? "Included · 1 studio visit" : "Paid · R$ 78"}</span>
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
        <p className="muted-line">Use eligible studio visits without a recurring subscription. Packs expire and do not include gym access or monthly Privileges.</p>

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
          <strong>Buying packs every month? Core may already be better.</strong>
          <p>Core adds selected gym access, eligible studio visits and a monthly Privilege on top of recurring value.</p>
        </div>

        <button className="primary">Buy {selected} passes in prototype</button>
        <button className="quiet-button" onClick={close}>Not now</button>
      </div>
    </Overlay>
  );
}

function MemoryView({ close }: { close: () => void }) {
  const [boxing, setBoxing] = useState(true);
  const [pilates, setPilates] = useState(true);
  const [afternoon, setAfternoon] = useState(true);
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced memory-view">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">What Sēn remembers</small>
        <h1>Your preferences should move with you.</h1>
        <p className="muted-line">These are editable signals — not permanent labels. Sēn uses them to improve suggestions, not to define you.</p>

        <div className="memory-list">
          <button onClick={() => setBoxing(!boxing)} className={boxing ? 'memory-row active' : 'memory-row'}>
            <div><strong>Boxing</strong><span>Currently relevant</span></div><b>{boxing ? 'On' : 'Off'}</b>
          </button>
          <button onClick={() => setPilates(!pilates)} className={pilates ? 'memory-row active' : 'memory-row'}>
            <div><strong>Pilates / Reformer</strong><span>Growing preference</span></div><b>{pilates ? 'On' : 'Off'}</b>
          </button>
          <button onClick={() => setAfternoon(!afternoon)} className={afternoon ? 'memory-row active' : 'memory-row'}>
            <div><strong>Afternoon activity</strong><span>Often works for you</span></div><b>{afternoon ? 'On' : 'Off'}</b>
          </button>
        </div>

        <div className="memory-note">
          <span>CONTROL</span>
          <p>You can edit, remove or reset remembered preferences. Sensitive information should never become durable memory silently.</p>
        </div>
        <button className="primary pale" onClick={close}>Done</button>
      </div>
    </Overlay>
  );
}

function MembershipView({ close, activate }: { close: () => void; activate: () => void }) {
  const [selected, setSelected] = useState<'Core'|'Plus'|'Black'>('Core');
  const plans = [
    { name: 'Core' as const, price: 'R$ 399', line: 'The everyday membership.', detail: 'Eligible studios ~2×/week · premium gyms · 1 Privilege' },
    { name: 'Plus' as const, price: 'R$ 799', line: 'More range, more often.', detail: 'Studios ~4×/week · broader premium access · 2 Privileges' },
    { name: 'Black' as const, price: 'R$ 1.299', line: 'Rarer access, less friction.', detail: 'Studios ~6×/week · Signature access · 3 Privileges' },
  ];
  return (
    <Overlay close={close}>
      <div className="overlay-body top-spaced membership-view">
        <button className="back light" onClick={close}>←</button>
        <small className="eyebrow">Membership, when it makes sense</small>
        <h1>You can use Sēn without one.</h1>
        <p className="muted-line">Membership unlocks better economics, included access and premium privileges. We want you to feel the need before we ask you to subscribe.</p>
        <div className="membership-proof">
          <span>BASED ON YOUR CURRENT PICKS</span>
          <strong>Your current pattern: R$ 286 spent · ~4 eligible visits</strong>
          <em>At ~5+ eligible visits/month, Core typically becomes more attractive. Prototype estimate.</em>
        </div>
        <div className="plan-stack compact-plans">
          {plans.map((item) => (
            <button key={item.name} className={selected===item.name?'plan-card selected':'plan-card'} onClick={()=>setSelected(item.name)}>
              <div><strong>{item.name}</strong><span>{item.line}<br />{item.detail}</span></div>
              <b>{item.price}</b>
            </button>
          ))}
        </div>
        <button className="primary" onClick={activate}>Start {selected} in prototype</button>
        <button className="quiet-button" onClick={close}>Keep using Sēn free</button>
      </div>
    </Overlay>
  );
}

function Onboarding({ finish }: { finish: () => void }) {
  const questions = [
    { key: 'goal', q: 'What do you want more of?', options: ['Energy', 'Strength', 'Calm', 'Focus'] },
    { key: 'routine', q: 'When does real life usually win?', options: ['Early morning', 'Afternoon', 'Evening', 'It changes'] },
    { key: 'movement', q: 'What do you actually enjoy?', options: ['Gym', 'Reformer', 'Yoga', 'Combat / HIIT'] },
    { key: 'recovery', q: 'How much does recovery matter?', options: ['A lot', 'Sometimes', 'Rarely', 'I want to discover it'] },
    { key: 'work', q: 'Do you work or study outside home?', options: ['Often', 'Sometimes', 'Rarely', 'Never'] },
    { key: 'social', q: 'Would you do more with the right people?', options: ['Definitely', 'Maybe', 'Not really', 'Depends on the activity'] },
    { key: 'distance', q: 'How far feels effortless?', options: ['Up to 10 min', '15 min', '20 min', 'Quality matters more'] },
    { key: 'spend', q: 'What do you already spend monthly?', options: ['Under R$300', 'R$300–600', 'R$600–1.000', 'R$1.000+'] },
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
        <span>{done ? 'Ready' : `${step + 1} / 8`}</span>
      </div>

      {!done ? (
        <div className="onboarding-stage quiz-stage" key={step}>
          <small className="eyebrow">Make Sēn yours</small>
          <h1>{current.q}</h1>
          <p>No plan selection. No commitment. Just enough context to make the app useful from the first screen.</p>
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
          <small className="eyebrow">Your Sēn is ready</small>
          <h1>Sēn is ready to learn your rhythm.</h1>
          <p>Your preferences can change. Sēn keeps learning from what you choose, skip and edit — and you can review or change what it remembers at any time.</p>
          <div className="first-win">
            <span>PERSONALIZED FOR YOU</span>
            <strong>{answers.movement || 'Reformer'} · tomorrow after 18h</strong>
            <em>{answers.distance || '11 min away'} · open access</em>
          </div>
          <button className="primary" onClick={finish}>Enter Sēn</button>
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

export default function HomePage() {
  const [tab, setTab] = useState<Tab>('home');
  const [view, setView] = useState<View>(null);
  const [onboarding, setOnboarding] = useState(true);
  const [hasMembership, setHasMembership] = useState(false);

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
            {onboarding && <Onboarding finish={() => setOnboarding(false)} />}
            {tab === 'home' && <Home setTab={changeTab} open={open} hasMembership={hasMembership} />}
            {tab === 'explore' && <Explore open={open} hasMembership={hasMembership} />}
            {tab === 'sen' && <SenAI open={open} />}
            {tab === 'circles' && <Circles open={open} />}
            {tab === 'wallet' && <Wallet open={open} hasMembership={hasMembership} />}
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
        <button onClick={() => { setView(null); setTab('home'); setOnboarding(true); setHasMembership(false); }}>Replay onboarding</button>
        <button onClick={() => setView('packs')}>Preview Flex Packs</button>
        <button onClick={() => setView('membership')}>Preview membership</button>
      </aside>

      {view === 'partner' && <PartnerView close={() => setView(null)} open={open} hasMembership={hasMembership} />}
      {view === 'booking' && <BookingView close={() => setView(null)} open={open} hasMembership={hasMembership} />}
      {view === 'confirmed' && <ConfirmedView close={() => setView(null)} open={open} hasMembership={hasMembership} />}
      {view === 'recovery' && <RecoveryView close={() => setView(null)} />}
      {view === 'privilege' && <PrivilegeView close={() => setView(null)} />}
      {view === 'squad' && <SquadView close={() => setView(null)} />}
      {view === 'upgrade' && <UpgradeView close={() => setView(null)} />}
      {view === 'membership' && <MembershipView close={() => setView(null)} activate={() => { setHasMembership(true); setView(null); setTab('wallet'); }} />}
      {view === 'memory' && <MemoryView close={() => setView(null)} />}
      {view === 'packs' && <PacksView close={() => setView(null)} />}
    </main>
  );
}
