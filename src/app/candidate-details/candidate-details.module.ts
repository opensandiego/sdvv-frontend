import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule } from '@angular/material/tabs';

import { VvChartsModule } from '../vv-charts/vv-charts.module';


@NgModule({
  declarations: [
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
