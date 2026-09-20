import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="sen-site">
      <nav className="sen-site-nav">
        <div className="brand-word site-logo">Sēn</div>
        <div className="site-nav-links">
          <a href="#how">How it works</a>
          <a href="#membership">Membership</a>
          <a href="#cities">Brasília</a>
          <Link className="site-cta" href="/">Open prototype</Link>
        </div>
      </nav>

      <section className="site-hero">
        <div className="site-kicker">YOUR OPERATING LAYER FOR REAL LIFE</div>
        <h1>More life.<br />Less friction.</h1>
        <p>Sēn helps you discover, plan, book and live more of the real world. Use the app first; membership unlocks better access, economics and privileges when it becomes worth it.</p>
        <div className="site-actions">
          <Link className="site-primary" href="/founding">Join Founding 25</Link>
          <a className="site-secondary" href="#membership">See membership</a>
        </div>
        <div className="site-orbit">
          <span>MOVE</span><span>RECOVER</span><span>WORK</span><span>LIVE</span><span>CARE</span>
        </div>
      </section>

      <section className="site-section" id="how">
        <div className="site-section-head">
          <span>ONE SYSTEM</span>
          <h2>Membership is an upgrade, not an entrance fee.</h2>
        </div>
        <div className="site-grid four">
          <article><b>01</b><h3>Explore</h3><p>Curated premium places and experiences around your real schedule.</p></article>
          <article><b>02</b><h3>Ask Sēn</h3><p>Natural AI that plans, finds, books and explains — without hiding the rules.</p></article>
          <article><b>03</b><h3>Join people</h3><p>Circles and Squads designed to create real activity, not more screen time.</p></article>
          <article><b>04</b><h3>See your value</h3><p>Know what you used, what you could save, and when a membership would actually pay off.</p></article>
        </div>
      </section>

      <section className="site-section dark-section">
        <div className="site-section-head light">
          <span>SĒN AI</span>
          <h2>Tell it what life feels like today.</h2>
          <p>“Quero fazer alguma coisa depois das 19h, mas tô cansada.” Sēn works around time, distance, access and context — then asks before it acts.</p>
        </div>
        <div className="ai-example">
          <div className="bubble user">Quero fazer alguma coisa depois das 19h, mas tô cansada.</div>
          <div className="bubble ai">Eu deixaria hoje mais leve. Yoga às 20h, 9 min de você, Included no seu plano.</div>
        </div>
      </section>

      <section className="site-section" id="membership">
        <div className="site-section-head">
          <span>MEMBERSHIP</span>
          <h2>Choose the level of access.</h2>
          <p>Pricing is currently a pilot hypothesis and will be validated before public launch.</p>
        </div>
        <div className="site-grid three pricing-grid">
          <article><span>CORE</span><h3>R$ 399</h3><p>Strong everyday access to the network.</p><ul><li>Studios around 2× / week</li><li>Selected premium gyms</li><li>1 monthly Privilege</li></ul></article>
          <article className="featured"><span>PLUS</span><h3>R$ 799</h3><p>The balanced Sēn experience.</p><ul><li>Studios around 4× / week</li><li>More premium access</li><li>2 monthly Privileges</li></ul></article>
          <article className="black-plan"><span>BLACK</span><h3>R$ 1.299</h3><p>More rarity, Signature access and concierge.</p><ul><li>Studios around 6× / week</li><li>Signature access</li><li>3 monthly Privileges</li></ul></article>
        </div>
      </section>

      <section className="site-section city-section" id="cities">
        <span>FIRST CITY</span>
        <h2>Brasília, deliberately.</h2>
        <p>We’re starting dense rather than pretending to be everywhere: Lago Sul, Asa Sul, Sudoeste/Noroeste and Asa Norte first.</p>
        <Link className="site-primary" href="/">Explore the prototype</Link>
      </section>

      <footer className="sen-site-footer">
        <div className="brand-word site-logo">Sēn</div>
        <span>A more human tomorrow.</span>
      </footer>
    </main>
  );
}
