import { Injectable } from '@angular/core';
import { EMPTY, from } from 'rxjs';
import { concatAll, concatMap, expand, map, toArray } from 'rxjs/operators';

import { DatabaseService } from '../database/database.service';
import { Transaction, EFileTransactionResponse, TransactionDB } from '../models/transaction.interface';
import { EFileDownloadService } from '../services/efile.download.service';

interface DateRange {
  begin: string;
  end: string;
};

@Injectable({
  providedIn: 'root'
})
export class CampaignTransactionService {

  constructor(
    private databaseService: DatabaseService,
    private eFileDownloadService: EFileDownloadService,
  ) { }

  public getTransactionsFromEFile(oldestDate: Date, newestDate: Date) {
    const ranges = this.getDateRanges(oldestDate, newestDate);

    return from(ranges).pipe(
      concatMap(range => 
        this.getAllTransactionsInDateRange(range.begin, range.end)
      ),
      concatAll(),
      toArray(),
    )

  }

  private getAllTransactionsInDateRange(oldestDate: string, newestDate: string, pageSize = 8000) {
    const source = 
      this.eFileDownloadService.getTransactions(oldestDate, newestDate, 1, pageSize);

    return source.pipe(
      expand( (response) => {
        const currentPage = +response['page_number'];
        const endCondition = 
          response.data.length < 1;
        return (endCondition)
          ? EMPTY 
          : this.eFileDownloadService.getTransactions(oldestDate, newestDate, currentPage+1, pageSize);
      }),
      map(response => <Transaction[]>response.data),
      concatAll(),
      toArray(),
    )
  }

  private getDateRanges(
    oldestDate = new Date('06/01/2021'),
    newestDate = new Date(),
    incrementInDays = 15,
  ): DateRange[] {

    if (incrementInDays < 1) { return []; }

    let dateRanges = [];
    let dateAccumulator = new Date(oldestDate.getTime());

    while (dateAccumulator < newestDate) {
      const startStr = dateAccumulator.toISOString();
      dateAccumulator.setDate(dateAccumulator.getDate() + incrementInDays);
      const endStr = (dateAccumulator > newestDate) 
        ? newestDate.toISOString() 
        : dateAccumulator.toISOString();

      dateRanges.push({
        begin: startStr,
        end: endStr
      });
    }

    return dateRanges;
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

  removeDuplicateTransactions(transactions: Transaction[]): Transaction[] {
    const uniqueTransactions = [ ...(new Map(transactions.map(transaction => ([
      `${transaction.filing_id}|${transaction.tran_id}|${transaction.schedule}`,
      transaction
    ])))).values()];

    console.log('Count transactions:', transactions.length);
    console.log('Count uniqueTransactions:', uniqueTransactions.length);
    console.log('Difference:', transactions.length - uniqueTransactions.length);

    return uniqueTransactions;
  }

  deleteAllTransactions() {
    return this.databaseService.deleteAllItemsInCollection(this.databaseService.collections.transactions);
  }

  addIDFields(transactions: TransactionDB[]): TransactionDB[] {
    return transactions.map(transaction => ({
        ...transaction,
        id: `${transaction.filing_id}|${transaction.tran_id}|${transaction.schedule}`,
    }));
  }

  saveTransactionToLocalDB(transactions: TransactionDB[]) {
    return this.databaseService
      .addItemsToCollection(this.addIDFields(transactions), this.databaseService.collections.transactions, 'id');
  }

}

