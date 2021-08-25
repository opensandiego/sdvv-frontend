import { Injectable } from '@angular/core';

import { DatabaseService } from '../database/database.service';
import { Election } from '../models/election.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignElectionService {

  constructor(private databaseService: DatabaseService) {}

  updateElectionsInDB() {
    return fetch('https://efile.sandiego.gov/api/v1/public/campaign-search/election/list')
    .then(response => response.json())
    .then(json => 
      json.data.map(election => ({
        election_date: election.election_date,
        election_id: election.election_id,
        election_type: election.election_type,
        internal: election.internal,
      }))
    )
    .then(
      async electionDocs => await this.databaseService
          .addItemsToCollection(electionDocs, this.databaseService.collections.elections, 'election_id')
    )
  }

  deleteElections() {
    return this.databaseService.deleteAllItemsInCollection(this.databaseService.collections.elections);
  }

  saveElectionsToLocalDB(elections: Election[]) {
    return this.databaseService
      .addItemsToCollection(elections, this.databaseService.collections.elections, 'election_id');
  }

}
