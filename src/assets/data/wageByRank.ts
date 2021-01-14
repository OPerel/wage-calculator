export interface Rank {
  name: string,
  label: string,
  hourlyWage: number,
  // bySeniority: number
}

const ranks: Rank[] = [
  {
    name: '1',
    label: 'סגל עמית 1',
    hourlyWage: 175.74
  },
  {
    name: 'a',
    label: 'סגל עמית א',
    hourlyWage: 268.19
  },
  {
    name: 'b',
    label: 'סגל עמית ב',
    hourlyWage: 346.96
  }
];

export default ranks;