import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCardModule } from 'lib-ui-components';

import { GraphQLModule } from '../graphql.module';
import { CandidateCardFinanceDataGQL } from './candidate-card-finance-data-gql.query';
import { CandidateCardInfoGQL } from './candidate-card-info-gql.query';
import { CandidateCardGQLComponent } from './candidate-card-gql.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    CandidateCardModule,
  ],
  declarations: [
    CandidateCardGQLComponent,
  ],  
  providers: [ CandidateCardInfoGQL, CandidateCardFinanceDataGQL ], 
  exports: [ CandidateCardGQLComponent ],
  bootstrap: []
})
export class CandidateCardGQLModule { }
