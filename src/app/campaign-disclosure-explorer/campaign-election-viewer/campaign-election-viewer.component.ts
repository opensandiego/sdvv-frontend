import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Tabulator from 'tabulator-tables';

// import { CampaignDataService } from '../services/campaign-data.service';
import { CampaignDataChangesService } from '../services/campaign-data-changes.service';
import { CampaignCandidateService } from '../services/campaign-candidate.service';

import { CampaignBackendService } from '../services/campaign-backend.service';
import { CampaignElectionService } from '../services/campaign.election.service';
import { EFileDownloadService } from '../services/efile.download.service';
import { DatabaseService } from '../database/database.service';

import moment from 'moment';
window.moment = moment;

interface selectedElectionEvent {
  name: string;
  id: string;
}

@Component({
  selector: 'campaign-election-viewer',
  templateUrl: './campaign-election-viewer.component.html',
  styleUrls: ['./campaign-election-viewer.component.scss']
})
export class CampaignElectionViewerComponent implements OnInit {
  @Output() selectedElectionIdEvent 
    = new EventEmitter<selectedElectionEvent | null>();

  public tableId = 'election-table';
  tableElement = document.createElement('div');
  table: Tabulator;
  height: string = '400px';
  isLoadingData = false;
  tableData: any[] = [];
  
  headerMenu = [
    {
      label:"Get Elections from eFile and Post to remote database (eFile 🡺 remote DB)",
      action:(e, column)=> {
        this.eFileDownloadService.getElectionsFromEFile()
        .subscribe( results => {
          this.campaignBackendService.postBulkElectionsToRemote(results)
            .subscribe()
         });        
      }
    },
    {
      label:"Get Elections from remote database and save to local database (local DB 🡸 remote DB)",
      action:(e, column)=> {
        this.campaignBackendService.getElections()
          .subscribe( elections => this.campaignElectionService.saveElectionsToLocalDB(elections));
      }
    },
    {
      label:"Delete Elections in local DB (🗑️ local DB)",
      action:(e, column)=> {
        this.onDeleteInDB();
      }
    },
    {
      label:"Get Elections from eFile and log to console (eFile 🡾 console)",
      action:(e, column)=> {
        console.log('Elections from eFile')
        this.eFileDownloadService.getElectionsFromEFile()
          .subscribe(results => console.log(results));
      }
    },    
    {
      separator:true,
    },
    {
      label: 'Local Database',
      menu: [
        {
          label:"Reset database",
          action:(e, column)=> {
            this.databaseService.deleteDatabase()
            .then(() => console.log('Database reset.'))
          },
        },
        {
          label:"Delete database",
          action:(e, column)=> {
            this.databaseService.deleteDatabase(false)
              .then(() => console.log('Database deleted.'))
          },
        },
      ]
    }
  ];

  columnNames = [
    { 
      title: "eFile Data",
      headerMenu: this.headerMenu,
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
      label: "Fetch Candidates for Election from eFile",
      action: async (e, row) => {
        this.isLoadingData = true;

        let election_ids;
        const selectedRowCount = this.table.getSelectedData().length;

        if (selectedRowCount > 0) {
          election_ids = this.table.getSelectedData().map(data => data.election_id);
        } else {
          election_ids = [ row._row.data.election_id ];
        }

        const promises = election_ids
          .map(electionID => this.campaignCandidateService.updateCandidatesInDB(electionID));

        Promise.allSettled(promises)
          .finally( () => this.isLoadingData = false );

      }
    },
    {
      label:"Get Candidates for election from eFile and Post to remote database (eFile 🡺 remote DB)",
      action:(e, row)=> {
        this.eFileDownloadService.getCandidatesFromEFile(row._row.data.election_id)
        .subscribe( results => {
          this.campaignBackendService.postBulkCandidatesToRemote(results)
            .subscribe(results => console.log(results))
         });        
      }
    },
    {
      label: "Delete Candidates in DB",
      action:(e, row) => {
        this.isLoadingData = true;
        this.campaignCandidateService.deleteCandidates(row._row.data.election_id)
        .finally( () => this.isLoadingData = false );
      }
    },
  ];

  constructor(
    // private campaignDataService: CampaignDataService,
    private campaignDataChangesService: CampaignDataChangesService,
    private campaignCandidateService: CampaignCandidateService,
    private campaignBackendService: CampaignBackendService,
    private campaignElectionService: CampaignElectionService,
    private eFileDownloadService: EFileDownloadService,
    private snackBar: MatSnackBar,
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
  }

  onPullFromNetFile() {
    this.isLoadingData = true;
    this.campaignElectionService.updateElectionsInDB().then(
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
    this.campaignElectionService.deleteElections().then(
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

    this.campaignDataChangesService.allElections$.subscribe( rows => {
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
      columnCalcs: 'table',
      layout: 'fitData',
      height: this.height,
      rowClick: this.rowClicked,
      rowContextMenu: this.rowContextMenu,
      selectable: true,
      initialSort: [
        {column:"election_date", dir:"desc"}
      ],
    });
    document.getElementById(this.tableId).appendChild(this.tableElement);
    this.table.redraw(true);
  }

}
