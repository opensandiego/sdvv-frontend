import { Routes } from '@angular/router';
import { CandidateDetailsRoutedComponent } from './candidate-details-routed.component';

export const ROUTES: Routes = [
  {
    path: 'details',
    data: { type: 'details' },
    component: CandidateDetailsRoutedComponent,
  },
];

export default ROUTES;
