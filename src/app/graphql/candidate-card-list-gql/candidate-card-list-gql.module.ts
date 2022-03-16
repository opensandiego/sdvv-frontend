import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { GraphQLModule } from '../graphql.module';
import { CandidateCardGQLModule } from '../candidate-card-gql/candidate-card-gql.module';
import { CandidateCardListInfoGQL } from './candidate-card-list-gql.query';
import { CandidateCardListGQLComponent } from './candidate-card-list-gql.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    CandidateCardGQLModule,
  ],
  declarations: [
    CandidateCardListGQLComponent,
  ],  
  providers: [ CandidateCardListInfoGQL ], 
  exports: [ CandidateCardListGQLComponent ],
  bootstrap: []
})
export class CandidateCardListGQLModule { }
