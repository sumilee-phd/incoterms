export type TradeDirection = 'export' | 'import';
export type TransportMode = 'ocean' | 'air' | 'multimodal' | 'undecided';

export interface RecommendationInput {
  direction: TradeDirection;
  transportMode: TransportMode;
  sellerPaysFreight: boolean;
  sellerPaysInsurance: boolean;
  sellerResponsibleToDestination: boolean;
  sellerPaysImportClearance: boolean;
}

export interface IncotermsDetail {
  code: string; // e.g., 'CIF'
  fullName: string; // e.g., 'Cost, Insurance and Freight'
  transportMode: string; // '해상운송' or '모든 운송 (복합운송)' or '모든 운송'
  freightPaidBy: string;
  insurancePaidBy: string;
  riskTransfer: string; // 위험 이전 시점
  exportClearance: '판매자' | '구매자' | '원칙상 구매자';
  importClearance: '판매자' | '구매자';
  oneLineExplanation: string; // 한 줄 설명
  recommendedReason: string; // 추천 이유
  sellerBurden: string[]; // 판매자 부담 상세
  buyerBurden: string[]; // 구매자 부담 상세
  precautions: string; // 실무 주의사항
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
