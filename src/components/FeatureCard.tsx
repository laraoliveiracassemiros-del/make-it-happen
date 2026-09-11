export function FeatureCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="glass card">
      <div style={{ color: 'var(--gold)', fontSize: 24 }}>{icon}</div>
      <h3 style={{ margin: '18px 0 8px', fontSize: 22 }}>{title}</h3>
      <p className="muted" style={{ margin: 0, lineHeight: 1.65 }}>{text}</p>
    </div>
  );
}
