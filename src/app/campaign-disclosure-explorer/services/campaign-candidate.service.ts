import { Injectable } from '@angular/core';

import { DatabaseService } from '../database/database.service';
import { CampaignDataService } from './campaign-data.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignCandidateService {
  localDB;
  campaignDataService = new CampaignDataService();
  databaseService;

  constructor( ) {
    this.database();
  }

  async database() {
    this.databaseService = new DatabaseService();
    this.localDB = await this.databaseService.getInstance();
  }


  setPrimaryCandidateCommittee(candidateID: string) {
    return this.localDB.committees.find().exec()
      .then(results => {
        if (results.length < 1) {
          return this.campaignDataService.updateCommitteesInDB();
        }
      })
      .then(() => this.localDB.candidates.findOne()
        .where('coe_id').eq(candidateID).exec())

      .then( async candidate => {

        const election = await this.localDB.elections
          .findOne().where('election_id').eq(candidate.election_id).exec();

        const electionYear = (new Date(election.election_date)).getFullYear();

       return { candidate, electionYear };
      })

      .then( ({candidate, electionYear}) => {

        let lastName = candidate.last_name;
        let office = candidate.office;

        if (lastName.includes('-')) {
          lastName = lastName.split('-').join('|');
        }

        if (lastName.includes(' ')) {
          lastName = lastName.split(' ').join('|');
        }

        // This gets 'Attorney' from 'City Attorney' and 'Council' from 'City Council'
        if (office.includes(' ')) {
          office = office.split(' ')[1];
        }
        
        const regex = new RegExp(`(?=.*${lastName})(?=.*${office})(?=.*${electionYear}).*`, 'i');
        
        return this.localDB.committees.find({
          selector: { 
            entity_name: { $regex: regex },
          },
        }).exec();
      })
      .then(committees => committees.map(committee => committee.entity_name))
      .then(committees => committees.sort((c1, c2) => c1.length - c2.length))
      .then(committees => committees[0])

      .then(committee => 
        this.localDB.candidates.findOne().where('coe_id').eq(candidateID)
          .update({
            $set: { candidate_controlled_committee_name: committee }
        })
      )
      .catch(error => console.log("error: ", error));
  }

  updateCandidatesInDB(electionID: string) {
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

        const newCandidates = await this.databaseService
          .addItemsToCollection(candidateDocs, this.localDB.candidates, 'coe_id');

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

    const electionQuery = this.localDB.elections.find().where('election_id').eq(electionID);    
    const candidatesQuery = this.localDB.candidates.find({ selector: { election_id: electionID } });

    return candidatesQuery.exec()
    .then(
      async results => {
        await electionQuery.update({ $set: { candidates_count: 0 } });
        return candidatesQuery.remove().then( () => results );
      }
    )

  }

}