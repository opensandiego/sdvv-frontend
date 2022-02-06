import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { CandidateDetailsHeader } from '../interfaces/candidate-details-header';
import { CandidateDetailsRaisedSpent } from '../interfaces/candidate-details-raised-spent';
import { CandidateDetailsRaisedByGroup } from '../interfaces/candidate-details-raised-group';
import { CandidateDetailsRaisedByLocation } from '../interfaces/candidate-details-raised-location';
import { CandidateDetailsOutsideMoney } from '../interfaces/candidate-details-outside-money';

@Injectable({
  providedIn: 'root',
})
export class CandidateDetailsService {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getHeader(candidateId: string): Observable<CandidateDetailsHeader>  {
    const URL = `${this.host}/api/candidate-details-header/${candidateId}`;
    return this.http.get<CandidateDetailsHeader>(URL)
  }

  getRaisedSpent(candidateId: string): Observable<CandidateDetailsRaisedSpent>  {
    const URL = `${this.host}/api/candidate-details-raised-spent/${candidateId}`;
    return this.http.get<CandidateDetailsRaisedSpent>(URL)
  }

  getRaisedByIndustry(candidateId: string): Observable<CandidateDetailsRaisedByGroup>  {
    const URL = `${this.host}/api/candidate-details-raised-by-industry/${candidateId}`;
    return this.http.get<CandidateDetailsRaisedByGroup>(URL)
  }
  
  getRaisedByLocation(candidateId: string): Observable<CandidateDetailsRaisedByLocation>  {
    const URL = `${this.host}/api/candidate-details-raised-by-location/${candidateId}`;
    return this.http.get<CandidateDetailsRaisedByLocation>(URL)
  }
  
  getOutsideMoney(candidateId: string): Observable<CandidateDetailsOutsideMoney>  {
    const URL = `${this.host}/api/candidate-details-raised-outside-money/${candidateId}`;
    return this.http.get<CandidateDetailsOutsideMoney>(URL)
  }
}
