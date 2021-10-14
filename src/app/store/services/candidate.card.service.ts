import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { CandidateCard } from 'src/app/interfaces/candidateCard';

@Injectable({
  providedIn: 'root',
})
export class CandidateCardService extends EntityCollectionServiceBase<CandidateCard> {
  private host = 'http://localhost:3000'; // only for development

  constructor(
    public http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
      super('CandidateCard', serviceElementsFactory);
  }

  getCandidate(id: string): Observable<CandidateCard>  {
    const URL = `${this.host}/api/candidate/card/${id}`;
    return this.http.get<CandidateCard>(URL)
  }
}
