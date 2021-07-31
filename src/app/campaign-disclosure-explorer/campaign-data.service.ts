import { Injectable } from '@angular/core';

import { DatabaseService } from './database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignDataService {
  localDB;

  constructor( ) {
    this.database();
  }

  async database() {

    const databaseService = new DatabaseService();
    this.localDB = await databaseService.getInstance();
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
