import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  getContributionsByLocation({
    year,
    office,
    district,
  }: {
    year?: string;
    office?: string;
    district?: string;
  }): Observable<CandidateContributionsByLocation[]> {
    let params = new HttpParams();
    if (year) {
      params = params.set('year', year);
    }
    if (office) {
      params = params.set('office', office);
    }
    if (district) {
      params = params.set('district', district);
    }

    return this.http
      .get<CandidatesContributionsByLocationResponse>(
        `${environment.apiUrl}/api/candidates/summaries/contributions/in-out-city`,
        { params: params },
      )
      .pipe(map((response) => response.data));
  }
}
