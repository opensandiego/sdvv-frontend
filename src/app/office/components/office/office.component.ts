import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidenavService } from 'src/app/shared/services/sidenav.service';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sidenavService: SidenavService,
    private candidateService: CandidateService,
  ) { }

  setCandidateCards(): void {
    this.candidateService.getCandidates(
      { office: this.office, district: '', year: '2020' }
    ).subscribe(candidates => {
      this.candidateIds = candidates.map(candidate => candidate.id);
    })
  }

  setComponentData() {
    this.sidenavService.changeSelectedOffice( this.office );  
    this.isExpanded = false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.office = data.officePath.split('-').join(' ');
      this.officeUrl = data.officePath;

      this.setComponentData(); 
      this.setCandidateCards();
    })

    this.route.paramMap.subscribe(params => {
      const candidateId = params.get('candidateId')
      if (candidateId) this.setCandidate(candidateId);
    })
  }

  setCandidate(candidateId: string) {
    this.sidenavService.changeSelectedCandidate(candidateId);

    this.isExpanded = true;
    this.selectedCandidateId = candidateId;
  }

  onOpenExpanded(candidateId: string) {
    this.router.navigate([`/office/${this.officeUrl}`, candidateId], { relativeTo: this.route });
  }

  onCloseExpanded() {
    this.router.navigate([`/office/${this.officeUrl}`], { relativeTo: this.route });
  }
}
