import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  IndependentExpenditureFiler,
  IndependentExpendituresApiService,
} from './independent-expenditures-api.service';
import { IndependentExpendituresTransformService } from './independent-expenditures-transform.service';

type CandidateSeries = {
  candidateId: string;
  candidateName: string;
  support: IndependentExpenditureFiler[];
  supportTotal: number;
  oppose: IndependentExpenditureFiler[];
  opposeTotal: number;
};

@Injectable({
  providedIn: 'root',
})
export class CandidatesIndependentExpendituresService {
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  private api = inject(IndependentExpendituresApiService);
  private transform = inject(IndependentExpendituresTransformService);

  getIndependentExpendituresCandidateList(params: {
    year?: string;
    office?: string;
    district?: string;
  }): Observable<{ candidateSeries: CandidateSeries[] }> {
    return this.api.getCandidatesIndependentExpenditures(params).pipe(
      map((data) => this.transform.filterForInGeneralCandidates(data)),
      map((data) => this.transform.buildFilerSeriesForCandidates(data)),
    );
  }

  getIndependentExpendituresCandidate({
    candidateId,
  }: {
    candidateId: string;
  }): Observable<{ candidateSeries: CandidateSeries }> {
    return this.api
      .getIndependentExpendituresCandidateFetch({ candidateId })
      .pipe(
        map((data) => this.transform.buildFilerSeriesForCandidates([data])),
        map((data) => ({
          candidateSeries: data.candidateSeries[0],
        })),
      );
  }
}
