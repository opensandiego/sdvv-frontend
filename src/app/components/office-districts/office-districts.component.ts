import { Component, computed, input } from '@angular/core';
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
  ],
  selector: 'office-districts',
  template: `
    <router-outlet></router-outlet>
    <div class="center-title">
      <h2 mat-card-title>{{ contestName() }}</h2>
    </div>
    <candidates-contributions-by-location-comparison-chart />
    <candidates-independent-expenditures-comparison-chart />
    <candidate-card-list-routed></candidate-card-list-routed>
  `,
  styles: [
    `
      .center-title {
        text-align: center;
      }
    `,
  ],
})
export class OfficeDistrictComponent {
  year = input<string>('');
  office_name = input<string>('');
  district_number = input<string>('');

  contestName = computed(() => {
    let office = this.office_name()
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each
      .join(' ');

    // conditionally add district number if not set to zero
    if (this.district_number() && this.district_number() !== '0') {
      office += ` District ${this.district_number()}`;
    }

    return `${office}`;
  });

  constructor() {}
}
