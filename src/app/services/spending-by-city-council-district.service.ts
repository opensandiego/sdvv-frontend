import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

type SpendingByCityCouncilDistrict = {
  districtNumber: number;
  contributions: number;
  independentExpenditures: number;
};

type SpendingByCityCouncilDistrictResponse = {
  data: SpendingByCityCouncilDistrict[];
};

@Injectable({
  providedIn: 'root',
})
export class SpendingByCityCouncilDistrictService {
  private http = inject(HttpClient);
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  getSpendingByCityCouncilDistrict({
    electionYear,
  }: {
    electionYear: string;
  }): Observable<SpendingByCityCouncilDistrict[]> {
    const queryParams = {
      ...(electionYear && { electionYear }),
    };

    const params = new HttpParams({ fromObject: queryParams });

    this._isLoading.set(true);

    return this.http
      .get<SpendingByCityCouncilDistrictResponse>(
        `${environment.apiUrl}/api/office/summaries/spending/city-council/districts`,
        { params, cache: 'force-cache' },
      )
      .pipe(
        map((response) => response.data),
        finalize(() => this._isLoading.set(false)),
      );
  }
}
