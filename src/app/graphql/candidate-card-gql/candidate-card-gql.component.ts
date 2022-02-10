import { Component, Input, OnInit } from '@angular/core';
import { CandidateInfo, CommitteeData } from 'lib-ui-components';
import { CandidateCardFinanceDataGQL, CandidateCardFinanceDataResponse } from './candidate-card-finance-data-gql.query';
import { CandidateCardInfoGQL, CandidateCardInfoResponse } from './candidate-card-info-gql.query';


@Component({
  selector: 'gql-candidate-card',
  template: `
    <candidate-card 
      [candidateInfo]="candidateInfo"
      [committeeData]="committeeData"
      [inExpandedCard]="inExpandedCard"
      (emitCandidateId)="onCandidateSelected($event)"
    ></candidate-card>
  `,
})
export class CandidateCardGQLComponent implements OnInit {
  @Input() candidateId: string;

  candidateInfo: CandidateInfo;
  committeeData: CommitteeData;

  inExpandedCard: boolean;

  constructor(
    private candidateInfoGQL: CandidateCardInfoGQL,
    private candidateCardFinanceDataGQL: CandidateCardFinanceDataGQL,
  ) {}

  ngOnInit() {

    this.candidateInfoGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const candidateInfo: CandidateCardInfoResponse = result.data;
      this.candidateInfo = candidateInfo.candidate;
    });

    this.candidateCardFinanceDataGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const candidateFinanceData: CandidateCardFinanceDataResponse = result.data;
      this.committeeData = {
        raised: candidateFinanceData.candidate.committee.contributions.sum,
        donors: candidateFinanceData.candidate.committee.contributions.count,
      }
    });

  }

  onCandidateSelected(eventData) {
    console.log({ eventData });
  }
}
