'use client';

import { useState } from 'react';
import Link from 'next/link';

const tasks = [
  'Conclua o onboarding sem ajuda.',
  'Encontre uma aula de Reformer depois das 18h.',
  'Reserve como pessoa sem assinatura.',
  'Abra a Carteira e explique o que significa o saldo em R$.',
  'Encontre os Flex Packs e explique quando você escolheria um.',
  'Explique Preço Sēn, Preço de membro e Incluído.',
  'Peça à Sēn algo barato e perto.',
  'Mude alguma coisa no que a Sēn lembra.',
  'Encontre um Círculo ou Squad do qual você realmente participaria.',
  'Compare usar sem assinatura com Core usando suas próprias palavras.',
];

export default function ExternalTestPage() {
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!consent) {
    return (
      <main className="external-test-shell">
        <section className="test-card consent-card">
          <div className="test-brand">Sēn</div>
          <span className="test-kicker">PESQUISA DE PRODUTO</span>
          <h1>Ajude a gente a testar antes de explicar.</h1>
          <p>
            This is a prototype study for adults. There are no real charges, bookings or memberships.
            We want to see what feels obvious, confusing, useful or unnecessary.
          </p>
          <div className="test-rules">
            <div><b>25–30 min</b><span>Duração média</span></div>
            <div><b>Não existe resposta certa</b><span>Confusão também é dado</span></div>
            <div><b>Sem compra real</b><span>Somente protótipo</span></div>
          </div>
          <button className="test-primary" onClick={() => setConsent(true)}>Tenho 18+ e quero testar</button>
          <small>Ao continuar, você concorda em compartilhar feedback de pesquisa sobre esta sessão de protótipo.</small>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="external-test-shell">
        <section className="test-card finish-card">
          <div className="test-brand">Sēn</div>
          <span className="test-kicker">OBRIGADA</span>
          <h1>O teste terminou.</h1>
          <p>O que confundiu você importa mais do que o que ficou bonito. Agora vamos fazer algumas perguntas curtas.</p>
          <div className="finish-prompts">
            <b>Prepare-se para explicar:</b>
            <span>O que é a Sēn.</span>
            <span>Quando você continuaria sem assinatura.</span>
            <span>Quando você escolheria Core.</span>
            <span>Se a IA pareceu realmente útil.</span>
          </div>
          <Link className="test-secondary" href="/">Voltar ao protótipo</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="external-test-shell">
      <section className="test-card task-card">
        <div className="test-topline">
          <div className="test-brand">Sēn</div>
          <span>{step + 1} / {tasks.length}</span>
        </div>
        <span className="test-kicker">TAREFA {String(step + 1).padStart(2,'0')}</span>
        <h1>{tasks[step]}</h1>
        <p>
          Do this naturally. Don’t worry about breaking anything.
          If you get stuck, stay stuck for a moment — that is useful for us.
        </p>

        <div className="test-actions">
          <Link className="test-primary" href="/" target="_blank">Abrir protótipo ↗</Link>
          <button
            className="test-secondary"
            onClick={() => {
              if (step === tasks.length - 1) setFinished(true);
              else setStep((s) => s + 1);
            }}
          >
            {step === tasks.length - 1 ? 'Finalizar teste' : 'Terminei esta tarefa →'}
          </button>
        </div>

        {step > 0 && <button className="test-back" onClick={() => setStep((s)=>s-1)}>← Tarefa anterior</button>}
      </section>
    </main>
  );
}
