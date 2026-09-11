const items = [
  ['Pedido confirmado', 'Agora'],
  ['Operator selecionado', '+3 min'],
  ['Coleta iniciada', '+12 min'],
  ['Em rota', '+28 min'],
  ['Done', 'Estimado'],
];

export function MissionTimeline({ active = 1 }: { active?: number }) {
  return (
    <div className="timeline">
      {items.map(([label, time], index) => (
        <div key={label} className={`step ${index < active ? 'done' : index === active ? 'active' : ''}`}>
          <span className="dot">{index < active ? '✓' : index + 1}</span>
          <div><b>{label}</b><small>{time}</small></div>
        </div>
      ))}
    </div>
  );
}
