import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';
import { environment } from 'src/environments/environment';

import { CandidateInfo, CommitteeData } from 'lib-ui-components';
import { CandidateCardFinanceDataGQL, CandidateCardFinanceDataResponse } from './candidate-card-finance-data-gql.query';
import { CandidateCardInfoGQL, CandidateCardInfoResponse } from './candidate-card-info-gql.query';

const uri = `${environment.apiUrl}`;

@Component({
  selector: 'gql-candidate-card',
  template: `
    <candidate-card 
      [candidateInfo]="candidateInfo"
      [committeeData]="committeeData"
      [inExpandedCard]="inExpandedCard"
    ></candidate-card>
  `,
})
export class CandidateCardGQLComponent implements OnChanges {
  @Input() candidateId: string;
  @Input() inExpandedCard: boolean;

  candidateInfo: CandidateInfo;
  committeeData: CommitteeData;

  constructor(
    private candidateInfoGQL: CandidateCardInfoGQL,
    private candidateCardFinanceDataGQL: CandidateCardFinanceDataGQL,
    private titleService: Title,
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
            : ''
        } 
        : null;
      this.candidateInfo = candidateInfo ? candidateInfo : null;

      this.setTitle(candidateInfo);
    });

    this.candidateCardFinanceDataGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: CandidateCardFinanceDataResponse = result.data;
      const raised = response?.candidate?.committee?.contributions?.sum;
      const donors = response?.candidate?.committee?.contributions?.count;

      this.committeeData = {
        raised: raised ? raised : 0,
        donors: donors ? donors : 0,
      }
    });

  }

  setTitle(candidateInfo) {
    if (!this.inExpandedCard || !candidateInfo) { return; }

    const year = candidateInfo.electionYear;
    const office = candidateInfo.office;
    const district = candidateInfo.district ? `District ${candidateInfo.district}` : ``;

    const candidateName = candidateInfo.fullName
    const pageTitle = `${candidateName}, Summary, ${office} ${district}, Candidate ${year} | ${globals.pageTitleSuffix}`;

    this.titleService.setTitle(pageTitle);
  }
}
