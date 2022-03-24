import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CandidateSummaryContainerModule } from 'src/app/containers/candidate-summary-container/candidate-summary-container.module';
import { CandidateSummaryRoutedComponent } from './candidate-summary-routed.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CandidateSummaryContainerModule,
  ],
  declarations: [
    CandidateSummaryRoutedComponent,
  ],  
  providers: [ ], 
  exports: [ CandidateSummaryRoutedComponent ],
  bootstrap: []
})
export class CandidateSummaryRoutedModule { }
