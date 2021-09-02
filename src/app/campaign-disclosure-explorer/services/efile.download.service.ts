import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, EMPTY, forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry, expand, take, delay, toArray, concatAll, filter, bufferCount } from 'rxjs/operators';
import { Election, EFileElectionResponse } from '../models/election.interface';
import { Candidate, Office, EFileCandidateResponse } from '../models/candidate.interface';
import { Committee, EFileCommitteeResponse } from '../models/committee.interface';
import { Transaction, EFileTransactionResponse } from '../models/transaction.interface';
import { Filing, EFileFilingResponse } from '../models/filings.interface'

interface DateRange {
  begin: string;
  end: string;
};

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

  // Elections
  getElectionsFromEFile(): Observable<Election[]> {
    const url = this.eFileElectionUrl;
    return this.http.get<EFileElectionResponse>(url)
    .pipe(
      map(response => response.data),
      map(elections => {console.log( 'elections 1', elections); return elections;}),
    );
  }
 
  // Candidates
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

  getCommitteesFromEFile() {}

  // Transactions
  getTransactions(
    oldestISODate: string,
    newestISODate: string,
    pageNumber = 1,
    pageSize = 8000
  ): Observable<EFileTransactionResponse> {
    const queryStr = `&transaction_name=&transaction_type=&most_recent_amendment=false&search_boolean_expression=false&filer_name=`;
    const parameters = `&start_date=${oldestISODate}&end_date=${newestISODate}&page_size=${pageSize}&page_number=${pageNumber}`;

    return this.http.get<EFileTransactionResponse>(`${this.eFileTransactionUrl}?query=${queryStr}${parameters}`);
  }

}
