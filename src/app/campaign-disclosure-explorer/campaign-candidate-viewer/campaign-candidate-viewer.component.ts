import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Tabulator from 'tabulator-tables';

import moment from 'moment';
window.moment = moment;

import { CampaignDataService } from '../campaign-data.service';
import { CampaignDataChangesService } from '../campaign-data-changes.service';
import { CampaignFilingService } from '../campaign-filing.service';

interface selectedEvent {
  name: string;
  id: string;
}

interface ElectionList {
  electionTitle: string;
  electionID: string;
}

@Component({
  selector: 'campaign-candidate-viewer',
  templateUrl: './campaign-candidate-viewer.component.html',
  styleUrls: ['./campaign-candidate-viewer.component.scss']
})
export class CampaignCandidateViewerComponent implements OnInit {
  @Input() electionID: string | null = null;
  @Output() selectedIdEvent 
    = new EventEmitter<selectedEvent | null>();

  elections: ElectionList[]; // used in the drop down list

  id = 'candidate-table';
  tableElement = document.createElement('div');
  table: Tabulator;
  height: string = '400px';
  isLoadingData = false;
  dbSubscriptionActive = false;
  tableData: any[] = [];

  headerMenu = [
    // {
    //   label:"Push Candidates to remote",
    //   action:(e, column)=> {
    //   }
    // },
  ];

  columnNames = [
    { 
      title: "eFile Data",
      // headerMenu: this.headerMenu,
      columns: [
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
      ]
    },
    { 
      title: "Data Status", 
      columns: [
        { title: "filings", field: "filings_count", },
        { title: "committees", field: "committees_count", },
        { title: "Candidate Controlled Committee Name", field: "candidate_controlled_committee_name" },
        // { title: "transactions", field: "transactions_count", },
      ]
    },

  
  ];

  private rowContextMenu = [
    {
      label: "Committees",
      menu: [
        // {
        //   label: 'Fetch from eFile',
        //   action: (e, row) => {
        //     //use candidate name
        //   },
        // },
        // {
        //   label: 'Delete from database',
        //   action: (e, row) => {},
        // },
        {
          label:"Calculate Candidate Controlled Committee Names",
          action: (e, row)=> {
            console.log(row._row.data.coe_id)
            this.campaignDataService.setPrimaryCandidateCommittee(row._row.data.coe_id);
          }
        },
      ]
    },
    {
      label: "Filings",
      menu: [
        {
          label: 'Fetch from eFile',
          action: (e, row) => {
            this.isLoadingData = true;
            const fullName = `${row._row.data.last_name}`
            this.campaignFilingService.updateFilingsInDB(row._row.data.coe_id)
              .then(() => this.campaignFilingService.updateFilingCountsInCandidate(row._row.data.coe_id, fullName))
              .finally( () => this.isLoadingData = false );
          },
        },
        // {
        //   label: 'Delete from database',
        //   action: (e, row) => {},
        // },
      ]
    },
    {
      label: "Transactions",
      menu: [
        // {
        //   label: 'Fetch from eFile',
        //   action: (e, row) => {},
        // },
        // {
        //   label: 'Delete from database',
        //   action: (e, row) => {},
        // },
      ]
    },
  ];

  tooltips(cell) {
    const district = cell.getData().district ? cell.getData().district : '';
    return `${cell.getData().candidate_name} - ${cell.getData().office} ${district}`;
  }

  constructor(
    private campaignDataService: CampaignDataService,
    private campaignDataChangesService: CampaignDataChangesService,
    private campaignFilingService: CampaignFilingService,
  ) { }

  ngOnInit(): void {
    this.drawTable();
    this.updateRows();
    this.subscribeToElectionUpdates();
  }

  // Build the data for the drop down list
  subscribeToElectionUpdates(){
    this.campaignDataChangesService.electionsWithCandidate$.subscribe( elections => {
       const electionList = elections.map( election => ({
            electionTitle: `${election.election_date} ${election.election_type} Election`,
            electionID: election.election_id,
      }));
      let allElections:ElectionList = {
        electionTitle: 'All Elections',
        electionID: 'ALL'
      }
      this.elections = electionList;
      this.elections.unshift(allElections);
      this.campaignDataChangesService.electionSelectionChanged.next('ALL');
    });
  }

  onElectionSelected(event) {
    this.campaignDataChangesService.electionSelectionChanged.next(event.value)
  }

//   subscribeToDatabase() {
//     // this.campaignDataChangesService.createCandidatesSubscription();
//     // this.dbSubscriptionActive = true;
//   }

  updateRows() {
    
    this.campaignDataChangesService.candidatesInSelectedElection$.subscribe( rows => {
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
        filings_count: row.filings_count,
        committees_count: row.committees_count,
        candidate_controlled_committee_name: row.candidate_controlled_committee_name,
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
      rowContextMenu: this.rowContextMenu,
      tooltips:this.tooltips,
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
