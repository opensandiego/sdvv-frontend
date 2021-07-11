import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CandidateCardComponent } from './candidate-card/candidate-card.component';
import { ExpandedQuickViewComponent } from './expanded-quick-view/expanded-quick-view.component';

import { VvChartsModule } from '../vv-charts/vv-charts.module';
import { CandidateQuickViewModule } from '../candidate-quick-view/candidate-quick-view.module';

@NgModule({
  declarations: [
    CandidateCardComponent,
    ExpandedQuickViewComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,

    VvChartsModule,
    CandidateQuickViewModule,
  ],
  exports: [
    CandidateCardComponent,
    ExpandedQuickViewComponent,
  ]
})
export class CandidateModule { }
