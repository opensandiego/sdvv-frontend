import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OfficeRoutingModule } from './office-routing.module';
import { CandidateCardListRoutedModule } from '../routed/candidate-card-list-routed/candidate-card-list-routed.module';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule,
    OfficeRoutingModule,
    CandidateCardListRoutedModule,
  ],
  exports: [ ]
})
export class OfficeModule { }
