import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { Election, EFileElectionResponse } from '../models/election.interface';
import { Candidate, Office, EFileCandidateResponse } from '../models/candidate.interface';


@Injectable({
  providedIn: 'root'
})
export class EFileDownloadService {
  private eFilElectionUrl = 'https://efile.sandiego.gov/api/v1/public/campaign-search/election/list';

  private eFileCandidateUrl = 'https://efile.sandiego.gov/api/v1/public/campaign-search/candidate/list';

  constructor(
    private http: HttpClient, 
  ) { }

 
  getElectionsFromEFile(): Observable<Election[]> {
    const url = this.eFilElectionUrl;
    return this.http.get<EFileElectionResponse>(url)
    .pipe(
      map(response => response.data),
      map(results => {console.log( 'results 1', results); return results;}),
    );
  }
 

  getCandidatesFromEFile(electionID: string): Observable<Candidate[]> {
    const url = `${this.eFileCandidateUrl}/${electionID}`;
    return this.http.get<EFileCandidateResponse>(url)
    .pipe(
      map(response => response.data),
      map(offices => {
        const candidates: Candidate[] = [];
        for (const office in offices) {
          offices[office].forEach(candidate => {
            candidates.push(candidate);
          });
        }
        return candidates;
      }),
    );
  }

}
