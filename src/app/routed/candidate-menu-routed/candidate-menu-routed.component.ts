import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ElectionYearGQL } from './election-year-gql.query';
import { ActiveMenuPathGQL } from 'src/app/graphql/candidate-menu-gql/candidate-menu-gql.component';
import { CandidateMenuGQLModule } from 'src/app/graphql/candidate-menu-gql/candidate-menu-gql.module';

@Component({
  selector: 'candidate-menu-routed',
  template: `
    <gql-candidate-menu
      [electionYear]="activeYear"
      [activeItem]="activeItem"
      [detailsActive]="detailsActive"
    ></gql-candidate-menu>
  `,
  imports: [CommonModule, CandidateMenuGQLModule],
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
    private electionYearGQL: ElectionYearGQL
  ) {}

  ngOnInit() {
    this.watchElectionYear();
    this.trackDetailsActive();
  }

  private watchElectionYear() {
    const electionYear$ = this.electionYearGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data))
      .subscribe((result) => {
        this.activeYear = result.electionYear;
      });
  }

  getActiveItem(fragments: string[]) {
    let path: ActiveMenuPathGQL = {
      officeTitle: '',
      districtNumber: '',
      candidateId: '',
    };

    let fragmentIndex = fragments.indexOf('office');
    if (fragmentIndex >= 0) {
      path.officeTitle = fragments[++fragmentIndex];
      path.districtNumber = fragments[++fragmentIndex];
    }

    return path;
  }

  trackDetailsActive() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const urlFragments = event['url']
          .split('/')
          .filter((fragment) => fragment);
        this.activeItem = this.getActiveItem(urlFragments);

        const detailsActive = event['url'].includes('/details');
        this.detailsActive = detailsActive;
      });
  }
}
