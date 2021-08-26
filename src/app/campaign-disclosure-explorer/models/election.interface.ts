export interface Election {
  election_date: string;
  election_type: string;
  election_id: string;
  internal: string;
  createdAt?: number;
  updatedAt?: string;
}

export interface EFileElectionResponse {
  data: Election[];
}
