import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { CandidateMenuModule } from 'lib-ui-components';
import { GraphQLModule } from '../graphql.module';
import { CandidateMenuGQLComponent } from './candidate-menu-gql.component';
import { CandidateMenuGQL } from './candidate-menu-gql.query';

@NgModule({ declarations: [
        CandidateMenuGQLComponent,
    ],
    exports: [CandidateMenuGQLComponent],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        CandidateMenuModule], providers: [CandidateMenuGQL, provideHttpClient(withInterceptorsFromDi())] })
export class CandidateMenuGQLModule { }
