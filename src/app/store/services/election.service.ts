import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Election } from '../interfaces/elections';

@Injectable({
  providedIn: 'root',
})
export class ElectionService extends EntityCollectionServiceBase<Election> {
  private host = environment.apiUrl;
  
  constructor(
    public http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
      super('Election', serviceElementsFactory);
  }

  getElection(id: string): Observable<Election>  {
      const URL = `${this.host}/api/election/${id}`;
      return this.http.get<Election>(URL);
  }

  getElections(): Observable<Election[]>  {
    let URL = `${this.host}/api/elections?`;

    return this.http.get<Election[]>(URL);
  }
}
