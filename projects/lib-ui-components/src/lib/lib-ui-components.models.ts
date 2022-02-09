
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
