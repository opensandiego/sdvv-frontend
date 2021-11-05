import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { VvChartsModule } from '../vv-charts/vv-charts.module';

import { DetailsComponent } from './details/details.component';
import { CandidateDetailsHeaderComponent } from './candidate-details-header/candidate-details-header.component';
import { DetailsRaisedByIndustryComponent } from './details-raised-by-industry/details-raised-by-industry.component';
import { DetailsContainerOutsideMoneyComponent } from './details-container-outside-money/details-container-outside-money.component';

import { DetailsTabTitleComponent } from './details-tab-title/details-tab-title.component';
import { DetailsTabRaisedByIndustryComponent } from './details-tab-raised-by-industry/details-tab-raised-by-industry.component';
import { DetailsTabRaisedByLocationComponent } from './details-tab-raised-by-location/details-tab-raised-by-location.component';
import { DetailsTabOutsideMoneyComponent } from './details-tab-outside-money/details-tab-outside-money.component';
import { CandidateDetailsRoutingModule } from './candidate-details-routing.module';
import { DetailsRaisedSpentModule } from '../details-raised-spent/details-raised-spent.module';

@NgModule({
  declarations: [
    DetailsComponent,
    CandidateDetailsHeaderComponent,
    DetailsRaisedByIndustryComponent,
    DetailsContainerOutsideMoneyComponent,
    DetailsTabTitleComponent,
    DetailsTabRaisedByIndustryComponent,
    DetailsTabRaisedByLocationComponent,
    DetailsTabOutsideMoneyComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    FontAwesomeModule,
    SharedModule,
    VvChartsModule,
    DetailsRaisedSpentModule,
    CandidateDetailsRoutingModule,
  ],
  exports: [
    DetailsComponent,
    CandidateDetailsHeaderComponent,
    DetailsRaisedByIndustryComponent,
    DetailsContainerOutsideMoneyComponent,
    DetailsTabTitleComponent,
    DetailsTabRaisedByIndustryComponent,
    DetailsTabRaisedByLocationComponent,
    DetailsTabOutsideMoneyComponent,
  ],
})
export class CandidateDetailsModule { }
