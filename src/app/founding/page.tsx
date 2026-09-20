'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function FoundingPage() {
  const [submitted, setSubmitted] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="sen-site founding-site">
      <nav className="sen-site-nav">
        <div className="brand-word site-logo">Sēn</div>
        <div className="site-nav-links">
          <Link href="/landing">About</Link>
          <Link href="/partners">For partners</Link>
          <Link className="site-cta" href="/">Open prototype</Link>
        </div>
      </nav>

      <section className="founding-hero">
        <div className="site-kicker">FOUNDING 25</div>
        <h1>Be one of the first people to actually live with Sēn.</h1>
        <p>
          We’re building the first paid pilot in Brasília with a deliberately small group.
          Founding members won’t just use Sēn — they’ll help shape what the product becomes.
        </p>
      </section>

      <section className="founding-grid">
        <div className="founding-copy">
          <span>WHAT YOU’D GET</span>
          <h2>A real membership, not a survey.</h2>
          <ul>
            <li>Access to a curated launch network across MOVE, RECOVER, WORK and selected CARE/LIVE.</li>
            <li>Sēn AI planning and booking support.</li>
            <li>Privileges and member-only opportunities.</li>
            <li>Direct founder feedback channel during the pilot.</li>
            <li>Founding pricing while the cohort remains active, subject to final pilot terms.</li>
          </ul>

          <span className="founding-label">WHO WE’RE LOOKING FOR</span>
          <p>
            Adults in Brasília who already spend on premium fitness/wellness, enjoy trying new places,
            and would genuinely use a cross-category membership — not people joining only because it is free.
          </p>
        </div>

        <div className="founding-form-card">
          {submitted ? (
            <div className="form-success">
              <span>THANK YOU</span>
              <h3>You’re on the prototype list.</h3>
              <p>This demo form does not yet save personal data. We’ll connect real submissions before validation begins.</p>
              <button onClick={() => setSubmitted(false)}>Back</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <span>FOUNDING INTEREST</span>
              <h3>Would Sēn fit your life?</h3>
              <label>
                Name
                <input required placeholder="Your name" />
              </label>
              <label>
                Neighborhood
                <input required placeholder="Lago Sul, Asa Sul, Noroeste..." />
              </label>
              <label>
                What do you already pay for?
                <input required placeholder="Gym, Pilates, boxing, coworking..." />
              </label>
              <label>
                Monthly wellness spend
                <select required defaultValue="">
                  <option value="" disabled>Select range</option>
                  <option>Under R$ 300</option>
                  <option>R$ 300–600</option>
                  <option>R$ 600–1.000</option>
                  <option>R$ 1.000+</option>
                </select>
              </label>
              <label>
                What would make Sēn worth paying for?
                <textarea required placeholder="Tell us in your own words." />
              </label>
              <button className="site-primary form-submit" type="submit">Join the interest list</button>
              <small>Prototype only — this form does not store submissions yet.</small>
            </form>
          )}
        </div>
      </section>

      <footer className="sen-site-footer">
        <div className="brand-word site-logo">Sēn</div>
        <span>Brasília first. Dense before broad.</span>
      </footer>
    </main>
  );
}
