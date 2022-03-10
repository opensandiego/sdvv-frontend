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
    this.officeInfo = null;
    this.officeData = null;

    this.officeCardGQLInfo.watch({
      electionYear: this.year,
      title: this.officeTitle,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const committeeCount = result?.data?.office?.committeeCount;

      this.officeInfo = {
        officeTitle: this.officeTitle,
        candidateCount: committeeCount ? committeeCount : 0,
      }
    });

    this.officeCardGQLData.watch({
      electionYear: this.year,
      title: this.officeTitle,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const totalContributions = result?.data?.office?.totalContributions;

      this.officeData = {
        totalContributions: totalContributions ? totalContributions : 0,
      }
    });

  }
}
