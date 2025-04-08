import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CandidateCardListGQLModule } from 'src/app/graphql/candidate-card-list-gql/candidate-card-list-gql.module';
import { CandidateCardListRoutedComponent } from './candidate-card-list-routed.component';

@NgModule({ declarations: [
        CandidateCardListRoutedComponent,
    ],
    exports: [CandidateCardListRoutedComponent],
    bootstrap: [], imports: [CommonModule,
        RouterModule,
        CandidateCardListGQLModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CandidateCardListRoutedModule { }
