import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { Election } from '../models/election.interface';
import { DatabaseService } from '../database/database.service';

interface EFileElectionResponse {
  data: Election[];
}

@Injectable({
  providedIn: 'root'
})
export class CampaignBackendService {
  constructor(
    private http: HttpClient, 
    private databaseService: DatabaseService,
  ) { }

  eFilUrl = 'https://efile.sandiego.gov/api/v1/public/campaign-search/election/list';

  serverUrl = 'http://localhost:3000';
  electionsRoute = `${this.serverUrl}/elections`

  getElections(): Observable<Election>  {
    return this.http.get<Election>(this.electionsRoute);
  }

  getElectionsFromEFile(): Observable<Election[]> {
    const url = this.eFilUrl;
    return this.http.get<EFileElectionResponse>(url).pipe(
      map(response => response.data),
      // catchError(error => console.error(error))
    );
  }

  postElectionsToRemote(elections: Election[]): Observable<Election>  {
    // console.log(elections)
    return from(elections).pipe(
      mergeMap(election => this.http.post<Election>(this.electionsRoute, election))
    )
  }

  async saveElectionsToLocalDB(elections) { //: Election[]
    // const db = await this.databaseService.getInstance();
    // db.addItemsToCollection(elections, db.collections.elections, 'election_id')
  }

}

