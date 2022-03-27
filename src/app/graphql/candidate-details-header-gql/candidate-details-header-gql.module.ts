import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GraphQLModule } from '../graphql.module';
import { CandidateDetailsHeaderModule } from 'lib-ui-components';
import { CandidateInfoGQL } from './candidate-info-gql.query';
import { CandidateFinanceDataGQL } from './candidate-finance-data-gql.query';
import { CandidateDetailsHeaderGQLComponent } from './candidate-details-header-gql.component';

@NgModule({
  declarations: [
    CandidateDetailsHeaderGQLComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    CandidateDetailsHeaderModule,
  ],
  providers: [ CandidateInfoGQL, CandidateFinanceDataGQL, ],
  exports: [ CandidateDetailsHeaderGQLComponent, ],
})
export class CandidateDetailsHeaderGQLModule { }
