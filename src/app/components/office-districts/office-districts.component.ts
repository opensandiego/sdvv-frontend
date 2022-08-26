import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CandidateCardListRoutedModule } from 'src/app/routed/candidate-card-list-routed/candidate-card-list-routed.module';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CandidateCardListRoutedModule,
  ],
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

  constructor() { }
}
