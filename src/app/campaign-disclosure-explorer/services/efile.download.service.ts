import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, EMPTY, forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry, expand, take, delay, toArray, concatAll, filter, bufferCount } from 'rxjs/operators';
import { Election, EFileElectionResponse } from '../models/election.interface';
import { Candidate, Office, EFileCandidateResponse } from '../models/candidate.interface';
import { Committee, EFileCommitteeResponse } from '../models/committee.interface';
import { Transaction, EFileTransactionResponse } from '../models/transaction.interface';

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

  getCommitteesFromEFile() {}
  getFilingsFromEFile() {}
  
  getTransactionsFromEFile(...args): Observable<Transaction[]>  {
    return this.doTransactionGetRequest(args[0], args[1])
  }

  doTransactionGetRequest(oldestDate: Date, newestDate: Date): Observable<Transaction[]> {
    const oldDate = oldestDate.toISOString();
    const newDate = newestDate.toISOString();
    const pageSize = 2000;
    const queryString = this.getTransactionQueryStr(oldDate, newDate, 1, pageSize);
    const url = `${this.eFileTransactionUrl}${queryString}`;
    const source = this.http.get<EFileTransactionResponse>(url);

    return source.pipe(
      expand( (response) => {
        const currentPage = +response['page_number'];
        const queryString = this.getTransactionQueryStr(oldDate, newDate, currentPage+1, pageSize);
        const endCondition = 
          (currentPage >= +response.total_pages) 
          || response.data.length === 0;
          // || currentPage >= 4;
        return (endCondition)
          ? EMPTY 
          : this.http.get<EFileTransactionResponse>(`${this.eFileTransactionUrl}${queryString}`);
      }),
      map(response => <Transaction[]>response.data),
      concatAll(),
      toArray(),
    )
  }

  getTransactionQueryStr( oldestISODate: string, newestISODate: string, pageNumber: number = 1, pageSize: number = 2000): string {
    const queryStr = `&transaction_name=&transaction_type=&most_recent_amendment=false&search_boolean_expression=false&filer_name=`;
    const parameters = `&start_date=${oldestISODate}&end_date=${newestISODate}&page_size=${pageSize}&page_number=${pageNumber}`;
    return `?query=${queryStr}${parameters}`;
  }

}
