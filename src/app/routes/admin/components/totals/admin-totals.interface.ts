export interface AdminTotalsItemI {
  id: string;
  name: string;
  value: number;
  percentages: { days: string; value: number }[];
  route: string;
}
