import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CandidateCardComponent } from './candidate-card/candidate-card.component';

import { VvChartsModule } from '../vv-charts/vv-charts.module';

@NgModule({
  declarations: [
    CandidateCardComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,

    VvChartsModule,
  ],
  exports: [
    CandidateCardComponent,
  ]
})
export class CandidateModule { }
