import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { YearCardGQL, YearCardResponse } from './year-card-gql.query';

@Component({
  selector: 'gql-year-card',
  template: `
    <year-card
      [year]="year"
      [mayorCandidateCount]="mayorCount"
      [cityCouncilCandidateCount]="cityCouncilCount"
      [cityAttorneyCandidateCount]="cityAttorneyCount"
    ></year-card>
  `,
})
export class YearCardGQLComponent {
  @Input() year: string;

  mayorCount: number = 0;
  cityCouncilCount: number = 0;
  cityAttorneyCount: number = 0;

  constructor(private yearCardGQL: YearCardGQL) {}

  ngOnChanges(changes: SimpleChanges) {   
    if (changes['year']) {      
      this.year = changes['year'].currentValue;
      this.queryYear(this.year);
    }
  }

  queryYear(year) {
    if (!Number.isInteger(Number.parseInt(year))) {
      this.setCountsToZero();
      return;
    }

    this.setCountsToNull()
    
    this.yearCardGQL.watch({
      year: year,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {

      const response: YearCardResponse = result?.data;
      const officesByType = response?.electionYear?.officesByType;

      if (!officesByType) { 
        this.setCountsToZero();
        return;
      }

      const mayorCount = officesByType?.mayor?.committeeCount;
      this.mayorCount = mayorCount ? mayorCount : 0;

      const cityCouncilCount = officesByType?.cityCouncil?.committeeCount; 
      this.cityCouncilCount = cityCouncilCount ? cityCouncilCount : 0;
      
      const cityAttorneyCount = officesByType?.cityAttorney?.committeeCount; 
      this.cityAttorneyCount = cityAttorneyCount ? cityAttorneyCount : 0;
    });
  }

  setCountsTo(value) {
    this.mayorCount = value;
    this.cityCouncilCount = value;
    this.cityAttorneyCount = value;
  }

  setCountsToZero() {
    this.setCountsTo(0);
  }

  setCountsToNull() {
    this.setCountsTo(null);
  }

}
