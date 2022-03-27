import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CandidateDetailsHeaderComponent } from './candidate-details-header.component';
import { SharedPipesModule } from '../shared/shared-pipes.module';

@NgModule({
  declarations: [
    CandidateDetailsHeaderComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedPipesModule,
  ],
  providers: [ ],
  exports: [
    CandidateDetailsHeaderComponent,
  ],
})
export class CandidateDetailsHeaderModule { }
