import { Component, Input, OnInit } from '@angular/core';
import { CandidateInfoGQL, CandidateInfo } from './candidate-info-gql.query';

@Component({
  selector: 'gql-raised-in-vs-out-title',
  template: `
    <chart-title class="chart-title"
      [titleText]="title"
      [tooltipText]="tooltip"
    ></chart-title>
  `,
})
export class RaisedInVsOutTitleGQLComponent implements OnInit {
  @Input() candidateId: string;

  title = '';
  tooltip = '';

  constructor(private candidateInfoGQL: CandidateInfoGQL) {}

  ngOnInit() {

    this.candidateInfoGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: CandidateInfo = result.data;

      const district = response?.candidate?.district;
      const jurisdictionComplete = district ? `District ${district}` : 'City';

      this.title = `In vs. Out of ${jurisdictionComplete}`;

      const agency = response?.candidate?.agency;
      const area = district ? `${agency}, District ${district}` : `${agency}`;

      this.tooltip = `Total campaign funds raised inside versus funds raised outside ${area}.`;
    });
  }
}
