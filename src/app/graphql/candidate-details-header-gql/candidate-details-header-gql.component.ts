import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CandidateFinanceDataGQL, CandidateFinanceDataResponse } from './candidate-finance-data-gql.query';
import { CandidateInfoGQL, CandidateInfoResponse } from './candidate-info-gql.query';
import { globals } from 'src/app/globals';

const uri = `${environment.apiUrl}`;

@Component({
    selector: 'gql-candidate-details-header',
    template: `
    <candidate-details-header
      [candidateName]="candidateName"
      [description]="description"
      [imageUrl]="imageUrl"
      [website]="website"
      [raised]="raisedAmount"
      [donors]="donorsCount"
      [averageDonation]="averageDonationAmount"
      [donationsTextColor]="contributionsTextColor"
    ></candidate-details-header>
  `,
    standalone: false
})
export class CandidateDetailsHeaderGQLComponent implements OnChanges {
  @Input() candidateId;

  imageUrl: string;
  candidateName: string;
  description: string;
  website: string;

  contributionsTextColor = globals.contributionsColor; 

  public raisedAmount;
  public donorsCount;
  public averageDonationAmount;

  constructor(
    private candidateInfoGQL: CandidateInfoGQL,
    private candidateFinanceDataGQL: CandidateFinanceDataGQL,
   ) { }

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
      const response: CandidateInfoResponse = result.data;
      const candidateInfo = response?.candidate;

      this.imageUrl = candidateInfo?.imageUrl
        ? `${uri}/${response.candidate.imageUrl}`
        : null;
      this.candidateName = candidateInfo?.fullName ? candidateInfo.fullName : null
      this.description = candidateInfo?.description ? candidateInfo.description : null;
      this.website = candidateInfo?.website ? candidateInfo.website : null;
    });

    this.candidateFinanceDataGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: CandidateFinanceDataResponse = result.data;
      const raised = response?.candidate?.committee?.contributions?.sum;
      const donors = response?.candidate?.committee?.contributions?.count;
      const average = response?.candidate?.committee?.contributions?.average;

      this.raisedAmount = raised ? raised : 0;
      this.donorsCount = donors ? donors : 0;
      this.averageDonationAmount = average ? average : 0;
    });
  }
}
