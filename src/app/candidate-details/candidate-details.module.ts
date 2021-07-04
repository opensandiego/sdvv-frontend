import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule } from '@angular/material/tabs';

import { VvChartsModule } from '../vv-charts/vv-charts.module';

import { CandidateDetailsHeaderComponent } from './candidate-details-header/candidate-details-header.component';
import { DetailsRaisedByIndustryComponent } from './details-raised-by-industry/details-raised-by-industry.component';

@NgModule({
  declarations: [
    CandidateDetailsHeaderComponent,
    DetailsRaisedByIndustryComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatTabsModule,
    VvChartsModule,
  ],
  exports: [ ],
})
export class CandidateDetailsModule { }
