import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { CandidateNavigation } from '../interfaces/candidate.navigation';

@Injectable({
  providedIn: 'root',
})
export class CandidateNavigationService {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getNavigation(year: string): Observable<CandidateNavigation []>  {
    const URL = `${this.host}/api/candidate-navigation/?year=${year}`;
    return this.http.get<CandidateNavigation[]>(URL)
  }
}
