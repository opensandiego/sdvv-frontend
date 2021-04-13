import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
// import { OutsideMoneyBarComponent } from './outside-money-bar/outside-money-bar.component';
import { DonationsByGroupComponent } from './donations-by-group/donations-by-group.component';

@NgModule({
  declarations: [
    // OutsideMoneyBarComponent,
    DonationsByGroupComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
  ],
  exports: [
    // OutsideMoneyBarComponent,
    DonationsByGroupComponent,
  ],
})
export class VvChartsModule { }
