import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/public/services/routing.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { Candidate } from 'src/app/store/interfaces/candidate';
import { Office } from 'src/app/store/interfaces/office';
import { CandidateService } from 'src/app/store/services/candidate.service';

@Component({
  selector: 'navigation-panel-office',
  templateUrl: './navigation-panel-office.component.html',
})
export class NavigationPanelOfficeComponent implements OnInit {
  @Input() office: Office;
  candidates: Candidate[];
  isSelected: boolean;
  route: string;

  constructor(
    private candidateService: CandidateService,
    private sidenavService: SidenavService,
    private routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.sidenavService.officeChanged$.subscribe(
      office => this.isSelected = 
        office.toLowerCase() === this.office.office.toLowerCase()
    );

    this.candidateService
      .getCandidates({ year: '2020', office: this.office.office })
      .subscribe(candidates => this.candidates = candidates);

    this.route = this.routingService.getOfficeRoute(this.office);
  }

  setSelectedOffice(status: boolean) {
    this.isSelected = status;
  }

  changeRoute() {
    console.log('office changeRoute called', `${this.route}`);
  }
}
