import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

import { CampaignDataService } from '../services/campaign-data.service';
import { CampaignDataChangesService } from '../services/campaign-data-changes.service';
import { CampaignFilingService } from '../services/campaign-filing.service';
import { CampaignProcessTransactionsService } from '../services/campaign-process-transactions.service';

@Component({
  selector: 'campaign-filing-viewer',
  templateUrl: './campaign-filing-viewer.component.html',
  styleUrls: ['./campaign-filing-viewer.component.scss']
})
export class CampaignFilingViewerComponent implements OnInit {

  id = 'filing-table';
  tableElement = document.createElement('div');
  table: Tabulator;
  height: string = '400px';
  isLoadingData = false;
  dbSubscriptionActive = false;
  tableData: any[] = [];

  headerMenu = [
    {
      label:"Group by entity_name",
      action:(e, column)=> {
        this.table.setGroupBy("entity_name");
      }
    },
    {
      label:"Disable Groups",
      action:(e, column)=> {
        this.table.setGroupBy();
      }
    },
    {
      label:"Add 1 more month of past filings",
      action:(e, column)=> {
        this.campaignFilingService.addMonthsNewFilings(1);
      }
    },
    {
      label:"Add 3 more months of past filings",
      action:(e, column)=> {
        this.campaignFilingService.addMonthsNewFilings(3);
      }
    },
    {
      label:"Add 6 more months of past filings",
      action:(e, column)=> {
        this.campaignFilingService.addMonthsNewFilings(6);
      }
    },
    {
      label:"Remove all filings",
      action:(e, column)=> {
        this.campaignFilingService.deleteAllFilings().
          then(results => console.log("Removed:", results.length) );
      }
    },
    {
      label:"Log filing date ranges to console",
      action:(e, column)=> {
        this.campaignFilingService.getFilingDateRanges()
          .then( range => console.log(range));
      }
    },
    // {
    //   label:"Push Filings to remote",
    //     action:(e, column)=> {
    //   }
    // },
  ]

  columnNames = [
    { 
      title: "eFile Data", 
      headerMenu: this.headerMenu,
      columns: [
 
        { title: "filing_date", field: "filing_date", sorter:"date", sorterParams:{format:"MM/DD/YYYY"}},
        { title: "e_filing_id", field: "e_filing_id", headerFilter: "input" },
        { title: "filing_id", field: "filing_id", headerFilter: "input", bottomCalc:"count" },
        { title: "amen", field: "amendment", width: 50, formatter: this.amendmentFormatter, },
        { title: "amen #", field: "amendment_number", width: 15 },
        { title: "amends_orig_id", field: "amends_orig_id", headerFilter: "input" },
        { title: "amends_prev_id", field: "amends_prev_id", headerFilter: "input" },
        { title: "coe_id", field: "coe_id", headerFilter: "select", headerFilterFunc:"in", 
          headerFilterParams: { values: true, sortValuesList: "asc", multiselect: true }
        },
        { title: "doc_public", field: "doc_public" },
        { title: "period_start", field: "period_start" },
        { title: "period_end", field: "period_end" },
        { title: "filing_type", field: "filing_type" },
        { title: "filing_subtypes", field: "filing_subtypes" },
        { title: "entity_name", field: "entity_name", headerFilter: "select", headerFilterFunc:"in", 
          headerFilterParams: { values: true, sortValuesList: "asc", multiselect: true }
        },
      ]
    },
    {
      title: "eFile Data - coe_id request",
      columns: [
        { title: "entity_id", field: "entity_id", headerFilter: "select", headerFilterFunc:"in",
          headerFilterParams: { values: true, sortValuesList: "asc", multiselect: true }
        },
        { title: "name", field: "name", headerFilter: "select", headerFilterFunc:"in", 
          headerFilterParams: { values: true, sortValuesList: "asc", multiselect: true, }
        },
        { title: "form_name", field: "form_name" },
        { title: "name_first", field: "name_first" },
        // { title: "name_suffix", field: "name_suffix" },
        { title: "name_title", field: "name_title" },
      ]
    },
    {
      title: "eFile Data - campaign-search request", 
      columns: [
        { title: "period_start", field: "period_start" },
        { title: "amendment_type", field: "amendment_type" },
        { title: "covers_period", field: "covers_period" },
        { title: "form", field: "form" },
      ]
    },
    {
      title: "Data Status", 
      columns: [
        { title: "enabled", field: "enabled", width: 70, hozAlign:"center", formatter:"tickCross" },
      ]
    },

  ];

  private getSelectedItems(itemName: string, row) {
    const selectedRowCount = this.table.getSelectedData().length;

    let selectedItems;
    if (selectedRowCount > 0) {
      selectedItems = this.table.getSelectedData().map(data => data[itemName]);
    } else {
      selectedItems = [ row._row.data[itemName] ];
    }

    return selectedItems;
  }

  rowContextMenu = [
    {
      label: "Process Filing's transactions",
      action: async (e, row) => {
        this.isLoadingData = true;

        const ids = this.getSelectedItems('filing_id', row);
        const promises = ids
          .map(id => this.campaignProcessTransactionsService.processFilingCheckOrig(id) );

        Promise.allSettled(promises)
          .finally( () => this.isLoadingData = false );
      }
    },
    {
      label: "Process Filing and Amended Filing's transactions",
      action: async (e, row) => {
        this.isLoadingData = true;

        const origIds: string[] = this.getSelectedItems('amends_orig_id', row);

        const uniqueOrigIds = [...new Set(origIds)];
        console.log('uniqueOrigIds', uniqueOrigIds)

        const promises = uniqueOrigIds
          .map(id => this.campaignProcessTransactionsService.processTransactionsByFilingOrigId(id) );

        Promise.allSettled(promises)
          .finally( () => this.isLoadingData = false );
      }
    },
    {
      label: "Disable Filings",
      action: async (e, row) => {
        this.isLoadingData = true;

        const ids = this.getSelectedItems('filing_id', row);

        const promises = ids
          .map(id => this.campaignFilingService.disableFiling(id) );

        Promise.allSettled(promises)
        .finally( () => this.isLoadingData = false );
      }
    },
    {
      label: "Enable Filings",
      action: async (e, row) => {
        this.isLoadingData = true;

        const ids = this.getSelectedItems('filing_id', row)

        const promises = ids
          .map(id => this.campaignFilingService.enableFiling(id) );

        Promise.allSettled(promises)
        .finally( () => this.isLoadingData = false );
      }
    },
  ];


  amendmentFormatter(cell, formatterParams) {
    let value = cell.getValue();
    if (value) {
      return "<span style='color:green; font-weight:bold; font-size: 1.2em;'>" + value + "</span>";
    } else {
      return "<span style='color:red; font-weight:bold;'>" + value + "</span>";
    }
  }
 
  constructor(
    private campaignDataService: CampaignDataService,
    private campaignDataChangesService: CampaignDataChangesService,
    private campaignFilingService: CampaignFilingService,
    private campaignProcessTransactionsService: CampaignProcessTransactionsService,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
  }

  updateRows() {
    this.campaignDataChangesService.filingsFromSelectedCandidate$.subscribe( rows => {
      let tableRows = rows.map( filing => ({
        amendment: filing.amendment,
        amendment_number: filing.amendment_number,
        amends_orig_id: (filing.amendment) ? filing.amends_orig_id?.orig_id : filing.amends_orig_id,
        amends_prev_id: (filing.amendment) ? filing.amends_prev_id?.prev_id : filing.amends_prev_id,
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
        // In campaign-search request
        period_start: filing.period_start,
        amendment_type: filing.amendment_type,
        covers_period: filing.covers_period,
        form: filing.form,
        enabled: filing.enabled,
        id: filing.e_filing_id,
      }));

      // this.table.replaceData(tableRows);
      this.table.updateOrAddData(tableRows);
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
      selectable: true,
      initialSort: [
        {column:"filing_date", dir:"desc"},
      ],
    });
    document.getElementById(this.id).appendChild(this.tableElement);
    this.table.redraw(true);
  }

}
