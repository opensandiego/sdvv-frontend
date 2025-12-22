import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CandidateCardListRoutedComponent } from 'src/app/routed/candidate-card-list-routed/candidate-card-list-routed.component';

@Component({
  imports: [RouterModule, CandidateCardListRoutedComponent],
  selector: 'office-districts',
  template: `
    <router-outlet></router-outlet>
    <candidate-card-list-routed></candidate-card-list-routed>
  `,
})
export class OfficeDistrictComponent {
  // office: string;
  // district: string;
  // year: string;

  constructor() {}
}
