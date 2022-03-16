import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { YearCardComponent } from './year-card.component';

@NgModule({
  declarations: [
    YearCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    YearCardComponent,
  ]
})
export class YearCardModule { }
