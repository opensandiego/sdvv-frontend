import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { VvChartsModule } from '../vv-charts/vv-charts.module';

import { ExpandedChartTitleComponent } from './expanded-chart-title/expanded-chart-title.component';

@NgModule({
  declarations: [
    ExpandedChartTitleComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    FontAwesomeModule,
    VvChartsModule,
  ],
  exports: [
  ],
})
export class CandidateQuickViewModule { }
