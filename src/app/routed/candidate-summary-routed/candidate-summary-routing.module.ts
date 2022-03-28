import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateSummaryRoutedComponent } from './candidate-summary-routed.component';

const routes: Routes = [
  {
    path: ':candidateId',
    data: { type: 'candidate' },
    component: CandidateSummaryRoutedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateSummaryRoutingModule { }
