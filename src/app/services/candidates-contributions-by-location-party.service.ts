import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

type ContributionsByForm = {
  inCity: number;
  outCity: number;
  politicalParty: number;
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

@Injectable({
  providedIn: 'root',
})
export class CandidatesContributionsByLocationPartyService {
  private http = inject(HttpClient);
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  filterForInGeneralCandidates(
    data: CandidateContributionsByLocation[],
  ): CandidateContributionsByLocation[] {
    // if any candidate has the inGeneralElection condition set
    // then filter all by their inGeneralElection
    const hasGeneral = data.some((candidate) => candidate.inGeneralElection);

    return hasGeneral
      ? data.filter((candidate) => candidate.inGeneralElection)
      : data;
  }

  getContributionsByLocationParty({
    year,
    office,
    district,
  }: {
    year?: string;
    office?: string;
    district?: string;
  }): Observable<{ candidateSeries: CandidateContributionsByLocation[] }> {
    const queryParams = {
      ...(year && { year }),
      ...(office && { office }),
      ...(district && district !== '0' && { district }),
    };

    const params = new HttpParams({ fromObject: queryParams });

    return this.http
      .get<CandidatesContributionsByLocationResponse>(
        `${environment.apiUrl}/api/candidates/summaries/contributions/in-out-city`,
        { params },
      )
      .pipe(
        map((response) => response.data),
        map((data) => ({
          candidateSeries: this.filterForInGeneralCandidates(data),
        })),
      );
  }
}
