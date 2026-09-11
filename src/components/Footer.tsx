import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div className="logo"><span className="mark">M</span><span>Make It Happen</span></div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <Link href="/make">Pedir</Link>
          <Link href="/business">Empresas</Link>
          <Link href="/operator">Operators</Link>
          <Link href="/academy">Academy</Link>
          <Link href="/control-center">Admin</Link>
        </div>
        <div>Precisou. Aconteceu.</div>
      </div>
    </footer>
  );
}
