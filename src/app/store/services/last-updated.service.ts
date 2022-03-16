import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatAll, first } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { LastUpdate } from '../interfaces/last-updated';

@Injectable({
  providedIn: 'root',
})
export class LastUpdatedService {
  private host = environment.apiUrl;
  
  constructor(
    public http: HttpClient,
  ) { }

  getLastUpdated(): Observable<LastUpdate> {
    const URL = `${this.host}/api/last-update`;
    return this.http.get<LastUpdate>(URL);
  }
}
