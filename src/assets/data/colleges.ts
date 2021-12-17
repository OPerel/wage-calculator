export interface College {
  name: string
  label: string,
  weeks: number,
  futureWeeks?: number,
  weeksForNew: number
}

const colleges: College[] = [
  {
    name: 'hit13',
    label: 'HIT 13',
    weeks: 13,
    weeksForNew: 13
  },
  {
    name: 'bbr',
    label: 'בית-ברל',
    weeks: 14,
    weeksForNew: 14
  },
  {
    name: 'ata',
    label: 'אקדמית ת"א',
    weeks: 14,
    weeksForNew: 13
  },
  {
    name: 'azr',
    label: 'עזריאלי',
    weeks: 14,
    weeksForNew: 13
  },
  {
    name: 'cnr',
    label: 'כנרת',
    weeks: 14,
    weeksForNew: 13
  },
  {
    name: 'rpn',
    label: 'רופין',
    weeks: 14,
    weeksForNew: 13
  },
  {
    name: 'hit15',
    label: 'HIT 15',
    weeks: 15,
    futureWeeks: 14,
    weeksForNew: 13
  },
  {
    name: 'ask',
    label: 'אשקלון',
    weeks: 15,
    weeksForNew: 14
  },
  {
    name: 'snk',
    label: 'שנקר',
    weeks: 15,
    weeksForNew: 14
  },
  {
    name: 'smk',
    label: 'סמינר הקיבוצים',
    weeks: 15,
    weeksForNew: 13
  },
  {
    name: 'viz',
    label: 'עמק יזרעאל',
    weeks: 15,
    weeksForNew: 14
  },
  {
    name: 'ahv',
    label: 'אחווה',
    weeks: 16,
    futureWeeks: 15,
    weeksForNew: 14
  },
  {
    name: 'hds',
    label: 'הדסה',
    weeks: 16,
    futureWeeks: 15,
    weeksForNew: 14
  },
  {
    name: 'spr',
    label: 'ספיר',
    weeks: 16.4,
    futureWeeks: 14,
    weeksForNew: 13
  },
  {
    name: 'hit168',
    label: 'HIT 16.8',
    weeks: 16.8,
    futureWeeks: 14,
    weeksForNew: 13
  }
]

export default colleges;
