import { of } from "rxjs";
import { CandidateQuickView } from "src/app/store/interfaces/candidate.quickview";
import { CandidateQuickViewService } from "src/app/store/services/candidate.quickview.service";

const mockCandidateQuickView: CandidateQuickView = {
  id: 'mock|id',
  raisedVsSpent: {
    id: 'mock|id',
    raised: '150000',
    spent: '170000',
    averageDonation: '1237',
  },
  donationsByGroupData: {
    id: 'mock|id',
    groups: [
    {
      name: 'ABC 1',
      amount: '12345',
      percent: '50',
    },
    {
      name: 'ABC 2',
      amount: '1234',
      percent: '30',
    },
    {
      name: 'ABC 3',
      amount: '123',
      percent: '10',
    },
    {
      name: 'ABC 4',
      amount: '12',
      percent: '5',
    },
    {
      name: 'ABC 5',
      amount: '1',
      percent: '1',
    },
  ],
  },
  raisedInOut: {
    id: 'mock|id',
    inside: '12345',
    outside: '4321',
    areaName: 'City of San Diego',
    jurisdiction: 'City',
    // jurisdictionSuffix: '1',
  },
  outsideMoney: {
    id: 'mock|id',
    support: '56789',
    oppose: '9876',
  },
}

export class MockCandidateQuickViewService implements Partial<CandidateQuickViewService> {
  getCandidateQuickView = () => of(mockCandidateQuickView);
}

