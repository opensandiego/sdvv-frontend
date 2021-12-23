import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CandidateService } from 'src/app/store/services/candidate.service';
import { Candidate } from 'src/app/store/interfaces/candidate';

import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { YearService } from 'src/app/store/services/year.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  items: MenuItem[];
  candidates: Candidate[];
  electionYear: string;
  detailsActive: boolean;
  activeOffice: string;
  activeDistrict: string;
  activeCandidate: string;

  linkPrefix: string;
  menuDisabled: boolean;

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private yearService: YearService,
  ) { }

  ngOnInit(): void {
    this.yearService.electionYearChanged$.subscribe(year => {
      if (year === '') {
        this.electionYear = '-';
        this.menuDisabled = true;
      } else {
        this.electionYear = year;
        this.linkPrefix = `/year/${this.electionYear}/office/`;
        this.menuDisabled = false;
      }

      this.buildMenu();
      this.trackDetailsActive();
    });
  }

  getDistinctSeats(candidates: Candidate[]): string[] {
    const seats: string[] = candidates.map(candidate => candidate.district).sort();
    return [... new Set(seats)];
  }

  hasSeats(candidates: Candidate[]): boolean {
    return candidates.some(candidate => candidate.district !== null);
  }

  getRouterLink(candidate: Candidate): string {
    const linkPrefix = this.linkPrefix + candidate.office.toLowerCase().split(' ').join('-');
    const linkDistrict =  candidate.district 
      ? `/${candidate.district}`
      : `/0`;
    const linkSuffix = this.detailsActive ? `/details` : ``;
    return `${linkPrefix}${linkDistrict}/${candidate.id}${linkSuffix}`;
  }

  getCandidateItem(candidate: Candidate): MenuItem {
    return {
      id: candidate.id,
      label: candidate.full_name,
      icon: 'pi pi-user',
      routerLinkActiveOptions: { exact:true },
      routerLink: this.getRouterLink(candidate),
    }
  }

  getSeeAllCandidatesItem(officeTitle: string, district: string = null) {
    const linkPrefix = this.linkPrefix +  `${officeTitle.toLowerCase().split(' ').join('-')}`;

    const linkDistrict =  district 
      ? `/${district}`
      : `/0`;

    return {
      label: 'See All ',
      icon: 'pi pi-users',
      routerLink: `${linkPrefix}${linkDistrict}`,
      routerLinkActiveOptions: { exact:true },     
    }
  }

  getItems(officeTitle, candidates) {
    let candidatesForOffice = candidates
      .filter(candidate => candidate.office === officeTitle);

    if (candidatesForOffice.length < 1) {
      return [];
    }

    const hasSeats = this.hasSeats(candidatesForOffice);

    if (hasSeats) {
      const distinctSeats = this.getDistinctSeats(candidatesForOffice);

      return distinctSeats.map(seat => {
        const seeAllCandidatesItem = this.getSeeAllCandidatesItem(officeTitle, seat);
        const candidatesMenuItems = candidatesForOffice
          .filter(candidate => candidate.district === seat)
          .map(candidate => this.getCandidateItem(candidate));

        return {
          id: seat,
          label: `District ${seat}`,
          icon: 'fa fa-fw fa-map-marker',
          items: [ seeAllCandidatesItem, ...candidatesMenuItems, ],
        }
      });

    } else {
      const seeAllCandidatesItem = this.getSeeAllCandidatesItem(officeTitle);
      const candidatesMenuItems = candidatesForOffice.map(candidate => this.getCandidateItem(candidate))

      return [ seeAllCandidatesItem, ...candidatesMenuItems, ];
    }
  }

  buildMenu() {
    const items_template = [
      {
        office_title: 'Mayor',
        icon: 'fa fa-fw fa-university',
      },
      {
        office_title: 'City Council',
        icon: 'fa fa-fw fa-map',
      },
      {
        office_title: 'City Attorney',
        icon: 'fa fa-fw fa-balance-scale',
      },
    ];

    this.candidateService
      .getCandidates({ year: this.electionYear })
      .subscribe(candidates => {
        this.candidates = candidates;

        this.items = items_template.map( item => {
          const newItem = {};
          newItem['id'] = item['office_title'].toLowerCase().split(' ').join('-');
          newItem['label'] = item['office_title'].toUpperCase();

          const officeItems = this.getItems(item.office_title, this.candidates);
          newItem['items'] = officeItems;

          if (this.menuDisabled || officeItems.length < 1) {
            newItem['expanded'] = false;
            newItem['disabled'] = true;
          }

          return newItem;
        })

        this.updateExpandedStatus();
    })
  }

  setActiveStatus(fragments: string[]) {
    let fragmentIndex = fragments.indexOf('office');
    if (fragmentIndex >= 0 ) {
      this.activeOffice = fragments[++fragmentIndex];
      this.activeDistrict = fragments[++fragmentIndex];
    }
  }

  updateExpandedStatus(items = this.items) {
    if (!items) { return; }

    items.forEach( item => {
      if (item.id === this.activeOffice || item.id === this.activeDistrict) {
        item.expanded = true;
      }
      if (item.items) {
        this.updateExpandedStatus(item.items);
      }
    });
  }

  updateMenuRouterLinks(items = this.items) {
    if (!items) { return; }

    items.forEach( item => {
      if (item.id === this.activeOffice) {
        item.expanded = true;
      }

      if (item.items) {
        this.updateMenuRouterLinks(item.items);
      } else {
        if (item.hasOwnProperty('routerLink')) {
          const candidate = this.candidates
            .find(candidate => candidate.id === item.id);

          if (candidate) {
            item.routerLink = this.getRouterLink(candidate);
          }

        }
      }
    });
  }

  trackDetailsActive() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const urlFragments = event['url'].split('/').filter( fragment => fragment);
        this.setActiveStatus(urlFragments);
        
        const detailsActive = event['url'].includes('/details')
        if (this.detailsActive !== detailsActive) {
          this.detailsActive = detailsActive;
          this.updateMenuRouterLinks();
        }

        this.updateExpandedStatus();
      });
  }
}
