import { getPresentWage, getFutureWage, getEmployerPensionPayments } from './calculate';

import colleges from '../assets/data/colleges';
import ranks from '../assets/data/wageByRank';
import wageBySeniority from '../assets/data/wageBySeniority';

export interface FormState {
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

  let result: Result = {
    presentWage: undefined,
    presentWageAsSa: undefined,
    futureWageByWeeks: undefined,
    futureWage: undefined,
    pensionPayments: undefined
  }
  
  const { weeks, futureWeeks } = colleges.find(c => c.name === college);
  let { hourlyWage } = ranks.find(r => r.name === rank);
  let seniorityWage = wageBySeniority[rank][seniority];
  let preDealSeniorityWage = wageBySeniority[rank][preDealSeniority];
  
  const teach = position[0] === 'teach';
  
  // if sapir and teacher fix rank values for present and future wages
  let sapirFutureHourlyWage: number;
  if (college === 'spr' && teach) {
    hourlyWage = ranks.find(r => r.name === '1').hourlyWage;
    sapirFutureHourlyWage = ranks.find(r => r.name === 'a').hourlyWage;
    seniorityWage = wageBySeniority['a'][seniority];
    preDealSeniorityWage = wageBySeniority['a'][preDealSeniority];
  }

  if (preDealSa) {
    result.presentWageAsSa = getFutureWage(preDealSeniorityWage, hours, teach, preDealSa, college);
    result.futureWage = undefined;
  } else {
    result.presentWage = getPresentWage(weeks, hourlyWage, hours, teach, college);
    result.presentWageAsSa = undefined;
  }

  if (futureWeeks) {
    result.futureWageByWeeks = getPresentWage(futureWeeks, sapirFutureHourlyWage || hourlyWage, hours, teach, college, true);
  } else {
    result.futureWageByWeeks = undefined;
  }

  result.futureWage = getFutureWage(seniorityWage, hours, teach, false, college);

  // if user is BOTH a teacher AND a professor, add professor calcs to result
  if (multiPosition) {
    // revert sapir rank values to user selected values for professor calcs
    if (college === 'spr') {
      hourlyWage = ranks.find(r => r.name === rank).hourlyWage;
      seniorityWage = wageBySeniority[rank][seniority];
      preDealSeniorityWage = wageBySeniority[rank][preDealSeniority];
    }

    if (preDealSa) {
      result.presentWageAsSa += getFutureWage(preDealSeniorityWage, hours2, false, preDealSa, college);
      result.presentWage = undefined;
    } else {
      result.presentWage += getPresentWage(weeks, hourlyWage, hours2, false, college);
      result.presentWageAsSa = undefined;
    }

    if (futureWeeks) {
      result.futureWageByWeeks += getPresentWage(futureWeeks, hourlyWage, hours2, false, college, true);
    } else {
      result.futureWageByWeeks = undefined;
    }

    result.futureWage += getFutureWage(seniorityWage, hours2, false);
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