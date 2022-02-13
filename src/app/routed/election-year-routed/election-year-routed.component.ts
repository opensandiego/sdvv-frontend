import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YearService } from 'src/app/store/services/year.service';

@Component({
  selector: 'election-year-route',
  template: `
    <gql-year-selector
      [year]="activeYear"
      (yearChanged)="changeRoute($event)"
    ></gql-year-selector>
  `,
})
export class ElectionYearRouteComponent implements OnInit {
  activeYear: string = '';

  constructor(
    private router: Router,
    private yearService: YearService,
  ) { }

  ngOnInit() {
    this.yearService.electionYearChanged$.subscribe(year => {
      this.activeYear = year;
    })
  }

  changeRoute(year) {
    this.router.navigate([`year/${year}`]);
    this.yearService.changeElectionYear(year);
  }
}
