interface Group {
  name: string;
  amount: string;
}

export interface CandidateDetailsRaisedByGroup {
  id: string;
  // industries: Industry[];
  occupations: Group[];
  employers: Group[];
}
