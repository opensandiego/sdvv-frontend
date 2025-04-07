import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RaisedVsSpentGQL, RaisedVsSpent } from './raised-vs-spent-gql.query';
import { globals } from 'src/app/globals';
import { RaisedVsSpentBarComponent } from 'lib-ui-charts';
import { GraphQLModule } from '../../graphql.module';

@Component({
  selector: 'gql-raised-vs-spent',
  imports: [GraphQLModule, RaisedVsSpentBarComponent],
  template: `
    <raised-vs-spent-bar
      [raised]="raised"
      [spent]="spent"
      [raisedBarColor]="contributionsColor"
      [spentBarColor]="expendituresInSupportColor"
    ></raised-vs-spent-bar>
  `,
})
export class RaisedVsSpentBarGQLComponent implements OnChanges {
  @Input() candidateId: string;

  raised = 0;
  spent = 0;
  contributionsColor = globals.contributionsColor;
  expendituresInSupportColor = globals.expendituresInSupportColor;

  constructor(private raisedVsSpentGQL: RaisedVsSpentGQL) {}

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

    this.raisedVsSpentGQL
      .watch(
        {
          candidateId: this.candidateId,
        },
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const response: RaisedVsSpent = result.data;

        const raised = response?.candidate?.committee?.contributions?.sum;
        this.raised = raised ? raised : 0;

        const spent = response?.candidate?.committee?.expenses?.sum;
        this.spent = spent ? spent : 0;
      });
  }
}
