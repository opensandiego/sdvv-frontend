import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { ElectionYearSummary } from '../interfaces/election.year.summary';

@Injectable({
  providedIn: 'root',
})
export class ElectionYearSummaryService extends EntityCollectionServiceBase<ElectionYearSummary> {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
      super('ElectionYearSummary', serviceElementsFactory);
  }

  getSummary(year: string): Observable<ElectionYearSummary>  {
    const URL = `${this.host}/api/summary/year/${year}`;
    return this.http.get<ElectionYearSummary>(URL)
  }
}
