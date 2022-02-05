import { of } from "rxjs";
import { CandidateDetailsService } from 'src/app/store/services/candidate.details.service';
import { CandidateDetailsHeader } from "src/app/store/interfaces/candidate-details-header";

const mockCandidateDetailsHeader: CandidateDetailsHeader = {
  id: 'mock|id',
  candidateName: 'Johnson Jones',
  description: 'Place Holder for a Description',  
  imageUrl: null,
  website: 'https://www.google.com/',
  raised: '150000',
  donors: '3250',
  averageDonation: '250',
};

export class MockCandidateDetailsService implements Partial<CandidateDetailsService> {
  // getCandidateCard = () => of(mockCandidateCard);
  getHeader = () => of(mockCandidateDetailsHeader);
}
