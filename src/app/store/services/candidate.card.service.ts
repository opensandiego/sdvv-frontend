import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateCard } from 'src/app/interfaces/candidateCard';

@Injectable({
  providedIn: 'root',
})
export class CandidateCardService {
  private host = 'http://localhost:3000'; // only for development

  constructor(public http: HttpClient) { }

  getCandidate(id: string): Observable<CandidateCard>  {
    const URL = `${this.host}/api/candidate/card/${id}`;
    return this.http.get<CandidateCard>(URL)
  }
}
