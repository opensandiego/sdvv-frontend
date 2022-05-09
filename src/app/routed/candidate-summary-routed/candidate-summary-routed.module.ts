import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CandidateSummaryContainerModule } from 'src/app/pages/candidates/summary/candidate-summary/candidate-summary-container.module';
import { CandidateSummaryRoutedComponent } from './candidate-summary-routed.component';
import { CandidateSummaryRoutingModule } from './candidate-summary-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CandidateSummaryContainerModule,
    CandidateSummaryRoutingModule,
  ],
  declarations: [
    CandidateSummaryRoutedComponent,
  ],  
  providers: [ ], 
  exports: [ CandidateSummaryRoutedComponent ],
  bootstrap: []
})
export class CandidateSummaryRoutedModule { }
