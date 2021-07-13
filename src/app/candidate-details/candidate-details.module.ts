import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    BrowserAnimationsModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    FontAwesomeModule,
    VvChartsModule,
  ],
  exports: [ ],
})
export class CandidateDetailsModule { }
