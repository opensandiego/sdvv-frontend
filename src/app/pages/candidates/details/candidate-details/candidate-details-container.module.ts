import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

import { CandidateDetailsHeaderGQLModule } from 'src/app/graphql/candidate-details-header-gql/candidate-details-header-gql.module';
import { CandidateDetailsModule } from 'src/app/candidate-details/candidate-details.module';
import { DetailsRaisedSpentModule } from 'src/app/details-raised-spent/details-raised-spent.module';
import { CandidateDetailsContainerComponent } from './candidate-details-container.component';
import { CandidateDetailsTabContributionsByOccupationContainerModule } from '../tabs/contributions-by-occupation/contributions-by-occupation-tab.module';

@NgModule({
  declarations: [
    CandidateDetailsContainerComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatTabsModule,
    RouterModule,

    CandidateDetailsHeaderGQLModule,
    CandidateDetailsModule,
    DetailsRaisedSpentModule,
    CandidateDetailsTabContributionsByOccupationContainerModule,
  ],
  exports: [
    CandidateDetailsContainerComponent,
  ],
})
export class CandidateDetailsContainerModule { }
