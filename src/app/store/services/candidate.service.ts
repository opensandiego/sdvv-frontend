import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Candidate } from '../interfaces/candidate';

interface options {
  year: string;
  office?: string;
  district?: string;
}
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

    getCandidates({ year, office, district }: options ): Observable<Candidate[]>  {
      let URL = `${this.host}/api/candidates-temp?`;
      URL += district ? `&district=${district}` : ``;
      URL += year ? `&year=${year}` : ``;
      URL += office ? `&office=${office}` : ``;
  
      return this.http.get<Candidate[]>(URL);
    }
}