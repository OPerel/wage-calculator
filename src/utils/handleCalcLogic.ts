import {
  getPresentWage,
  getFutureWage,
  getEmployerPensionPayments,
} from './calculate';
import colleges from '../assets/data/colleges';
import ranks from '../assets/data/wageByRank';
import wageBySeniority from '../assets/data/wageBySeniority';
import { FormState, Result } from '../interfaces';
import testStringGenerator from '../../tests/testGenerator';

export default function handleCalcLogic(state: FormState) {
  const {
    maxPrevHours,
    college,
    preDealSa,
    position,
    multiPosition,
    rank,
    preDealSeniority,
    seniority,
    hours,
    hours2,
  } = state;

  let result: Result = {
    presentWage: undefined,
    presentWageAsSa: undefined,
    futureWageByWeeks: undefined,
    futureWage: undefined,
    pensionPayments: undefined,
    remainingHoursMmh: undefined,
    remainingHoursSa: undefined
  };

  const { weeks, weeksForNew } = colleges.find(c => c.name === college);
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
    result.presentWageAsSa = getFutureWage(
      preDealSeniorityWage,
      hours,
      teach,
      preDealSa,
      college,
    );
    result.presentWage = null;
  } else {
    result.presentWage = getPresentWage(
      maxPrevHours ? weeks : weeksForNew,
      hourlyWage,
      hours,
      teach,
      college,
      maxPrevHours,
    );
    result.presentWageAsSa = null;
  }

  result.futureWageByWeeks = getPresentWage(
    weeksForNew,
    sapirFutureHourlyWage || hourlyWage,
    hours,
    teach,
    college,
    maxPrevHours,
    true,
  );

  result.futureWage = getFutureWage(
    seniorityWage,
    hours,
    teach,
    false,
    college,
    true,
  );

  // if user is BOTH a teacher AND a professor, add professor calcs to result
  if (multiPosition) {
    // revert sapir rank values to user selected values for professor calcs
    if (college === 'spr') {
      hourlyWage = ranks.find(r => r.name === rank).hourlyWage;
      seniorityWage = wageBySeniority[rank][seniority];
      preDealSeniorityWage = wageBySeniority[rank][preDealSeniority];
    }

    if (preDealSa) {
      result.presentWageAsSa += getFutureWage(
        preDealSeniorityWage,
        hours2,
        false,
        preDealSa,
        college,
        false,
      );
      result.presentWage = undefined;
    } else {
      result.presentWage += getPresentWage(
        maxPrevHours ? weeks : weeksForNew,
        hourlyWage,
        hours2,
        false,
        college,
        maxPrevHours,
      );
      result.presentWageAsSa = undefined;
    }

    result.futureWageByWeeks += getPresentWage(
      weeksForNew,
      hourlyWage,
      hours2,
      false,
      college,
      maxPrevHours,
      true,
    );

    result.futureWage += getFutureWage(
      seniorityWage,
      hours2,
      false,
      preDealSa,
      college,
      true,
    );
  }

  // if position is prof
  // check if present wage is higher than future wage
  if (
    position[0] === 'prof' &&
    result.futureWageByWeeks > result.futureWage &&
    !!maxPrevHours
  ) {
    result.futureWage = result.futureWageByWeeks;
  }

  result.pensionPayments = getEmployerPensionPayments(
    result.futureWage,
    preDealSa,
  );

  if (!preDealSa) {
    result.remainingHoursMmh = (result.futureWageByWeeks / result.presentWage) / hourlyWage;
    result.remainingHoursSa = (result.futureWage / result.presentWage) / hourlyWage;
  }

  // if running in dev mode
  // generate and log a test object for current use case
  if (process.env.NODE_ENV === 'development') {
    console.log(
      'Test Object: ',
      JSON.stringify(
        [testStringGenerator(state), state, result],
        (_, v) => (v === undefined ? null : v),
        2,
      ),
    );
  }

  return result;
}
