import type { IntentResult, MissionRisk, MissionComplexity } from './types';

const restrictedPatterns = [
  /arma|muni[cç][aã]o|faca|explosivo/i,
  /droga|maconha|coca[íi]na|thc|cbd/i,
  /rem[eé]dio controlado|receita m[eé]dica|tarja preta/i,
  /crian[cç]a|beb[eê]|buscar meu filho|pegar minha filha/i,
  /vigiar|seguir|perseguir|espionar/i,
  /dinheiro em esp[eé]cie|malote de dinheiro/i,
];

function findDeadline(text: string) {
  const explicit = text.match(/(?:at[eé]|antes das?|às|as)\s*([0-2]?\d)(?:h|:\d{2})/i)?.[0];
  if (explicit) return explicit.replace(/^\s*/, '');
  if (/amanh[aã]/i.test(text)) return 'Amanhã';
  if (/hoje/i.test(text)) return 'Hoje';
  if (/urgente|agora|imediato/i.test(text)) return 'Urgente';
  return 'A confirmar';
}

function findBudget(text: string) {
  const money = text.match(/r\$\s?\d{1,5}(?:[.,]\d{2})?/i)?.[0];
  if (money) return money.toUpperCase();
  const max = text.match(/at[eé]\s*(\d{2,5})\s*reais/i)?.[0];
  if (max) return max;
  return 'A definir';
}

function missionType(text: string): IntentResult['missionType'] {
  if (/presente|flor|flores|buqu[eê]|cart[aã]o|embrulh/i.test(text)) return 'gift';
  if (/comprar|pegar em loja|buscar na loja/i.test(text)) return 'buy';
  if (/buscar|retirar|pegar|levar|entregar/i.test(text)) return 'pickup_dropoff';
  if (/devolver|trocar|devolu[cç][aã]o/i.test(text)) return 'return';
  if (/verificar|olhar|conferir|foto|fotos|videochamada/i.test(text)) return 'verify';
  if (/evento|anivers[aá]rio|jantar|festa|surpresa/i.test(text)) return 'event';
  return 'other';
}

function objectiveFor(type: IntentResult['missionType']) {
  return {
    buy: 'Encontrar, comprar e entregar',
    pickup_dropoff: 'Retirar e entregar com segurança',
    return: 'Resolver devolução ou troca',
    verify: 'Verificar presencialmente e reportar',
    gift: 'Preparar e entregar presente',
    event: 'Organizar uma pequena experiência',
    other: 'Transformar o pedido em uma missão executável',
  }[type];
}

function stepsFor(type: IntentResult['missionType'], text: string) {
  const multi = /depois|tamb[eé]m|e levar|e trazer|v[aá]rias|vários|mais de um|m[uú]ltipl/i.test(text);
  const base = {
    buy: ['Confirmar produto', 'Reservar ou comprar', 'Coletar', 'Entregar com comprovante'],
    pickup_dropoff: ['Confirmar retirada', 'Coletar item', 'Transportar', 'Entregar com PIN'],
    return: ['Confirmar regra de troca/devolução', 'Coletar item', 'Ir ao estabelecimento', 'Enviar comprovante'],
    verify: ['Confirmar local', 'Ir até o endereço', 'Verificar o solicitado', 'Enviar fotos/relatório'],
    gift: ['Selecionar opção', 'Personalizar mensagem', 'Comprar/preparar', 'Entregar no prazo'],
    event: ['Entender estilo e orçamento', 'Criar plano', 'Confirmar fornecedores', 'Coordenar execução'],
    other: ['Triagem', 'Plano de execução', 'Confirmação', 'Execução'],
  } satisfies Record<IntentResult['missionType'], string[]>;
  return multi ? [...base[type], 'Confirmar conclusão da missão'] : base[type];
}

function assessRisk(text: string): { risk: MissionRisk; allowed: boolean; reason?: string } {
  const restricted = restrictedPatterns.find((pattern) => pattern.test(text));
  if (restricted) return { risk: 'restricted', allowed: false, reason: 'Essa missão parece envolver uma categoria restrita para o V0.' };
  if (/joia|rel[oó]gio|luxo|alto valor|caro|documento|passaporte|notebook|iphone/i.test(text)) return { risk: 'high', allowed: true };
  if (/entrar|chave|portaria|apartamento|casa/i.test(text)) return { risk: 'medium', allowed: true };
  return { risk: 'low', allowed: true };
}

function assessComplexity(text: string, type: IntentResult['missionType']): MissionComplexity {
  if (restrictedPatterns.some((pattern) => pattern.test(text))) return 'restricted';
  if (/evento|festa|mudar|mudan[cç]a|reformar|organizar/i.test(text)) return 'premium';
  if (/depois|esperar|trazer de volta|v[aá]rias|vários|mais de um|m[uú]ltipl/i.test(text)) return 'multi_step';
  if (type === 'event') return 'premium';
  return 'simple';
}

export function parseIntentLocally(raw: string): IntentResult {
  const text = raw.trim();
  const type = missionType(text);
  const riskAssessment = assessRisk(text);
  const complexity = assessComplexity(text, type);
  const constraints = [
    findDeadline(text) !== 'A confirmar' ? `Prazo: ${findDeadline(text)}` : undefined,
    findBudget(text) !== 'A definir' ? `Orçamento: ${findBudget(text)}` : undefined,
    /fr[aá]gil|cuidado|delicado/i.test(text) ? 'Item delicado' : undefined,
    /foto|fotos|comprovante/i.test(text) ? 'Exigir evidência visual' : undefined,
  ].filter(Boolean) as string[];

  return {
    objective: objectiveFor(type),
    missionType: type,
    steps: stepsFor(type, text),
    deadline: findDeadline(text),
    budget: findBudget(text),
    pickup: /buscar|retirar|pegar/i.test(text) ? 'Local de retirada a confirmar' : 'Não informado',
    destination: /entregar|levar|receber|chegar/i.test(text) ? 'Destino a confirmar' : 'Não informado',
    constraints,
    risk: riskAssessment.risk,
    complexity,
    confidence: riskAssessment.allowed ? 0.86 : 0.72,
    allowed: riskAssessment.allowed,
    refusalReason: riskAssessment.reason,
  };
}

export async function parseIntent(raw: string): Promise<IntentResult> {
  return parseIntentLocally(raw);
}
