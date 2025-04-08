import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElectionYear, YearSelectorComponent } from 'lib-ui-components';

import { YearSelectorGQL, YearsResponse } from './year-selector-gql.query';
import { GraphQLModule } from '../graphql.module';

@Component({
  selector: 'gql-year-selector',
  imports: [GraphQLModule, YearSelectorComponent],
  template: `
    <year-selector
      [years]="electionYears"
      [selectedYear]="year"
      (selectedYearChange)="doChange($event)"
    ></year-selector>
  `,
})
export class YearSelectorGQLComponent implements OnInit {
  @Input() year: string = '';
  @Output() private yearChanged = new EventEmitter<string>();

  doChange(year) {
    this.yearChanged.emit(year);
  }

  electionYears: ElectionYear[];

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
          this.electionYears = years.electionYears.map((electionYear) => ({
            year: electionYear.year,
          }));
        }
      });
  }
}
