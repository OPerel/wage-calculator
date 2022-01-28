import handleCalcLogic from '../src/utils/handleCalcLogic';
import { FormState, Result } from '../src/interfaces';

const dataResultPairs: [string, FormState, Result][] = [
  [
    "rpn [\"teach\"] preDealSa rank-b seniority-4 preDealSeniority-4 hours-6 ",
    {
      "maxPrevHours": null,
      "college": "rpn",
      "preDealSa": true,
      "position": [
        "teach"
      ],
      "multiPosition": false,
      "rank": "b",
      "preDealSeniority": 4,
      "seniority": 4,
      "hours": 6,
      "hours2": null
    },
    {
      "presentWage": null,
      "presentWageAsSa": 12453.04,
      "futureWageByWeeks": 18944.02,
      "futureWage": 19924.87,
      "pensionPayments": 1494.37
    }
  ],
  [
    'hds prof noSa rank-a seniority-2 hours-4',
    {
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
      presentWageAsSa: null
    }
  ],
  [
    "hit13 [\"teach\"] max-7 noSa rank-a seniority-7 hours-5 ",
    {
      "maxPrevHours": 7,
      "college": "hit13",
      "preDealSa": false,
      "position": [
        "teach"
      ],
      "multiPosition": false,
      "rank": "a",
      "preDealSeniority": null,
      "seniority": 7,
      "hours": 5,
      "hours2": null
    },
    {
      "presentWage": 8716.17,
      "presentWageAsSa": null,
      "futureWageByWeeks": 12202.64,
      "futureWage": 14116.95,
      "pensionPayments": 999.48
    }
  ],
  [
    "bbr [\"prof\"] max-8 noSa rank-b seniority-10 hours-10 ",
    {
      "maxPrevHours": 8,
      "college": "bbr",
      "preDealSa": false,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "b",
      "preDealSeniority": null,
      "seniority": 10,
      "hours": 10,
      "hours2": null
    },
    {
      "presentWage": 48574.4,
      "presentWageAsSa": null,
      "futureWageByWeeks": 48574.4,
      "futureWage": 49412.53,
      "pensionPayments": 3498.41
    }
  ],
  [
    "azr [\"prof\"] preDealSa rank-a seniority-4 preDealSeniority-4 hours-4 ",
    {
      "maxPrevHours": null,
      "college": "azr",
      "preDealSa": true,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "a",
      "preDealSeniority": 4,
      "seniority": 4,
      "hours": 4,
      "hours2": null
    },
    {
      "presentWage": null,
      "presentWageAsSa": 13830.35,
      "futureWageByWeeks": 13945.88,
      "futureWage": 15806.11,
      "pensionPayments": 1185.46
    }
  ],
  [
    "cnr [\"prof\"] max-6 preDealSa rank-b seniority-8 preDealSeniority-8 hours-14 ",
    {
      "maxPrevHours": 6,
      "college": "cnr",
      "preDealSa": true,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "b",
      "preDealSeniority": 8,
      "seniority": 8,
      "hours": 14,
      "hours2": null
    },
    {
      "presentWage": null,
      "presentWageAsSa": 59725,
      "futureWageByWeeks": 65228.48,
      "futureWage": 68257.14,
      "pensionPayments": 5119.29
    }
  ],
  [
    "hit15 [\"teach\"] max-8 noSa rank-a seniority-5 hours-10 ",
    {
      "maxPrevHours": 8,
      "college": "hit15",
      "preDealSa": false,
      "position": [
        "teach"
      ],
      "multiPosition": false,
      "rank": "a",
      "preDealSeniority": null,
      "seniority": 5,
      "hours": 10,
      "hours2": null
    },
    {
      "presentWage": 20114.25,
      "presentWageAsSa": null,
      "futureWageByWeeks": 25907.15,
      "futureWage": 27851.61,
      "pensionPayments": 1971.89
    }
  ],
  [
    "ask [\"prof\"] preDealSa rank-b seniority-4 preDealSeniority-4 hours-12 ",
    {
      "maxPrevHours": null,
      "college": "ask",
      "preDealSa": true,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "b",
      "preDealSeniority": 4,
      "seniority": 4,
      "hours": 12,
      "hours2": null
    },
    {
      "presentWage": null,
      "presentWageAsSa": 49812.17,
      "futureWageByWeeks": 58289.28,
      "futureWage": 58289.28,
      "pensionPayments": 4371.7
    }
  ],
  [
    "ask [\"prof\"] max-8 noSa rank-a seniority-8 hours-12 ",
    {
      "maxPrevHours": 8,
      "college": "ask",
      "preDealSa": false,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "a",
      "preDealSeniority": null,
      "seniority": 8,
      "hours": 12,
      "hours2": null
    },
    {
      "presentWage": 48274.2,
      "presentWageAsSa": null,
      "futureWageByWeeks": 47201.44,
      "futureWage": 48729.03,
      "pensionPayments": 3450.02
    }
  ],
  [
    "ahv [\"prof\"] max-7 preDealSa rank-b seniority-3 preDealSeniority-3 hours-8 ",
    {
      "maxPrevHours": 7,
      "college": "ahv",
      "preDealSa": true,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "b",
      "preDealSeniority": 3,
      "seniority": 3,
      "hours": 8,
      "hours2": null
    },
    {
      "presentWage": null,
      "presentWageAsSa": 32978.01,
      "futureWageByWeeks": 41288.24,
      "futureWage": 41288.24,
      "pensionPayments": 3096.62
    }
  ],
  [
    'hit13 prof existingTeacher max5 noSa rank-a seniority-4 hours-8',
    {
      maxPrevHours: 5,
      college: 'hit13',
      preDealSa: false,
      position: ['prof'],
      multiPosition: false,
      rank: 'a',
      preDealSeniority: undefined,
      seniority: 4,
      hours: 8,
      hours2: undefined,
    },
    {
      futureWage: 31612.22,
      futureWageByWeeks: 27891.76,
      pensionPayments: 2238.15,
      presentWage: 27891.76,
      presentWageAsSa: null
    }
  ],
  [
    "bbr [\"prof\"] preDealSa rank-b seniority-12 preDealSeniority-4 hours-6 ",
    {
      "maxPrevHours": null,
      "college": "bbr",
      "preDealSa": true,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "b",
      "preDealSeniority": 4,
      "seniority": 12,
      "hours": 6,
      "hours2": null
    },
    {
      "presentWage": null,
      "presentWageAsSa": 28464.09,
      "futureWageByWeeks": 29144.64,
      "futureWage": 30041.67,
      "pensionPayments": 2253.13
    }
  ],
  [
    "spr [\"teach\"] max-4 noSa rank-1 seniority-8 hours-7 ",
    {
      "maxPrevHours": 4,
      "college": "spr",
      "preDealSa": false,
      "position": [
        "teach"
      ],
      "multiPosition": false,
      "rank": "1",
      "preDealSeniority": null,
      "seniority": 8,
      "hours": 7,
      "hours2": null
    },
    {
      "presentWage": 20174.95,
      "presentWageAsSa": null,
      "futureWageByWeeks": 17834.63,
      "futureWage": 19897.69,
      "pensionPayments": 1408.76
    }
  ],
  [
    "viz [\"prof\"] max-8 noSa rank-a seniority-5 hours-10 ",
    {
      "maxPrevHours": 8,
      "college": "viz",
      "preDealSa": false,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "a",
      "preDealSeniority": null,
      "seniority": 5,
      "hours": 10,
      "hours2": null
    },
    {
      "presentWage": 40228.5,
      "presentWageAsSa": null,
      "futureWageByWeeks": 39692.12,
      "futureWage": 39788.01,
      "pensionPayments": 2816.99
    }
  ],
  [
    "snk [\"prof\"] max-8 preDealSa rank-a seniority-6 preDealSeniority-6 hours-8 ",
    {
      "maxPrevHours": 8,
      "college": "snk",
      "preDealSa": true,
      "position": [
        "prof"
      ],
      "multiPosition": false,
      "rank": "a",
      "preDealSeniority": 6,
      "seniority": 6,
      "hours": 8,
      "hours2": null
    },
    {
      "presentWage": null,
      "presentWageAsSa": 32049.12,
      "futureWageByWeeks": 32182.8,
      "futureWage": 32182.8,
      "pensionPayments": 2413.71
    }
  ],
  [
    "smk [\"teach\"] max-9 preDealSa rank-b seniority-9 preDealSeniority-9 hours-11 ",
    {
      "maxPrevHours": 9,
      "college": "smk",
      "preDealSa": true,
      "position": [
        "teach"
      ],
      "multiPosition": false,
      "rank": "b",
      "preDealSeniority": 9,
      "seniority": 9,
      "hours": 11,
      "hours2": null
    },
    {
      "presentWage": null,
      "presentWageAsSa": 23621.59,
      "futureWageByWeeks": 36916.54,
      "futureWage": 37794.54,
      "pensionPayments": 2834.59
    }
  ]

]

test.each(dataResultPairs)(
  'test use case %# - %s',
  (_, input, output) =>
{
  const result = handleCalcLogic(input);
  expect(result).toStrictEqual(output);
})