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
    await this.updateCommitteesInDB()
    // check results from adding committees
      .then(() => this.localDB.committees.find().exec())
      // .then(results => console.log('results', results.slice(0,5)))
      .then(results => console.log('results.length', results.length))
  }

  setPrimaryCandidateCommittee(candidateID: string) {
    this.localDB.committees.find().exec()
      .then(results => {
        if (results.length < 1) {
          console.log('updating committees');
          return this.updateCommitteesInDB();
        } else {console.log('NOT updating committees');}
      })
      .then(() => this.localDB.candidates.findOne()
        .where('coe_id').eq(candidateID).exec())
      // .then(results => console.log('results', results))
      //last_name
      .then(candidate => {
        console.log('candidate', candidate)
        console.log('candidate.last_name', candidate.last_name)
        const candidateSelector = { 
          entity_name_lower: { $regex: `.*${candidate.last_name.toLowerCase()}.*` },
          // entity_name: { $regex: `.*${candidate.first_name}.*` },
        };
        
        this.localDB.committees.find({selector: candidateSelector}).exec();
      })
        // this.localDB.committees.find().where('entity_name').regex(/Bry/).exec()})
      .then(results => console.log('results 1:', results))

  }

  // Committees
  updateCommitteesInDB() {
    // There are multiple committees that have the same entity_id
    // For example: 05dd7dc4-c082-5462-d278-b9ee534bc12f
    return fetch(`https://efile.sandiego.gov/api/v1/public/campaign-search/by-name?candidate_name=`)
      .then(response => response.json())
      .then(json => {
        return json.data.committee_list.map(committee=> ({
          entity_id: committee.entity_id,
          entity_name: committee.entity_name,
          entity_name_lower: committee.entity_name_lower,
          entity_type: committee.entity_type,
        }));
      })
      .then(committees => this.addItemsToCollection(committees, 'committees', 'entity_id'))
  }

  
  addItemsToCollection(itemsToAdd, collection: string, keyField: string) {
    const itemIDsToAdd = itemsToAdd.map(item => item[keyField]);
    // console.log('itemIDsToAdd', itemIDsToAdd)

    return this.localDB[collection].find()
      .where(keyField).in(itemIDsToAdd).exec()
      .then(items => items.map(item => item[keyField]))
      // .then(results => {console.log('results', results); return results;})
      .then(item_ids => 
        // remove items from array that are already in database
        itemsToAdd.filter( item => 
          !item_ids.includes(item[keyField])
        )
      )
      .then(newFilings => {
        this.localDB[collection].bulkInsert(newFilings)              
      });
  }
  

  // Candidates
  updateCandidatesInDB(electionID) {
    const election_id = electionID;
    return fetch(`https://efile.sandiego.gov/api/v1/public/campaign-search/candidate/list/${election_id}`)
    .then(response => response.json())
    .then(json => json.data)
    .then(
      async data => {
        let candidateDocs = [];

        for (const office in data) {

          let candidatesForOffice = data[office].map(candidate => ({
            coe_id: candidate.coe_id,
            filer_id: candidate.filer_id,
            office_id: candidate.office_id,
            election_id: candidate.election_id,
            first_name: candidate.first_name,
            middle_name: candidate.middle_name,
            last_name: candidate.last_name,
            title: candidate.title,
            suffix: candidate.suffix,
            office: candidate.office,
            office_code: candidate.office_code,
            jurisdiction_id: candidate.jurisdiction_id,
            district: candidate.district,
            agency: candidate.agency,
            jurisdiction_type: candidate.jurisdiction_type,
            jurisdiction_name: candidate.jurisdiction_name,
            jurisdiction_code: candidate.jurisdiction_code,
            candidate_name: candidate.candidate_name,
          }));

          candidateDocs = candidateDocs.concat(candidatesForOffice);
        }

        const candidateIDsToAdd = candidateDocs.map(candidate => candidate.coe_id);
        const candidateIDsInDB = await this.localDB.candidates.find()
          .where('coe_id').in(candidateIDsToAdd).exec()
          .then(candidates => candidates.map(candidate => candidate.coe_id));

        // remove candidates from array that are already in database
        const newCandidates = candidateDocs.filter( candidate => 
          !candidateIDsInDB.includes(candidate.e_filing_id)
        );

        await this.localDB.candidates
          .bulkInsert(newCandidates)
          .catch(error => console.log("error: ", error));

        const candidateCount = (await this.localDB.candidates
          .find().where('election_id').eq(election_id).exec()).length;

        const electionQuery = await this.localDB.elections
          .find().where('election_id').eq(election_id);

        electionQuery.update({
          $set: {
            candidates_count: candidateCount
          }
        });

        return newCandidates;
      }
    )
  }

  deleteCandidates(electionID: string) {

    const options = {
      selector: {
        election_id: electionID
      }
    };      
    
    const electionQuery = this.localDB.elections.find().where('election_id').eq(electionID);    
    const candidatesQuery = this.localDB.candidates.find(options);

    return candidatesQuery.exec()
    .then(
      async results => {
        await electionQuery.update({ $set: { candidates_count: 0 } });
        return candidatesQuery.remove().then( () => results );
      }
    )

  }


  // Elections
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
        return query.remove().then( () => results );
      }
    )

  }

}
