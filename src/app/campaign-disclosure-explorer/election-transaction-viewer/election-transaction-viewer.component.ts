import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

import { CampaignDataService } from '../campaign-data.service';
import { CampaignDataChangesService } from '../campaign-data-changes.service';
import { CampaignFilingService } from '../campaign-filing.service';


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

  columnNames = [
    {
      title: "eFile Data", 
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
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
  }

  updateRows() {
    // this.campaignDataChangesService.transactions$.subscribe(rows => {});
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
