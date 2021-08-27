export interface Candidate {
  coe_id: string;
  filer_id: string;
  office_id: string;
  election_id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  title: string | null;
  suffix: string | null;
  office: string;
  office_code: string;
  jurisdiction_id: string;
  district: string | null;
  agency: string;
  jurisdiction_type: string;
  jurisdiction_name: string;
  jurisdiction_code: string;
  candidate_name: string;
}

export interface CandidateDB extends Candidate {
  candidate_controlled_committee_name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Office {
  [keys: string]: Candidate[];
}

export interface EFileCandidateResponse {
  data: Office;
}
