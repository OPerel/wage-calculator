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
  presentWageAsMamah: undefined | number;
  presentWageAsSa: undefined | number;
  futureWageAsMamah: number;
  futureWageAsSa: number;
  pensionPayments: number;
  remainingHoursSa: number | undefined;
  remainingHoursMmh: number | undefined;
  college?: string;
}
