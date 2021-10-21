import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CandidateNavigation } from 'src/app/store/interfaces/candidate.navigation';
import { CandidateNavigationService } from 'src/app/store/services/candidate.navigation.service';
import { SidenavService } from '../../services/sidenav.service';

interface CandidateNavigationWithRoute extends CandidateNavigation {
  routeLink: string;
}

@Component({
  selector: 'app-candidate-navigation',
  templateUrl: './candidate-navigation.component.html',
})
export class CandidateNavigationComponent implements OnInit {
  offices = [];
  selectedOffice: string = '';
  selectedSeatName: string = '';
  selectedCandidateId: string = '';
  seatType: string = 'District';

  electionYear = '2020';

  constructor(
    private candidateNavigationService: CandidateNavigationService,
    private sidenavService: SidenavService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  addRoute(candidate: CandidateNavigation): CandidateNavigationWithRoute {
    let path = `${candidate.officeType}`;

    if (candidate.seatName !== null) {
      path += `_${candidate.seatType}-${candidate.seatName}`;
    }
   
    return {
      ...candidate,
      routeLink: `${path}/${candidate.id}`.toLowerCase().split(' ').join('-'),
    };
  }

  ngOnInit(): void {
    this.candidateNavigationService.getNavigation(this.electionYear).pipe( ).subscribe(candidates => {
      const officeTitles: string[] = candidates.map(candidate => candidate.officeType).sort().reverse();
      const distinctOfficeTitles: string[] = [... new Set(officeTitles)];

      const candidatesWithRoute = candidates.map(candidate => this.addRoute(candidate));

      this.offices = this.getOffices(candidatesWithRoute, distinctOfficeTitles);
    });

    this.sidenavService.candidateChanged$.subscribe( 
      candidateId => { this.setSelectedCandidate(candidateId); } 
    );
    
    this.sidenavService.officeChanged$.subscribe(
      office => { this.setSelectedOffice(office); }
    );
    
    this.sidenavService.officeSeatChanged$.subscribe(
      seat => { this.setSelectedSeat(seat); }
    );

  }

  getOffices(candidates: CandidateNavigation[], officeTitles: string[]) {
    const offices = officeTitles.map(officeTitle => {
      let seatsWithCandidates = null;

      let candidatesForOffice: CandidateNavigation[] = candidates
        .filter(candidate => candidate.officeType === officeTitle);

      const hasSeats: boolean = candidatesForOffice.some(candidate => candidate.seatName !== null);

      if (hasSeats) {
        const seatNames: string[] = candidatesForOffice.map(candidate => candidate.seatName);

        const distinctSeatNames: string[] = [... new Set(seatNames)].sort(); // remove duplicates
        seatsWithCandidates = distinctSeatNames
          .map(seatName => ({
            seatName,
            title: `${this.seatType} ${seatName}`,
            route: `${officeTitle}_${this.seatType}-${seatName}`.toLowerCase().split(' ').join('-'),
            candidates: candidatesForOffice.filter(candidate => candidate.seatName === seatName),
            hasSeats: false,
            seats: null,
        }));
      }

      return {
        title: officeTitle,
        route: officeTitle.toLowerCase().split(' ').join('-'),
        candidates: candidatesForOffice,
        hasSeats,
        seats: seatsWithCandidates,
      }
    });

    return offices;
  }

  setSelectedOffice(office: string) {
    this.selectedOffice = office;
  }

  setSelectedSeat(seatName: string) {
    this.selectedSeatName = seatName;
  }

  setSelectedCandidate(candidateId: string) {
    this.selectedCandidateId = candidateId;
  }

  changeRoute(routePath) {
    this.router.navigate([`/${routePath}`], { relativeTo: this.route });
  }

}
