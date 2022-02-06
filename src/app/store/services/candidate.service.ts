import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
export class CandidateService {
  private host = environment.apiUrl;
  
  constructor(
    public http: HttpClient,
  ) { }

  getCandidates({ year, office, district }: options ): Observable<Candidate[]>  {
    if (isNaN(parseInt(year))) {
      return of([]);
    }

    let URL = `${this.host}/api/candidates?`;
    URL += year ? `&year=${year}` : ``;
    URL += office ? `&office=${office}` : ``;
    URL += district ? `&district=${district}` : ``;

    return this.http.get<Candidate[]>(URL);
  }
}
