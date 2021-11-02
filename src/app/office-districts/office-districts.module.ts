import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeDistrictsRoutingModule } from './office-districts-routing.module';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { QuickViewContainerComponent } from './components/quick-view-container/quick-view-container.component';
import { CandidateQuickViewModule } from '../candidate-quick-view/candidate-quick-view.module';
import { CardListComponent } from './components/card-list/card-list.component';
import { CandidateModule } from '../candidate/candidate.module';


@NgModule({
  declarations: [
    OfficeDistrictComponent,
    QuickViewContainerComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    OfficeDistrictsRoutingModule,
    CandidateModule,
    CandidateQuickViewModule,
  ],
  exports: [
  ]
})
export class OfficeDistrictsModule { }
