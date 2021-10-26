import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateFullDetailsComponent } from './candidate-full-details/candidate-full-details.component';

const routes: Routes = [
    { path: 'details/:id', component: CandidateFullDetailsComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateDetailsRoutingModule { }
