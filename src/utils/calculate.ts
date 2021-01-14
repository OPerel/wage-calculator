const getPresentWage = (weeks: number, rankWage: number, hours: number, teach: boolean): number => {
  let wage = weeks * rankWage * hours;
  if (teach) {
    wage = wage * 0.5;
  }
  return roundResult(wage);
}

const getFutureWage = (seniorityWage: number, hours: number, teach: boolean): number => {
  let wage = seniorityWage * (hours / 14);
  if (teach) {
    wage = wage * 0.7;
  }
  return roundResult(wage);
}

const getEmployerPensionPayments = (wage: number): number => roundResult(wage * 0.0708);

const roundResult = (wage: number): number => Math.round((wage + Number.EPSILON) * 100) / 100;

export {
  getPresentWage,
  getFutureWage,
  getEmployerPensionPayments
}