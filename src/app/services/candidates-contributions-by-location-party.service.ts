import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

type ContributionsByForm = {
  inCity: number;
  outCity: number;
  politicalParty: number; // added this
  formTransactionCount: number;
};

type CandidateContributionsByLocation = {
  candidateId: string;
  committeeName: string;
  candidateName: string;
  inPrimaryElection: boolean;
  inGeneralElection: boolean;
  year: string;
  office: string;
  district: string | undefined;
  f460a: ContributionsByForm;
  f460c: ContributionsByForm;
  f496p3: ContributionsByForm;
  transactionCount: number;
};

type CandidatesContributionsByLocationResponse = {
  data: CandidateContributionsByLocation[];
};

const mockData: CandidateContributionsByLocation[] = [
  {
    candidateId: '7e600fb6-f374-45c0-b03a-4d93b61e9ad4|2026',
    candidateName: 'Richard Bailey',
    committeeName: 'Richard Bailey for City Council 2026',
    office: 'City Council',
    district: '2',
    inPrimaryElection: true,
    inGeneralElection: false,
    year: '2026',
    f460a: {
      inCity: 219994.97,
      outCity: 106674,
      politicalParty: 5000, // update
      formTransactionCount: 956,
    },
    f460c: {
      inCity: 0,
      outCity: 972.95,
      politicalParty: 0, // update
      formTransactionCount: 2,
    },
    f496p3: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    transactionCount: 958,
  },
  {
    candidateId: '3f8ae407-1d1b-450c-90e6-a3ee8dafc7ab|2026',
    candidateName: 'Joshua Coyne',
    committeeName: 'Josh Coyne for City Council 2026',
    office: 'City Council',
    district: '2',
    inPrimaryElection: true,
    inGeneralElection: false,
    year: '2026',
    f460a: {
      inCity: 119643,
      outCity: 34460,
      politicalParty: 9870, // update
      formTransactionCount: 427,
    },
    f460c: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    f496p3: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    transactionCount: 427,
  },
  {
    candidateId: 'a81b1432-e927-4695-b0f9-761814fd6d3d|2026',
    candidateName: 'Nicole Crosby',
    committeeName: 'Nicole Crosby for San Diego City Council 2026',
    office: 'City Council',
    district: '2',
    inPrimaryElection: true,
    inGeneralElection: false,
    year: '2026',
    f460a: {
      inCity: 38651,
      outCity: 49125,
      politicalParty: 3000, // update
      formTransactionCount: 292,
    },
    f460c: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    f496p3: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    transactionCount: 292,
  },
  {
    candidateId: 'abcbef93-0b11-4e35-99c2-09a5e5ad7771|2026',
    candidateName: 'Mandy R. Havlik',
    committeeName: 'Havlik for City Council 2026',
    office: 'City Council',
    district: '2',
    inPrimaryElection: true,
    inGeneralElection: false,
    year: '2026',
    f460a: {
      inCity: 37500,
      outCity: 2910,
      politicalParty: 4500, // update
      formTransactionCount: 219,
    },
    f460c: {
      inCity: 350,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 1,
    },
    f496p3: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    transactionCount: 220,
  },
  {
    candidateId: '433580de-b7af-4941-b932-86cfa0ce1811|2026',
    candidateName: 'Michael Rickey',
    committeeName: 'Rickey for City Council 2026',
    office: 'City Council',
    district: '2',
    inPrimaryElection: true,
    inGeneralElection: false,
    year: '2026',
    f460a: {
      inCity: 1287.7,
      outCity: 867.7,
      politicalParty: 7700, // update
      formTransactionCount: 7,
    },
    f460c: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    f496p3: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    transactionCount: 7,
  },
  {
    candidateId: '0cad9b72-64c1-488b-bcb6-a123fe83dcaa|2026',
    candidateName: 'Jacob J. Mitchell',
    committeeName: 'Mitchell For San Diego City Council',
    office: 'City Council',
    district: '2',
    inPrimaryElection: true,
    inGeneralElection: false,
    year: '2026',
    f460a: {
      inCity: 1899.57,
      outCity: 0,
      politicalParty: 6000, // update
      formTransactionCount: 6,
    },
    f460c: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    f496p3: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    transactionCount: 6,
  },
  {
    candidateId: '344992f1-0883-4af0-8030-ab291cb8397c|2026',
    candidateName: 'Sandra Kay',
    committeeName: 'Sandra Kay for City Council 2026',
    office: 'City Council',
    district: '2',
    inPrimaryElection: true,
    inGeneralElection: false,
    year: '2026',
    f460a: {
      inCity: 0,
      outCity: 0,
      politicalParty: 3310, // update
      // formContributions: 0,
      formTransactionCount: 0,
    },
    f460c: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    f496p3: {
      inCity: 0,
      outCity: 0,
      politicalParty: 0, // update
      formTransactionCount: 0,
    },
    transactionCount: 0,
  },
];

@Injectable({
  providedIn: 'root',
})
export class CandidatesContributionsByLocationPartyService {
  private http = inject(HttpClient);
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  getContributionsByLocationParty({
    year,
    office,
    district,
  }: {
    year?: string;
    office?: string;
    district?: string;
  }): Observable<CandidateContributionsByLocation[]> {
    return of(mockData); // for testing only

    const queryParams = {
      ...(year && { year }),
      ...(office && { office }),
      ...(district && district !== '0' && { district }),
    };

    const params = new HttpParams({ fromObject: queryParams });

    this._isLoading.set(true);

    return this.http
      .get<CandidatesContributionsByLocationResponse>(
        `${environment.apiUrl}/api/candidates/summaries/contributions/in-out-city-party`, // added -party
        { params },
      )
      .pipe(
        map((response) => response.data),
        finalize(() => this._isLoading.set(false)),
      );
  }
}
