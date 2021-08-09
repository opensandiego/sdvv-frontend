import { Injectable } from '@angular/core';

import { DatabaseService } from './database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignFilingService {
  localDB;

  constructor( ) {
    this.database();
  }

  async database() {
    const databaseService = new DatabaseService();
    this.localDB = await databaseService.getInstance();
  }

  addMonthsNewFilings(months: number = 6) {
    return this.getFilingDateRanges()
      .then( async range => {
        const monthsAgo = new Date(range.oldest);
        monthsAgo.setMonth(monthsAgo.getMonth() - months);
        await this.addFilingsInDateRange(monthsAgo.toISOString(), range.oldest)
      });
  }

  getFilingDateRanges(): Promise<{ oldest: string, newest: string }> {
    return this.localDB.filings.find().exec()
      .then(  results => {
        if (results.length < 1) {
          return { oldest: (new Date()).toISOString(), newest: (new Date()).toISOString() };
        }
        const dates = results.map(result => new Date(result.filing_date_time));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        return { oldest: minDate.toISOString(), newest: maxDate.toISOString() };
      });
  }

  addFilingsInDateRange(oldestDate: string, newestDate: string) {
    return fetch(`https://efile.sandiego.gov/api/v1/public/campaign-search?start_date=${oldestDate}&end_date=${newestDate}`)
      .then(response => response.json())
      .then(json => json.data)
      .then(data => this.addFilingsToDB( this.mapFilingFields(data) ))
      .catch(error => console.log("error: ", error));
  }


  addFilingsToDB(filingsToAdd) {
    const filingIDsToAdd = filingsToAdd.map(filing => filing.filing_id);

    return this.localDB.filings.find()
      .where('filing_id').in(filingIDsToAdd).exec()
      .then(filings => filings.map(filing => filing.filing_id))
      .then(filing_ids => 
        // remove filings from array that are already in database
        filingsToAdd.filter( filing => 
          !filing_ids.includes(filing.filing_id)
        )
      )
      .then(newFilings => {
        this.localDB.filings.bulkInsert(newFilings)              
      });
  }

  mapFilingFields(filings) {

    return filings.map(filing => {
      const newFiling = {
        amendment: filing.amendment,
        amendment_number: filing.amendment_number,
        amends_orig_id: filing.amends_orig_id,
        amends_prev_id: filing.amends_prev_id,
        doc_public: filing.doc_public,
        e_filing_id: filing.e_filing_id,
        entity_name: filing.entity_name,
        filing_date: filing.filing_date,
        filing_id: filing.filing_id,
        filing_subtypes: filing.filing_subtypes,
        filing_type: filing.filing_type,
        period_end: filing.period_end,
        filing_date_time: (new Date(filing.filing_date)).toISOString(),
      };

      let addedFields;

      if (filing?.coe_id) {
        addedFields = {
          coe_id: filing.coe_id,
          entity_id: filing.entity_id,
          form_name: filing.form_name,
          name: filing.name,
          name_first: filing.name_first,
          name_suffix: filing.name_suffix,
          name_title: filing.name_title,
        }
      } else {
        addedFields = {
          amendment_type: filing.amendment_type,
          covers_period: filing.covers_period,
          form: filing.form,
          period_start: filing.period_start,
        }
      }
      return { ...newFiling, ...addedFields };

    });

  }

  updateFilingsInDB(candidateOfficeElectionID: string) {
    return fetch(`https://efile.sandiego.gov/api/v1/public/campaign-search/candidate/filing/list/${candidateOfficeElectionID}`)
      .then(response => response.json())
      .then(json => json.data)
      .then(data => this.addFilingsToDB( this.mapFilingFields(data) ))
      .catch(error => console.log("error: ", error));
  }

  updateFilingCountsInCandidate(candidateOfficeElectionID: string, candidateName: string) {
    const candidateSelector = { entity_name: {$regex: `.*${candidateName}.*`} };

    const candidateQuery = this.localDB.candidates
      .find().where('coe_id').eq(candidateOfficeElectionID);

    // Candidate names can have middle initials and dashes that
    // make matching text inexact and cause filings_count to inconsistent. 
    return this.localDB.filings.find( {selector: candidateSelector} ).exec()
      .then(filings => {
          candidateQuery.update({ $set: { filings_count: filings.length } });
          return filings.length;
        }
      )
      .catch(error => console.log("error: ", error));
  }


  deleteAllFilings() {
    // return this.localDB.filings.remove();
    const query = this.localDB.filings.find();
    return query.remove()
  }


}