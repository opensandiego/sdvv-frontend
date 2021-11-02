import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeDistrictsRoutingModule } from './office-districts-routing.module';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CandidateModule } from '../candidate/candidate.module';


@NgModule({
  declarations: [
    OfficeDistrictComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    OfficeDistrictsRoutingModule,
    CandidateModule,
  ],
  exports: [
  ]
})
export class OfficeDistrictsModule { }
