import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { OutsideMoneyBarComponent } from './outside-money-bar/outside-money-bar.component';
import { TotalSpentListComponent } from './total-spent-list/total-spent-list.component';

@NgModule({
  declarations: [
    OutsideMoneyBarComponent,
    TotalSpentListComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
  ],
  exports: [
    OutsideMoneyBarComponent,
    TotalSpentListComponent,
  ],
})
export class VvChartsModule { }
