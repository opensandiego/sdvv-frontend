import { Injectable } from '@angular/core';

import { DatabaseService } from './database/database.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignTransactionService {
  localDB;

  constructor( ) {
    this.database();
  }

  async database() {
    const databaseService = new DatabaseService();
    this.localDB = await databaseService.getInstance();
  }

  addMonthsNewTransaction(months: number = 6) {
    return this.getDateRanges()
      .then( async range => {
        const monthsAgo = new Date(range.oldest);
        monthsAgo.setMonth(monthsAgo.getMonth() - months);
        console.log(monthsAgo.toISOString(), range.oldest )
        await this.addTransactionsInDateRange(monthsAgo.toISOString(), range.oldest)
      });
  }

  getDateRanges(): Promise<{ oldest: string, newest: string }> {
    return this.localDB.transactions.find().exec()
      .then( results => {
        if (results.length < 1) {
          console.log("today" )
          return { oldest: (new Date()).toISOString(), newest: (new Date()).toISOString() };
        }
        const dates = results.map(result => new Date(result.transaction_date_time));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        console.log(minDate, maxDate )

        return { oldest: minDate.toISOString(), newest: maxDate.toISOString() };
      });
  }


  addTransactionsInDateRange(oldestDate: string, newestDate: string, pageNumber: number = 1) {
    const pageSize = 50;
    const maxPages = 5;
    const parameters = `&start_date=${oldestDate}&end_date=${newestDate}&page_size=${pageSize}&page_number=${pageNumber}`;
    const queryStr = `&transaction_name=&transaction_type=&most_recent_amendment=true&search_boolean_expression=false&filer_name=`;
    return fetch(`https://efile.sandiego.gov/api/v1/public/campaign-search/advanced?query=${queryStr}${parameters}`)
      .then(response => response.json())
      .then(json => {console.log("data: ", json.data); return json;})
      .then(async json => {await this.addTransactionsToDB( this.mapTransactionFields(json.data) ); return json;})
      .then(json => {
        console.log("pageNumber: ", pageNumber);
        if ( pageNumber < json.total_pages && pageNumber < maxPages ) {
          return this.addTransactionsInDateRange(oldestDate, newestDate, pageNumber + 1);
        }
      })
      .catch(error => console.log("error: ", error));
  }

  addTransactionsToDB(transactionsToAdd) {
    const transactionIDsToAdd = transactionsToAdd.map(document => `${document.filing_id}|${document.tran_id}`);
    error => console.log("transactionIDsToAdd: ")

    return this.localDB.transactions.find()
      .where('_id').in(transactionIDsToAdd).exec()
      .then(transactions => transactions.map(transaction => transaction.id))
      .then(transaction_ids => 
        // remove transactions from array that are already in database
        transactionsToAdd.filter( transaction => 
          !transaction_ids.includes(transaction.id)
        )
      )
      .then(newTransactions => {
        this.localDB.transactions.bulkInsert(newTransactions)
      });
  }

  mapTransactionFields(transactions) {

    return transactions.map(transaction => {
      const newTransaction = {
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



  deleteAllTransactions() {
    const query = this.localDB.transactions.find();
    return query.remove()
  }

}

