import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

import { CampaignDataService } from '../campaign-data.service';
import { CampaignDataChangesService } from '../campaign-data-changes.service';

@Component({
  selector: 'app-election-filing-updater',
  templateUrl: './election-filing-updater.component.html',
  styleUrls: ['./election-filing-updater.component.scss']
})
export class ElectionFilingUpdaterComponent implements OnInit {

  filings: [] = []; // used in the drop down list

  id = 'filing-table';
  tableElement = document.createElement('div');
  table: Tabulator;
  height: string = '400px';
  isLoadingData = false;
  dbSubscriptionActive = false;
  tableData: any[] = [];

  columnNames = [
    { title: "coe_id", field: "coe_id" },
    { title: "entity_id", field: "entity_id" },
    { title: "name", field: "name" },
    { title: "name_first", field: "name_first" },
    { title: "name_title", field: "name_title" },
    { title: "filing_id", field: "filing_id" },
    { title: "doc_public", field: "doc_public" },
    { title: "period_start", field: "period_start" },
    { title: "period_end", field: "period_end" },
    { title: "filing_type", field: "e_filing_id" },
    { title: "filing_date", field: "filing_date" },
    { title: "amendment", field: "amendment" },
    { title: "amends_orig_id", field: "amends_orig_id" },
    { title: "amends_prev_id", field: "amends_prev_id" },
    { title: "amendment_number", field: "amendment_number" },
    { title: "form_name", field: "form_name" },
    { title: "filing_subtypes", field: "filing_subtypes" },
    { title: "entity_name", field: "entity_name" },
  ];
  
  constructor(
    private campaignDataService: CampaignDataService,
    private campaignDataChangesService: CampaignDataChangesService,
  ) { }

  ngOnInit(): void {

  }

}
