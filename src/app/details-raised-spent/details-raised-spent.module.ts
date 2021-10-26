import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { VvChartsModule } from '../vv-charts/vv-charts.module';

import { SharedModule } from '../shared/shared.module';
import { DetailsTotalRaisedComponent } from './components/details-total-raised/details-total-raised.component';
import { DetailsTotalSpentComponent } from './components/details-total-spent/details-total-spent.component';
import { DetailsRaisedSpentSummaryComponent } from './components/details-raised-spent-summary/details-raised-spent-summary.component';
import { DetailsTabRaisedVSpentComponent } from './components/details-tab-raised-v-spent/details-tab-raised-v-spent.component';

@NgModule({
  declarations: [
    DetailsTotalRaisedComponent,
    DetailsTotalSpentComponent,
    DetailsRaisedSpentSummaryComponent,
    DetailsTabRaisedVSpentComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatDividerModule,
    FontAwesomeModule,
    VvChartsModule,
    SharedModule,
  ],
  exports: [
    DetailsTotalRaisedComponent,
    DetailsTotalSpentComponent,
    DetailsRaisedSpentSummaryComponent,
    DetailsTabRaisedVSpentComponent,
  ],
})
export class DetailsRaisedSpentModule { }
