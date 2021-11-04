import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { CandidateService } from 'src/app/store/services/candidate.service';
import { ElectionService } from 'src/app/public/services/election.service';

import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  electionYear: string;
  detailsActive: boolean;
  items: MenuItem[];

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private electionService: ElectionService,
  ) { }
    
  ngOnInit(): void {
    this.electionYear = this.electionService.getElectionYear();
    this.buildMenu();
    this.trackDetailsActive();
  }

  getDistinctOffices(candidates): string[] {
    const officeTitles: string[] = candidates.map(candidate => candidate.office).sort().reverse();
    return [... new Set(officeTitles)];
  }

  getDistinctSeats(candidates): string[] {
    const seats: string[] = candidates.map(candidate => candidate.district).sort();
    return [... new Set(seats)];
  }

  hasSeats(candidates: any[]): boolean {
    return candidates.some(candidate => candidate.district !== null);
  }

  getItems(officeTitle, candidates) {
    let candidatesForOffice = candidates
      .filter(candidate => candidate.office === officeTitle);

    const hasSeats = this.hasSeats(candidatesForOffice);
    const linkPrefix = `/office/${officeTitle}`;
    const linkSuffix = this.detailsActive ? `/details` : ``;

    if (hasSeats) {
      const distinctSeats = this.getDistinctSeats(candidatesForOffice);
  
      return distinctSeats.map(seat => ({
        label: `District ${seat}`,
        icon: 'fa fa-fw fa-map-marker',
        items: candidatesForOffice
          .filter(candidate => candidate.district === seat).map(candidate => ({
            label: candidate.full_name,
            icon: 'pi pi-user',
            routerLink: `${linkPrefix}/${seat}/${candidate.id}${linkSuffix}`.toLowerCase().split(' ').join('-'),
          }))
      }))
    }

    return candidatesForOffice.map(candidate => ({
      label: candidate.full_name,
      icon: 'pi pi-user',
      routerLink: `${linkPrefix}/${candidate.id}${linkSuffix}`.toLowerCase().split(' ').join('-'),
    }))
  }

  buildMenu() {
    this.candidateService
      .getCandidates({ year: this.electionYear })
      .subscribe(candidates => {
        const distinctOfficeTitles = this.getDistinctOffices(candidates);

        this.items = [
          {
            label: 'Mayor',
            icon: 'fa fa-fw fa-university',
            items: this.getItems('Mayor', candidates)
          },
          {
            label: 'City Council',
            icon: 'fa fa-fw fa-map',
            items: this.getItems('City Council', candidates)
          },
          {
            label: 'City Attorney',
            icon: 'fa fa-fw fa-balance-scale',
            items: this.getItems('City Attorney', candidates)
          },
        ];
    })
  }

  trackDetailsActive() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const detailsActive = event['url'].includes('/details')
        if(detailsActive !== this.detailsActive) {
          this.detailsActive = detailsActive;
          this.buildMenu()
        }
      });    
  }

}
