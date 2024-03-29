
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

export interface RaisedByIndustry {
  name: string,
  value: number,
  label?: string,
}

export interface RaisedCategory {
  name: string;
  value: number;
  color: string;
}

export interface Committee {
  id: string;
  name: string;
  value: number;
  percent: number;
}

export interface RaisedByLocations {
  inDistrict: number,
  inCity: number,
  inCounty: number,
  inState: number,
  outState: number,
}
