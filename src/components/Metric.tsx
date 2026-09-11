export function Metric({ value, label }: { value: string; label: string }) {
  return <div className="stat"><strong>{value}</strong><span>{label}</span></div>;
}
