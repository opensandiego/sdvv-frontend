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

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.officeUrl = params.get('office');

      const pathParams: pathParam = this.parsePathParam(params.get('office'));
      this.office = pathParams.office.split('-').join(' ');

      const district = pathParams.seatName;

      this.isExpanded = false;
      this.candidateCards = [];      

      if (this.office === 'city council' && !district) return;

      this.candidateDataService.getCandidateCards(this.office, district)
        .subscribe(candidate => this.candidateCards.push(candidate));

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
    
  }

  onOpenExpanded(candidateId: string) {
    this.router.navigate([`${this.officeUrl}/${candidateId}`]);
  }

  onCloseExpanded() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
