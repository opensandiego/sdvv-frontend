import { Routes } from '@angular/router';
import { CandidateSummaryRoutedComponent } from './candidate-summary-routed.component';

export const ROUTES: Routes = [
  {
    path: ':candidateId',
    data: { type: 'candidate' },
    component: CandidateSummaryRoutedComponent
  }
];

export default ROUTES;
