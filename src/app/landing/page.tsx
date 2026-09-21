import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="sen-site">
      <nav className="sen-site-nav">
        <div className="brand-word site-logo">Sēn</div>
        <div className="site-nav-links">
          <a href="#how">Como funciona</a>
          <a href="#membership">Assinatura</a>
          <a href="#cities">Brasília</a>
          <Link className="site-cta" href="/">Abrir protótipo</Link>
        </div>
      </nav>

      <section className="site-hero">
        <div className="site-kicker">UMA CAMADA INTELIGENTE PARA A VIDA REAL</div>
        <h1>Mais vida.<br />Menos atrito.</h1>
        <p>A Sēn ajuda você a descobrir, planejar, reservar e viver mais fora da tela. Use primeiro; a assinatura melhora acesso, preço e benefícios quando realmente fizer sentido.</p>
        <div className="site-actions">
          <Link className="site-primary" href="/founding">Entrar no Founding 25</Link>
          <a className="site-secondary" href="#membership">Ver assinatura</a>
        </div>
        <div className="site-orbit">
          <span>MOVE</span><span>RECOVER</span><span>WORK</span><span>LIVE</span><span>CARE</span>
        </div>
      </section>

      <section className="site-section" id="how">
        <div className="site-section-head">
          <span>UM SISTEMA</span>
          <h2>Assinatura is an upgrade, not an entrance fee.</h2>
        </div>
        <div className="site-grid four">
          <article><b>01</b><h3>Explorar</h3><p>Lugares e experiências selecionados para a sua rotina real.</p></article>
          <article><b>02</b><h3>Falar com a Sēn</h3><p>IA natural que encontra, organiza, reserva e explica sem esconder as regras.</p></article>
          <article><b>03</b><h3>Encontrar pessoas</h3><p>Círculos e Squads feitos para criar vida real, não mais tempo de tela.</p></article>
          <article><b>04</b><h3>Entender seu uso</h3><p>Veja o que usou, quanto economizou e quando uma assinatura passa a valer a pena.</p></article>
        </div>
      </section>

      <section className="site-section dark-section">
        <div className="site-section-head light">
          <span>SĒN AI</span>
          <h2>Fale como o seu dia está de verdade.</h2>
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
          <h2>Escolha o nível de acesso quando fizer sentido.</h2>
          <p>Os preços ainda são hipóteses de piloto e serão validados antes do lançamento.</p>
        </div>
        <div className="site-grid three pricing-grid">
          <article><span>CORE</span><h3>R$ 399</h3><p>Acesso forte para o dia a dia.</p><ul><li>Studios around 2× / week</li><li>Selected premium gyms</li><li>1 monthly Privilege</li></ul></article>
          <article className="featured"><span>PLUS</span><h3>R$ 799</h3><p>Uma experiência Sēn mais completa.</p><ul><li>Studios around 4× / week</li><li>More premium access</li><li>2 monthly Privileges</li></ul></article>
          <article className="black-plan"><span>BLACK</span><h3>R$ 1.299</h3><p>Mais acesso especial, Signature e concierge.</p><ul><li>Studios around 6× / week</li><li>Signature access</li><li>3 monthly Privileges</li></ul></article>
        </div>
      </section>

      <section className="site-section city-section" id="cities">
        <span>PRIMEIRA CIDADE</span>
        <h2>Brasília, de propósito.</h2>
        <p>Vamos começar densos em vez de fingir presença em todo lugar: Lago Sul, Asa Sul, Sudoeste/Noroeste e Asa Norte primeiro.</p>
        <Link className="site-primary" href="/">Explorar the prototype</Link>
      </section>

      <footer className="sen-site-footer">
        <div className="brand-word site-logo">Sēn</div>
        <span>Um amanhã mais humano.</span>
      </footer>
    </main>
  );
}
