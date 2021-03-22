import handleCalcLogic, { FormState, Result } from '../src/utils/handleCalcLogic';

const dataResultPairs: [string, FormState, Result][] = [
  [
    'sapir teach noSa rank-a seniority-5 hours-5',
    {
      college: 'spr',
      preDealSa: false,
      position: ['teach'],
      multiPosition: false,
      rank: 'a',
      preDealSeniority: undefined,
      seniority: 5,
      hours: 5,
      hours2: undefined, 
    },
    {
      futureWage: 13925.80,
      futureWageByWeeks: 13141.31,
      pensionPayments: 985.95,
      presentWage: 14410.68,
      presentWageAsSa: undefined
    }
  ],
  [
    'ata teach noSa rank-b seniority-8 hours-9',
    {
      college: 'ata',
      preDealSa: false,
      position: ['teach'],
      multiPosition: false,
      rank: 'b',
      preDealSeniority: undefined,
      seniority: 8,
      hours: 9,
      hours2: undefined, 
    },
    {
      futureWage: 43879.59,
      futureWageByWeeks: undefined, // 43716.96
      pensionPayments: 3106.67,
      presentWage: 43716.96,
      presentWageAsSa: undefined
    }
  ],
  [
    'ahva prof preDealSa rank-a preDealSeniority-8 seniority-8 hours-6',
    {
      college: 'ahv',
      preDealSa: true,
      position: ['prof'],
      multiPosition: false,
      rank: 'a',
      preDealSeniority: 8,
      seniority: 8,
      hours: 6,
      hours2: undefined, 
    },
    {
      futureWage: 24364.52,
      futureWageByWeeks: 24137.1,
      pensionPayments: 1725.01,
      presentWage: undefined,
      presentWageAsSa: 21318.95
    }
  ],
  // [
  //   'hadasa prof noSa rank-b seniority-3 hours-14',
  //   {
  //     college: 'hds',
  //     preDealSa: false,
  //     position: ['prof'],
  //     multiPosition: false,
  //     rank: 'b',
  //     preDealSeniority: undefined,
  //     seniority: 3,
  //     hours: 14,
  //     hours2: undefined, 
  //   },
  //   {
  //     futureWage: 65956.02,
  //     futureWageByWeeks: 72861.6,
  //     pensionPayments: 5158.6,
  //     presentWage: 77719.04,
  //     presentWageAsSa: undefined
  //   }
  // ],
  [
    'seminar [teach, prof] preDealSa rank-a seniority-4 preDealSeniority-4 hours-6 hours2-6',
    {
      college: 'smk',
      preDealSa: true,
      position: ['teach', 'prof'],
      multiPosition: true,
      rank: 'a',
      preDealSeniority: 4,
      seniority: 4,
      hours: 6,
      hours2: 6, 
    },
    {
      futureWage: 40305.57,
      futureWageByWeeks: undefined, // 41033.07
      pensionPayments: 2853.63,
      presentWage: undefined,
      presentWageAsSa: 31118.28
    }
  ],
  [
    'shenkar [teach, prof] preDealSa rank-b seniority-7 preDealSeniority-7 hours-8 hours2-8',
    {
      college: 'snk',
      preDealSa: true,
      position: ['teach', 'prof'],
      multiPosition: true,
      rank: 'b',
      preDealSeniority: 7,
      seniority: 7,
      hours: 8,
      hours2: 8, 
    },
    {
      futureWage: 65859.82,
      futureWageByWeeks: undefined, // 70779.84
      pensionPayments: 4662.88,
      presentWage: undefined, 
      presentWageAsSa: 58111.61
    }
  ]
]

test.each(dataResultPairs)('test use case %# - %s', (_, input, output) => {
  const result = handleCalcLogic(input);
  expect(result).toStrictEqual(output);
})