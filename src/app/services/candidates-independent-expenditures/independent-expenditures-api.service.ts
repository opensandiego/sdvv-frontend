import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export type IndependentExpenditureFiler = {
  filerName: string;
  amount: number;
};

export type IndependentExpendituresCandidate = {
  candidateId: string;
  candidateName: string;
  inPrimaryElection: boolean;
  inGeneralElection: boolean;
  f460d: {
    support: IndependentExpenditureFiler[];
    oppose: IndependentExpenditureFiler[];
  };
  s496: {
    support: IndependentExpenditureFiler[];
    oppose: IndependentExpenditureFiler[];
  };
};

type IndependentExpendituresResponseCandidates = {
  data: IndependentExpendituresCandidate[];
};

type IndependentExpendituresResponseCandidate = {
  data: IndependentExpendituresCandidate;
};

@Injectable({ providedIn: 'root' })
export class IndependentExpendituresApiService {
  private http = inject(HttpClient);

  getCandidatesIndependentExpenditures({
    year,
    office,
    district,
  }: {
    year?: string;
    office?: string;
    district?: string;
  }): Observable<IndependentExpendituresCandidate[]> {
    const queryParams = {
      ...(year && { year }),
      ...(office && { office }),
      ...(district && district !== '0' && { district }),
    };

    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get<IndependentExpendituresResponseCandidates>(
        `${environment.apiUrl}/api/candidates/summaries/independent-expenditures`,
        { params: params },
      )
      .pipe(map((response) => response.data));
  }

  getIndependentExpendituresCandidateFetch({
    candidateId,
  }: {
    candidateId: string;
  }): Observable<IndependentExpendituresCandidate> {
    const queryParams = {
      candidateId,
    };

    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get<IndependentExpendituresResponseCandidate>(
        `${environment.apiUrl}/api/candidate/summaries/independent-expenditures`,
        { params: params },
      )
      .pipe(map((response) => response.data));
  }
}
