import { Component, Input, OnChanges } from '@angular/core';
import { OfficeInfo, OfficeData } from 'lib-ui-components';
import { OfficeCardGQLData } from './office-card-gql-data.query';
import { OfficeCardGQLInfo } from './office-card-gql-info.query';

@Component({
  selector: 'office-card-gql',
  template: `
    <office-card 
      [officeInfo]="officeInfo"
      [officeData]="officeData"
    ></office-card>
  `,
})
export class OfficeCardGQLComponent implements OnChanges {
  @Input() year: string;
  @Input() officeTitle: string;

  officeInfo: OfficeInfo;
  officeData: OfficeData;

  constructor(
    private officeCardGQLInfo: OfficeCardGQLInfo,
    private officeCardGQLData: OfficeCardGQLData,
  ) {}

  ngOnChanges() {
    if (!this.year || !this.officeTitle) { return; }

    this.officeCardGQLInfo.watch({
      electionYear: this.year,
      title: this.officeTitle,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const candidateInfoResponse = result?.data?.office;
      this.officeInfo = {
        officeTitle: this.officeTitle,
        candidateCount: candidateInfoResponse?.committeeCount,
      }
    });

    this.officeCardGQLData.watch({
      electionYear: this.year,
      title: this.officeTitle,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const candidateDataResponse = result?.data?.office;
      this.officeData = {
        totalContributions: candidateDataResponse?.totalContributions,
      }
    });

  }
}
