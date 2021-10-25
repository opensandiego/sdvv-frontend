import { Component, Input, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/public/services/routing.service';
import { SidenavService } from 'src/app/services';
import { Candidate } from 'src/app/store/interfaces/candidate';

@Component({
  selector: 'navigation-item-candidate',
  templateUrl: './navigation-item-candidate.component.html',
})
export class NavigationItemCandidateComponent implements OnInit {
  @Input() candidate: Candidate;
  routeLink: string;
  isSelected: boolean;

  constructor(
    private sidenavService: SidenavService,
    private routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.sidenavService.candidateChanged$.subscribe( 
      candidateId => this.isSelected = candidateId === this.candidate.id
    );

    this.routeLink = this.routingService.getCandidateRoute(this.candidate);    
  }

  changeRoute() {
    console.log('candidate changeRoute called', `${this.routeLink}`);
  }

  setSelectedCandidate() {
    this.sidenavService.changeSelectedCandidate(this.candidate.id);
  }
}
