import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { VvChartsModule } from '../vv-charts/vv-charts.module';

import { CandidateDetailsHeaderComponent } from './candidate-details-header/candidate-details-header.component';
import { DetailsRaisedByIndustryComponent } from './details-raised-by-industry/details-raised-by-industry.component';
import { TopCategoriesTableComponent } from './top-categories-table/top-categories-table.component';
import { DetailsTotalRaisedComponent } from './details-total-raised/details-total-raised.component';
import { DetailsTotalSpentComponent } from './details-total-spent/details-total-spent.component';
import { DetailsRaisedSpentSummaryComponent } from './details-raised-spent-summary/details-raised-spent-summary.component';
import { DetailsTabRaisedVSpentComponent } from './details-tab-raised-v-spent/details-tab-raised-v-spent.component';
import { DetailsContainerOutsideMoneyComponent } from './details-container-outside-money/details-container-outside-money.component';

import { DetailsTabTitleComponent } from './details-tab-title/details-tab-title.component';
import { DetailsTabRaisedByIndustryComponent } from './details-tab-raised-by-industry/details-tab-raised-by-industry.component';
import { DetailsTabRaisedByLocationComponent } from './details-tab-raised-by-location/details-tab-raised-by-location.component';
import { DetailsTabOutsideMoneyComponent } from './details-tab-outside-money/details-tab-outside-money.component';
import { CandidateDetailsRoutingModule } from './candidate-details-routing.module';
import { CandidateFullDetailsComponent } from './candidate-full-details/candidate-full-details.component';

@NgModule({
  declarations: [
    CandidateDetailsHeaderComponent,
    DetailsRaisedByIndustryComponent,
    TopCategoriesTableComponent,
    DetailsTotalRaisedComponent,
    DetailsTotalSpentComponent,
    DetailsRaisedSpentSummaryComponent,
    DetailsTabRaisedVSpentComponent,
    DetailsContainerOutsideMoneyComponent,
    DetailsTabTitleComponent,
    DetailsTabRaisedByIndustryComponent,
    DetailsTabRaisedByLocationComponent,
    DetailsTabOutsideMoneyComponent,
    CandidateFullDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    FontAwesomeModule,
    VvChartsModule,
    CandidateDetailsRoutingModule,
  ],
  exports: [
    CandidateDetailsHeaderComponent,
    TopCategoriesTableComponent,
    DetailsRaisedByIndustryComponent,
    DetailsTotalRaisedComponent,
    DetailsTotalSpentComponent,
    DetailsRaisedSpentSummaryComponent,
    DetailsTabRaisedVSpentComponent,
    DetailsContainerOutsideMoneyComponent,
    DetailsTabTitleComponent,
    DetailsTabRaisedByIndustryComponent,
    DetailsTabRaisedByLocationComponent,
    DetailsTabOutsideMoneyComponent,
    CandidateFullDetailsComponent,
  ],
})
export class CandidateDetailsModule { }
