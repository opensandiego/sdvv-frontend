import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphQLModule } from '../../graphql.module';
import { ChartTitleModule, DetailsContributionsByOccupationHeaderModule } from 'lib-ui-components';
import { RaisedByIndustryBarModule } from 'lib-ui-charts';
import { ContributionsGroupedByOccupationGQLQuery } from './details-contributions-by-occupation-table-gql/details-contributions-by-occupation-gql.query';
import { DetailsContributionsByOccupationGQLComponent } from './details-contributions-by-occupation-table-gql/details-contributions-by-occupation-gql.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    ChartTitleModule,
    RaisedByIndustryBarModule,
    DetailsContributionsByOccupationHeaderModule,
  ],
  declarations: [
    DetailsContributionsByOccupationGQLComponent,
  ],
  providers: [ ContributionsGroupedByOccupationGQLQuery ], 
  exports: [ 
    DetailsContributionsByOccupationGQLComponent,
  ],
  bootstrap: []
})
export class ContributionsByOccupationChartGQLModule { }
