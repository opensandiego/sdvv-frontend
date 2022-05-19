import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OfficeRoutingModule } from './office-routing.module';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { CandidateCardListRoutedModule } from '../routed/candidate-card-list-routed/candidate-card-list-routed.module';

@NgModule({
  declarations: [
    OfficeDistrictComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    OfficeRoutingModule,
    CandidateCardListRoutedModule,
  ],
  exports: [ ]
})
export class OfficeModule { }
