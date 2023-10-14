import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsTabTitleModule } from 'lib-ui-components';
import { DetailsContributionsByLocationGQLModule } from 'src/app/graphql/details/details-contributions-by-location/details-contributions-by-location-gql.module';
import { ContributionsByLocationTabComponent } from './contributions-by-location-tab.component';

@NgModule({
  declarations: [
    ContributionsByLocationTabComponent,
  ],
  imports: [
    CommonModule,
    DetailsContributionsByLocationGQLModule,
    DetailsTabTitleModule,
  ],
  exports: [
    ContributionsByLocationTabComponent,
  ],
})
export class CandidateDetailsTabContributionsByLocationModule { }
