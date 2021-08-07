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

  // Filings 
  updateFilingsInDB(candidateOfficeElectionID: string, candidateName?: string) {
    return fetch(`https://efile.sandiego.gov/api/v1/public/campaign-search/candidate/filing/list/${candidateOfficeElectionID}`)
    .then(response => response.json())
    .then(json => json.data)
    .then(
      async data => {

        const candidateFilingDocs = data.map(filing => ({
          amendment: filing.amendment,
          amendment_number: filing.amendment_number,
          amends_orig_id: filing.amends_orig_id,
          amends_prev_id: filing.amends_prev_id,
          coe_id: filing.coe_id,
          doc_public: filing.doc_public,
          e_filing_id: filing.e_filing_id,
          entity_id: filing.entity_id,
          entity_name: filing.entity_name,
          filing_date: filing.filing_date,
          filing_id: filing.filing_id,
          filing_subtypes: filing.filing_subtypes,
          filing_type: filing.filing_type,
          form_name: filing.form_name,
          name: filing.name,
          name_first: filing.name_first,
          name_suffix: filing.name_suffix,
          name_title: filing.name_title,
          period_end: filing.period_end,
        }));

        const filingIDsToAdd = candidateFilingDocs.map(filing => filing.e_filing_id);
        const filingIDsInDB = await this.localDB.filings.find()
          .where('e_filing_id').in(filingIDsToAdd).exec()
          .then(filings => filings.map(filing => filing.e_filing_id));

        // remove filings from array that are already in database
        const newFilings = candidateFilingDocs.filter( filing => 
          !filingIDsInDB.includes(filing.e_filing_id)
        );

        await this.localDB.filings
          .bulkInsert(newFilings)
          .catch(error => console.log("error: ", error));

        // Candidate names can have middle initials and dashes that
        // make matching text inexact and cause the count to be off. 
        const filingCount = (await this.localDB.filings
          .find({
            selector: {
              entity_name: {$regex: `.*${candidateName}.*`}
            }
          }).exec()).length;

        const candidateQuery = await this.localDB.candidates
          .find().where('coe_id').eq(candidateOfficeElectionID);

        candidateQuery.update({
          $set: {
            filings_count: filingCount
          }
        });

        return newFilings;
      }
    )
  }

  deleteFilings(candidateOfficeElectionID: string) {

    const options = {
      selector: {
        coe_id: candidateOfficeElectionID
      }
    };      
    
    const filingsQuery = this.localDB.filings.find(options);

    return filingsQuery.exec()
    .then(
      async results => {
    //     await electionQuery.update({ $set: { candidates_count: 0 } });
        return filingsQuery.remove().then( () => results );
      }
    )

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
