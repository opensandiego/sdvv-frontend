import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Tabulator from 'tabulator-tables';

import { CampaignDataService } from '../campaign-data.service';
import { CampaignDataChangesService } from '../campaign-data-changes.service';

import moment from 'moment';
window.moment = moment;

interface selectedElectionEvent {
  name: string;
  id: string;
}

@Component({
  selector: 'app-election-data-updater',
  templateUrl: './election-data-updater.component.html',
  styleUrls: ['./election-data-updater.component.scss']
})
export class ElectionDataUpdaterComponent implements OnInit {
  @Output() selectedElectionIdEvent 
    = new EventEmitter<selectedElectionEvent | null>();

  public tableId = 'election-table';
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
        { title: "Election Date", field: "election_date", sorter:"date", sorterParams:{format:"MM/DD/YYYY"}, bottomCalc:"count"},
        { title: "Election Type", field: "election_type" },
        { title: "Election id", field: "election_id" },
        { title: "internal", field: "internal" },
      ],
    },
    { 
      title: "Candidates Data Status", 
      columns: [
        { title: "count", field: "candidates_count", bottomCalc:"sum" },
        { title: "offices", field: "office_count" },
        { title: "last updated", field: "last_update" },
      ],
    }
  ];

  rowContextMenu = [
    {
      label: "Fetch from eFile",
      action:(e, row) => {
        this.isLoadingData = true;
        this.campaignDataService.updateCandidatesInDB(row._row.data.election_id)
        .finally( () => this.isLoadingData = false );        
      }
    },
    {
      label: "Delete in DB",
      action:(e, row) => {
        this.isLoadingData = true;
        this.campaignDataService.deleteCandidates(row._row.data.election_id)
        .finally( () => this.isLoadingData = false );
      }
    },
  ];

  constructor(
    private campaignDataService: CampaignDataService,
    private campaignDataChangesService: CampaignDataChangesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
  }

  subscribeToDatabase() {
    this.campaignDataChangesService.createElectionSubscription();
    this.dbSubscriptionActive = true;
  }

  onPullFromNetFile() {
    this.isLoadingData = true;
    this.campaignDataService.updateElectionsInDB().then(
      results => this.snackBar.open(`${results.length} Elections pulled from eFile`, 'OK', { duration: 3000 })
    ).catch( 
      error => {
        this.snackBar.open(`Error pulling elections from eFile`, 'OK', { duration: 3000 });
        console.log(error);
      }
    ).finally( () => this.isLoadingData = false );
  }
  
  onDeleteInDB() {
    this.isLoadingData = true;
    this.campaignDataService.deleteElections().then(
      results => {
        this.snackBar.open(`${results.length} Elections deleted from local Database`, 'OK', { duration: 3000 });
        if (results.length < 1) { this.isLoadingData = false; }
      }
    ).catch(
      error => {
        this.snackBar.open(`Error deleting elections`, 'OK', { duration: 3000 });
        console.log(error);
      }
    ).finally( () => this.isLoadingData = false );
  }

  updateRows() {

    this.campaignDataChangesService.getUpdateToElections().subscribe( rows => {
      let tableRows = rows.map( row => ({
        election_date: row.election_date,
        election_id: row.election_id,
        election_type: row.election_type,
        internal: row.internal,
        candidates_count: row.candidates_count,
      }));
 
      this.table.replaceData(tableRows);
    });

  }

  onPushToRemote() {}

  rowClicked = (e, rowClicked) => {
    var selectedData = this.table.getSelectedData();

    if (selectedData.length < 1) {
      this.selectedElectionIdEvent.emit(null);
      return;
    }

    let rowSelected = selectedData[0];
    this.selectedElectionIdEvent.emit({
      name: `${rowSelected.election_date} ${rowSelected.election_type} Election`,
      id: rowSelected.election_id,
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
      rowContextMenu: this.rowContextMenu,
      selectable: 1,
      initialSort: [
        {column:"election_date", dir:"desc"}
      ],
    });
    document.getElementById(this.tableId).appendChild(this.tableElement);
    this.table.redraw(true);
  }

}
