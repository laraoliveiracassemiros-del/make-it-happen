import Link from 'next/link';

export default function PartnersPage() {
  return (
    <main className="sen-site partner-site">
      <nav className="sen-site-nav">
        <div className="brand-word site-logo">Sēn</div>
        <div className="site-nav-links"><Link className="site-cta" href="/">View member prototype</Link></div>
      </nav>
      <section className="site-hero partner-hero-site">
        <div className="site-kicker">FOR PARTNERS</div>
        <h1>Premium demand.<br />Without public discounting.</h1>
        <p>Sēn helps selected venues monetize the right capacity and acquire qualified recurring customers while protecting brand and member experience.</p>
      </section>
      <section className="site-section">
        <div className="site-grid three">
          <article><b>01</b><h3>Qualified demand</h3><p>Members discover you through intent, schedule and fit — not a bargain marketplace.</p></article>
          <article><b>02</b><h3>Controlled inventory</h3><p>Always-on, off-peak, dynamic, Drop and Signature inventory can be structured differently.</p></article>
          <article><b>03</b><h3>Aligned economics</h3><p>We prefer usage-linked models and controlled access over blanket discounting.</p></article>
        </div>
      </section>
      <section className="site-section dark-section">
        <div className="site-section-head light">
          <span>PILOT</span>
          <h2>60–90 days. Limited capacity. Real data.</h2>
          <p>Start small, test operations, understand incremental demand and expand only when member and partner economics work.</p>
        </div>
      </section>
      <section className="site-section city-section">
        <span>BRASÍLIA</span>
        <h2>We’re building the founding network now.</h2>
        <p>The goal is not hundreds of logos. It is 30–50 partners people are genuinely excited to use.</p>
      </section>
    </main>
  );
}
