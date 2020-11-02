import { Component, HostListener, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { CandidateService, SidenavService } from '../../services';
import { CandidateTree, Candidate } from '../../candidate';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  panelOpenState: boolean = false;
  officeStep: number = 0;
  councilDistrictStep: number = 0;
  selectedCandidate: string;

  candidates: Record<string, CandidateTree>;
  modifiedData:{}={};

  @ViewChild('drawer') sidenav: MatDrawer;

  constructor(private candidateService: CandidateService,
              private sidenavService: SidenavService) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
      if (this.sidenav !== undefined) {
          if (event.target.innerWidth <= 1000) {
              this.sidenav.close();
          } else {
              this.sidenav.open();
          }
      }
  }

  ngOnInit() {
    this.candidateService.getAll().then(
      (all: Record<string, CandidateTree>) => {
        this.candidates = all;
        this.massageCandidateData();
      }
    )
  }

  massageCandidateData(){
   
    const entries=(Object.entries(this.candidates) );
    
    entries.forEach(entry=>{
      if(!entry["0"].toLowerCase().includes("city-council")){
        let test= entry["0"];
        this.modifiedData[test]= {} as CandidateTree ;
      }else{
        this.modifiedData["city council"]={} as CandidateTree;
      }
    });

    entries.forEach(entry=>{
        if(entry["0"].toLowerCase().includes("city-council")){
           entry["1"]["name"]= entry["1"].title.slice(15);
           let stringOne=entry["1"].title.replace(' ' ,'-').slice(0,22);
           let stringTwo= entry["1"].title.slice(24);
           let hyphenatedString= `${stringOne}-${stringTwo}`;

           entry["1"].title=  hyphenatedString.replace(/\s/g, '').toLowerCase().trim();
          
           this.modifiedData["city council"][entry["0"]]=entry["1"];
        }else{
          this.modifiedData[entry["0"]]= entry["1"];
        }
    });

  }

  // Have active-link class apply to only an opened candidate office panel by setting an assigned step for each candidate office section
  setOfficeStep(index) {
    this.officeStep = index;
  }

  // Have only one city council district side panel open at any time by setting an assigned step for each panel distrct
  setCouncilDistrictStep(index) {
    this.councilDistrictStep = index;
  }

  selectSidenavCandidate(candidateKey: string) {
    this.selectedCandidate = candidateKey;
    this.sidenavService.emitChangeFromSidenav(candidateKey);
  }

  otherOfficeClicked(office:string){
    console.log("office", office);

  }

}
