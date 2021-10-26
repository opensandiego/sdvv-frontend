interface Location {
  name: string;
  amount: string;
}

export interface CandidateDetailsRaisedByLocation {
  id: string;
  locations: Location[];
}
