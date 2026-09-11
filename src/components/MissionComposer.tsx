'use client';

import { useMemo, useState } from 'react';
import type { IntentResult, Mission, Operator, Quote } from '@/lib/types';
import { MissionTimeline } from './MissionTimeline';

type QuoteResponse = { intent: IntentResult; quote: Quote; operator: Operator };
type Stage = 'write' | 'understood' | 'offer' | 'tracking' | 'done';

const examples = [
  'Preciso de flores elegantes para minha mãe no trabalho hoje antes das 18h, até R$180.',
  'Buscar meu vestido na casa da minha amiga, levar para a costureira e entregar aqui antes das 19h.',
  'Comprar um carregador USB-C original e entregar no Noroeste ainda hoje.',
  'Verificar se uma loja tem uma bolsa disponível e me mandar fotos por videochamada.',
];

export function MissionComposer() {
  const [request, setRequest] = useState('');
  const [stage, setStage] = useState<Stage>('write');
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteResponse | null>(null);
  const [mission, setMission] = useState<Mission | null>(null);
  const [error, setError] = useState('');
  const canSubmit = useMemo(() => request.trim().length >= 8, [request]);

  async function understand() {
    if (!canSubmit) return;
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Falha ao interpretar.');
      setQuoteData(data); setStage('understood');
    } catch (err) { setError(err instanceof Error ? err.message : 'Erro inesperado.'); }
    finally { setLoading(false); }
  }

  async function createMission() {
    if (!quoteData) return;
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/missions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ request }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Não foi possível criar a Mission.');
      setMission(data.mission); setStage('tracking');
    } catch (err) { setError(err instanceof Error ? err.message : 'Erro inesperado.'); }
    finally { setLoading(false); }
  }

  return (
    <section className="container section" style={{ borderTop: 0, paddingTop: 26 }}>
      <div className="glass card" style={{ borderRadius: 38 }}>
        <div className="kicker">Mission Engine · Demo funcional</div>
        <h1 className="display" style={{ fontSize: 'clamp(52px, 8vw, 94px)', lineHeight: .9, margin: '16px 0' }}>O que precisa acontecer?</h1>
        <p className="lead">Digite uma intenção real. A base já chama APIs internas de interpretação, orçamento e criação de Mission.</p>

        {stage === 'write' && <div style={{ marginTop: 28 }}>
          <label className="field"><span>Sua intenção</span><textarea value={request} onChange={(e) => setRequest(e.target.value)} placeholder="Ex.: Preciso buscar meu vestido, levar à costureira e receber em casa antes das 19h." /></label>
          <div className="pillrow">{examples.map((item) => <button className="pill" key={item} onClick={() => setRequest(item)}>{item}</button>)}</div>
          {error && <p style={{ color: 'var(--red)' }}>{error}</p>}
          <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}><button className="btn" disabled={!canSubmit || loading} onClick={understand}>{loading ? 'Entendendo...' : 'Entender Mission →'}</button><span className="soft" style={{ alignSelf: 'center', fontSize: 13 }}>Checkout em modo demo.</span></div>
        </div>}

        {stage === 'understood' && quoteData && <div className="grid two" style={{ marginTop: 30 }}>
          <div className="glass card"><div className="kicker">Entendi</div><h2 className="display" style={{ fontSize: 48, margin: '12px 0' }}>{quoteData.intent.objective}</h2><div className="grid" style={{ marginTop: 20 }}><Info label="Tipo" value={quoteData.intent.missionType} /><Info label="Prazo" value={quoteData.intent.deadline} /><Info label="Orçamento" value={quoteData.intent.budget} /><Info label="Risco" value={quoteData.intent.risk} /><Info label="Complexidade" value={quoteData.intent.complexity} /><Info label="Confiança" value={`${Math.round(quoteData.intent.confidence * 100)}%`} /></div></div>
          <div className="glass card"><div className="kicker">Plano da Mission</div><div className="timeline" style={{ marginTop: 20 }}>{quoteData.intent.steps.map((step, index) => <div className="step active" key={step}><span className="dot">{index + 1}</span><div><b>{step}</b><small>Etapa planejada</small></div></div>)}</div><div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}><button className="btn-ghost" onClick={() => setStage('write')}>Editar</button><button className="btn" onClick={() => setStage('offer')}>Ver proposta →</button></div></div>
        </div>}

        {stage === 'offer' && quoteData && <div className="grid two" style={{ marginTop: 30 }}>
          <div className="glass card"><span className="badge gold">Recomendado</span><h2 className="display" style={{ fontSize: 56, margin: '16px 0 8px' }}>Nós conseguimos fazer acontecer.</h2><p className="muted" style={{ lineHeight: 1.7 }}>{quoteData.quote.explanation}</p><div className="grid two" style={{ marginTop: 22 }}><Info label="Total estimado" value={`R$ ${quoteData.quote.estimatedTotal}`} /><Info label="Operator recebe" value={`R$ ${quoteData.quote.operatorPayout}`} /><Info label="ETA" value={`${quoteData.quote.etaMinutes} min`} /><Info label="Proteção" value={`R$ ${quoteData.quote.protectionFee}`} /></div><div style={{ marginTop: 26, display: 'flex', gap: 12, flexWrap: 'wrap' }}><button className="btn-ghost" onClick={() => setStage('understood')}>Voltar</button><button className="btn" disabled={loading} onClick={createMission}>{loading ? 'Criando...' : 'Fazer acontecer →'}</button></div></div>
          <div className="glass card"><div className="kicker">Operator indicado</div><h3 className="display" style={{ fontSize: 48, margin: '14px 0' }}>{quoteData.operator.name}</h3><div className="grid"><Info label="Nível" value={quoteData.operator.level} /><Info label="Modal" value={quoteData.operator.modal} /><Info label="Execution Score" value={`${quoteData.operator.score}/1000`} /><Info label="Histórico" value={`${quoteData.operator.completedMissions} Missions · ${quoteData.operator.rating}★`} /></div><div className="pillrow">{quoteData.operator.skills.map((skill) => <span className="pill" key={skill}>{skill}</span>)}</div></div>
        </div>}

        {stage === 'tracking' && mission && <div className="grid two" style={{ marginTop: 30 }}><div className="glass card"><div className="kicker">Mission #{mission.id.slice(0, 8)}</div><h2 className="display" style={{ fontSize: 56, margin: '16px 0' }}>Já estamos cuidando disso.</h2><MissionTimeline active={3} /><div style={{ marginTop: 26 }}><button className="btn" onClick={() => setStage('done')}>Simular conclusão →</button></div></div><div className="mapfake"><span className="map-pin" style={{ left: '28%', top: '54%' }} /><span className="map-pin" style={{ left: '51%', top: '37%' }} /><span className="map-pin" style={{ left: '70%', top: '63%' }} /></div></div>}

        {stage === 'done' && mission && <div style={{ marginTop: 32 }} className="glass card"><span className="badge green">Done</span><h2 className="display" style={{ fontSize: 'clamp(58px, 8vw, 110px)', margin: '18px 0 4px' }}>Aconteceu.</h2><p className="lead">Missão concluída com evidência, histórico e próximo passo.</p><div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}><button className="btn" onClick={() => { setRequest(''); setQuoteData(null); setMission(null); setStage('write'); }}>Criar outra Mission</button><a className="btn-dark" href={`/missions/${mission.id}`}>Abrir página da Mission</a></div></div>}
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div style={{ border: '1px solid var(--line)', borderRadius: 18, padding: 16, background: 'rgba(255,255,255,.025)' }}><div className="soft" style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase' }}>{label}</div><div style={{ marginTop: 8, fontSize: 16 }}>{value}</div></div>;
}
