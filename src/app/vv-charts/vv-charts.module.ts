import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

import { DonationsByGroupComponent } from './donations-by-group/donations-by-group.component';
import { OutsideMoneyBarComponent } from './outside-money-bar/outside-money-bar.component';
import { RaisedInOutDonutComponent } from './raised-in-out-donut/raised-in-out-donut.component';
import { RaisedVsSpentComponent } from './raised-vs-spent/raised-vs-spent.component';
import { RoundCurrencyPipe } from './round-currency.pipe';

@NgModule({
  declarations: [
    DonationsByGroupComponent,
    OutsideMoneyBarComponent,
    RaisedInOutDonutComponent,
    RaisedVsSpentComponent,
    RoundCurrencyPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    FontAwesomeModule,
    ChartsModule,
  ],
  exports: [
    DonationsByGroupComponent,
    OutsideMoneyBarComponent,
    RaisedInOutDonutComponent,
    RaisedVsSpentComponent,
  ],
  providers: [RoundCurrencyPipe]
})
export class VvChartsModule { }
