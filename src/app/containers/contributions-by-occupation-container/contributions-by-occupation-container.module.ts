import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartTitleModule, ContributionsByOccupationTableModule } from 'lib-ui-components';
import { ContributionsByOccupationContainerComponent } from './contributions-by-occupation-container.component';
import { ContributionsByOccupationGQLModule } from 'src/app/graphql/contributions-by-occupation-gql/contributions-by-occupation-gql.module';

@NgModule({
  imports: [
    CommonModule,
    ContributionsByOccupationGQLModule,
    ContributionsByOccupationTableModule,
    ChartTitleModule,
  ],
  declarations: [
    ContributionsByOccupationContainerComponent,
  ],
  providers: [ ], 
  exports: [ ContributionsByOccupationContainerComponent ],
  bootstrap: []
})
export class ContributionsByOccupationContainerModule { }
