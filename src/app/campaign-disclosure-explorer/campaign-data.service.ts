import { Injectable } from '@angular/core';

import { DatabaseService } from './database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignDataService {
  localDB;
  databaseService;

  constructor( ) {
    this.database();
  }

  async database() {
    this.databaseService = new DatabaseService();
    this.localDB = await this.databaseService.getInstance();
  }

  // Committees
  updateCommitteesInDB() {
    // There are multiple committees that have the same entity_id
    // For example: 05dd7dc4-c082-5462-d278-b9ee534bc12f
    return fetch(`https://efile.sandiego.gov/api/v1/public/campaign-search/by-name?candidate_name=`)
      .then(response => response.json())
      .then(json => {
        return json.data.committee_list.map(committee=> ({
          id: `${committee.entity_id}|${committee.entity_name_lower}`,
          entity_id: committee.entity_id,
          entity_name: committee.entity_name,
          entity_name_lower: committee.entity_name_lower,
          entity_type: committee.entity_type,
        }));
      })
      .then(committees => this.databaseService.addItemsToCollection(committees, this.localDB.committees, 'entity_id'))
  }
  
  // Elections
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
          .addItemsToCollection(electionDocs, this.localDB.elections, 'election_id')
    )
  }

  deleteElections() {
    return this.databaseService.deleteAllItemsInCollection(this.localDB.elections);
  }

}
