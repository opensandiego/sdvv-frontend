import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CandidateDetailsContainerModule } from 'src/app/pages/candidates/details/candidate-details/candidate-details-container.module';
import { CandidateDetailsRoutedComponent } from './candidate-details-routed.component';
import { CandidateDetailsRoutingModule } from './candidate-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CandidateDetailsContainerModule,
    CandidateDetailsRoutingModule,
  ],
  declarations: [
    CandidateDetailsRoutedComponent,
  ],  
  providers: [ ], 
  exports: [ CandidateDetailsRoutedComponent ],
  bootstrap: []
})
export class CandidateDetailsRoutedModule { }
