import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsTabTitleModule } from 'projects/lib-ui-components/src/public-api';
import { ContributionsByOccupationTabComponent } from './contributions-by-occupation-tab.component';
import { ContributionsByOccupationChartGQLModule } from 'src/app/graphql/details/details-contributions-by-occupation/details-contributions-by-occupation-chart-gql.module';


@NgModule({
  declarations: [
    ContributionsByOccupationTabComponent,
  ],
  imports: [
    CommonModule,
    ContributionsByOccupationChartGQLModule,
    DetailsTabTitleModule,
  ],
  exports: [
    ContributionsByOccupationTabComponent,
  ],
})
export class CandidateDetailsTabContributionsByOccupationContainerModule { }
