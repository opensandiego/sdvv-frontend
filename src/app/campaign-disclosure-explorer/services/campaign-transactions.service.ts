import { Injectable } from '@angular/core';

import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignTransactionService {

  constructor(private databaseService: DatabaseService) { }

  addNWeeksOfPastTransaction(timeUnits: number = 1) {
    return this.getDateRanges()
      .then( async range => {
        const timeUnitsAgo = new Date(range.oldest);
        timeUnitsAgo.setDate(timeUnitsAgo.getDate() - (timeUnits * 7));
        // console.log(timeUnitsAgo.toISOString(), range.oldest);
        return this.addTransactionsInDateRange(timeUnitsAgo.toISOString(), range.oldest)
      });
  }

  addMonthsNewTransaction(months: number = 6) {
    return this.getDateRanges()
      .then( async range => {
        const monthsAgo = new Date(range.oldest);
        monthsAgo.setMonth(monthsAgo.getMonth() - months);
        // console.log(monthsAgo.toISOString(), range.oldest )
        await this.addTransactionsInDateRange(monthsAgo.toISOString(), range.oldest)
      });
  }

  getDateRanges(): Promise<{ oldest: string, newest: string }> {
    return this.databaseService.collections.transactions.find().exec()
      .then( results => {
        if (results.length < 1) {
          // console.log("today" )
          return { oldest: (new Date()).toISOString(), newest: (new Date()).toISOString() };
        }
        const dates = results.map(result => new Date(result.transaction_date_time));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        // console.log(minDate, maxDate )

        return { oldest: minDate.toISOString(), newest: maxDate.toISOString() };
      });
  }
  
  addYearsNewTransaction(committeeName: string, years: number = 1) {
    const yearsAgo = new Date();
    yearsAgo.setFullYear(yearsAgo.getFullYear() - years);

    return this.addTransactionsInDateRange(yearsAgo.toISOString(), new Date().toISOString(), 1, committeeName);
  }

  getTransactionsFromEFile() {}

  addTransactionsInDateRange(oldestDate: string, newestDate: string, pageNumber: number = 1, filerName: string = '') {
    const pageSize = 2000;
    const maxPages = 20;
    const name = filerName.split(' ').join('+');
    const parameters = `&start_date=${oldestDate}&end_date=${newestDate}&page_size=${pageSize}&page_number=${pageNumber}&filer_name=${name}`;
    const queryStr = `&transaction_name=&transaction_type=&most_recent_amendment=false&search_boolean_expression=false`;
    return fetch(`https://efile.sandiego.gov/api/v1/public/campaign-search/advanced?query=${queryStr}${parameters}`)
      .then(response => response.json())
      // .then(json => {console.log("data: ", json.data); return json;})
      .then(async json => {await this.addTransactionsToDB( this.mapTransactionFields(json.data) ); return json;})
      .then(async json => {
        // console.log("pageNumber: ", pageNumber);
        if ( pageNumber < json.total_pages && pageNumber < maxPages ) {
          return this.addTransactionsInDateRange(oldestDate, newestDate, pageNumber + 1, filerName);
        }
        // for await ()
      })
      .catch(error => console.log("error: ", error));
  }

  addTransactionsToDB(transactionsToAdd) {
    const transactionIDsToAdd = transactionsToAdd.map(document => `${document.filing_id}|${document.tran_id}`);
    // error => console.log("transactionIDsToAdd: ")

    return this.databaseService.collections.transactions.find()
      .where('id').in(transactionIDsToAdd).exec()
      .then(transactions => transactions.map(transaction => transaction.id))
      .then(transaction_ids => 
        // remove transactions from array that are already in database
        transactionsToAdd.filter( transaction => 
          !transaction_ids.includes(transaction.id)
        )
      )
      .then(newTransactions => {
        return this.databaseService.collections.transactions.bulkInsert(newTransactions);
      });
  }

  mapTransactionFields(transactions) {

    return transactions.map(transaction => {
      const newTransaction = {
        id: `${transaction.filing_id}|${transaction.tran_id}`,
        filer_name: transaction.filer_name,
        doc_public: transaction.doc_public,
        e_filing_id: transaction.e_filing_id,
        tran_id: transaction.tran_id,
        transaction_date: transaction.transaction_date,
        amount: transaction.amount,
        tx_type: transaction.tx_type,
        schedule: transaction.schedule,
        filing_id: transaction.filing_id,
        filing_type: transaction.filing_type,
        name: transaction.name,
        intr_name: transaction.intr_name,
        city: transaction.city,
        state: transaction.state,
        zip: transaction.zip,
        spending_code: transaction.spending_code,
        employer: transaction.employer,
        occupation: transaction.occupation, 
        transaction_date_time: (new Date(transaction.transaction_date)).toISOString(),
      };
     
      return newTransaction;

    });

  }

  resetAllTransactionsStatus() {
    return this.databaseService.collections.transactions.find()
    .update({
      $set: {
        has_been_processed: false,
        include_in_calculations: false,
      }
    });
  }

  resetTransactionsStatus(id: string) {
    return this.databaseService.collections.transactions.find().where('id').eq(id)
    .update({
      $set: {
        has_been_processed: false,
        include_in_calculations: false,
      }
    });
  }


  deleteAllTransactions() {
    return this.databaseService.deleteAllItemsInCollection(this.databaseService.collections.transactions);
  }

}

