import { FormState } from '../src/interfaces';

export default function ({
  maxPrevHours,
  college,
  preDealSa,
  position,
  rank,
  preDealSeniority,
  seniority,
  hours,
  hours2,
}: FormState): string {
  return (
    college +
    ' ' +
    JSON.stringify(position) +
    ' ' +
    (maxPrevHours ? 'max-' + `${maxPrevHours} ` : '') +
    (preDealSa ? 'preDealSa' : 'noSa') +
    ' ' +
    'rank-' +
    rank +
    ' ' +
    'seniority-' +
    `${seniority}` +
    ' ' +
    (preDealSeniority ? 'preDealSeniority-' + `${preDealSeniority} ` : '') +
    'hours-' +
    `${hours}` +
    ' ' +
    (hours2 ? 'hours2-' + `${hours2}` : '')
  );
}
