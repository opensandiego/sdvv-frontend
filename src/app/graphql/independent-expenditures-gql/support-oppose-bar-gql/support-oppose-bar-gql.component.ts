import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IndependentExpendituresGQL, IndependentExpenditures } from '../independent-expenditures-gql.query';
import { globals } from 'src/app/globals';

@Component({
  selector: 'gql-support-oppose-bar',
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
  standalone: false,
})
export class SupportOpposeBarGQLComponent implements OnChanges {
  @Input() candidateId: string;
  @Input() backgroundColor: string;
  @Input() textColor: string;

  expendituresInSupportColor = globals.expendituresInSupportColor;
  expendituresInOppositionColor = globals.expendituresInOppositionColor;
  supportAmount = 0;
  opposeAmount = 0;

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
      this.supportAmount = supportAmount ? supportAmount : 0;
      
      const opposeAmount = response?.candidate?.independentExpenditures?.sums?.oppose;
      this.opposeAmount = opposeAmount ? opposeAmount : 0;
    });
  }
}
