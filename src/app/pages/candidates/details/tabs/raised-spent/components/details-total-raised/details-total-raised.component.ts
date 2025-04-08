import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import {
  DetailsTotalRaised,
  DetailsTotalRaisedGQLQuery,
} from './details-total-raised-gql.query';
import { globals } from 'src/app/globals';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TotalRaisedBarModule } from 'lib-ui-charts';

@Component({
  selector: 'details-total-raised',
  imports: [
    CommonModule,
    MatTooltipModule,
    FontAwesomeModule,
    TotalRaisedBarModule,
  ],
  templateUrl: './details-total-raised.component.html',
  styleUrls: ['./details-total-raised.component.scss'],
})
export class DetailsTotalRaisedComponent implements OnChanges {
  @Input() candidateId: string;

  tooltipText = 'Placeholder tooltip text.';
  contributionsColor = globals.contributionsColor;
  totalContributionsTextColor = globals.contributionsColor;

  totalRaised: number;
  totalRaisedFormatted: string;
  raisedCategories: any[];

  faQuestionCircle = faQuestionCircle;

  constructor(private detailsTotalRaisedGQLQuery: DetailsTotalRaisedGQLQuery) {}

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

    this.detailsTotalRaisedGQLQuery
      .watch(
        {
          candidateId: this.candidateId,
        },
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const response: DetailsTotalRaised = result.data;

        const contributions = response?.candidate?.committee?.contributions;
        const contributionMethods = contributions.categorizedBy.method;

        this.raisedCategories = [
          {
            value: contributionMethods.inKind,
            color: this.contributionsColor,
            name: 'In Kind',
          },
          {
            value: contributionMethods.individual,
            color: this.contributionsColor,
            name: 'Individual',
          },
          {
            value: contributionMethods.other,
            color: this.contributionsColor,
            name: 'Other',
          },
        ];

        this.totalRaised = contributions.sum ? contributions.sum : 0;
        this.totalRaisedFormatted = this.totalRaised.toLocaleString('en', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        });
      });
  }
}
