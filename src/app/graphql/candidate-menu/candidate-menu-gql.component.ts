import { Component, Input, OnInit } from '@angular/core';
import { ActiveMenuPath } from 'lib-ui-components';
import { CandidateMenuGQL, CandidateMenuResponse } from './candidate-menu-gql.query';

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
  // styleUrls: ['./candidate-menu-gql.component.scss']
})
export class CandidateMenuGQLComponent implements OnInit {
  @Input() electionYear: string;

  @Input() activeItem: ActiveMenuPath;
  @Input() detailsActive: boolean;

  mayor;
  cityCouncil;
  cityAttorney;

  constructor(private candidateMenuGQL: CandidateMenuGQL) {}

  ngOnInit() {
    if (!this.electionYear) { return; }

    this.candidateMenuGQL.watch({
      year: this.electionYear,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: CandidateMenuResponse = JSON.parse(JSON.stringify(result.data.electionYear));

      this.mayor = response.officesByType.mayor;
      this.cityCouncil = response.officesByType.cityCouncil;
      this.cityAttorney = response.officesByType.cityAttorney;
    });
  }
}
