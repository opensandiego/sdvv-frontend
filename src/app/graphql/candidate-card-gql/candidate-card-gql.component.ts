import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CandidateInfo, CommitteeData } from 'lib-ui-components';
import { CandidateCardFinanceDataGQL, CandidateCardFinanceDataResponse } from './candidate-card-finance-data-gql.query';
import { CandidateCardInfoGQL, CandidateCardInfoResponse } from './candidate-card-info-gql.query';
import { globals } from 'src/app/globals';

const uri = `${environment.apiUrl}`;

@Component({
    selector: 'gql-candidate-card',
    template: `
    <candidate-card 
      [candidateInfo]="candidateInfo"
      [committeeData]="committeeData"
      [inExpandedCard]="inExpandedCard"
      [inSupportTextColor]="inSupportTextColor"
      [inOppositionTextColor]="inOppositionTextColor"
    ></candidate-card>
  `,
    standalone: false
})
export class CandidateCardGQLComponent implements OnChanges {
  @Input() candidateId: string;
  @Input() inExpandedCard: boolean;

  inSupportTextColor = globals.expendituresInSupportColor;
  inOppositionTextColor = globals.expendituresInOppositionColor;

  candidateInfo: CandidateInfo;
  committeeData: CommitteeData;

  constructor(
    private candidateInfoGQL: CandidateCardInfoGQL,
    private candidateCardFinanceDataGQL: CandidateCardFinanceDataGQL,
    ) {}

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
      const response: CandidateCardInfoResponse = result.data;

      const candidateInfo = response?.candidate 
        ? {
          ...response.candidate,
          imageUrl: response.candidate?.imageUrl 
            ? `${uri}/${response.candidate.imageUrl}` 
            : null
        } 
        : null;
      this.candidateInfo = candidateInfo ? candidateInfo : null;

    });

    this.candidateCardFinanceDataGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: CandidateCardFinanceDataResponse = result.data;
      const donors = response?.candidate?.committee?.contributions?.count;
      const raised = response?.candidate?.committee?.contributions?.sum;
      const expenses = response?.candidate?.committee?.expenses.sum;
      const independentExpenditures = response?.candidate?.independentExpenditures?.sums
      const independentExpendituresSupporting = independentExpenditures?.support;
      const independentExpendituresOpposing = independentExpenditures?.oppose;

      const totalInSupport = 
        (expenses ? expenses : 0) +
        (independentExpendituresSupporting ? independentExpendituresSupporting : 0);
      const totalInOpposition = 
        (independentExpendituresOpposing ? independentExpendituresOpposing : 0);

      this.committeeData = {
        raised: raised ? raised : 0,
        donors: donors ? donors : 0,
        totalInSupport: totalInSupport,
        totalInOpposition: totalInOpposition,
      }
    });

  }
}
