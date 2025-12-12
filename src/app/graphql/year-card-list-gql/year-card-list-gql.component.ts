
import { Component, OnInit } from '@angular/core';
import { GraphQLModule } from '../graphql.module';
import { YearSelectorGQL, YearsResponse } from './year-card-list-gql.query';
import { YearCardGQLComponent } from '../year-card-gql/year-card-gql.component';

interface ElectionYearItem {
  year: string;
  inPrimaryElection?: boolean;
  inGeneralElection?: boolean;
}

@Component({
  selector: 'gql-year-card-list',
  imports: [GraphQLModule, YearCardGQLComponent],
  template: `
    @for (electionYear of electionYearList; track electionYear) {
      <div class="list">
        <gql-year-card
          [year]="electionYear.year"
          [inPrimaryElection]="electionYear.inPrimaryElection"
          [inGeneralElection]="electionYear.inGeneralElection"
        ></gql-year-card>
      </div>
    }
    `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 10px;
      }
    `,
  ],
})
export class YearCardListGQLComponent implements OnInit {
  electionYearList: ElectionYearItem[];

  caption =
    'Campaign Finance Charts for Candidates in San Diego City Elections.';

  constructor(private yearSelectorGQL: YearSelectorGQL) {}

  ngOnInit() {
    this.yearSelectorGQL
      .watch(
        {},
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const years: YearsResponse = result.data;

        if (years.electionYears) {
          this.electionYearList = years.electionYears.map((electionYear) => ({
            year: electionYear.year,
            inPrimaryElection: electionYear.year === '2022',
            // inGeneralElection: electionYear.year !== '2022',
          }));
        }
      });
  }
}
