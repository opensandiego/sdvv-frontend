import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { Election, EFileElectionResponse } from '../models/election.interface';
import { Candidate, Office, EFileCandidateResponse } from '../models/candidate.interface';
import { Committee, EFileCommitteeResponse } from '../models/committee.interface';

@Injectable({
  providedIn: 'root'
})
export class EFileDownloadService {
  private eFileElectionUrl    = 'https://efile.sandiego.gov/api/v1/public/campaign-search/election/list';
  private eFileCandidateUrl   = 'https://efile.sandiego.gov/api/v1/public/campaign-search/candidate/list';
  private eFileTransactionUrl = 'https://efile.sandiego.gov/api/v1/public/campaign-search/advanced';

  constructor(
    private http: HttpClient, 
  ) { }

 
  getElectionsFromEFile(): Observable<Election[]> {
    const url = this.eFileElectionUrl;
    return this.http.get<EFileElectionResponse>(url)
    .pipe(
      map(response => response.data),
      map(elections => {console.log( 'elections 1', elections); return elections;}),
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
