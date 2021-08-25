import { Injectable } from '@angular/core';

import { DatabaseService } from '../database/database.service';
import { CampaignDataChangesService } from './campaign-data-changes.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignProcessTransactionsService {

  constructor(
    private campaignDataChangesService: CampaignDataChangesService,
    private databaseService: DatabaseService,
  ) { }

  /**
   * Transaction states
   * 1. new/no matching filing found 
   *  has_been_processed: false
   *  include_in_calculations: false
   * 
   * 2. matching filing found that has NOT been superseded
   *  has_been_processed: true
   *  include_in_calculations: true
   * 
   * 3. matching filing found that HAS been superseded
   *  has_been_processed: true
   *  include_in_calculations: false
   */

  /**
   * Actions when new transactions are added: 
   *  get filing ids, add new transactions as state 1, filter filing ids from transactions by those that exist in filings collection,
   *  get filings from filtered filing ids, proceed to #A
   * 
   * Actions when new filings are added: (new filings are those that are not already in the collection)
   *  determine amended filings that would cause existing transactions to change their include_in_calculations value
   *  for each filing id proceed to #A
   *  
   * Set transactions based on filings (#A)
   *  check filing to determine if it has been amended if so then set all transactions with filing id to state 3, 
   *  otherwise set the matching transactions to state 2,
   * 
   * Added -for any transactions added get a list of their filing ids, for any filings ids that are amending
   *  find the amended filings and add them to the list, for all filings in the list process/reprocess the 
   *  filings to determine what to do with their transactions
   */

  // addSubs() {
  //   // this.campaignDataChangesService.filingsFromSelectedCandidate$.subscribe(results => 
  //   //   {
  //   //     console.log('addSubs', results.length)
  //   //   })
  // }

  // filingsAdded() {
  //   return this.localDB.filings().find()
  //     .then(results => console.log(results.length))
  // }


  processTransactionsByFilingId(filingID: string){

    return this.getFilingOrigIDFromFilingId(filingID)
      .then(id => this.processTransactionsByFilingOrigId(id))
  }

  // this can be used if initiated from a transaction rather than a filing
  getFilingOrigIDFromFilingId(filingID: string) {
    return this.databaseService.collections.filings
      .findOne()
      .and([
        { enabled: true },
        { "filing_id": filingID },
      ])
      .exec()
      // what if there is no matching filing found? then undefined is returned
      .then( filing => (filing?.amendment) ? filing.amends_orig_id.orig_id : filing.amends_orig_id )
  }

  processTransactionsByFilingOrigId(filingOrigID: string) {

    this.databaseService.collections.filings
      .find()
      .and([
        { enabled: true },
        { $or: [
          { "amends_orig_id": filingOrigID },
          { "amends_orig_id.orig_id": filingOrigID },
        ]}
      ])
      .exec()
      .then( results => {console.log('processFilingCheckOrig results', results); return results;} )
      .then( async filings => {
        const amendmentNumbers: number[] = filings.map(filing => filing.amendment_number )
        const maxAmendmentNumber: number = Math.max(...amendmentNumbers);

        for (const filing of filings) {
          await this.databaseService.collections.transactions
            .find()
            .where('filing_id')
            .eq(filing.filing_id)
            .update({
              $set: {
                has_been_processed: true,
                include_in_calculations: (filing.amendment_number === maxAmendmentNumber),
              }
            });
        }

      })

  }
  
  processFilingCheckOrig(filingID: string) {
    this.databaseService.collections.filings
      .findOne()
      .and([
        { enabled: true },
        { "filing_id": filingID },
      ])
      .exec()
      .then( results => {console.log('processFilingCheckOrig results', results); return results;} )
      .then( async results => {
        if (results === null) { return; }
        let orig_id = (results.amendment) ? results.amends_orig_id.orig_id : results.amends_orig_id;

        console.log('processFilingCheckOrig orig_id', orig_id)

        const maxAmendmentNumber = await this.databaseService.collections.filings
          .find()
          .and([
            { enabled: true },
            { $or: [
              { "amends_orig_id": orig_id },
              { "amends_orig_id.orig_id": orig_id },
            ]}
          ])
          .exec()
          .then( filings => {console.log('processFilingCheckOrig results', filings); return filings;})

          .then( filings => filings.map(filing => filing.amendment_number ))
          .then( results => {console.log('processFilingCheckOrig amendmentNumbers', results); return results;})
          .then( amendmentNumber => Math.max(...amendmentNumber) );

        console.log('processFilingCheckOrig maxAmendmentNumber', maxAmendmentNumber)

        const includeFilingsInCalculations: boolean = (results.amendment_number >= maxAmendmentNumber);

        return this.databaseService.collections.transactions
          .find()
          .where('filing_id')
          .eq(filingID)
          .update({
            $set: {
              has_been_processed: true,
              include_in_calculations: includeFilingsInCalculations,
            }
          });

      })
  }

  setTransactionsToAmended() {}
  setTransactionsToMostRecent() {}
  
  // process filings by checking amended filings for a previous filings. 
  // If a amended filing in sequence is missing this will not be accurate, 
  //   the filing prior to the missing filing will get set as include_in_calculations
  // If a amending filing is added then previous filings will need to be reprocessed
  // processFiling(filingID: string) { // set transaction based on this filing
  processFilingCheckPrev(filingID: string) {
    this.databaseService.collections.filings
      .find()
      // find other filings that have amended filing with filingID
      .and([
        { enabled: true },
        { amendment: true },
        { "amends_prev_id.prev_id": filingID },
      ])
      .exec()
      .then( results => {console.log('processFiling results.length', results.length); return results;})
      .then( results => {
        // check if filing with filingID has been amended
        const filingIsAmended = (results.length > 0);
        console.log('filingIsAmended', filingIsAmended, filingID);

        if (filingIsAmended) { 
          // console.log('processFiling', results);
          return this.databaseService.collections.transactions
            .find()
            .and([
              { filing_id: filingID },
              // { has_been_processed: false },
            ])
            .update({
              $set: {
                has_been_processed: true,
                include_in_calculations: false,
              }
            });
        } else {
          return this.databaseService.collections.transactions
            .find()
            .and([
              { filing_id: filingID },
              { has_been_processed: false },
            ])
            .update({
              $set: {
                has_been_processed: true,
                include_in_calculations: true,
              }
            });
        }
      })
      // .then( results => console.log('processFiling transactions', results))
      .then( results => console.log('processFiling transactions done'))

  }

}
