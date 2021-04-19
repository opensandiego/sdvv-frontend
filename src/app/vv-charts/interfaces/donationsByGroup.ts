interface Group {
  name: string,
  amount: number,
  percent: number,
}

export interface DonationsByGroup {
  id: string;
  groups: Array<Group>;
}
