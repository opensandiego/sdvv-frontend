import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { GraphQLModule } from '../graphql.module';
import { CandidateDetailsHeaderModule } from 'lib-ui-components';
import { CandidateInfoGQL } from './candidate-info-gql.query';
import { CandidateFinanceDataGQL } from './candidate-finance-data-gql.query';
import { CandidateDetailsHeaderGQLComponent } from './candidate-details-header-gql.component';

@NgModule({ declarations: [
        CandidateDetailsHeaderGQLComponent,
    ],
    exports: [CandidateDetailsHeaderGQLComponent,], imports: [CommonModule,
        GraphQLModule,
        CandidateDetailsHeaderModule], providers: [CandidateInfoGQL, CandidateFinanceDataGQL, provideHttpClient(withInterceptorsFromDi()),] })
export class CandidateDetailsHeaderGQLModule { }
