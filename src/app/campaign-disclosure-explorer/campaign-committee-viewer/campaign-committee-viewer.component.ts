import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

import { CampaignDataService } from '../campaign-data.service';
import { CampaignDataChangesService } from '../campaign-data-changes.service';
import { CampaignFilingService } from '../campaign-filing.service';
import { CampaignCalculationService } from '../campaign-calculation.service';

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

  constructor(
    // private campaignDataService: CampaignDataService,
    // private campaignDataChangesService: CampaignDataChangesService,
    // private campaignFilingService: CampaignFilingService,
    // private campaignCalculationService: CampaignCalculationService,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    // this.updateRows();
  }

  updateRows() {}


  private drawTable(): void {
    this.table = new Tabulator(this.tableElement, {
      data: this.tableData,
      reactiveData: true,
      // columns: this.columnNames,
      columnCalcs: 'table',
      layout: 'fitData',
      height: this.height,
      // rowClick: this.rowClicked,
      // rowContextMenu: this.rowContextMenu,
      selectable: true,
      initialSort: [
        // {column:"filing_date", dir:"desc"},
      ],
    });
    document.getElementById(this.id).appendChild(this.tableElement);
    this.table.redraw(true);
  }
  
}
