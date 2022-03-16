import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './components/office/office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { CandidateModule } from '../candidate/candidate.module';
import { CandidateQuickViewModule } from '../candidate-quick-view/candidate-quick-view.module';
import { CandidateDetailsModule } from '../candidate-details/candidate-details.module';
import { CardListComponent } from './components/card-list/card-list.component';
import { QuickViewContainerComponent } from './components/quick-view-container/quick-view-container.component';
import { OfficeDistrictComponent } from './components/office-districts/office-districts.component';
import { CandidateCardListRoutedModule } from '../routed/candidate-card-list-routed/candidate-card-list-routed.module';


@NgModule({
  declarations: [
    OfficeComponent,
    OfficeDistrictComponent,
    QuickViewContainerComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    CandidateModule,
    CandidateQuickViewModule,
    OfficeRoutingModule,
    CandidateDetailsModule,
    CandidateCardListRoutedModule,
  ],
  exports: [
    OfficeComponent,
  ]
})
export class OfficeModule { }
