import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SidenavService } from '../../services/sidenav.service';
import { CandidateService } from 'src/app/store/services/candidate.service';

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
  candidateIds: string[] = [];
  isExpanded: boolean = false;
  officeUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sidenavService: SidenavService,
    private candidateService: CandidateService,
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
    if (this.office === 'city council' && !this.seatName) return;
    
    this.candidateService.getCandidates(
      { office: this.office, district: this.seatName, year: '2020' }
    ).subscribe(candidates => {
      this.candidateIds = candidates.map(candidate => candidate.id);
    })
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
