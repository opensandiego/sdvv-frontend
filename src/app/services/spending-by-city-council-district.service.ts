import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable, of } from 'rxjs';
import { environment } from '../../../src/environments/environment';

type SpendingByCityCouncilDistrict = {
  districtNumber: number;
  contributions: number;
  independentExpenditures: number;
};

type SpendingByCityCOuncilDistrictResponse = {
  data: SpendingByCityCouncilDistrict[];
};

const mockData: SpendingByCityCouncilDistrict[] = [
  {
    districtNumber: 2,
    contributions: 546123,
    independentExpenditures: 662987,
  },
  {
    districtNumber: 4,
    contributions: 160456,
    independentExpenditures: 71015,
  },
  {
    districtNumber: 6,
    contributions: 176142,
    independentExpenditures: 86001,
  },
  {
    districtNumber: 8,
    contributions: 348348,
    independentExpenditures: 429429,
  },
  {
    districtNumber: 10,
    contributions: 0,
    independentExpenditures: 0,
  },
  {
    districtNumber: 12,
    contributions: 550,
    independentExpenditures: 550,
  },
  {
    districtNumber: 14,
    contributions: 2000,
    independentExpenditures: 500000,
  },
  {
    districtNumber: 16,
    contributions: 99000,
    independentExpenditures: 0,
  },
];

@Injectable({
  providedIn: 'root',
})
export class SpendingByCityCouncilDistrictService {
  private http = inject(HttpClient);
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  getSpendingByCityCouncilDistrict({
    year,
  }: {
    year?: string;
  }): Observable<SpendingByCityCouncilDistrict[]> {
    return of(mockData); // for testing only

    // should this fail if year is not valid ?
    const queryParams = {
      ...(year && { year }),
    };

    const params = new HttpParams({ fromObject: queryParams });

    this._isLoading.set(true);

    return this.http
      .get<SpendingByCityCOuncilDistrictResponse>(
        `${environment.apiUrl}/api/office/summaries/spending/city-council/district`,
        { params, cache: 'force-cache' },
      )
      .pipe(
        map((response) => response.data),
        finalize(() => this._isLoading.set(false)),
      );
  }
}
