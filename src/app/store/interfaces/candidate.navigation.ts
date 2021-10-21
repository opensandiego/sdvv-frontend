export interface CandidateNavigation {
  id: string;
  fullName: string; // 'First Last'
  officeType: string; // 'City Council' | 'Mayor'
  fullOfficeName: string; // 'Mayor San Diego' | 'City Council San Diego - Dist 9
  seatName: string | null; // '9'
  seatType: string | null; // 'district'
  year: string;
  inGeneralElection: boolean;
}
