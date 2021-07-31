import { Injectable } from '@angular/core';
import { BehaviorSubject, from, fromEvent, Observable, Subject } from 'rxjs';

import { DatabaseService } from './database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignDataChangesService {
  localDB;
  electionsSubject = new Subject<any>();
  candidatesSubject = new Subject<any>();

  constructor( ) {
    this.database();
  }

  async database() {
    const databaseService = new DatabaseService();
    this.localDB = await databaseService.getInstance();

    this.localDB.elections.find().$.subscribe(
      results => {
        this.electionsSubject.next(results)
      }
    )

  }

  getUpdateToElections(): Observable<any>{
    return this.electionsSubject;
  }

}
