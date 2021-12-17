import handleCalcLogic from '../src/utils/handleCalcLogic';
import { FormState, Result } from '../src/interfaces';

const dataResultPairs: [string, FormState, Result][] = [
  [
    'rpn teach preDealSa rank-b seniority-4 hours-6',
    {
      existingTeacher: false,
      maxPrevHours: undefined,
      college: 'rpn',
      preDealSa: false,
      position: ['teach'],
      multiPosition: false,
      rank: 'b',
      preDealSeniority: undefined,
      seniority: 4,
      hours: 6,
      hours2: undefined,
    },
    {
      futureWage: 19924.87,
      futureWageByWeeks: 18944.02,
      pensionPayments: 1410.68,
      presentWage: 13531.44,
      presentWageAsSa: undefined
    }
  ],
  [
    'hadasa prof noSa rank-a seniority-2 hours-4',
    {
      existingTeacher: false,
      maxPrevHours: undefined,
      college: 'hds',
      preDealSa: false,
      position: ['prof'],
      multiPosition: false,
      rank: 'a',
      preDealSeniority: undefined,
      seniority: 2,
      hours: 4,
      hours2: undefined,
    },
    {
      futureWage: 15587.4,
      futureWageByWeeks: 15018.64,
      pensionPayments: 1103.59,
      presentWage: 15018.64,
      presentWageAsSa: undefined
    }
  ],
  [
    'ask prof noSa rank-a seniority-2 hours-4',
    {
      existingTeacher: true,
      maxPrevHours: 8,
      college: 'ask',
      preDealSa: false,
      position: ['prof'],
      multiPosition: false,
      rank: 'a',
      preDealSeniority: undefined,
      seniority: 8,
      hours: 12,
      hours2: undefined,
    },
    {
      futureWage: 48729.03,
      futureWageByWeeks: 47201.44,
      pensionPayments: 3450.02,
      presentWage: 47201.44,
      presentWageAsSa: undefined
    }
  ],
  [
    'ahv prof noSa rank-a seniority-2 hours-4',
    {
      existingTeacher: true,
      maxPrevHours: 7,
      college: 'ahv',
      preDealSa: true,
      position: ['prof'],
      multiPosition: false,
      rank: 'b',
      preDealSeniority: 3,
      seniority: 3,
      hours: 8,
      hours2: undefined,
    },
    {
      futureWage: 41288.24,
      futureWageByWeeks: 41288.24,
      pensionPayments: 2923.20,
      presentWage: undefined,
      presentWageAsSa: 32978.01
    }
  ]
]

test.each(dataResultPairs)('test use case %# - %s', (_, input, output) => {
  const result = handleCalcLogic(input);
  expect(result).toStrictEqual(output);
})
