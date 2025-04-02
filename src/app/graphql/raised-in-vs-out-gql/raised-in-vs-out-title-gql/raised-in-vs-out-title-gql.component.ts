import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CandidateInfoGQL, CandidateInfo } from './candidate-info-gql.query';

@Component({
    selector: 'gql-raised-in-vs-out-title',
    template: `
    <chart-title class="chart-title"
      [titleText]="title"
      [tooltipText]="tooltip"
    ></chart-title>
  `,
    standalone: false
})
export class RaisedInVsOutTitleGQLComponent implements OnChanges {
  @Input() candidateId: string;

  title = '';
  tooltip = '';

  constructor(private candidateInfoGQL: CandidateInfoGQL) {}

  ngOnChanges(changes: SimpleChanges): void  {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId);
    }
  }

  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) { return; }

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
