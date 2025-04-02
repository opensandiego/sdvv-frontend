import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElectionYear } from 'lib-ui-components';

import { YearSelectorGQL, YearsResponse } from './year-selector-gql.query';

@Component({
    selector: 'gql-year-selector',
    template: `
    <year-selector
      [years]="electionYears"
      [selectedYear]="year"
      (selectedYearChange)="doChange($event)"
    ></year-selector>
  `,
    standalone: false
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
    this.yearSelectorGQL.watch({ }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const years: YearsResponse = result.data;

      if (years.electionYears) {
        this.electionYears = years.electionYears.map( electionYear => ({ year: electionYear.year}) );
      }
    });
  }

}
