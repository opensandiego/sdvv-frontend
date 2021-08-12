import { Injectable } from '@angular/core';

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
  private collections;

  constructor() {  }
  
  public async getInstance() {
    if (!this.db) {
      try {
        this.db = await this.buildDatabase();
      } catch (error) {
        console.error('Unable to create the database:', error);
      }

      this.collections = await this.addCollections(this.db);
    }

    return this.db;

  }

  private async addCollections(db: RxDatabase) {
    return await db.addCollections({
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

  private async buildDatabase(): Promise<RxDatabase> {
    const db = await createRxDatabase({
      name: 'campaigndb',
      // adapter: 'idb',
      // Using memory adapter while developing schemas to avoid
      // needing to delete the database when a schema changes.
      adapter: 'memory', 
      ignoreDuplicate: true,
    });

    return db;
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
