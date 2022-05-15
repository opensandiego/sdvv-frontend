import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';

import { YearSelectorGQL, YearsResponse } from './year-card-list-gql.query';

interface ElectionYearItem {
  year: string;
  inPrimaryElection?: boolean;
  inGeneralElection?: boolean;
}

@Component({
  selector: 'gql-year-card-list',
  styleUrls: ['./year-card-list-gql.component.scss'],
  template: `
    <div class="list" *ngFor="let electionYear of electionYearList">
      <gql-year-card
        [year]="electionYear.year"
        [inPrimaryElection]="electionYear.inPrimaryElection"
        [inGeneralElection]="electionYear.inGeneralElection"
      ></gql-year-card>
    </div>
  `,
})
export class YearCardListGQLComponent implements OnInit {
  electionYearList: ElectionYearItem[];

  constructor(
    private yearSelectorGQL: YearSelectorGQL,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.yearSelectorGQL.watch({ }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const years: YearsResponse = result.data;

      if (years.electionYears) {
        this.electionYearList = years.electionYears.map( electionYear => ({
          year: electionYear.year,
          inPrimaryElection: electionYear.year === '2022',
          // inGeneralElection: electionYear.year !== '2022',
        }) );
      }

      const pageTitle = `Choose a Year | ${globals.pageTitleSuffix}`;
      this.titleService.setTitle(pageTitle);
    });
  }

}
