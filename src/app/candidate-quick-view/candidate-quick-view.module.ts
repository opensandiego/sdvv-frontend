import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { VvChartsModule } from '../vv-charts/vv-charts.module';

import { ExpandedChartTitleComponent } from './expanded-chart-title/expanded-chart-title.component';
import { ExpandedOutsideMoneyComponent } from './expanded-outside-money/expanded-outside-money.component';

@NgModule({
  declarations: [
    ExpandedChartTitleComponent,
    ExpandedOutsideMoneyComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    FontAwesomeModule,
    VvChartsModule,
  ],
  exports: [
    ExpandedOutsideMoneyComponent,
  ],
})
export class CandidateQuickViewModule { }
