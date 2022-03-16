
export interface ActiveMenuPath {
  officeTitle: string;
  districtNumber: string;
  candidateId: string;
}
export interface CandidateMenuItem {
  id: string;
  fullName: string;
  office: string;
  district: string | null;
  electionYear: string;
  inGeneralElection: boolean;
  routerLink?: string;
}

export interface CandidateInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  description?: string;
  imageUrl?: string;
  website?: string;
}

export interface CommitteeData {
  raised?: number;
  donors?: number;
}

export interface OfficeInfo {
  officeTitle: string;
  candidateCount: number;
}

export interface OfficeData {
  totalContributions: number;
}

export interface ElectionYear {
  year: string,
}

