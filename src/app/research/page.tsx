'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Track = 'members' | 'partners';

const memberRows = [
  { id: 1, name: 'Participant 01', status: 'To recruit', score: 0, task: 'New user flow' },
  { id: 2, name: 'Participant 02', status: 'To recruit', score: 0, task: 'Free booking' },
  { id: 3, name: 'Participant 03', status: 'To recruit', score: 0, task: 'Wallet + Packs' },
  { id: 4, name: 'Participant 04', status: 'To recruit', score: 0, task: 'Sēn AI' },
  { id: 5, name: 'Participant 05', status: 'To recruit', score: 0, task: 'Membership comparison' },
  { id: 6, name: 'Participant 06', status: 'To recruit', score: 0, task: 'Circles' },
];

const partnerRows = [
  { id: 1, name: 'Partner 01', status: 'Not contacted', score: 0, task: 'Inventory + economics' },
  { id: 2, name: 'Partner 02', status: 'Not contacted', score: 0, task: 'Pilot interest' },
  { id: 3, name: 'Partner 03', status: 'Not contacted', score: 0, task: 'Check-in + ops' },
  { id: 4, name: 'Partner 04', status: 'Not contacted', score: 0, task: 'Pricing model' },
  { id: 5, name: 'Partner 05', status: 'Not contacted', score: 0, task: 'Capacity release' },
];

export default function ResearchOpsPage() {
  const [track, setTrack] = useState<Track>('members');
  const [sessions, setSessions] = useState<Record<string, string>>({});
  const rows = track === 'members' ? memberRows : partnerRows;

  const completed = useMemo(
    () => rows.filter((row) => sessions[`${track}-${row.id}`] === 'Complete').length,
    [rows, sessions, track]
  );

  function cycle(id: number) {
    const key = `${track}-${id}`;
    const current = sessions[key] || (track === 'members' ? 'To recruit' : 'Not contacted');
    const flow = track === 'members'
      ? ['To recruit', 'Scheduled', 'Complete']
      : ['Not contacted', 'Discovery booked', 'Complete'];
    const index = flow.indexOf(current);
    setSessions((prev) => ({ ...prev, [key]: flow[(index + 1) % flow.length] }));
  }

  return (
    <main className="research-console">
      <aside className="research-sidebar">
        <div className="research-brand">Sēn</div>
        <span>Research Ops</span>
        <nav>
          <button className="active">Evidence board</button>
          <Link href="/validate">Validation Lab</Link>
          <Link href="/pilot">Pilot Control</Link>
          <Link href="/">Prototype</Link>
        </nav>
        <p>Do not sell the idea during testing. Observe behavior first.</p>
      </aside>

      <section className="research-main">
        <header className="research-header">
          <div>
            <span>VALIDATION / EVIDENCE</span>
            <h1>Prove what deserves to survive.</h1>
            <p>Track behavior, confusion, willingness to pay and partner reality before building deeper.</p>
          </div>
          <div className="research-counter">
            <small>Completed</small>
            <strong>{completed}/{rows.length}</strong>
          </div>
        </header>

        <div className="research-track">
          <button className={track === 'members' ? 'active' : ''} onClick={() => setTrack('members')}>Members</button>
          <button className={track === 'partners' ? 'active' : ''} onClick={() => setTrack('partners')}>Partners</button>
        </div>

        <div className="evidence-cards">
          <article>
            <span>BEHAVIOR</span>
            <strong>{track === 'members' ? 'Can they book without help?' : 'Will they release viable inventory?'}</strong>
            <p>Observed behavior outranks compliments.</p>
          </article>
          <article>
            <span>MONEY</span>
            <strong>{track === 'members' ? 'Will they pay or commit?' : 'Do the economics work?'}</strong>
            <p>Price questions must lead to concrete tradeoffs.</p>
          </article>
          <article>
            <span>REPEAT</span>
            <strong>{track === 'members' ? 'Would they use it again?' : 'Would they continue after a pilot?'}</strong>
            <p>We are testing recurrence, not novelty.</p>
          </article>
        </div>

        <section className="research-table-card">
          <div className="research-table-head">
            <div>
              <span>{track === 'members' ? 'FIRST 6 USER SESSIONS' : 'FIRST 5 PARTNER DISCOVERIES'}</span>
              <h2>{track === 'members' ? 'User test queue' : 'Partner discovery queue'}</h2>
            </div>
            <em>Click status to advance</em>
          </div>

          <div className="research-table">
            {rows.map((row) => {
              const key = `${track}-${row.id}`;
              const status = sessions[key] || row.status;
              return (
                <div className="research-row" key={key}>
                  <div><small>ID</small><b>{String(row.id).padStart(2, '0')}</b></div>
                  <div><small>Participant</small><strong>{row.name}</strong></div>
                  <div><small>Primary task</small><span>{row.task}</span></div>
                  <div>
                    <small>Status</small>
                    <button className="status-pill" onClick={() => cycle(row.id)}>{status}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="research-decision">
          <span>GO / CHANGE / KILL</span>
          <h2>Every strong opinion becomes a testable hypothesis.</h2>
          <p>We do not keep features because we spent time designing them. We keep them because real evidence supports them.</p>
        </section>
      </section>
    </main>
  );
}
