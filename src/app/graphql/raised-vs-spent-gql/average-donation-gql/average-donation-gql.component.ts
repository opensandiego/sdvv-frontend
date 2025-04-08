import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AverageDonationGQL,
  AverageDonationResponse,
} from './average-donation-gql.query';
import { GraphQLModule } from '../../graphql.module';
import { AverageDonationComponent } from 'lib-ui-components';

@Component({
  selector: 'gql-average-donation',
  imports: [GraphQLModule, AverageDonationComponent],
  template: `
    <average-donation [average]="averageDonation"></average-donation>
  `,
})
export class AverageDonationGQLComponent implements OnChanges {
  @Input() candidateId: string;

  averageDonation = 0;

  constructor(private averageDonationGQL: AverageDonationGQL) {}

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

    this.averageDonationGQL
      .watch(
        {
          candidateId: this.candidateId,
        },
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const response: AverageDonationResponse = result.data;

        const average = response?.candidate?.committee?.contributions?.average;
        this.averageDonation = average ? average : 0;
      });
  }
}
