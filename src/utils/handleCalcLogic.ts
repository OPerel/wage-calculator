import { getPresentWage, getFutureWage, getEmployerPensionPayments } from './calculate';

import colleges from '../assets/data/colleges';
import ranks from '../assets/data/wageByRank';
import wageBySeniority from '../assets/data/wageBySeniority';

interface FormState {
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

interface Result {
  presentWage: undefined | number,
  presentWageAsSa: undefined | number,
  futureWageByWeeks: undefined | number,
  futureWage: undefined | number
  pensionPayments: undefined | number
}

export default function handleCalcLogic({
  college,
  preDealSa,
  position,
  multiPosition,
  rank,
  preDealSeniority,
  seniority,
  hours,
  hours2,
}: FormState) {

  const { weeks, futureWeeks } = colleges.find(c => c.name === college);
  const { hourlyWage } = ranks.find(r => r.name === rank);
  const seniorityWage = wageBySeniority[rank][seniority];
  const preDealSeniorityWage = wageBySeniority[rank][preDealSeniority];

  let result: Result = {
    presentWage: undefined,
    presentWageAsSa: undefined,
    futureWageByWeeks: undefined,
    futureWage: undefined,
    pensionPayments: undefined
  }

  // if user is EITHER a teacher OR a professor
  if (!multiPosition) {
    const teach = position[0] === 'teach';

    if (preDealSa) {
      result.presentWageAsSa = getFutureWage(preDealSeniorityWage, hours, teach, preDealSa, college);
      result.futureWage = undefined;
    } else {
      result.presentWage = getPresentWage(weeks, hourlyWage, hours, teach);
      result.presentWageAsSa = undefined;
    }

    if (futureWeeks) {
      result.futureWageByWeeks = getPresentWage(futureWeeks, hourlyWage, hours, teach);
    } else {
      result.futureWageByWeeks = undefined;
    }

    result.futureWage = getFutureWage(seniorityWage, hours, teach);

  // if user is BOTH a teacher AND a professor
  } else {
    if (preDealSa) {
      result.presentWageAsSa = getFutureWage(preDealSeniorityWage, hours, true, preDealSa, college) +
        getFutureWage(preDealSeniorityWage, hours, false, preDealSa, college);
      result.presentWage = undefined;
    } else {
      result.presentWage = getPresentWage(weeks, hourlyWage, hours, true) +
        getPresentWage(weeks, hourlyWage, hours2, false);
      result.presentWageAsSa = undefined;
    }

    if (futureWeeks) {
      result.futureWageByWeeks = getPresentWage(futureWeeks, hourlyWage, hours, true) +
        getPresentWage(futureWeeks, hourlyWage, hours2, false);
    } else {
      result.futureWageByWeeks = undefined;
    }

    result.futureWage = getFutureWage(seniorityWage, hours, true) +
      getFutureWage(seniorityWage, hours2, false);
  }

  // if preDealSa is false
  if (!preDealSa) {
    // check if present wage is higher than future wage
    if (result.futureWageByWeeks) {
      if (result.futureWageByWeeks > result.futureWage) {
        result.futureWage = result.futureWageByWeeks;
      }
    } else {
      if (result.presentWage > result.futureWage) {
        result.futureWage = result.presentWage;
      }
    }
  }

  result.pensionPayments = getEmployerPensionPayments(result.futureWage);

  return result;
}