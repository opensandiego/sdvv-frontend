import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { GraphQLModule } from '../graphql.module';
import { CandidateCardGQLModule } from '../candidate-card-gql/candidate-card-gql.module';
import { CandidateCardListInfoGQL } from './candidate-card-list-gql.query';
import { CandidateCardListGQLComponent } from './candidate-card-list-gql.component';

@NgModule({ declarations: [
        CandidateCardListGQLComponent,
    ],
    exports: [CandidateCardListGQLComponent],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        CandidateCardGQLModule], providers: [CandidateCardListInfoGQL, provideHttpClient(withInterceptorsFromDi())] })
export class CandidateCardListGQLModule { }
