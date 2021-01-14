export interface Rank {
  name: string,
  label: string,
  hourlyWage: number
}

const ranks: Rank[] = [
  {
    name: '1',
    label: 'דרגה 1',
    hourlyWage: 175.74
  },
  {
    name: 'a',
    label: 'דרגה א',
    hourlyWage: 268.19
  },
  {
    name: 'b',
    label: 'דרגה ב',
    hourlyWage: 346.96
  }
];

export default ranks;