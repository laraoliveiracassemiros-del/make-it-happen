import type { IntentResult, Quote } from './types';

export function createQuote(intent: IntentResult): Quote {
  const base = intent.complexity === 'premium' ? 120 : intent.complexity === 'multi_step' ? 58 : 32;
  const risk = intent.risk === 'high' ? 34 : intent.risk === 'medium' ? 14 : 0;
  const urgency = /urgente|hoje|antes/i.test(intent.deadline) ? 16 : 0;
  const executionFee = base + risk + urgency;
  const platformFee = Math.max(9, Math.round(executionFee * 0.22));
  const protectionFee = intent.risk === 'high' ? 12 : intent.risk === 'medium' ? 7 : 4;
  const estimatedTotal = executionFee + platformFee + protectionFee;
  const operatorPayout = Math.round(executionFee * 0.78);
  const etaMinutes = intent.complexity === 'premium' ? 180 : intent.complexity === 'multi_step' ? 75 : 38;

  return {
    currency: 'BRL',
    executionFee,
    platformFee,
    protectionFee,
    estimatedTotal,
    operatorPayout,
    etaMinutes,
    explanation:
      intent.complexity === 'premium'
        ? 'Missão premium: exige planejamento, fornecedores e coordenação humana.'
        : intent.complexity === 'multi_step'
          ? 'Missão multi-etapas: inclui tempo de execução, deslocamento e coordenação.'
          : 'Missão simples: execução direta com Operator verificado.',
  };
}
