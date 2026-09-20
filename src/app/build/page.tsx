import Link from 'next/link';

const systems = [
  ['Identity', 'Ready to design', 'Auth + membership'],
  ['Supply', 'Ready to design', 'Partners + services + inventory'],
  ['Booking', 'Spec frozen', 'Reserve → confirm → cancel → refund'],
  ['Finance', 'Spec frozen', 'Ledger + payouts'],
  ['AI Actions', 'Spec frozen', 'Confirm before consequence'],
  ['Circles', 'Spec frozen', 'Curated social layer'],
  ['Partner Portal', 'Pilot-manual first', 'Automate after pain is proven'],
  ['Ops Console', 'Minimum required', 'Incidents + refunds + controls'],
];

export default function BuildReadinessPage() {
  return (
    <main className="build-readiness">
      <nav className="sen-site-nav">
        <div className="brand-word site-logo">Sēn</div>
        <div className="site-nav-links">
          <Link href="/validate">Validation</Link>
          <Link href="/pilot">Pilot</Link>
          <Link className="site-cta" href="/">Prototype</Link>
        </div>
      </nav>

      <section className="build-hero">
        <span>PHASE 8 / BUILD READINESS</span>
        <h1>Ready to build.<br />Not ready to overbuild.</h1>
        <p>
          The production architecture is prepared, but the full build stays gated behind real validation
          and pilot evidence. The next code we write should solve proven pain, not founder imagination.
        </p>
      </section>

      <section className="build-grid">
        {systems.map(([name,state,note]) => (
          <article key={name}>
            <span>{state}</span>
            <h2>{name}</h2>
            <p>{note}</p>
          </article>
        ))}
      </section>

      <section className="build-principle">
        <span>BUILD RULE</span>
        <h2>Every automation must replace a workflow we already understand.</h2>
        <p>Manual is acceptable in the pilot. Hidden chaos is not.</p>
      </section>
    </main>
  );
}
