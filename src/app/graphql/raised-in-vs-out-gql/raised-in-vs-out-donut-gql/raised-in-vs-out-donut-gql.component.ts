import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RaisedInVsOutGQL, RaisedInVsOut } from './raised-in-vs-out-gql.query';
import { GraphQLModule } from '../../graphql.module';
import { RaisedInVsOutDonutComponent } from 'lib-ui-charts';

@Component({
  selector: 'gql-in-vs-out-donut',
  imports: [GraphQLModule, RaisedInVsOutDonutComponent],
  template: `
    <raised-in-vs-out-donut
      [inside]="insideAmount"
      [outside]="outsideAmount"
    ></raised-in-vs-out-donut>
  `,
})
export class RaisedInVsOutDonutGQLComponent implements OnChanges {
  @Input() candidateId: string;

  insideAmount = 0;
  outsideAmount = 0;

  constructor(private raisedInVsOutGQL: RaisedInVsOutGQL) {}

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

    this.raisedInVsOutGQL
      .watch(
        {
          candidateId: this.candidateId,
        },
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const response: RaisedInVsOut = result.data;

        const insideAmount =
          response?.candidate?.committee?.contributions?.categorizedBy
            ?.jurisdiction?.inside;
        this.insideAmount = insideAmount ? insideAmount : 0;

        const outsideAmount =
          response?.candidate?.committee?.contributions?.categorizedBy
            ?.jurisdiction?.outside;
        this.outsideAmount = outsideAmount ? outsideAmount : 0;
      });
  }
}
