const getPresentWage = (
  weeks: number,
  hourlyWage: number,
  hours: number,
  teach: boolean,
  college: string,
  asFuture = false
): number => {
  let wage = weeks * hourlyWage * hours;

  if (teach && college !== 'ata') {
    if (!asFuture && college !== 'spr') {
      wage = wage * 0.5;
    }
    if (asFuture) {
      wage = wage * 0.7;
    }
  }

  return roundResult(wage);
}

const getFutureWage = (
  seniorityWage: number,
  hours: number,
  teach: boolean,
  asSa = false,
  college?: string
): number => {
  let wage: number;
  const fourteenHourColleges = ['ata', 'bbr', 'snk', 'viz'];

  if (asSa && !fourteenHourColleges.includes(college)) {
    wage = seniorityWage * (hours / 16);
  } else {
    wage = seniorityWage * (hours / 14);
  }

  if (teach && college !== 'ata') {
    if (asSa) {
      wage = wage * 0.5;
    } else {
      wage = wage * 0.7;
    }
  }

  return roundResult(wage);
}

const getEmployerPensionPayments = (wage: number, preDealsa: boolean): number => {
  if (preDealsa) {
    return roundResult(wage * 0.075);
  }
  return roundResult(wage * 0.0708);
};

const roundResult = (wage: number): number => Math.round((wage + Number.EPSILON) * 100) / 100;

export {
  getPresentWage,
  getFutureWage,
  getEmployerPensionPayments
}
