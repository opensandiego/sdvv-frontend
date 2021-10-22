import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Candidate } from '../interfaces/candidate';

@Injectable({
  providedIn: 'root',
})
export class CandidateService extends EntityCollectionServiceBase<Candidate> {
  private host = environment.apiUrl;
  
  constructor(
    public http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
      super('Candidate', serviceElementsFactory);
  }
  getCandidate(id: string): Observable<Candidate>  {
      const URL = `${this.host}/api/candidate-temp/${id}`;
      return this.http.get<Candidate>(URL);
  }

    getCandidates(office = '', district = '', year = 0): Observable<Candidate[]>  {
      // const URL = `${this.host}/api/candidates/?district=${district}&year=${year}&office=${office}`;
      const URL = `${this.host}/api/candidates-temp/?district=${district}&year=${year}&office=${office}`;
  
      return this.http.get<Candidate[]>(URL);
    }
}