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
      futureWageByWeeks: 43716.96,
      pensionPayments: 3106.67,
      presentWage: 43716.96,
      presentWageAsSa: undefined
    }
  ],
  [
    'ahva prof preDealSa rank-a seniority-8 preDealSeniority-8 hours-6',
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
      pensionPayments: 1827.34,
      presentWage: undefined,
      presentWageAsSa: 21318.95
    }
  ],
  [
    'hadasa prof noSa rank-b seniority-3 hours-14',
    {
      college: 'hds',
      preDealSa: false,
      position: ['prof'],
      multiPosition: false,
      rank: 'b',
      preDealSeniority: undefined,
      seniority: 3,
      hours: 14,
      hours2: undefined,
    },
    {
      futureWage: 72861.6,
      futureWageByWeeks: 72861.6,
      pensionPayments: 5158.6,
      presentWage: 77719.04,
      presentWageAsSa: undefined
    }
  ],
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
      futureWageByWeeks: 41033.07,
      pensionPayments: 3022.92,
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
      futureWageByWeeks: 70779.84,
      pensionPayments: 4939.49,
      presentWage: undefined,
      presentWageAsSa: 58111.61
    }
  ],
  [
    'holon 16.8 [teach] noSa rank-a seniority-9 hours-7',
    {
      college: 'hit168',
      preDealSa: false,
      position: ['teach'],
      multiPosition: false,
      rank: 'a',
      preDealSeniority: undefined,
      seniority: 9,
      hours: 7,
      hours2: undefined
    },
    {
      futureWage: 20031.63,
      futureWageByWeeks: 18397.83,
      pensionPayments: 1418.24,
      presentWage: 15769.57,
      presentWageAsSa: undefined
    }
  ],
  [
    'rupin [teach] noSa rank-1 seniority-8 hours-8',
    {
      college: 'rpn',
      preDealSa: false,
      position: ['teach'],
      multiPosition: false,
      rank: '1',
      preDealSeniority: undefined,
      seniority: 8,
      hours: 8,
      hours2: undefined
    },
    {
      futureWage: 13356.25,
      futureWageByWeeks: 13778.02,
      pensionPayments: 945.62,
      presentWage: 9841.44,
      presentWageAsSa: undefined
    }
  ],
  [
    'kineret [prof] noSa rank-a seniority-12 hours-2',
    {
      college: 'cnr',
      preDealSa: false,
      position: ['prof'],
      multiPosition: false,
      rank: 'a',
      preDealSeniority: undefined,
      seniority: 12,
      hours: 2,
      hours2: undefined
    },
    {
      futureWage: 8340.08,
      futureWageByWeeks: 7509.32,
      pensionPayments: 590.48,
      presentWage: 7509.32,
      presentWageAsSa: undefined
    }
  ],
  [
    'beit-berl [prof] preDealSa rank-b seniority-4 preDealSeniority-4 hours-12',
    {
      college: 'bbr',
      preDealSa: true,
      position: ['prof'],
      multiPosition: false,
      rank: 'b',
      preDealSeniority: 4,
      seniority: 4,
      hours: 12,
      hours2: undefined,
    },
    {
      futureWage: 56928.19,
      futureWageByWeeks: 58289.28,
      pensionPayments: 4269.61,
      presentWage: undefined,
      presentWageAsSa: 56928.19
    }
  ],
  [
    'azrieli [teach, prof] noSa rank-1 seniority-9 hours-10 hours2-4',
    {
      college: 'azr',
      preDealSa: false,
      position: ['teach', 'prof'],
      multiPosition: true,
      rank: '1',
      preDealSeniority: undefined,
      seniority: 9,
      hours: 10,
      hours2: 4,
    },
    {
      futureWage: 26408.770000000004,
      futureWageByWeeks: 27063.96,
      pensionPayments: 1869.74,
      presentWage: 22143.239999999998,
      presentWageAsSa: undefined
    }
  ],
  [
    'ashkelon [teach, prof] noSa rank-a seniority-14 hours-4 hours2-8',
    {
      college: 'ask',
      preDealSa: false,
      position: ['teach', 'prof'],
      multiPosition: true,
      rank: 'a',
      preDealSeniority: undefined,
      seniority: 14,
      hours: 4,
      hours2: 8,
    },
    {
      futureWage: 45626.229999999996,
      futureWageByWeeks: 43446.78,
      pensionPayments: 3230.34,
      presentWage: 40228.5,
      presentWageAsSa: undefined
    }
  ]
]

test.each(dataResultPairs)('test use case %# - %s', (_, input, output) => {
  const result = handleCalcLogic(input);
  expect(result).toStrictEqual(output);
})
