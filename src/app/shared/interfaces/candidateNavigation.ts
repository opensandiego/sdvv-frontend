export interface CandidateNavigation {
  id: string;
  fullName: string;
  officeType: string;
  fullOfficeName: string;
  seat: { name: string, type: string };
  inGeneralElection: boolean;
}
