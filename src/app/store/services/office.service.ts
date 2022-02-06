import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Office } from '../interfaces/office';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getOffices(year: string): Observable<Office[]>  {
    const URL = `${this.host}/api/offices/?year=${year}`;
    return this.http.get<Office[]>(URL)
  }
}
