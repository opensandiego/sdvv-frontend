import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ElectionYearGQL } from './election-year-gql.query';
import { CommonModule } from '@angular/common';
import { YearSelectorGQLModule } from 'src/app/graphql/year-selector-gql/year-selector-gql.module';

@Component({
  selector: 'election-year-routed',
  template: `
    <gql-year-selector
      [year]="activeYear"
      (yearChanged)="changeRoute($event)"
    ></gql-year-selector>
  `,
  imports: [CommonModule, YearSelectorGQLModule],
})
export class ElectionYearRouteComponent implements OnInit {
  activeYear: string = '';

  constructor(
    private router: Router,
    private electionYearGQL: ElectionYearGQL
  ) {}

  ngOnInit() {
    this.watchElectionYear();
  }

  private watchElectionYear() {
    const electionYear$ = this.electionYearGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data))
      .subscribe((result) => {
        this.activeYear = result.electionYear;
      });
  }

  changeRoute(year) {
    this.router.navigate([`year/${year}`]);
  }
}
