interface RaisedSpentSummary {
  totalRaised: string;
  totalSpent: string;
  balance?: string;
}

interface RaisedGroup {
  name: string;
  amount: string;
}

interface SpentGroup {
  // name: string;
  spending_code: string;
  sum: string;
  average: string;
}

export interface CandidateDetailsRaisedSpent {
  id: string;
  summary: RaisedSpentSummary;
  cashOnHand: string;
  loansAndDebts: string;
  raisedGroups: RaisedGroup[];
  spentGroup: SpentGroup[];
}
