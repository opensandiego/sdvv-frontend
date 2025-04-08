import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphQLModule } from '../../graphql.module';
import { ChartTitleModule, DetailsContributionsByOccupationHeaderModule } from 'lib-ui-components';
import { RaisedByIndustryBarModule } from 'lib-ui-charts';
import { ContributionsGroupedByOccupationGQLQuery } from './details-contributions-by-occupation-table-gql/details-contributions-by-occupation-gql.query';
import { DetailsContributionsByOccupationGQLComponent } from './details-contributions-by-occupation-table-gql/details-contributions-by-occupation-gql.component';

@NgModule({ declarations: [
        DetailsContributionsByOccupationGQLComponent,
    ],
    exports: [
        DetailsContributionsByOccupationGQLComponent,
    ],
    bootstrap: [], imports: [CommonModule,
        GraphQLModule,
        ChartTitleModule,
        RaisedByIndustryBarModule,
        DetailsContributionsByOccupationHeaderModule], providers: [ContributionsGroupedByOccupationGQLQuery, provideHttpClient(withInterceptorsFromDi())] })
export class ContributionsByOccupationChartGQLModule { }
