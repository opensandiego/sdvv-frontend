export interface RaisedVsSpent {
  id: string;
  raised: string;
  spent: string;
  averageDonation: string;
}

export interface RaisedInOut {
  id: string;
  inside: string;
  outside: string;
  areaName: string; // Example: 'City of San Diego'
  jurisdiction: string; // Example: 'City' || 'District'
  jurisdictionSuffix?: string; // Examples: '1', '5'
}

export interface OutsideMoney {
  id: string;
  support: string;
  oppose: string;
  scale?: string;
}

interface Group {
  name: string;
  amount: string;
  percent: string;
}

export interface DonationsByGroup {
  id: string;
  groups: Array<Group>;
}

export interface CandidateQuickView {
  id: string;
  raisedVsSpent: RaisedVsSpent;
  donationsByGroupData: DonationsByGroup;
  raisedInOut: RaisedInOut;
  outsideMoney: OutsideMoney;
}
