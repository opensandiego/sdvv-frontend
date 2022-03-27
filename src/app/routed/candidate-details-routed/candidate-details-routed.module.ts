import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CandidateDetailsContainerModule } from 'src/app/containers/candidate-details-container/candidate-details-container.module';
import { CandidateDetailsRoutedComponent } from './candidate-details-routed.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CandidateDetailsContainerModule,
  ],
  declarations: [
    CandidateDetailsRoutedComponent,
  ],  
  providers: [ ], 
  exports: [ CandidateDetailsRoutedComponent ],
  bootstrap: []
})
export class CandidateDetailsRoutedModule { }
