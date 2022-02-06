import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { CandidateQuickView } from '../interfaces/candidate.quickview';

@Injectable({
  providedIn: 'root',
})
export class CandidateQuickViewService {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getCandidateQuickView(candidateId: string): Observable<CandidateQuickView>  {
    const URL = `${this.host}/api/candidate-quick-view/${candidateId}`;
    return this.http.get<CandidateQuickView>(URL)
  }
}
