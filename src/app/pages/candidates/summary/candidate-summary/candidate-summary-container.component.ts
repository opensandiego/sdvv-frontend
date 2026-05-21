import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { GraphQLModule } from 'src/app/graphql/graphql.module';
import { CandidateCardGQLComponent } from 'src/app/graphql/candidate-card-gql/candidate-card-gql.component';
import { RaisedVsSpentContainerModule } from '../raised-vs-spent-container/raised-vs-spent-container.module';
import { ContributionsByOccupationContainerModule } from '../contributions-by-occupation-container/contributions-by-occupation-container.module';
import { RaisedInVsOutContainerModule } from '../raised-in-vs-out-container/raised-in-vs-out-container.module';
import { IndependentExpendituresV3ContainerComponent } from '../../../../components/independent-expenditures-v3-container/independent-expenditures-v3-container.component';

@Component({
  selector: 'candidate-summary-container',
  imports: [
    FontAwesomeModule,
    RouterModule,
    GraphQLModule,
    CandidateCardGQLComponent,
    RaisedVsSpentContainerModule,
    ContributionsByOccupationContainerModule,
    RaisedInVsOutContainerModule,
    IndependentExpendituresV3ContainerComponent,
  ],
  templateUrl: './candidate-summary-container.component.html',
  styleUrls: ['./candidate-summary-container.component.scss'],
})
export class CandidateSummaryContainerComponent {
  @Input() candidateId!: string;

  faTimesCircle = faTimesCircle;
  faArrowLeft = faArrowLeft;
}
