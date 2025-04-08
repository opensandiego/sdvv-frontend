import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GraphQLModule } from '../graphql.module';
import { YearCardGQLModule } from '../year-card-gql/year-card-gql.module';
import { YearSelectorGQL, YearsResponse } from './year-card-list-gql.query';

interface ElectionYearItem {
  year: string;
  inPrimaryElection?: boolean;
  inGeneralElection?: boolean;
}

@Component({
    imports: [
        CommonModule,
        GraphQLModule,
        YearCardGQLModule,
    ],
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
  `
})
export class YearCardListGQLComponent implements OnInit {
  electionYearList: ElectionYearItem[];

  caption = 'Campaign Finance Charts for Candidates in San Diego City Elections.';

  constructor(
    private yearSelectorGQL: YearSelectorGQL,
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
    });
  }

}
