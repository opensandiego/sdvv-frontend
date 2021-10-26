interface Group {
  committee: string;
  sum: string;
  average: string;
}

export interface CandidateDetailsOutsideMoney {
  id: string;
  supportGroups: Group[];
  oppositionGroups: Group[];
}
