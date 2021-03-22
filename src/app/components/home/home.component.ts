import { Component, HostListener, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CandidateService, SidenavService } from '../../services';
import { CandidateTree } from '../../candidate';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  isExpanded: boolean = false;
  isSidenavOpened: boolean;
  showSubmenu: boolean = false;
  officeStep: number = -1;
  councilDistrictStep: number = -1;
  selectedCandidate: string;
  officeType: string;
  lastUpdatedDate: string = '00/00/00';

  candidates: Record<string, CandidateTree>;
  modifiedData: {} = {};
  sortedObj: {} = {};

  @ViewChild('drawer', { static: true }) sidenav: MatDrawer;

  constructor(
    private candidateService: CandidateService,
    private sidenavService: SidenavService,
  ) {
    sidenavService.candidateNameEmittedFromCard$.subscribe(res => {
      this.selectedCandidate = res;
    });

    sidenavService.candidateTypeEmittedFromSplash$.subscribe(res => {
      this.officeType = res;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    if (this.sidenav !== undefined) {
      if (event.target.innerWidth <= 1200) {
        this.sidenav.close();
        this.sidenav.mode = 'over';
      } else {
        this.sidenav.open();
        this.sidenav.mode = 'side';
      }
    }
  }

  ngOnInit() {
    this.setSidenavInitialOptions();
    
    this.candidateService.getAll().then(
      (all: Record<string, CandidateTree>) => {
        this.candidates = all;

        this.massageCandidateData();
      }
    )

    this.candidateService.getLastUpdated()
      .subscribe(date => this.lastUpdatedDate = date);
  }

  // Set initial sidenav options onint
  setSidenavInitialOptions() {
    this.sidenav.open();
    this.sidenav.mode = 'side';
  }

  // Have active-link class apply to only an opened candidate office panel by setting an assigned step for each candidate office section
  setOfficeStep(index,) {
    this.officeStep = index;
  }

  // Assign officeType variable with the value of the candidateType.key when opening office panel to check expanded condition on the mat-expansion-panel
  setOfficeType(type) {
    this.officeType = type;
  }

  // Have only one city council district side panel open at any time by setting an assigned step for each panel distrct
  setCouncilDistrictStep(index) {
    this.councilDistrictStep = index;
  }

  // Apply highlight style to candidate name when selected, open candidate card when candidate name is clicked
  selectSidenavCandidate(candidateKey: string) {
    this.selectedCandidate = candidateKey;
    this.sidenavService.emitCandidateKeySidenav(candidateKey);
  }

  // Reset sidenav when navigating away from any of the candidate offices, close panels and remove style highlight
  resetSidenav() {
    this.officeStep = null;
    this.officeType = null;
    this.selectedCandidate = null;
  }

  // data is turned into a key value pair
  //object like this
  //{
  //  mayor:{},
  //  city-council:{},
  //  city-attorney:{}
  //}
  massageCandidateData() {

    this.modifiedData["city council"] = {} as CandidateTree;
    this.modifiedData["city council"]["title"] = "City Council";
    this.modifiedData["city council"]["name"] = "City Council";
    this.modifiedData["city council"]["deepTree"] = true;
    this.modifiedData["city council"]["candidates"] = {};

    const entries = Object.entries(this.candidates);

    entries.forEach(entry => {
      if (!entry["0"].toLowerCase().includes("last")) {
        if (!entry["0"].toLowerCase().includes("city-council")) {
          this.modifiedData[entry["0"]] = entry["1"];
          this.modifiedData[entry["0"]]["deeptree"]= false;
        } else {
          this.modifiedData["city council"]["candidates"][entry["0"].slice(-1)] = entry["1"];
        }
      }

    });

    this.sortedObj = this.sortObj(this.modifiedData);
  }


  private sortObj(modifiedObject) {
    let temp = {};
    let modData = this.modifiedData;
    var sortedEntries = Object.keys(modifiedObject).sort(function (a, b) {
      return b.charCodeAt(0) - a.charCodeAt(0);
    });

    sortedEntries.forEach(x => {
      temp[x] = modData[x];
    });

    return temp;

  }

  asIsOrder(a, b) {
    return 1;
  }
}
