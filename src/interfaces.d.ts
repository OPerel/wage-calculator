export interface FormState {
  maxPrevHours: number;
  college: string;
  preDealSa: boolean;
  position: string[];
  multiPosition: boolean;
  rank: string;
  preDealSeniority: number;
  seniority: number;
  hours: number;
  hours2: number;
}

export interface Result {
  presentWage: undefined | number;
  presentWageAsSa: undefined | number;
  futureWageByWeeks: number;
  futureWage: number;
  pensionPayments: number;
  college?: string;
}
