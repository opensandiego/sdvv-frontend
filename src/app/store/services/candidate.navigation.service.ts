import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { CandidateNavigation } from '../interfaces/candidate.navigation';

@Injectable({
  providedIn: 'root',
})
export class CandidateNavigationService extends EntityCollectionServiceBase<CandidateNavigation> {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
      super('CandidateNavigation', serviceElementsFactory);
  }

  getNavigation(year: string): Observable<CandidateNavigation []>  {
    const URL = `${this.host}/api/candidates/navigation/year/${year}`;
    return this.http.get<CandidateNavigation[]>(URL)
  }
}
