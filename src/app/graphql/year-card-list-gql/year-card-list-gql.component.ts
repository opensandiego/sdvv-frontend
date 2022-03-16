import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';

import { YearSelectorGQL, YearsResponse } from './year-card-list-gql.query';

@Component({
  selector: 'gql-year-card-list',
  styleUrls: ['./year-card-list-gql.component.scss'],
  template: `
    <div class="list" *ngFor="let electionYear of electionYears">
      <gql-year-card
        [year]="electionYear"
      ></gql-year-card>
    </div>
  `,
})
export class YearCardListGQLComponent implements OnInit {
  electionYears: string[];

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
        this.electionYears = years.electionYears.map( electionYear => electionYear.year );
      }

      const pageTitle = `City Election Data by Year | ${globals.pageTitleSuffix}`;
      this.titleService.setTitle(pageTitle);
    });
  }

}
