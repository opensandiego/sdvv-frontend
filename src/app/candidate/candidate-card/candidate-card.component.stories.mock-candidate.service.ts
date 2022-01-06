import { of } from "rxjs";
import { Candidate } from "src/app/store/interfaces/candidate";
import { CandidateService } from "src/app/store/services/candidate.service";

const mockCandidate: Candidate = {
  id: 'mock|id',
  full_name: 'Johnson Jones',
  description: 'Place Holder for a Description',  
  image_url: null,
  website: 'https://www.google.com/',
  agency: 'City of San Diego',
  office: 'Mayor',
  district: null,
  year: '2020',
  in_general_election: true,
  full_office_name: 'Mayor San Diego',
  jurisdiction: 'City',
  total_contributions: '150000',
  contributor_count: '3250',
}

export class MockCandidateService implements Partial<CandidateService> {
  getCandidates = () => of([mockCandidate]);
}
