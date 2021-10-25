import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable, of, Subject, iif } from 'rxjs';
import {  map, mergeMap } from 'rxjs/operators';

import { DatabaseService } from '../database/database.service';
@Injectable({
  providedIn: 'root'
})
export class CampaignDataChangesService {
  private allElectionsSubscription;
  private allElectionsSubject = new Subject<any>();
  public  allElections$ = this.allElectionsSubject.asObservable();

  private electionsWithCandidateSubscription;
  private electionsWithCandidateSubject = new Subject<any>();
  public  electionsWithCandidate$ = this.electionsWithCandidateSubject.asObservable();
 
  private candidatesInSelectedElectionSubscription;
  private candidatesInSelectedElectionSubject = new Subject<any>();
  public  candidatesInSelectedElection$ = this.candidatesInSelectedElectionSubject.asObservable(); 

  public electionSelectionChanged = new Subject<string>(); // used to receive signals from components

  private filingsFromSelectedCandidateSubscription;
  private filingsFromSelectedCandidateSubject = new Subject<any>();
  public  filingsFromSelectedCandidate$ = this.filingsFromSelectedCandidateSubject.asObservable(); 

  public candidateSelectionChanged = new Subject<string>(); // used to receive signals from components

  private transactionsSubscription;
  private transactionsSubject = new Subject<any>();
  public  transactions$ = this.transactionsSubject.asObservable();

  private committeesSubscription;
  private committeesSubject = new Subject<any>();
  public  committees$ = this.committeesSubject.asObservable();

  constructor(private databaseService: DatabaseService) {
    this.databaseService.databaseReady
      .subscribe(() => this.setupSubscriptions());
  }
  
  async setupSubscriptions() {
    await this.createAllElectionSubscription();
    await this.createElectionsWithCandidateSubscription();
    await this.createCandidatesForSelectedElectionSubscription();
    await this.createFilingsFromSelectedCandidateSubscription();
    await this.createTransactionsSubscription();
    await this.createCommitteesSubscription();
  }

  // Elections
  private createAllElectionSubscription() {
    if (this.allElectionsSubscription) {
      return;
    }

    this.allElectionsSubscription = of('').pipe(
      mergeMap(() =>  this.databaseService.collections?.elections.find().$ ),
    )
    .subscribe(results => this.allElectionsSubject.next(results));
  }

  private createElectionsWithCandidateSubscription() {
    if (this.electionsWithCandidateSubscription) {
        return;
    }
    
    this.electionsWithCandidateSubscription = 
      // this.databaseService.collections?.elections.find().where('candidates_count').gt(0).sort('election_date').$
      this.databaseService.collections?.elections.find().where('candidates_count').gt(0).$
        .subscribe( results => this.electionsWithCandidateSubject.next(results) );
  }

  // Candidates
  private createCandidatesForSelectedElectionSubscription() {
    if (this.candidatesInSelectedElectionSubscription) {
      return;
    }

    const candidatesObservable = of('').pipe(
        mergeMap(() => this.electionSelectionChanged.asObservable() ),
        mergeMap(electionID => iif(() => electionID === 'ALL', 
          this.databaseService.collections?.candidates.find().$,
          this.databaseService.collections?.candidates.find().where('election_id').eq(electionID).$ )
        )
    );

    this.candidatesInSelectedElectionSubscription = candidatesObservable
      .subscribe( results => this.candidatesInSelectedElectionSubject.next(results) );
  }

  // Filings
  createFilingsFromSelectedCandidateSubscription() {
    if (this.filingsFromSelectedCandidateSubscription) {
      return;
    }

    const filingsObservable = of('').pipe(
      // mergeMap(() => this.electionSelectionChanged.asObservable() ),
      mergeMap(candidateID => iif(() => candidateID === 'ALL', 
        this.databaseService.collections?.filings.find().$,
        this.databaseService.collections?.filings.find().$)
        // this.localDB?.filings.find().where('election_id').eq(candidateID).$ )
      )
    );

    this.filingsFromSelectedCandidateSubscription = filingsObservable
      .subscribe( results => this.filingsFromSelectedCandidateSubject.next(results) );
  }

  // Transactions
  createTransactionsSubscription() {
    if (this.transactionsSubscription) {
      return;
    }

    const transactionsObservable = of('').pipe(
      mergeMap(() =>this.databaseService.collections?.transactions.find().$ )
    );

    this.transactionsSubscription = transactionsObservable
      .subscribe( results => this.transactionsSubject.next(results) );
  }

  // Committees
  createCommitteesSubscription() {
    if (this.committeesSubscription) {
      return;
    }
    
    const collectionObservable = of('').pipe(
      mergeMap(() =>this.databaseService.collections?.committees.find().$ )
    );

    this.committeesSubscription = collectionObservable
      .subscribe( results => this.committeesSubject.next(results) );
  }

  ngOnDestroy() {
    this.allElectionsSubscription?.unsubscribe();
    this.electionsWithCandidateSubscription?.unsubscribe();
    this.candidatesInSelectedElectionSubscription?.unsubscribe();
    this.filingsFromSelectedCandidateSubscription?.unsubscribe();
    this.transactionsSubscription?.unsubscribe();
    this.committeesSubscription?.unsubscribe();
  }

}