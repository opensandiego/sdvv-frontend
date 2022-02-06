import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Election } from '../interfaces/elections';

@Injectable({
  providedIn: 'root',
})
export class ElectionService {
  private host = environment.apiUrl;
  
  constructor(
    public http: HttpClient,
  ) { }

  getElection(id: string): Observable<Election>  {
      const URL = `${this.host}/api/election/${id}`;
      return this.http.get<Election>(URL);
  }

  getElections(): Observable<Election[]>  {
    let URL = `${this.host}/api/elections?`;

    return this.http.get<Election[]>(URL);
  }
}
