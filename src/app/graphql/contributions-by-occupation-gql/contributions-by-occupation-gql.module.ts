import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphQLModule } from '../graphql.module';
import { ChartTitleModule, ContributionsByOccupationTableModule } from 'lib-ui-components';
import { ContributionsByOccupationGQLComponent } from './contributions-by-occupation-table-gql/contributions-by-occupation-table-gql.component';
import { ContributionsGroupedByOccupationGQL } from './contributions-by-occupation-table-gql/contributions-by-occupation-gql.query';
import { ContributionsByOccupationContainerComponent } from './contributions-by-occupation-container/contributions-by-occupation-container.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    ContributionsByOccupationTableModule,
    ChartTitleModule,
  ],
  declarations: [
    ContributionsByOccupationGQLComponent,
    ContributionsByOccupationContainerComponent,
  ],  
  providers: [ ContributionsGroupedByOccupationGQL ], 
  exports: [ ContributionsByOccupationGQLComponent, ContributionsByOccupationContainerComponent ],
  bootstrap: []
})
export class ContributionsByOccupationGQLModule { }
