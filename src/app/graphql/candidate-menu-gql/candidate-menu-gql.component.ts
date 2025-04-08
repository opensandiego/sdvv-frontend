import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActiveMenuPath } from 'lib-ui-components';
import { CandidateMenuGQL, CandidateMenuResponse } from './candidate-menu-gql.query';

export { ActiveMenuPath as ActiveMenuPathGQL };
@Component({
    selector: 'gql-candidate-menu',
    template: `
    <candidate-menu 
      [activeItem]="activeItem"
      [detailsActive]="detailsActive"
      [mayor]="mayor"
      [cityCouncil]="cityCouncil"
      [cityAttorney]="cityAttorney"
    ></candidate-menu>
  `,
    standalone: false
})
export class CandidateMenuGQLComponent implements OnChanges {
  @Input() electionYear: string;

  @Input() activeItem: ActiveMenuPath;
  @Input() detailsActive: boolean;

  mayor;
  cityCouncil;
  cityAttorney;

  constructor(private candidateMenuGQL: CandidateMenuGQL) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['electionYear']) {
      const electionYear = changes['electionYear'].currentValue;
      this.electionYearChanged(electionYear);
    }

  }

  electionYearChanged(electionYear) {
    this.electionYear = electionYear;

    if (!this.electionYear) {
      this.mayor = null;
      this.cityCouncil = null;
      this.cityAttorney = null;
      return; 
    }

    const filters = {
      inPrimaryElection: this.electionYear === '2022',
      // inGeneralElection: this.year !== '2022',
    };

    this.candidateMenuGQL.watch({
      year: this.electionYear,
      filters,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {

      if (!result?.data?.electionYear) { return; }

      const response: CandidateMenuResponse = JSON.parse(JSON.stringify(result.data.electionYear));

      this.mayor = response.officesByType.mayor;
      this.cityCouncil = response.officesByType.cityCouncil;
      this.cityAttorney = response.officesByType.cityAttorney;
    });
  }
}
