
export interface ExpenseCategory {
  id: string;
  code: string;
  name: string;
  value: number;
  percent: number;
  color: string;
}

export interface RaisedByOutsideMoney {
  inOpposition: number,
  inSupport: number,
}
