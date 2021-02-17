const getPresentWage = (weeks: number, hourlyWage: number, hours: number, teach: boolean): number => {
  let wage = weeks * hourlyWage * hours;
  if (teach) {
    wage = wage * 0.5;
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

  if (teach) {
    if (asSa) {
      wage = wage * 0.5;
    } else {
      wage = wage * 0.7;
    }
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