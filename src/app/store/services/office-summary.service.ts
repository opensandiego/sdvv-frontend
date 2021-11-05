import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OfficeSummary } from '../interfaces/office.summary';

@Injectable({
  providedIn: 'root',
})
export class OfficeSummaryService extends EntityCollectionServiceBase<OfficeSummary> {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
      super('OfficeSummary', serviceElementsFactory);
  }

  getSummary(year: string): Observable<OfficeSummary[]>  {
    const URL = `${this.host}/api/office-summary/?year=${year}`;
    return this.http.get<OfficeSummary[]>(URL)
  }
}
