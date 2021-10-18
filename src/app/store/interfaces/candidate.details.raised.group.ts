interface Group {
  name: string;
  sum: string;
}

export interface CandidateDetailsRaisedByGroup {
  id: string;
  // industries: Industry[];
  occupations: Group[];
  employers: Group[];
}
