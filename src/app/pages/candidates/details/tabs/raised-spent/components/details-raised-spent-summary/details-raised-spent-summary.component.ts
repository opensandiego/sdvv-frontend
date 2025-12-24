import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import {
  DetailsRaisedSpentGQLQuery,
  RaisedSpent,
} from './raised-vs-spent-gql.query';
import { globals } from 'src/app/globals';

@Component({
  selector: 'details-raised-spent-summary',
  imports: [MatDividerModule],
  templateUrl: './details-raised-spent-summary.component.html',
  styleUrls: ['./details-raised-spent-summary.component.scss'],
})
export class DetailsRaisedSpentSummaryComponent implements OnChanges {
  @Input() candidateId: string;

  raised: number;
  spent: number;
  totalRaisedTextColor = globals.contributionsColor;
  totalSpentTextColor = globals.expendituresInSupportColor;

  constructor(private detailsRaisedSpentGQLQuery: DetailsRaisedSpentGQLQuery) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId);
    }
  }

  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) {
      return;
    }

    this.detailsRaisedSpentGQLQuery
      .watch(
        {
          candidateId: this.candidateId,
        },
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const response: RaisedSpent = result.data;

        this.spent = response?.candidate?.committee?.expenses?.sum;
        this.raised = response?.candidate?.committee?.contributions?.sum;
      });
  }

  formatNumber(amount: number): string {
    const newAmount = amount ? amount : 0;
    return newAmount.toLocaleString('en', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  }
}
