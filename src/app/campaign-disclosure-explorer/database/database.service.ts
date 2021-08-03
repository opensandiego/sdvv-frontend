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
} = require('./schemas');


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: RxDatabase;
  private collections;

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

  constructor() {  }
}
