import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

// import { DetailsRaisedSpentModule } from 'src/app/details-raised-spent/details-raised-spent.module';
import { CandidateDetailsHeaderGQLModule } from 'src/app/graphql/candidate-details-header-gql/candidate-details-header-gql.module';
import { DetailsTabRaisedSpentModule } from '../tabs/raised-spent/details-raised-spent.module';
import { CandidateDetailsTabContributionsByOccupationContainerModule } from '../tabs/contributions-by-occupation/contributions-by-occupation-tab.module';
import { CandidateDetailsTabContributionsByLocationModule } from '../tabs/contributions-by-location/contributions-by-location-tab.module';
import { CandidateDetailsTabOutsideMoneyModule } from '../tabs/outside-money/outside-money-tab.module';
import { CandidateDetailsContainerComponent } from './candidate-details-container.component';

@NgModule({
  declarations: [
    CandidateDetailsContainerComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatTabsModule,
    RouterModule,
    // DetailsRaisedSpentModule,
    CandidateDetailsHeaderGQLModule,
    DetailsTabRaisedSpentModule,
    CandidateDetailsTabContributionsByOccupationContainerModule,
    CandidateDetailsTabContributionsByLocationModule,
    CandidateDetailsTabOutsideMoneyModule,
  ],
  exports: [
    CandidateDetailsContainerComponent,
  ],
})
export class CandidateDetailsContainerModule { }
