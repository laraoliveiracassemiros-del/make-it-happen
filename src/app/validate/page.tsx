'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

type Track = 'member' | 'partner';

export default function ValidatePage() {
  const [track, setTrack] = useState<Track>('member');
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <main className="sen-site validation-site">
      <nav className="sen-site-nav">
        <div className="brand-word site-logo">Sēn</div>
        <div className="site-nav-links">
          <Link href="/landing">About</Link>
          <Link href="/founding">Founding 25</Link>
          <Link className="site-cta" href="/">Open prototype</Link>
        </div>
      </nav>

      <section className="validation-hero">
        <div className="site-kicker">VALIDATION LAB</div>
        <h1>We’re testing what people will actually use — and pay for.</h1>
        <p>
          This is the structured research layer for Sēn. We test demand, usability, willingness-to-pay,
          partner supply and operational reliability before scaling.
        </p>
      </section>

      <section className="validation-shell">
        <div className="track-switch">
          <button className={track === 'member' ? 'active' : ''} onClick={() => { setTrack('member'); setDone(false); }}>Member track</button>
          <button className={track === 'partner' ? 'active' : ''} onClick={() => { setTrack('partner'); setDone(false); }}>Partner track</button>
        </div>

        {!done && track === 'member' && (
          <form className="validation-form" onSubmit={submit}>
            <div className="validation-intro">
              <span>MEMBER VALIDATION</span>
              <h2>Would this fit your real life?</h2>
              <p>We care more about actual behavior and spending than whether the idea merely sounds cool.</p>
            </div>

            <label>
              What do you currently pay for each month?
              <textarea required placeholder="Gym, Pilates, boxing, coworking, massage, beauty, classes..." />
            </label>

            <label>
              Approximate monthly spend
              <select required defaultValue="">
                <option value="" disabled>Select range</option>
                <option>Under R$ 300</option>
                <option>R$ 300–600</option>
                <option>R$ 600–1.000</option>
                <option>R$ 1.000–1.500</option>
                <option>R$ 1.500+</option>
              </select>
            </label>

            <label>
              Which part would make Sēn essential?
              <select required defaultValue="">
                <option value="" disabled>Choose one</option>
                <option>Premium access</option>
                <option>Reformer / studios</option>
                <option>Sēn AI</option>
                <option>Privileges / recovery / beauty</option>
                <option>Circles / Squads</option>
                <option>Work / coworking</option>
                <option>None yet</option>
              </select>
            </label>

            <label>
              At which monthly price would you seriously consider subscribing?
              <select required defaultValue="">
                <option value="" disabled>Choose one</option>
                <option>R$ 299</option>
                <option>R$ 399</option>
                <option>R$ 499</option>
                <option>R$ 699</option>
                <option>R$ 799</option>
                <option>R$ 999+</option>
                <option>I would not subscribe</option>
              </select>
            </label>

            <label>
              What would make you cancel after month one?
              <textarea required placeholder="Be specific." />
            </label>

            <div className="research-task">
              <span>USABILITY TASK</span>
              <strong>Open the prototype and try to book a reformer class without instructions.</strong>
              <Link href="/" target="_blank">Open prototype →</Link>
            </div>

            <button className="site-primary form-submit" type="submit">Finish member test</button>
            <small>Prototype research form only — submissions are not stored yet.</small>
          </form>
        )}

        {!done && track === 'partner' && (
          <form className="validation-form" onSubmit={submit}>
            <div className="validation-intro">
              <span>PARTNER VALIDATION</span>
              <h2>Would Sēn create incremental value?</h2>
              <p>We are testing capacity, economics and operational fit — not asking partners to accept a finished contract.</p>
            </div>

            <label>
              What type of venue are you?
              <select required defaultValue="">
                <option value="" disabled>Select category</option>
                <option>Gym</option>
                <option>Reformer / Pilates studio</option>
                <option>Yoga / boutique studio</option>
                <option>Boxing / martial arts</option>
                <option>Recovery / massage</option>
                <option>Beauty</option>
                <option>Coworking</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Which capacity is hardest to fill profitably?
              <textarea required placeholder="Times, services, room types, class slots..." />
            </label>

            <label>
              Which inventory would you never want discounted or externally distributed?
              <textarea required placeholder="Peak slots, certain services, specific units..." />
            </label>

            <label>
              Which model feels most acceptable?
              <select required defaultValue="">
                <option value="" disabled>Choose one</option>
                <option>Pay per check-in</option>
                <option>Active member fee</option>
                <option>Hybrid activation + check-in</option>
                <option>Dynamic/off-peak inventory</option>
                <option>Member co-pay</option>
                <option>Needs discussion</option>
              </select>
            </label>

            <label>
              What would make you end a pilot?
              <textarea required placeholder="Operational issues, payout, brand risk, behavior..." />
            </label>

            <div className="research-task">
              <span>PARTNER REVIEW</span>
              <strong>Read the partner proposition and mark what feels unrealistic or unclear.</strong>
              <Link href="/partners" target="_blank">Open partner page →</Link>
            </div>

            <button className="site-primary form-submit" type="submit">Finish partner test</button>
            <small>Prototype research form only — submissions are not stored yet.</small>
          </form>
        )}

        {done && (
          <div className="validation-done">
            <span>COMPLETE</span>
            <h2>That’s the kind of feedback Sēn needs.</h2>
            <p>The real validation process will capture interview notes, prototype behavior, pricing answers and evidence quality separately.</p>
            <button onClick={() => setDone(false)}>Run another test</button>
          </div>
        )}
      </section>
    </main>
  );
}
