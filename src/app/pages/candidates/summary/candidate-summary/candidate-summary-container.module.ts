import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CandidateCardGQLModule } from 'src/app/graphql/candidate-card-gql/candidate-card-gql.module';
import { RaisedVsSpentContainerModule } from '../raised-vs-spent-container/raised-vs-spent-container.module';
import { ContributionsByOccupationContainerModule } from '../contributions-by-occupation-container/contributions-by-occupation-container.module';
import { RaisedInVsOutContainerModule } from '../raised-in-vs-out-container/raised-in-vs-out-container.module';
import { IndependentExpendituresV2ContainerComponent } from '../independent-expenditures-v2-container/independent-expenditures-v2-container.component';
import { CandidateSummaryContainerComponent } from './candidate-summary-container.component';


@NgModule({
  declarations: [
    CandidateSummaryContainerComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    FontAwesomeModule,
    RouterModule,

    CandidateCardGQLModule,
    RaisedVsSpentContainerModule,
    ContributionsByOccupationContainerModule,
    RaisedInVsOutContainerModule,
    IndependentExpendituresV2ContainerComponent,
  ],
  exports: [
    CandidateSummaryContainerComponent,
  ],
})
export class CandidateSummaryContainerModule { }
