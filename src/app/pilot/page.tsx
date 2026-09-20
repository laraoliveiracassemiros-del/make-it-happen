'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Cohort = 'Concierge' | 'Founding 25' | '50' | '100';
type Incident = { id: number; severity: 'P0'|'P1'|'P2'|'P3'; title: string; owner: string; state: 'Open'|'Watching'|'Resolved' };

const cohortData: Record<Cohort, { members: number; target: number; note: string }> = {
  'Concierge': { members: 8, target: 10, note: 'Founder-led operations and failure discovery.' },
  'Founding 25': { members: 0, target: 25, note: 'First committed cohort. Real pricing + real usage.' },
  '50': { members: 0, target: 50, note: 'Scale only after reliability and economics pass.' },
  '100': { members: 0, target: 100, note: 'Second proof gate before product build expands.' },
};

const initialIncidents: Incident[] = [
  { id: 1, severity: 'P2', title: 'Partner did not recognize booking', owner: 'Partner Ops', state: 'Watching' },
  { id: 2, severity: 'P3', title: 'Member confused by Member Price copy', owner: 'Product', state: 'Open' },
];

export default function PilotPage() {
  const [cohort, setCohort] = useState<Cohort>('Concierge');
  const [incidents, setIncidents] = useState(initialIncidents);
  const [day, setDay] = useState(1);

  const active = cohortData[cohort];
  const completion = Math.round((active.members / active.target) * 100);

  const gates = useMemo(() => ([
    { name: 'Booking success', value: 94, target: 92, unit: '%' },
    { name: 'Partner reliability', value: 96, target: 95, unit: '%' },
    { name: 'Repeat use', value: 58, target: 45, unit: '%' },
    { name: 'Support within target', value: 91, target: 90, unit: '%' },
    { name: 'Base contribution margin', value: 41, target: 35, unit: '%' },
  ]), []);

  function resolve(id: number) {
    setIncidents((prev) => prev.map((item) => item.id === id ? { ...item, state: 'Resolved' } : item));
  }

  return (
    <main className="pilot-console">
      <aside className="pilot-sidebar">
        <div className="pilot-brand">Sēn</div>
        <span>Founder Pilot Console</span>
        <nav>
          <button className="active">Overview</button>
          <button>Members</button>
          <button>Partners</button>
          <button>Bookings</button>
          <button>Incidents</button>
          <button>Economics</button>
        </nav>
        <Link href="/">← Member prototype</Link>
      </aside>

      <section className="pilot-main">
        <header className="pilot-header">
          <div>
            <span>PILOT CONTROL ROOM</span>
            <h1>Prove it before we scale it.</h1>
          </div>
          <div className="pilot-day">
            <small>Pilot day</small>
            <button onClick={() => setDay((d) => Math.max(1, d - 1))}>−</button>
            <b>{day}</b>
            <button onClick={() => setDay((d) => d + 1)}>+</button>
          </div>
        </header>

        <div className="cohort-tabs">
          {(Object.keys(cohortData) as Cohort[]).map((item) => (
            <button key={item} className={cohort === item ? 'active' : ''} onClick={() => setCohort(item)}>{item}</button>
          ))}
        </div>

        <div className="pilot-grid top">
          <article className="pilot-card cohort-card">
            <span>ACTIVE COHORT</span>
            <h2>{cohort}</h2>
            <p>{active.note}</p>
            <div className="progress-line"><i style={{ width: `${Math.min(completion,100)}%` }} /></div>
            <div className="cohort-meta"><b>{active.members}</b><span>/ {active.target} members</span></div>
          </article>

          <article className="pilot-card">
            <span>TODAY</span>
            <div className="metric-stack">
              <div><b>11</b><small>bookings</small></div>
              <div><b>8</b><small>completed</small></div>
              <div><b>1</b><small>support case</small></div>
              <div><b>0</b><small>P0/P1</small></div>
            </div>
          </article>

          <article className="pilot-card">
            <span>SUPPLY HEALTH</span>
            <h3>14 / 18</h3>
            <p>partners operationally green</p>
            <div className="signal-row"><i className="green" /><i className="green" /><i className="green" /><i className="amber" /></div>
          </article>
        </div>

        <section className="pilot-section">
          <div className="pilot-section-head">
            <div><span>GO / PAUSE GATES</span><h2>What must remain true.</h2></div>
            <em>Prototype data</em>
          </div>
          <div className="gate-grid">
            {gates.map((gate) => {
              const passed = gate.value >= gate.target;
              return (
                <article key={gate.name} className={passed ? 'gate passed' : 'gate failed'}>
                  <small>{gate.name}</small>
                  <strong>{gate.value}{gate.unit}</strong>
                  <span>target ≥ {gate.target}{gate.unit}</span>
                  <b>{passed ? 'PASS' : 'WATCH'}</b>
                </article>
              );
            })}
          </div>
        </section>

        <div className="pilot-grid split">
          <section className="pilot-card incident-card">
            <div className="pilot-section-head compact">
              <div><span>INCIDENTS</span><h2>Member trust first.</h2></div>
            </div>
            <div className="incident-list">
              {incidents.map((item) => (
                <div className="incident" key={item.id}>
                  <div>
                    <span className={`sev ${item.severity.toLowerCase()}`}>{item.severity}</span>
                    <strong>{item.title}</strong>
                    <small>{item.owner} · {item.state}</small>
                  </div>
                  {item.state !== 'Resolved' ? <button onClick={() => resolve(item.id)}>Resolve</button> : <b>✓</b>}
                </div>
              ))}
            </div>
          </section>

          <section className="pilot-card">
            <div className="pilot-section-head compact">
              <div><span>DAILY RHYTHM</span><h2>Operate the boring things well.</h2></div>
            </div>
            <ol className="daily-list">
              <li><span>08:00</span><b>Inventory & outage check</b></li>
              <li><span>11:00</span><b>Bookings / payment exceptions</b></li>
              <li><span>15:00</span><b>Partner support + waitlists</b></li>
              <li><span>20:30</span><b>Incident reconciliation</b></li>
              <li><span>Friday</span><b>Economics + cohort review</b></li>
            </ol>
          </section>
        </div>

        <section className="pilot-card decision-card">
          <span>NEXT COHORT RULE</span>
          <h2>We do not graduate because the calendar says so.</h2>
          <p>Move from {cohort} only when reliability, member value, partner economics and support load all hold together.</p>
          <button>Run cohort review</button>
        </section>
      </section>
    </main>
  );
}
