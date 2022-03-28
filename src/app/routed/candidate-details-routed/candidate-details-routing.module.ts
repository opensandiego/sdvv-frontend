import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateDetailsRoutedComponent } from './candidate-details-routed.component';

const routes: Routes = [
  {
    path: 'details',
    data: { type: 'details' },
    component: CandidateDetailsRoutedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateDetailsRoutingModule { }
