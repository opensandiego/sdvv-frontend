import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SummaryComponent } from './summary.component';

@NgModule({
  declarations: [
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SummaryComponent,
  ]
})
export class SummaryModule { }
