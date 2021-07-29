import { Injectable, EventEmitter } from '@angular/core';

import { BehaviorSubject, from, fromEvent, Observable, Subject } from 'rxjs';

import { DatabaseService } from './database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignDataService {
  localDB;
  collections;

  collectionSubject = new Subject<any>();

  constructor( ) {
    this.database();
  }

  async database() {

    const databaseService = new DatabaseService();
    this.localDB = await databaseService.getInstance();

    this.localDB.elections.find().$.subscribe(
      results => {
        this.collectionSubject.next(results)
      }
    )
 
  }

  getElectionsOnDBUpdate() { }
  getUpdateToElections(): Observable<any>{
    return this.collectionSubject;
  }
  showElectionsInDBOnUpdates() { }

  async showElectionsInDB() {
    const someElections = await this.collections.elections
      .find()
      .exec()

    console.dir('someElections');
    console.dir(someElections);
  }

  updateElectionsInDB() {
    return fetch('https://efile.sandiego.gov/api/v1/public/campaign-search/election/list')
    .then(response => response.json())
    .then(json => json.data)
    .then(
      async data => {

        const electionDocs = data.map(election => ({
          election_date: election.election_date,
          election_id: election.election_id,
          election_type: election.election_type,
          internal: election.internal,
        }));

        for await (const electionDoc of electionDocs) {
          this.localDB.elections.upsert(electionDoc);
        }

        return electionDocs;
      }
    )


  }

  deleteElections() {
    const query = this.localDB.elections.find();
    return query.exec()
    .then(
      results => {
        return query.remove().then( remaining => results );
      }
    )

  }

}
