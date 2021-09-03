import { Component, OnInit} from '@angular/core';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

// import { CampaignDataService } from '../services/campaign-data.service';
import { CampaignDataChangesService } from '../services/campaign-data-changes.service';
import { CampaignFilingService } from '../services/campaign-filing.service';
import { CampaignTransactionService } from '../services/campaign-transactions.service';
import { CampaignCommitteeService } from '../services/campaign.committee.service';

@Component({
  selector: 'campaign-committee-viewer',
  templateUrl: './campaign-committee-viewer.component.html',
  styleUrls: ['./campaign-committee-viewer.component.scss']
})
export class CampaignCommitteeViewerComponent implements OnInit {
  id = 'committee-table';
  tableElement = document.createElement('div');
  table: Tabulator;
  height: string = '400px';
  isLoadingData = false;
  dbSubscriptionActive = false;
  tableData: any[] = [];

  headerMenu = [
    // {
    //   label:"Fetch Committees from eFile",
    //   action:(e, column)=> {
    //     this.isLoadingData = true;
    //     this.campaignDataService.updateCommitteesInDB()
    //       .finally( () => this.isLoadingData = false );
    //   }
    // },
    {
      // label:"eFile Committees 🡺 remote DB",
      label:"eFile Committees 🡺 console",
      action:(e, column)=> {
        this.campaignCommitteeService.getCommitteesFromEFile()
        // .subscribe( committees => this.campaignBackendService.postBulkCommitteesToRemote(committees) )
        .subscribe( results => console.log( 'getCommitteesFromEFile results', results));
      }
    },
    {
      label:"🗑️ Delete local Committees collection",
      action:(e, column)=> {
        this.isLoadingData = true;
        this.campaignCommitteeService.deleteCommittees()
          .finally( () => this.isLoadingData = false );
      }
    },
  ];

  columnNames = [
    { 
      title: "eFile Data", 
      headerMenu: this.headerMenu,
      columns: [
        { title: "entity_id", field: "entity_id", bottomCalc:"count" },
        { title: "entity_name", field: "entity_name", width: 300, headerFilter: "input" },
        { title: "entity_name_lower", field: "entity_name_lower", headerFilter: "input" },
        { title: "entity_type", field: "entity_type" },
      ]
    },
    {
      title: "Data Status", 
      columns: [
        { title: "filings", field: "filing_count" },
        { title: "transactions", field: "transaction_count" },
        { title: "id", field: "id" },
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

  private rowContextMenu = [
    {
      // label: "Filings",
      // menu: [
      //   {
          label: "Fetch Filings for Committee from eFile: within last 10 years",
          action: (e, row)=> {
            this.isLoadingData = true;
  
            const fields = this.getSelectedItems('entity_name_lower', row);
            const promises = fields
              .map(field => this.campaignFilingService.addYearsNewFilings(field, 10));
            
            Promise.allSettled(promises)
            .finally( () => this.isLoadingData = false );
          }
      //   },
      // ]
    },
    {
      label: "Transactions",
      menu: [
        // {
        //   label: "Fetch Transactions for Committee from eFile",
        //   action: (e, row)=> {
        //     this.isLoadingData = true;
        //     const selectedRowCount = this.table.getSelectedData().length;

        //     const fields = this.getSelectedItems('entity_name_lower', row);
        //     const promises = fields
        //       .map(field => this.campaignTransactionService.addYearsNewTransaction(field, 10));

        //     Promise.allSettled(promises)
        //     .finally( () => this.isLoadingData = false );
        //   }
        // },
        {
          label: "Delete Transactions for Committee from DB",
          action: (e, row)=> {}
        },
      ]
    },
  ];

  constructor(
    // private campaignDataService: CampaignDataService,
    private campaignDataChangesService: CampaignDataChangesService,
    private campaignFilingService: CampaignFilingService,
    private campaignTransactionService: CampaignTransactionService,
    private campaignCommitteeService: CampaignCommitteeService,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
  }

  updateRows() {
    this.campaignDataChangesService.committees$.subscribe( rows => {
      let tableRows = rows.map( committee => ({
        id: committee.id,
        entity_id: committee.entity_id,
        entity_name: committee.entity_name,
        entity_name_lower: committee.entity_name_lower,
        entity_type: committee.entity_type,
        filing_count: committee.filing_count,
        transaction_count: committee.transaction_count,
      }));

      this.table.replaceData(tableRows);
    })
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
        {column:"entity_name", dir:"asc"},
      ],
    });
    document.getElementById(this.id).appendChild(this.tableElement);
    this.table.redraw(true);
  }
  
}
