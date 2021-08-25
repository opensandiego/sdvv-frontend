import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {
  createRxDatabase,
  RxDatabase,
  PouchDB,
} from 'rxdb'
import idb from 'pouchdb-adapter-idb';
PouchDB.plugin(idb);

import memory from 'pouchdb-adapter-memory';
PouchDB.plugin(memory);

const { 
  electionSchema, 
  candidateSchema,
  filingSchema,
  transactionSchema,
  committeeSchema,
} = require('./schemas');


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: RxDatabase;
  public collections;

  private buildDb = new Subject<void>();
  public databaseReady = this.buildDb.asObservable();

  constructor() { 
    this.buildDatabase()
      .then( db => this.db = db)
      .then( () => this.addCollections(this.db))
      .then( () => this.collections = this.db.collections)
      .then( () => this.buildDb.next())
      .catch( error => console.error('Error setting up rxdb database:', error));
   }
  
  private addCollections(db: RxDatabase) {
    return db.addCollections({
      elections: {
          schema: electionSchema
      },
      candidates: {
          schema: candidateSchema
      },
      filings: {
          schema: filingSchema
      },
      transactions: {
          schema: transactionSchema
      },
      committees: {
          schema: committeeSchema
      },
    });
  }

  private buildDatabase(): Promise<RxDatabase> {
    return createRxDatabase({
      name: 'campaigndb',
      // adapter: 'idb',
      // Using memory adapter while developing schemas to avoid
      // needing to delete the database when a schema changes.
      adapter: 'memory', 
      ignoreDuplicate: true,
    });
  }

  public addItemsToCollection(itemsToAdd: object[], collection, keyField: string) {
    const itemIDsToAdd = itemsToAdd.map(item => item[keyField]);

    return collection.find()
      .where(keyField).in(itemIDsToAdd).exec()
      .then(items => items.map(item => item[keyField]))
      .then(item_ids => 
        // remove items from array that are already in database
        itemsToAdd.filter( item => 
          !item_ids.includes(item[keyField])
        )
      )
      .then(newItems => {
        collection.bulkInsert(newItems);
        return newItems;
      })
      .catch(error => console.log("error: ", error));
  }

  public deleteAllItemsInCollection(collection) {
    const query = collection.find();
    return query.exec()
    .then(
      results => {
        return query.remove().then( () => results );
      }
    )
  }

}
