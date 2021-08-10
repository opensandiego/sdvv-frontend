import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

import { CampaignDataService } from '../campaign-data.service';
import { CampaignDataChangesService } from '../campaign-data-changes.service';
import { CampaignFilingService } from '../campaign-filing.service';
import { CampaignTransactionService } from '../campaign-transactions.service';


@Component({
  selector: 'app-election-transaction-viewer',
  templateUrl: './election-transaction-viewer.component.html',
  styleUrls: ['./election-transaction-viewer.component.scss']
})
export class ElectionTransactionViewerComponent implements OnInit {
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
      label:"Add 2 more month of past Transactions",
      action:(e, column)=> {
        this.campaignTransactionService.addMonthsNewTransaction(2);
      }
    },
  ];

  columnNames = [
    {
      title: "eFile Data",
      headerMenu: this.headerMenu, 
      columns: [
        { title: "filer_name", field: "filer_name" },
        { title: "doc_public", field: "doc_public" },
        { title: "e_filing_id", field: "e_filing_id" },
        { title: "tran_id", field: "tran_id" },
        { title: "transaction_date", field: "transaction_date" },
        { title: "amount", field: "amount" },
        { title: "tx_type", field: "tx_type" },
        { title: "schedule", field: "schedule" },
        { title: "filing_id", field: "filing_id" },
        { title: "filing_type", field: "filing_type" },
        { title: "name", field: "name" },
        { title: "intr_name", field: "intr_name" },
        { title: "city", field: "city" },
        { title: "state", field: "state" },
        { title: "zip", field: "zip" },
        { title: "spending_code", field: "spending_code" },
        { title: "employer", field: "employer" },
        { title: "occupation", field: "occupation" },
      ]
    },
    {
      title: "Data Status", 
      columns: []
    },
  ];

  constructor(
    // private campaignDataService: CampaignDataService,
    private campaignDataChangesService: CampaignDataChangesService,
    // private campaignFilingService: CampaignFilingService,
    private campaignTransactionService: CampaignTransactionService,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
  }

  updateRows() {
    this.campaignDataChangesService.transactions$.subscribe(rows => {
      console.log("rows.length", rows.length)
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
      }));

      this.table.replaceData(tableRows);
    });
  }

  private drawTable(): void {
    this.table = new Tabulator(this.tableElement, {
      data: this.tableData,
      reactiveData: true,
      columns: this.columnNames,
      layout: 'fitData',
      height: this.height,
      // rowClick: this.rowClicked,
      // rowContextMenu: this.rowContextMenu,
      // tooltips:this.tooltips,
      selectable: 1,
      initialSort: [
        // {column:"candidate_name", dir:"asc"},
      ],
    });
    document.getElementById(this.id).appendChild(this.tableElement);
    this.table.redraw(true);
  }

}
