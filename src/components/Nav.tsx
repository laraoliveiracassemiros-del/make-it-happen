import Link from 'next/link';

export function Nav() {
  return (
    <nav className="nav container">
      <Link href="/" className="logo" aria-label="Make It Happen">
        <span className="mark">M</span>
        <span>Make It Happen</span>
      </Link>
      <div className="navlinks">
        <Link href="/make">Pedir</Link>
        <Link href="/operator">Operators</Link>
        <Link href="/academy">Academy</Link>
        <Link href="/control-center">Control Center</Link>
      </div>
      <div className="nav-actions">
        <Link className="btn-dark" href="/operator">Ser Operator</Link>
        <Link className="btn" href="/make">Começar agora →</Link>
      </div>
    </nav>
  );
}
