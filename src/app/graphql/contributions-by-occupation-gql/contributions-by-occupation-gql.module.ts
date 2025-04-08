import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphQLModule } from '../graphql.module';
import { ChartTitleModule, ContributionsByOccupationTableModule } from 'lib-ui-components';
import { ContributionsByOccupationGQLComponent } from './contributions-by-occupation-table-gql/contributions-by-occupation-table-gql.component';
import { ContributionsGroupedByOccupationGQL } from './contributions-by-occupation-table-gql/contributions-by-occupation-gql.query';

@NgModule({ declarations: [
        ContributionsByOccupationGQLComponent,
    ],
    exports: [ContributionsByOccupationGQLComponent,],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        ContributionsByOccupationTableModule,
        ChartTitleModule], providers: [ContributionsGroupedByOccupationGQL, provideHttpClient(withInterceptorsFromDi())] })
export class ContributionsByOccupationGQLModule { }
