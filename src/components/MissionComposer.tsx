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

const missionTypeLabel: Record<IntentResult['missionType'], string> = {
  buy: 'Compra assistida',
  pickup_dropoff: 'Retirada + entrega',
  return: 'Troca ou devolução',
  verify: 'Verificação presencial',
  gift: 'Presente completo',
  event: 'Experiência / evento',
  other: 'Missão especial',
};

const riskLabel: Record<IntentResult['risk'], string> = {
  low: 'Baixo',
  medium: 'Moderado',
  high: 'Alto valor',
  restricted: 'Restrito',
};

const complexityLabel: Record<IntentResult['complexity'], string> = {
  simple: 'Direta',
  multi_step: 'Multi-etapas',
  premium: 'Premium',
  restricted: 'Restrita',
};

const modalLabel: Record<Operator['modal'], string> = {
  walk: 'A pé',
  bike: 'Bike',
  motorcycle: 'Moto',
  car: 'Carro',
  utility: 'Utilitário',
};

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
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Não consegui estruturar essa Mission ainda.');
      setQuoteData(data);
      setStage('understood');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  async function createMission() {
    if (!quoteData) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Não foi possível criar a Mission.');
      setMission(data.mission);
      setStage('tracking');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container section mission-section">
      <div className="glass mission-frame">
        <div className="kicker">Mission Engine · Alpha Brasília</div>
        <h1 className="display mission-title">O que precisa acontecer?</h1>
        <p className="lead mission-lead">Descreva o resultado. A Make It Happen transforma intenção em plano, preço, Operator e acompanhamento.</p>

        {stage === 'write' && (
          <div className="mission-stack">
            <label className="field">
              <span>Sua intenção</span>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="Ex.: Preciso buscar meu vestido, levar à costureira e receber em casa antes das 19h."
              />
            </label>
            <div className="pillrow">{examples.map((item) => <button className="pill" key={item} onClick={() => setRequest(item)}>{item}</button>)}</div>
            {error && <p style={{ color: 'var(--red)' }}>{error}</p>}
            <div className="action-footer">
              <button className="btn" disabled={!canSubmit || loading} onClick={understand}>{loading ? 'Interpretando...' : 'Transformar em Mission →'}</button>
              <span className="soft">Acesso limitado. Cobranças reais só entram após aprovação operacional.</span>
            </div>
          </div>
        )}

        {stage === 'understood' && quoteData && (
          <div className="grid two mission-grid">
            <div className="glass card">
              <div className="kicker">Entendi</div>
              <h2 className="display mission-card-title">{quoteData.intent.objective}</h2>
              <div className="grid info-grid">
                <Info label="Tipo" value={missionTypeLabel[quoteData.intent.missionType]} />
                <Info label="Prazo" value={quoteData.intent.deadline} />
                <Info label="Orçamento" value={quoteData.intent.budget} />
                <Info label="Risco" value={riskLabel[quoteData.intent.risk]} />
                <Info label="Execução" value={complexityLabel[quoteData.intent.complexity]} />
                <Info label="Confiança" value={`${Math.round(quoteData.intent.confidence * 100)}%`} />
              </div>
              <Confidence value={quoteData.intent.confidence} />
            </div>
            <div className="glass card">
              <div className="kicker">Plano da Mission</div>
              <div className="timeline roomy">
                {quoteData.intent.steps.map((step, index) => (
                  <div className="step active" key={step}>
                    <span className="dot">{index + 1}</span>
                    <div><b>{step}</b><small>Planejado para execução</small></div>
                  </div>
                ))}
              </div>
              <div className="action-footer">
                <button className="btn-ghost" onClick={() => setStage('write')}>Editar</button>
                <button className="btn" onClick={() => setStage('offer')}>Ver proposta →</button>
              </div>
            </div>
          </div>
        )}

        {stage === 'offer' && quoteData && (
          <div className="grid two mission-grid">
            <div className="glass card">
              <span className="badge gold">Recomendado</span>
              <h2 className="display mission-card-title">Nós conseguimos fazer acontecer.</h2>
              <p className="muted mission-copy">{quoteData.quote.explanation}</p>
              <div className="grid two info-grid">
                <Info label="Total estimado" value={`R$ ${quoteData.quote.estimatedTotal}`} />
                <Info label="Operator recebe" value={`R$ ${quoteData.quote.operatorPayout}`} />
                <Info label="Previsão" value={`${quoteData.quote.etaMinutes} min`} />
                <Info label="Proteção" value={`R$ ${quoteData.quote.protectionFee}`} />
              </div>
              <div className="action-footer">
                <button className="btn-ghost" onClick={() => setStage('understood')}>Voltar</button>
                <button className="btn" disabled={loading} onClick={createMission}>{loading ? 'Criando...' : 'Fazer acontecer →'}</button>
              </div>
            </div>
            <div className="glass card operator-card">
              <div className="kicker">Operator indicado</div>
              <h3 className="display mission-card-title">{quoteData.operator.name}</h3>
              <div className="grid info-grid">
                <Info label="Nível" value={quoteData.operator.level} />
                <Info label="Modal" value={modalLabel[quoteData.operator.modal]} />
                <Info label="Execution Score" value={`${quoteData.operator.score}/1000`} />
                <Info label="Histórico" value={`${quoteData.operator.completedMissions} Missions · ${quoteData.operator.rating}★`} />
              </div>
              <div className="pillrow">{quoteData.operator.skills.map((skill) => <span className="pill" key={skill}>{skill}</span>)}</div>
            </div>
          </div>
        )}

        {stage === 'tracking' && mission && (
          <div className="grid two mission-grid">
            <div className="glass card">
              <div className="kicker">Mission #{mission.id.slice(0, 8)}</div>
              <h2 className="display mission-card-title">Já estamos cuidando disso.</h2>
              <p className="muted mission-copy">Sua Mission entrou no fluxo de execução. O próximo passo é confirmar o Operator e iniciar a coleta.</p>
              <MissionTimeline active={3} />
              <div className="action-footer"><button className="btn" onClick={() => setStage('done')}>Simular conclusão →</button></div>
            </div>
            <div className="mapfake live-map"><span className="map-pin" style={{ left: '28%', top: '54%' }} /><span className="map-pin" style={{ left: '51%', top: '37%' }} /><span className="map-pin" style={{ left: '70%', top: '63%' }} /></div>
          </div>
        )}

        {stage === 'done' && mission && (
          <div className="glass card done-card">
            <span className="badge green">Done</span>
            <h2 className="display done-title">Aconteceu.</h2>
            <p className="lead">Missão concluída com evidência, histórico e próximo passo.</p>
            <div className="action-footer">
              <button className="btn" onClick={() => { setRequest(''); setQuoteData(null); setMission(null); setStage('write'); }}>Criar outra Mission</button>
              <a className="btn-dark" href={`/missions/${mission.id}`}>Abrir página da Mission</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Confidence({ value }: { value: number }) {
  return (
    <div className="confidence">
      <div><span>Confiança da interpretação</span><strong>{Math.round(value * 100)}%</strong></div>
      <div className="bar"><i style={{ width: `${Math.round(value * 100)}%` }} /></div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="info-tile"><div>{label}</div><strong>{value}</strong></div>;
}
