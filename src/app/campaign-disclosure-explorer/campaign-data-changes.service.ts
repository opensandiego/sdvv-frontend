import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {  mergeMap } from 'rxjs/operators';

import { DatabaseService } from './database/database.service';
import {
  RxDatabase,
} from 'rxdb'

@Injectable({
  providedIn: 'root'
})
export class CampaignDataChangesService {
  localDB: RxDatabase;
  electionsSubject = new Subject<any>();
  candidatesSubject = new Subject<any>();

  private electionSubscription;
  private candidatesSubscription;

  // public ElectionChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor( ) {
    this.database();
  }

  async database() {
    const databaseService = new DatabaseService();
    this.localDB = await databaseService.getInstance();
  }

  getUpdateToCandidates(): Observable<any>{
    return this.candidatesSubject;
  }

  createCandidatesSubscription() {
    if (this.candidatesSubscription) {
      this.candidatesSubscription.unsubscribe();
    }

    const candidatesObservable = of('').pipe(
      mergeMap(() =>  this.localDB?.candidates.find().$ ),
    );

    this.candidatesSubscription = candidatesObservable
      .subscribe( results => this.candidatesSubject.next(results) );

  }

  createElectionSubscription() {

    if (this.electionSubscription) {
      this.electionSubscription.unsubscribe();
    }

    const electionObservable = of('').pipe(
      mergeMap(() =>  this.localDB?.elections.find().$ ),
    );

    this.electionSubscription = electionObservable
      .subscribe( results => this.electionsSubject.next(results) );

  }

  getUpdateToElections(): Observable<any>{
    return this.electionsSubject;
  }

}
