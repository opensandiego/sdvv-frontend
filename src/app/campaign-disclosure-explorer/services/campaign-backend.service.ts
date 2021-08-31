import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { Election } from '../models/election.interface';
import { Candidate, CandidateDB } from '../models/candidate.interface';
import { Transaction, TransactionDB } from '../models/transaction.interface';

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

  // Transactions
  getTransactionsFromRemote(): Observable<TransactionDB[]> {
    return this.http.get<TransactionDB[]>(this.transactionsRoute);
  }

  postBulkTransactionsToRemote(transactions: Transaction[]): Observable<TransactionDB[]> {
    return this.http.post<TransactionDB[]>(this.transactionsBulkRoute, transactions);
  }
}

