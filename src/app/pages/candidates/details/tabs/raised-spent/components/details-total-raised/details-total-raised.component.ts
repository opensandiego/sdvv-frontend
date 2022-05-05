import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DetailsTotalRaised, DetailsTotalRaisedGQLQuery } from './details-total-raised-gql.query';

@Component({
  selector: 'details-total-raised',
  templateUrl: './details-total-raised.component.html',
  styleUrls: ['./details-total-raised.component.scss']
})
export class DetailsTotalRaisedComponent implements OnChanges {
  @Input() candidateId: string;

  tooltipText = 'Placeholder tooltip text.';
  colors = ['#00e25f', '#00b24b', '#007e35'];

  totalRaised: number;
  totalRaisedFormatted: string;
  raisedCategories: any[];

  faQuestionCircle = faQuestionCircle;
  
  constructor(
    private detailsTotalRaisedGQLQuery: DetailsTotalRaisedGQLQuery,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId);
    }
  }
  
  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) { return; }

    this.detailsTotalRaisedGQLQuery.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: DetailsTotalRaised = result.data;

      const contributions = response?.candidate?.committee?.contributions;
      const contributionMethods = contributions.categorizedBy.method;

      this.raisedCategories = [
        { value: contributionMethods.inKind, color: '#00e25f', name: 'In Kind',},
        { value: contributionMethods.individual, color: '#00b24b', name: 'Individual',},
        { value: contributionMethods.other, color: '#007e35', name: 'Other',},
      ];

      this.totalRaised = contributions.sum ? contributions.sum : 0;
      this.totalRaisedFormatted = this.totalRaised
        .toLocaleString('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    });
  }
}
