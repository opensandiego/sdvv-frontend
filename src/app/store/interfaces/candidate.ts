export interface Candidate {
  id: string;
  full_name: string; // 'First Last'
  description: string;
  image_url: string;
  website: string;
  agency: string; // Examples: 'City of San Diego'
  office: string; // Examples: 'City Council', 'Mayor'
  district: string | null; // '9'
  year: string; // '2020'
  in_general_election: boolean;
  full_office_name: string; // Examples: 'Mayor San Diego', 'City Council San Diego - Dist 9
  jurisdiction: string; // Examples: 'City',  'District'
}
