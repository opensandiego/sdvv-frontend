import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActiveMenuPathGQL } from 'src/app/graphql/candidate-menu/candidate-menu-gql.component';
import { YearService } from 'src/app/store/services/year.service';

@Component({
  selector: 'candidate-menu-routed',
  template: `
    <gql-candidate-menu
      [electionYear]="activeYear"
      [activeItem]="activeItem"
      [detailsActive]="detailsActive"
    ></gql-candidate-menu>
  `,
})
export class CandidateMenuRoutedComponent implements OnInit {
  activeYear: string;
  activeItem: ActiveMenuPathGQL = {
    officeTitle: '',
    districtNumber: '',
    candidateId: '',
  };
  detailsActive: boolean = false;

  constructor(
    private router: Router,
    private yearService: YearService,
  ) { }

  ngOnInit() {
    this.yearService.electionYearChanged$.subscribe(year => {
      this.activeYear = year;
    })

    this.trackDetailsActive();
  }

  getActiveItem(fragments: string[]) {
    let path: ActiveMenuPathGQL = {
      officeTitle: '',
      districtNumber: '',
      candidateId: '',
    };

    let fragmentIndex = fragments.indexOf('office');
    if (fragmentIndex >= 0 ) {
      path.officeTitle = fragments[++fragmentIndex];
      path.districtNumber = fragments[++fragmentIndex];
    }

    return path;
  }

  trackDetailsActive() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      const urlFragments = event['url'].split('/').filter( fragment => fragment);
      this.activeItem = this.getActiveItem(urlFragments);

      const detailsActive = event['url'].includes('/details')
      this.detailsActive = detailsActive;
    });
  }
}
