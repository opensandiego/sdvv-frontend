import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { CandidateDataService } from '../../services/candidate-data.service';
import { CandidateStoreService } from '../../services/candidate-store.service';
import { CandidateCard } from '../../interfaces/candidateCard';
import { CandidateJSON } from '../../interfaces/candidateJSON';

import { SidenavService } from '../../services/sidenav.service';

interface pathParam {
  office: string; 
  seatType?: string;
  seatName?: string; 
}

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {

  office: string;
  seatName: string;
  selectedCandidateId: string;
  candidateCards: CandidateCard[] = [];
  selectedCandidateJSON: CandidateJSON;
  selectedImagePath: string;
  isExpanded: boolean = false;
  officeUrl: string;

  constructor(
    private candidateStoreService: CandidateStoreService,
    private candidateDataService: CandidateDataService,
    private route: ActivatedRoute,
    private router: Router,
    private sidenavService: SidenavService,
  ) { }

  parsePathParam(path: string): pathParam {
    const officeSeatDelimiter = '_';
    const seatDelimiter = '-';

    if (path.includes(officeSeatDelimiter)) {
      const [office, seat] = path.split(officeSeatDelimiter);
      const [seatType, seatName] = seat.split(seatDelimiter);

      return { office, seatType, seatName };
    } else {
      return { office: path };
    }

  }

  setCandidateCards(): void {   
    this.candidateCards = [];
    
    if (this.office === 'city council' && !this.seatName) return;
    
    this.candidateDataService.getCandidateCards(this.office, this.seatName)
      .subscribe(candidate => this.candidateCards.push(candidate));
  }

  setComponentData() {
    const pathParams: pathParam = this.parsePathParam(this.officeUrl);

    this.office = pathParams.office.split('-').join(' ');
    this.seatName = pathParams.seatName;

    this.sidenavService.changeSelectedOffice( this.office );
    this.sidenavService.changeSelectedSeat( this.seatName );
    
    this.isExpanded = false;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const newOfficeUrlParam = params.get('office');

      const officeChanged = (this.officeUrl !== newOfficeUrlParam);
      if (officeChanged) {
        this.officeUrl = newOfficeUrlParam;
        this.setComponentData(); 
        this.setCandidateCards();
      }

      const candidateId = params.get('candidateId');
      if (candidateId) this.setCandidate(candidateId);
    });

  }

  setCandidate(candidateId: string) {

    this.candidateDataService.getCandidateCards(this.office)
      .pipe(filter(candidate => candidate.id === candidateId))
      .subscribe(candidate => this.selectedImagePath = candidate.candidateImgURL);

    this.candidateStoreService.getCandidateExpandedData(candidateId)
      .subscribe(candidateJSON => this.selectedCandidateJSON = candidateJSON);

    this.sidenavService.changeSelectedCandidate(candidateId);

    this.isExpanded = true;
    this.selectedCandidateId = candidateId;
    
  }

  onOpenExpanded(candidateId: string) {
    this.router.navigate([`/${this.officeUrl}`, candidateId], { relativeTo: this.route });
  }

  onCloseExpanded() {
    this.router.navigate([`/${this.officeUrl}`], { relativeTo: this.route });
  }
}
