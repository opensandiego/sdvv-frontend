import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule } from 'ngx-echarts';

import { ContributionsByGroupTableComponent } from './contributions-by-group-table/contributions-by-group-table.component';
import { RoundCurrencyPipe } from './round-currency.pipe';
import { TotalSpentDonutComponent } from './total-spent-donut/total-spent-donut.component';
import { RaisedByIndustryBarComponent } from './raised-by-industry-bar/raised-by-industry-bar.component';
import { RaisedByLocationBarComponent } from './raised-by-location-bar/raised-by-location-bar.component';
import { RaisedByOutsideMoneyBarComponent } from './raised-by-outside-money-bar/raised-by-outside-money-bar.component';
import { OutsideSpendingBarComponent } from './outside-spending-bar/outside-spending-bar.component';
import { TotalRaisedBarComponent } from './total-raised-bar/total-raised-bar.component';
import { RaisedVsSpentBarComponent } from './raised-vs-spent-bar/raised-vs-spent-bar.component';
import { RaisedInVsOutDonutComponent } from './raised-in-vs-out-donut/raised-in-vs-out-donut.component';
import { OutsideMoneyStackedBarComponent } from './outside-money-stacked-bar/outside-money-stacked-bar.component';

@NgModule({
  declarations: [
    ContributionsByGroupTableComponent,
    RoundCurrencyPipe,
    TotalSpentDonutComponent,
    RaisedByIndustryBarComponent,
    RaisedByLocationBarComponent,
    RaisedByOutsideMoneyBarComponent,
    OutsideSpendingBarComponent,
    TotalRaisedBarComponent,
    RaisedVsSpentBarComponent,
    RaisedInVsOutDonutComponent,
    OutsideMoneyStackedBarComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    FontAwesomeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [
    ContributionsByGroupTableComponent,
    TotalSpentDonutComponent,
    RaisedByIndustryBarComponent,
    RaisedByLocationBarComponent,
    RaisedByOutsideMoneyBarComponent,
    OutsideSpendingBarComponent,
    TotalRaisedBarComponent,
    RaisedVsSpentBarComponent,
    RaisedInVsOutDonutComponent,
    OutsideMoneyStackedBarComponent,
  ],
  providers: [RoundCurrencyPipe]
})
export class VvChartsModule { }
