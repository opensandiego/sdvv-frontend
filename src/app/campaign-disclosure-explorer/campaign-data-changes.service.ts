import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import {  map, mergeMap } from 'rxjs/operators';

import { DatabaseService } from './database/database.service';
import {
  RxDatabase,
} from 'rxdb'

@Injectable({
  providedIn: 'root'
})
export class CampaignDataChangesService {
  localDB: RxDatabase;
  private allElectionsSubscription;
  private allElectionsSubject = new Subject<any>();
  public  allElections$ = this.allElectionsSubject.asObservable();

  private electionsWithCandidateSubscription;
  private electionsWithCandidateSubject = new Subject<any>();
  public  electionsWithCandidate$ = this.electionsWithCandidateSubject.asObservable();
 
  private candidatesInSelectedElectionSubscription;
  private candidatesInSelectedElectionSubject = new Subject<any>();
  public  candidatesInSelectedElection$ = this.candidatesInSelectedElectionSubject.asObservable(); 

  public electionSelectionChanged = new Subject<string>(); // for signals from components

  constructor( ) {
    this.setupDatabase();
  }

  async setupDatabase() {
    const databaseService = new DatabaseService();
    this.localDB = await databaseService.getInstance();
    await this.setupSubscriptions();
  }
  
  async setupSubscriptions() {
    await this.createAllElectionSubscription();
    await this.createElectionsWithCandidateSubscription();
    await this.createCandidatesForSelectedElectionSubscription()
  }

  private createAllElectionSubscription() {
    if (this.allElectionsSubscription) {
      return;
    }

    this.allElectionsSubscription = of('').pipe(
      mergeMap(() =>  this.localDB?.elections.find().$ ),
    )
    .subscribe(results => this.allElectionsSubject.next(results));
  }

  private createElectionsWithCandidateSubscription() {
    if (this.electionsWithCandidateSubscription) {
        return;
    }
    
    this.electionsWithCandidateSubscription = 
      // this.localDB?.elections.find().where('candidates_count').gt(0).sort('election_date').$
      this.localDB?.elections.find().where('candidates_count').gt(0).$
        .subscribe( results => this.electionsWithCandidateSubject.next(results) );
  }

  private createCandidatesForSelectedElectionSubscription() {
    if (this.candidatesInSelectedElectionSubscription) {
      return;
    }

    const candidatesObservable = of('').pipe(
        mergeMap(() => this.electionSelectionChanged.asObservable() ),
        mergeMap((electionID) => this.localDB?.candidates.find().where('election_id').eq(electionID).$ ),
    );

    this.candidatesInSelectedElectionSubscription = candidatesObservable
      .subscribe( results => this.candidatesInSelectedElectionSubject.next(results) );
  }

  ngOnDestroy() {
    this.allElectionsSubscription?.unsubscribe();
    this.electionsWithCandidateSubscription?.unsubscribe();
    this.candidatesInSelectedElectionSubscription?.unsubscribe();
    console.log('Destroy CampaignDataChangesService');
  }

}
