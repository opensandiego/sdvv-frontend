import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OfficeSummary } from '../interfaces/office.summary';

@Injectable({
  providedIn: 'root',
})
export class OfficeSummaryService {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getSummaries(): Observable<OfficeSummary[]>  {
    const URL = `${this.host}/api/office-summary/`;
    return this.http.get<OfficeSummary[]>(URL)
  }

  getSummary(year: string): Observable<OfficeSummary[]>  {
    const URL = `${this.host}/api/office-summary/?year=${year}`;
    return this.http.get<OfficeSummary[]>(URL)
  }
}
