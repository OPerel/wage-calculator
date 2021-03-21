import handleCalcLogic, { FormState, Result } from '../src/utils/handleCalcLogic';

const dataResultPairs: [string, FormState, Result][] = [
  [
    'some name',
    {
      college: 'ata',
      preDealSa: false,
      position: ['teach'],
      multiPosition: false,
      rank: '1',
      preDealSeniority: undefined,
      seniority: 2,
      hours: 3,
      hours2: undefined, 
    },
    {
      futureWage: 7381.08,
      futureWageByWeeks: undefined,
      pensionPayments: 522.58,
      presentWage: 7381.08,
      presentWageAsSa: undefined
    }
  ],
  [
    'another name',
    {
      college: 'ata',
      preDealSa: false,
      position: ['teach'],
      multiPosition: false,
      rank: '1',
      preDealSeniority: undefined,
      seniority: 2,
      hours: 3,
      hours2: undefined, 
    },
    {
      futureWage: 7381.08,
      futureWageByWeeks: undefined,
      pensionPayments: 522.58,
      presentWage: 7381.08,
      presentWageAsSa: undefined
    }
  ]
]

test.each(dataResultPairs)('test use case %# - %s', (_, input, output) => {
  const result = handleCalcLogic(input);
  expect(result).toStrictEqual(output);
})