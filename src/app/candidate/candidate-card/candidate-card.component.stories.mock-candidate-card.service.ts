import { of } from "rxjs";
import { CandidateCardService } from 'src/app/store/services/candidate.card.service';
import { CandidateCard } from "src/app/store/interfaces/candidate.card";

const mockCandidateCard: CandidateCard = {
  id: 'mock|id',
  name: 'Johnson Jones',
  description: 'Place Holder for another Description with several words',  
  candidateImgURL: null,
  website: 'https://www.google.com/',
  office: 'Mayor',
  district: null,
  year: '2020',
  raised: '150000',
  donors: '3250',
}

export class MockCandidateCardService implements Partial<CandidateCardService> {
  getCandidateCard = () => of(mockCandidateCard);
}
