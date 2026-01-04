import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  IndependentExpendituresGQL,
  IndependentExpenditures,
} from '../independent-expenditures-gql.query';
import { globals } from 'src/app/globals';
import { SupportOpposeBarComponent } from 'lib-ui-charts';
import { GraphQLModule } from '../../graphql.module';

@Component({
  selector: 'gql-support-oppose-bar',
  imports: [GraphQLModule, SupportOpposeBarComponent],
  template: `
    <support-oppose-bar
      [support]="supportAmount"
      [oppose]="opposeAmount"
      [backgroundColor]="backgroundColor"
      [textColor]="textColor"
      [supportBarColor]="expendituresInSupportColor"
      [opposeBarColor]="expendituresInOppositionColor"
    ></support-oppose-bar>
  `,
})
export class SupportOpposeBarGQLComponent implements OnChanges {
  @Input() candidateId: string;
  @Input() backgroundColor: string;
  @Input() textColor: string;

  expendituresInSupportColor = globals.expendituresInSupportColor;
  expendituresInOppositionColor = globals.expendituresInOppositionColor;
  supportAmount = 0;
  opposeAmount = 0;

  constructor(
    private readonly independentExpendituresGQL: IndependentExpendituresGQL
  ) {}

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

    this.independentExpendituresGQL
      .watch(
        {
          candidateId: this.candidateId,
        },
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const response: IndependentExpenditures = result.data;

        const supportAmount =
          response?.candidate?.independentExpenditures?.sums?.support;
        this.supportAmount = supportAmount ? supportAmount : 0;

        const opposeAmount =
          response?.candidate?.independentExpenditures?.sums?.oppose;
        this.opposeAmount = opposeAmount ? opposeAmount : 0;
      });
  }
}
