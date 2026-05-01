import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type ContributionsByForm = {
  inCity: number;
  outCity: number;
  formContributions: number;
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
  totalContributions: number;
  transactionCount: number;
};

type CandidatesContributionsByLocationResponse = {
  data: CandidateContributionsByLocation[];
};

@Injectable({
  providedIn: 'root',
})
export class CandidatesContributionsByLocationService {
  private http = inject(HttpClient);
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  getContributionsByLocation({
    year,
    office,
    district,
  }: {
    year?: string;
    office?: string;
    district?: string;
  }): Observable<CandidateContributionsByLocation[]> {
    const queryParams = {
      ...(year && { year }),
      ...(office && { office }),
      ...(district && district !== '0' && { district }),
    };

    const params = new HttpParams({ fromObject: queryParams });

    this._isLoading.set(true);

    return this.http
      .get<CandidatesContributionsByLocationResponse>(
        `${environment.apiUrl}/api/candidates/summaries/contributions/in-out-city`,
        { params },
      )
      .pipe(
        map((response) => response.data),
        finalize(() => this._isLoading.set(false)),
      );
  }
}
