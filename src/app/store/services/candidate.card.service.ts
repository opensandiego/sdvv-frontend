import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { CandidateCard } from '../interfaces/candidate.card';

@Injectable({
  providedIn: 'root',
})
export class CandidateCardService {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getCandidateCard(candidateId: string): Observable<CandidateCard> {
    const URL = `${this.host}/api/candidate-card/${candidateId}`;
    return this.http.get<CandidateCard>(URL);
  }
}
