import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './components/office/office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { CandidateModule } from '../candidate/candidate.module';
import { CandidateQuickViewModule } from '../candidate-quick-view/candidate-quick-view.module';


@NgModule({
  declarations: [
    OfficeComponent,
  ],
  imports: [
    CommonModule,
    CandidateModule,
    CandidateQuickViewModule,
    OfficeRoutingModule,
  ],
  exports: [
    OfficeComponent,
  ]
})
export class OfficeModule { }
