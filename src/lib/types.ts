export type MissionStatus =
  | 'draft'
  | 'triage'
  | 'quoted'
  | 'paid'
  | 'matching'
  | 'assigned'
  | 'in_progress'
  | 'done'
  | 'cancelled'
  | 'rejected';

export type MissionRisk = 'low' | 'medium' | 'high' | 'restricted';
export type MissionComplexity = 'simple' | 'multi_step' | 'premium' | 'restricted';

export type IntentResult = {
  objective: string;
  missionType: 'buy' | 'pickup_dropoff' | 'return' | 'verify' | 'gift' | 'event' | 'other';
  steps: string[];
  deadline: string;
  budget: string;
  pickup: string;
  destination: string;
  constraints: string[];
  risk: MissionRisk;
  complexity: MissionComplexity;
  confidence: number;
  allowed: boolean;
  refusalReason?: string;
};

export type Quote = {
  currency: 'BRL';
  executionFee: number;
  platformFee: number;
  protectionFee: number;
  estimatedTotal: number;
  operatorPayout: number;
  etaMinutes: number;
  explanation: string;
};

export type Mission = {
  id: string;
  request: string;
  customerName?: string;
  customerWhatsapp?: string;
  region?: string;
  status: MissionStatus;
  intent: IntentResult;
  quote: Quote;
  createdAt: string;
  updatedAt: string;
};

export type Operator = {
  id: string;
  name: string;
  level: 'Core' | 'Pro' | 'Elite' | 'Signature';
  modal: 'walk' | 'bike' | 'motorcycle' | 'car' | 'utility';
  score: number;
  rating: number;
  completedMissions: number;
  online: boolean;
  city: string;
  skills: string[];
};
