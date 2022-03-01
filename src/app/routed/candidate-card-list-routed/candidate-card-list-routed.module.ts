import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CandidateCardListGQLModule } from 'src/app/graphql/candidate-card-list-gql/candidate-card-list-gql.module';
import { CandidateCardListRoutedComponent } from './candidate-card-list-routed.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CandidateCardListGQLModule,
  ],
  declarations: [
    CandidateCardListRoutedComponent,
  ],  
  providers: [ ], 
  exports: [ CandidateCardListRoutedComponent ],
  bootstrap: []
})
export class CandidateCardListRoutedModule { }
