import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCardModule } from 'lib-ui-components';

import { GraphQLModule } from '../graphql.module';
import { CandidateCardFinanceDataGQL } from './candidate-card-finance-data-gql.query';
import { CandidateCardInfoGQL } from './candidate-card-info-gql.query';
import { CandidateCardGQLComponent } from './candidate-card-gql.component';

@NgModule({ declarations: [
        CandidateCardGQLComponent,
    ],
    exports: [CandidateCardGQLComponent],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        CandidateCardModule], providers: [CandidateCardInfoGQL, CandidateCardFinanceDataGQL, provideHttpClient(withInterceptorsFromDi())] })
export class CandidateCardGQLModule { }
