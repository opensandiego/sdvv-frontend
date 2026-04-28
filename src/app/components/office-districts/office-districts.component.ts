import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CandidateCardListRoutedComponent } from 'src/app/routed/candidate-card-list-routed/candidate-card-list-routed.component';
import { CandidatesIndependentExpendituresComparisonChartsComponent } from '../charts/candidates-independent-expenditures.component';
import { CandidateContributionsByLocationComparisonChartsComponent } from '../charts/candidates-contributions-by-location.component';

@Component({
  imports: [
    RouterModule,
    CandidateCardListRoutedComponent,
    CandidatesIndependentExpendituresComparisonChartsComponent,
    CandidateContributionsByLocationComparisonChartsComponent,
  ], // add candidates office summary charts
  selector: 'office-districts',
  template: `
    <router-outlet></router-outlet>
    <candidates-contributions-by-location-comparison-chart />
    <candidates-independent-expenditures-comparison-chart />
    <candidate-card-list-routed></candidate-card-list-routed>
  `,
})
export class OfficeDistrictComponent {
  // office: string;
  // district: string;
  // year: string;

  constructor() {}
}
