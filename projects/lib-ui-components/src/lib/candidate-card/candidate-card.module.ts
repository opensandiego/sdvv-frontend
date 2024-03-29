import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CandidateCardComponent } from './candidate-card.component';

@NgModule({
  declarations: [
    CandidateCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
  ],
  exports: [
    CandidateCardComponent,
  ]
})
export class CandidateCardModule { }
