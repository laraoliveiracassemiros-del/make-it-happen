'use client';

import { useState } from 'react';
import Link from 'next/link';

const tasks = [
  'Finish the onboarding without help.',
  'Find a Reformer class after 18:00.',
  'Book it as a Sēn Free user.',
  'Open Wallet and explain what the R$ credit means.',
  'Find Flex Packs and explain when you would choose one.',
  'Explain Sēn Price vs Member Price vs Included.',
  'Ask Sēn AI for something cheap and nearby.',
  'Change something in “What Sēn remembers”.',
  'Find a Circle or Squad you might actually join.',
  'Compare Free vs Core in your own words.',
];

export default function ExternalTestPage() {
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!consent) {
    return (
      <main className="external-test-shell">
        <section className="test-card consent-card">
          <div className="test-brand">Sēn</div>
          <span className="test-kicker">PRODUCT RESEARCH</span>
          <h1>Help us test something before we explain it.</h1>
          <p>
            This is a prototype study for adults. There are no real charges, bookings or memberships.
            We want to see what feels obvious, confusing, useful or unnecessary.
          </p>
          <div className="test-rules">
            <div><b>25–30 min</b><span>Typical session</span></div>
            <div><b>No right answers</b><span>Confusion is useful data</span></div>
            <div><b>No real purchases</b><span>Prototype only</span></div>
          </div>
          <button className="test-primary" onClick={() => setConsent(true)}>I’m 18+ and ready to test</button>
          <small>By continuing, you agree to share product-research feedback for this prototype session.</small>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="external-test-shell">
        <section className="test-card finish-card">
          <div className="test-brand">Sēn</div>
          <span className="test-kicker">THANK YOU</span>
          <h1>That’s the test.</h1>
          <p>What confused you matters more than what looked beautiful. Your moderator will ask a few short questions now.</p>
          <div className="finish-prompts">
            <b>Be ready to explain:</b>
            <span>What Sēn is.</span>
            <span>When you would stay Free.</span>
            <span>When you would choose Core.</span>
            <span>Whether the AI felt genuinely useful.</span>
          </div>
          <Link className="test-secondary" href="/">Back to prototype</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="external-test-shell">
      <section className="test-card task-card">
        <div className="test-topline">
          <div className="test-brand">Sēn</div>
          <span>{step + 1} / {tasks.length}</span>
        </div>
        <span className="test-kicker">TASK {String(step + 1).padStart(2,'0')}</span>
        <h1>{tasks[step]}</h1>
        <p>
          Do this naturally. Don’t worry about breaking anything.
          If you get stuck, stay stuck for a moment — that is useful for us.
        </p>

        <div className="test-actions">
          <Link className="test-primary" href="/" target="_blank">Open prototype ↗</Link>
          <button
            className="test-secondary"
            onClick={() => {
              if (step === tasks.length - 1) setFinished(true);
              else setStep((s) => s + 1);
            }}
          >
            {step === tasks.length - 1 ? 'Finish test' : 'I’m done with this task →'}
          </button>
        </div>

        {step > 0 && <button className="test-back" onClick={() => setStep((s)=>s-1)}>← Previous task</button>}
      </section>
    </main>
  );
}
