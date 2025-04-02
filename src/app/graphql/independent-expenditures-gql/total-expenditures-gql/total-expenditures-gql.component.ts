import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IndependentExpendituresGQL, IndependentExpenditures } from '../independent-expenditures-gql.query';

@Component({
  selector: 'gql-total-independent-expenditures',
  template: `
    <total-expenditures
      [totalExpenditures]="totalExpendituresAmount"
    ></total-expenditures>
  `,
  standalone: false,
})
export class TotalIndependentExpendituresGQLComponent implements OnChanges {
  @Input() candidateId: string;

  totalExpendituresAmount = 0;

  constructor(private independentExpendituresGQL: IndependentExpendituresGQL) {}

  ngOnChanges(changes: SimpleChanges): void  {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId);
    }
  }

  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) { return; }

    this.independentExpendituresGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: IndependentExpenditures = result.data;

      const supportAmount = response?.candidate?.independentExpenditures?.sums?.support;
      const opposeAmount = response?.candidate?.independentExpenditures?.sums?.oppose;

      this.totalExpendituresAmount = 0;
      this.totalExpendituresAmount += supportAmount ? supportAmount : 0
      this.totalExpendituresAmount += opposeAmount ? opposeAmount : 0;
    });
  }
}
