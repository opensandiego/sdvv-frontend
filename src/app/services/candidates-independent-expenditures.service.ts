import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type IndependentExpenditureFiler = {
  filerName: string;
  amount: number;
};

type CandidatesIndependentExpenditures = {
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

type CandidatesIndependentExpendituresResponse = {
  data: CandidatesIndependentExpenditures[];
};

@Injectable({
  providedIn: 'root',
})
export class CandidatesIndependentExpendituresService {
  private http = inject(HttpClient);
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  getCandidatesIndependentExpenditures({
    year,
    office,
    district,
  }: {
    year?: string;
    office?: string;
    district?: string;
  }): Observable<CandidatesIndependentExpenditures[]> {
    let params = new HttpParams();
    if (year) {
      params = params.set('year', year);
    }
    if (office) {
      params = params.set('office', office.split('-').join(' '));
    }
    if (district && district !== '0') {
      params = params.set('district', district);
    }

    this._isLoading.set(true);

    return this.http
      .get<CandidatesIndependentExpendituresResponse>(
        `${environment.apiUrl}/api/candidates/summaries/independent-expenditures`,
        { params: params },
      )
      .pipe(
        map((response) => response.data),
        finalize(() => this._isLoading.set(false)),
      );
  }
}
