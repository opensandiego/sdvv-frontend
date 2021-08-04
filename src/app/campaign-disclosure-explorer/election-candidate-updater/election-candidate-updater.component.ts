import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

import { CampaignDataService } from '../campaign-data.service';
import { CampaignDataChangesService } from '../campaign-data-changes.service';

interface selectedEvent {
  name: string;
  id: string;
}

@Component({
  selector: 'app-election-candidate-updater',
  templateUrl: './election-candidate-updater.component.html',
  styleUrls: ['./election-candidate-updater.component.scss']
})
export class ElectionCandidateUpdaterComponent implements OnInit {
  @Input() electionID: string | null = null;
  @Output() selectedIdEvent 
    = new EventEmitter<selectedEvent | null>();

  elections: [] = [];

  id = 'candidate-table';
  tableElement = document.createElement('div');
  table: Tabulator;
  height: string = '400px';
  isLoadingData = false;
  dbSubscriptionActive = false;
  tableData: any[] = [];

  columnNames = [
    { title: "office", field: "office" },
    { title: "district", field: "district" },
    { title: "Candidate Name", field: "candidate_name", bottomCalc:"count" },
    { title: "coe_id", field: "coe_id" },
    { title: "filer_id", field: "filer_id" },
    { title: "office_code", field: "office_code" },
    { title: "office_id", field: "office_id" },
    { title: "election_id", field: "election_id" },
    { title: "first_name", field: "first_name" },
    { title: "middle_name", field: "middle_name" },
    { title: "last_name", field: "last_name" },
    { title: "jurisdiction_code", field: "jurisdiction_code" },
    { title: "jurisdiction_id", field: "jurisdiction_id" },
    { title: "jurisdiction_name", field: "jurisdiction_name" },
    { title: "jurisdiction_type", field: "jurisdiction_type" },
    { title: "agency", field: "agency" },
    { title: "title", field: "title" },
    { title: "suffix", field: "suffix" },
  ];

  constructor(
    private campaignDataService: CampaignDataService,
    private campaignDataChangesService: CampaignDataChangesService,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
  }

  subscribeToDatabase() {
    this.campaignDataChangesService.createCandidatesSubscription();
    this.dbSubscriptionActive = true;
  }

  updateRows() {
    
    this.campaignDataChangesService.getUpdateToCandidates().subscribe( rows => {
      let tableRows = rows.map( row => ({
        coe_id: row.coe_id,
        filer_id: row.filer_id,
        office_id: row.office_id,
        election_id: row.election_id,
        first_name: row.first_name,
        middle_name: row.middle_name,
        last_name: row.last_name,
        title: row.title,
        suffix: row.suffix,
        office: row.office,
        office_code: row.office_code,
        jurisdiction_id: row.jurisdiction_id,
        district: row.district,
        agency: row.agency,
        jurisdiction_type: row.jurisdiction_type,
        jurisdiction_name: row.jurisdiction_name,
        jurisdiction_code: row.jurisdiction_code,
        candidate_name: row.candidate_name,
      }));
 
      this.table.replaceData(tableRows);
    });

  }

  rowClicked = (e, rowClicked) => {
    var selectedData = this.table.getSelectedData();

    if (selectedData.length < 1) {
      this.selectedIdEvent.emit(null);
      return;
    }

    let rowSelected = selectedData[0];
    this.selectedIdEvent.emit({
      name: `${rowSelected.candidate_name}, ${rowSelected.office}`,
      id: rowSelected.coe_id,
    });

  }

  private drawTable(): void {
    this.table = new Tabulator(this.tableElement, {
      data: this.tableData,
      reactiveData: true,
      columns: this.columnNames,
      layout: 'fitData',
      height: this.height,
      rowClick: this.rowClicked,
      selectable: 1,
      initialSort: [
        {column:"candidate_name", dir:"asc"},
        {column:"office", dir:"desc"},
        {column:"district", dir:"asc"},
      ],
    });
    document.getElementById(this.id).appendChild(this.tableElement);
    this.table.redraw(true);
  }

}
