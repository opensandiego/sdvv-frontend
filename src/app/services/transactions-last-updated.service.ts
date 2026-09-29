import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

type TransactionsLastUpdated = {
  date: string;
};

type TransactionsLastUpdatedResponse = {
  data: TransactionsLastUpdated;
};

@Injectable({
  providedIn: 'root',
})
export class TransactionsLastUpdatedService {
  private http = inject(HttpClient);
  private _isLoading = signal(false);
  isLoading = this._isLoading.asReadonly();

  getLastUpdatedDate({
    electionYear,
  }: {
    electionYear: string;
  }): Observable<TransactionsLastUpdated> {
    const queryParams = {
      ...(electionYear && { electionYear }),
    };

    const params = new HttpParams({ fromObject: queryParams });

    this._isLoading.set(true);

    return this.http
      .get<TransactionsLastUpdatedResponse>(
        `${environment.apiUrl}/api/transactions/last-updated`,
        { params, cache: 'force-cache' },
      )
      .pipe(
        map((response) => response.data),
        finalize(() => this._isLoading.set(false)),
      );
  }
}
