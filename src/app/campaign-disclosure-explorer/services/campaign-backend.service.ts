import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { bufferCount, concatAll, concatMap, map, toArray } from 'rxjs/operators';
import { Election } from '../models/election.interface';
import { Candidate, CandidateDB } from '../models/candidate.interface';
import { Transaction, TransactionDB } from '../models/transaction.interface';
import { Filing, FilingDB } from '../models/filings.interface';
import { Committee, CommitteeDB } from '../models/committee.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignBackendService {
  constructor(
    private http: HttpClient, 
  ) { }

  serverUrl = 'http://localhost:3000';
  electionsRoute = `${this.serverUrl}/elections`;
  electionsBulkRoute = `${this.serverUrl}/elections/bulk`;

  candidatesRoute = `${this.serverUrl}/candidates`;
  candidatesBulkRoute = `${this.serverUrl}/candidates/bulk`;

  committeesRoute = `${this.serverUrl}/committees`;
  committeesBulkRoute = `${this.serverUrl}/committees/bulk`;

  filingsRoute = `${this.serverUrl}/filings`;
  filingsBulkRoute = `${this.serverUrl}/filings/bulk`;

  transactionsRoute = `${this.serverUrl}/transactions`;
  transactionsBulkRoute = `${this.serverUrl}/transactions/bulk`;

  // Elections
  getElections(): Observable<Election[]>  {
    return this.http.get<Election[]>(this.electionsRoute);
  }

  postOneElectionToRemote(election: Election): Observable<Election> {
    return this.http.post<Election>(this.electionsRoute, election);
  }

  postBulkElectionsToRemote(elections: Election[]): Observable<Election[]> {
    return this.http.post<Election[]>(this.electionsBulkRoute, elections);
  }

  // Candidates
  getCandidatesFromRemote(): Observable<CandidateDB[]>  {
    return this.http.get<CandidateDB[]>(this.candidatesRoute);
  }

  postBulkCandidatesToRemote(candidates: Candidate[]): Observable<Candidate[]> {
    return this.http.post<Candidate[]>(this.candidatesBulkRoute, candidates);
  }

  // Committees
  // getCommitteesFromRemote(): Observable<CommitteeDB[]>  {
  //   return this.http.get<CommitteeDB[]>(this.committeesRoute);
  // }

  // postBulkCommitteesToRemote(filings: Committee[]): Observable<CommitteeDB[]> {
  //   const count = 1000;

  //   return from(filings).pipe(
  //     bufferCount(count),
  //     map( res => {console.log('bulk res :', res); return res;} ),
  //     concatMap(committeeBuffer => this.http.post<CommitteeDB[]>(this.committeesBulkRoute, committeeBuffer) ),
  //     concatAll(),
  //     toArray(),
  //   )
  // }

  // Filings
  getFilingsFromRemote(): Observable<FilingDB[]>  {
    return this.http.get<FilingDB[]>(this.filingsRoute);
  }

  postBulkFilingsToRemote(filings: Filing[]): Observable<FilingDB[]> {
    const count = 1000;

    return from(filings).pipe(
      bufferCount(count),
      map( res => {console.log('bulk res :', res); return res;} ),
      concatMap(filingBuffer => this.http.post<FilingDB[]>(this.filingsBulkRoute, filingBuffer) ),
      concatAll(),
      toArray(),
    )
  }

  // Transactions
  getTransactionsFromRemote(): Observable<TransactionDB[]> {
    return this.http.get<TransactionDB[]>(this.transactionsRoute);
  }

  postBulkTransactionsToRemote(transactions: Transaction[]): Observable<TransactionDB[]> {
    const count = 1000;

    return from(transactions).pipe(
      bufferCount(count),
      // map( res => {console.log('bulk res :', res); return res;} ),
      concatMap(transactionBuffer => this.http.post<TransactionDB[]>(this.transactionsBulkRoute, transactionBuffer) ),
      concatAll(),
      toArray(),
    )
  }
}

