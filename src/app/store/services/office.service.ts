import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Office } from '../interfaces/office';

@Injectable({
  providedIn: 'root',
})
export class OfficeService extends EntityCollectionServiceBase<Office> {
  private host = environment.apiUrl;

  constructor(
    public http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
      super('Office', serviceElementsFactory);
  }

  getOffices(year: string): Observable<Office[]>  {
    const URL = `${this.host}/api/offices/?year=${year}`;
    return this.http.get<Office[]>(URL)
  }
}
