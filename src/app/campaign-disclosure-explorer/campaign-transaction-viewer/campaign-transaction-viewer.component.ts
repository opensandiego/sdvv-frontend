import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

import { CampaignDataService } from '../services/campaign-data.service';
import { CampaignDataChangesService } from '../services/campaign-data-changes.service';
import { CampaignFilingService } from '../services/campaign-filing.service';
import { CampaignTransactionService } from '../services/campaign-transactions.service';
import { CampaignProcessTransactionsService } from '../services/campaign-process-transactions.service';
import { EFileDownloadService } from '../services/efile.download.service';


@Component({
  selector: 'campaign-transaction-viewer',
  templateUrl: './campaign-transaction-viewer.component.html',
  styleUrls: ['./campaign-transaction-viewer.component.scss']
})
export class CampaignTransactionViewerComponent implements OnInit {
  id = 'transaction-table';
  tableElement = document.createElement('div');
  table: Tabulator;
  height: string = '400px';
  isLoadingData = false;
  dbSubscriptionActive = false;
  tableData: any[] = [];

  headerMenu = [
    {
      label:"Group by filing_id",
      action:(e, column)=> {
        this.table.setGroupBy("filing_id");
      }
    },
    {
      label:"Disable Groups",
      action:(e, column)=> {
        this.table.setGroupBy();
      }
    },
    {
      label:"Add 1 more weeks of past Transactions",
      action:(e, column)=> {
        this.isLoadingData = true;
        this.campaignTransactionService.addNWeeksOfPastTransaction(1)
          .finally( () => this.isLoadingData = false );
      }
    },
    {
      label:"Add 2 more month of past Transactions",
      action:(e, column)=> {
        this.isLoadingData = true;
        this.campaignTransactionService.addMonthsNewTransaction(2)
          .finally( () => this.isLoadingData = false );
      }
    },
    {
      label:"Remove ALL Transactions",
      action:(e, column)=> {
        this.isLoadingData = true;
        this.campaignTransactionService.deleteAllTransactions()
          .finally( () => this.isLoadingData = false );
      }
    },
    {
      label: "Reset ALL transaction's status",
      action: (e, column)=> {
        this.isLoadingData = true;
        this.campaignTransactionService.resetAllTransactionsStatus()
        .finally( () => this.isLoadingData = false );
      }    
    }
  ];

  columnNames = [
    {
      title: "Data Status", 
      columns: [
        { title: "processed", field: "has_been_processed", hozAlign:"center", formatter:"tickCross", headerFilter: "select", 
          headerFilterParams: { values: true, sortValuesList: "asc" },
          bottomCalc:"count",
        },
        { title: "include", field: "include_in_calculations", hozAlign:"center", formatter:"tickCross", headerFilter: "select", 
          headerFilterParams: { values: true, sortValuesList: "asc" },
          bottomCalc:"count",
        },
      ]
    },    
    {
      title: "eFile Data",
      headerMenu: this.headerMenu,
      columns: [
        { title: "transaction_date", field: "transaction_date", sorter:"date", sorterParams:{format:"MM/DD/YYYY"} },
        { title: "e_filing_id", field: "e_filing_id", headerFilter: "input" },
        { title: "filer_name", field: "filer_name", bottomCalc:"count", headerFilter: "select", headerFilterFunc:"in",
          headerFilterParams: { values: true, sortValuesList: "asc", multiselect: true }
        },
        { title: "schedule", field: "schedule", headerFilter: "select", headerFilterFunc:"in",
          headerFilterParams: { values: true, sortValuesList: "asc", multiselect: true }
        },
        { title: "amount", field: "amount", formatter:"money", hozAlign: "right" },
        { title: "tx_type", field: "tx_type", headerFilter: "select", headerFilterFunc:"in",
          headerFilterParams: { values: true, sortValuesList: "asc", multiselect: true }
        },
        { title: "spending_code", field: "spending_code", headerFilter: "select", headerFilterFunc:"in",
          headerFilterParams: { values: true, sortValuesList: "asc", multiselect: true }
        },
        { title: "filing_id", field: "filing_id", headerFilter: "input", bottomCalc:"count" },
        { title: "doc_public", field: "doc_public" },
        { title: "intr_name", field: "intr_name" },
        { title: "name", field: "name", headerFilter: "input" },
        { title: "city", field: "city", headerFilter: "input" },
        { title: "state", field: "state" },
        { title: "zip", field: "zip", headerFilter: "input" },
        { title: "employer", field: "employer", headerFilter: "input" },
        { title: "occupation", field: "occupation", headerFilter: "input" },
        { title: "filing_type", field: "filing_type" },
        { title: "tran_id", field: "tran_id", headerFilter: "input" },
      ]
    },
  ];

  private getSelectedItems(itemName: string, row): string[] {
    const selectedRowCount = this.table.getSelectedData().length;

    let selectedItems;
    if (selectedRowCount > 0) {
      selectedItems = this.table.getSelectedData().map(data => data[itemName]);
    } else {
      selectedItems = [ row._row.data[itemName] ];
    }

    return selectedItems;
  }

  private rowContextMenu = [
    {
      label: "Reset transaction's status",
      action: (e, row)=> {
        this.isLoadingData = true;

        const ids = this.getSelectedItems('id', row);
        // console.log('ids', ids);

        const promises = ids
          .map(id => this.campaignTransactionService.resetTransactionsStatus(id) );

        Promise.allSettled(promises)
        .finally( () => this.isLoadingData = false );
      }
    },
    {
      label: "Process transactions and Amended transactions with same original filing ids",
      action: (e, row)=> {
        this.isLoadingData = true;
        const filingIds = this.getSelectedItems('filing_id', row);

        const uniqueIds = [...new Set(filingIds)];
        console.log('uniqueIds', uniqueIds)

        const promises = uniqueIds
          .map(id => this.campaignProcessTransactionsService.processTransactionsByFilingId(id) );

        Promise.allSettled(promises)
          .finally( () => this.isLoadingData = false );
      }
    },
  ]

  constructor(
    private campaignDataChangesService: CampaignDataChangesService,
    private campaignTransactionService: CampaignTransactionService,
    private campaignProcessTransactionsService: CampaignProcessTransactionsService,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
  }

  updateRows() {
    this.campaignDataChangesService.transactions$.subscribe(rows => {
      let tableRows = rows.map( transaction => ({
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
        has_been_processed: transaction.has_been_processed,
        include_in_calculations: transaction.include_in_calculations,
        id: transaction.id,
      }));

      this.table.replaceData(tableRows);
    });
  }

  private drawTable(): void {
    this.table = new Tabulator(this.tableElement, {
      data: this.tableData,
      reactiveData: true,
      columns: this.columnNames,
      columnCalcs: 'table',
      layout: 'fitData',
      height: this.height,
      rowContextMenu: this.rowContextMenu,
      groupBy: 'filing_id',
      selectable: true,
      initialSort: [
        {column:"transaction_date", dir:"desc"},
      ],
    });
    document.getElementById(this.id).appendChild(this.tableElement);
    this.table.redraw(true);
  }

}
