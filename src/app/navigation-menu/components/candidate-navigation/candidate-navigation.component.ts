import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CandidateService } from 'src/app/store/services/candidate.service';
import { Candidate } from 'src/app/store/interfaces/candidate';
import { SidenavService } from 'src/app/shared/services/sidenav.service';

interface CandidateWithRoute extends Candidate {
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
  officeRootPath = 'office/';

  constructor(
    private sidenavService: SidenavService,
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    ) { }

  addRoute(candidate: Candidate): CandidateWithRoute {
    let path = `${candidate.office}`;

    if (candidate.district !== null) {
      path += `/district/${candidate.district}`;
    }
   
    return {
      ...candidate,
      routeLink: `${this.officeRootPath}${path}/${candidate.id}`.toLowerCase().split(' ').join('-'),
    };
  }

  ngOnInit(): void {
    this.candidateService.getCandidates({ year: this.electionYear }).pipe( ).subscribe(candidates => {
      const officeTitles: string[] = candidates.map(candidate => candidate.office).sort().reverse();
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

  getOffices(candidates: Candidate[], officeTitles: string[]) {
    const offices = officeTitles.map(officeTitle => {
      let seatsWithCandidates = null;

      let candidatesForOffice: Candidate[] = candidates
        .filter(candidate => candidate.office === officeTitle);

      const hasSeats: boolean = candidatesForOffice.some(candidate => candidate.district !== null);

      if (hasSeats) {
        const seatNames: string[] = candidatesForOffice.map(candidate => candidate.district);

        const distinctSeatNames: string[] = [... new Set(seatNames)].sort(); // remove duplicates
        seatsWithCandidates = distinctSeatNames
          .map(seatName => ({
            seatName,
            title: `${this.seatType} ${seatName}`,
            route: `${this.officeRootPath}${officeTitle}/${this.seatType}/${seatName}`.toLowerCase().split(' ').join('-'),
            candidates: candidatesForOffice.filter(candidate => candidate.district === seatName),
            hasSeats: false,
            seats: null,
        }));
      }

      return {
        title: officeTitle,
        route: this.officeRootPath + officeTitle.toLowerCase().split(' ').join('-'),
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
