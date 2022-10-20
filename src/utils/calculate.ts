// MAMA"H
const getPresentWage = (
  weeks: number,
  hourlyWage: number,
  hours: number,
  teach: boolean,
  college: string,
  maxPrevHours?: number,
  asFuture = false,
): number => {
  let wage: number;
  // divide hours to with bonus and without
  if (asFuture && maxPrevHours && college !== 'hit13' && college !== 'bbr') {
    const noBonusHours = hours - maxPrevHours;
    wage =
      weeks * hourlyWage * noBonusHours +
      (weeks + 1) * hourlyWage * maxPrevHours;
  } else {
    wage = weeks * hourlyWage * hours;
  }

  if (teach && college !== 'ata') {
    if (!asFuture && college !== 'spr') {
      wage = wage * 0.5;
    }
    if (asFuture) {
      wage = wage * 0.7;
    }
  }

  return roundResult(wage);
};

// S"A
const getFutureWage = (
  seniorityWage: number,
  hours: number,
  teach: boolean,
  asSa = false,
  college?: string,
  asFuture = false,
): number => {
  let wage: number;
  const fourteenHourColleges = ['ata', 'bbr', 'snk', 'viz'];

  if (asSa && !fourteenHourColleges.includes(college)) {
    wage = seniorityWage * (hours / 16);
  } else {
    wage = seniorityWage * (hours / 14);
  }

  if (teach && college !== 'ata') {
    if (!asFuture && college !== 'spr') {
      wage = wage * 0.5;
    }
    if (asFuture) {
      wage = wage * 0.7;
    }
  }

  return roundResult(wage);
};

const getEmployerPensionPayments = (
  wage: number,
  preDealSa: boolean,
): number => {
  if (preDealSa) {
    return roundResult(wage * 0.075);
  }
  return roundResult(wage * 0.0708);
};

const getRemainingHours = (
  futureWage: number,
  currentWage: number,
  hourlyRate: number,
) => {
  const result = roundResult((currentWage - futureWage) / hourlyRate);
  return result > 0 ? result : 0;
};

const roundResult = (wage: number): number =>
  Math.round((wage + Number.EPSILON) * 100) / 100;

export {
  getPresentWage,
  getFutureWage,
  getEmployerPensionPayments,
  getRemainingHours,
};
