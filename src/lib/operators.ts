import type { Operator } from './types';

export const demoOperators: Operator[] = [
  {
    id: 'op_elite_rafael',
    name: 'Rafael M.',
    level: 'Elite',
    modal: 'car',
    score: 984,
    rating: 4.98,
    completedMissions: 1247,
    online: true,
    city: 'Brasília',
    skills: ['Alto valor', 'Multi-paradas', 'Missões premium'],
  },
  {
    id: 'op_pro_camila',
    name: 'Camila R.',
    level: 'Pro',
    modal: 'motorcycle',
    score: 941,
    rating: 4.94,
    completedMissions: 638,
    online: true,
    city: 'Brasília',
    skills: ['Retirada rápida', 'Trocas e devoluções', 'Protocolo seguro'],
  },
  {
    id: 'op_core_diego',
    name: 'Diego A.',
    level: 'Core',
    modal: 'bike',
    score: 876,
    rating: 4.87,
    completedMissions: 214,
    online: true,
    city: 'Brasília',
    skills: ['Regiões densas', 'Itens pequenos', 'Entrega urbana'],
  },
];

export function recommendOperator(complexity: string, risk: string) {
  if (complexity === 'premium' || risk === 'high') return demoOperators[0];
  if (complexity === 'multi_step') return demoOperators[1];
  return demoOperators[2];
}
