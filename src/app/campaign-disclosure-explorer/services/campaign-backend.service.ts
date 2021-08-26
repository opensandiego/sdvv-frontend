import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry } from 'rxjs/operators';
import { Election } from '../models/election.interface';
import { Candidate } from '../models/candidate.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignBackendService {
  constructor(
    private http: HttpClient, 
  ) { }

  serverUrl = 'http://localhost:3000';
  electionsRoute = `${this.serverUrl}/elections`
  electionsBulkRoute = `${this.serverUrl}/elections/bulk`

  candidatesRoute = `${this.serverUrl}/candidates`
  candidatesBulkRoute = `${this.serverUrl}/candidates/bulk`

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
  getCandidates(): Observable<Candidate[]>  {
    return this.http.get<Candidate[]>(this.candidatesRoute);
  }

  postBulkCandidatesToRemote(candidates: Candidate[]): Observable<Candidate[]> {
    return this.http.post<Candidate[]>(this.candidatesBulkRoute, candidates);
  }
}

