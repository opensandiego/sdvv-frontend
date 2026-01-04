
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CandidateDetailsHeaderGQLComponent } from 'src/app/graphql/candidate-details-header-gql/candidate-details-header-gql.component';
import { DetailsTabRaisedVSpentComponent } from '../tabs/raised-spent/details-tab-raised-v-spent/details-tab-raised-v-spent.component';
import { ContributionsByOccupationTabComponent } from '../tabs/contributions-by-occupation/contributions-by-occupation-tab.component';
import { ContributionsByLocationTabComponent } from '../tabs/contributions-by-location/contributions-by-location-tab.component';

@Component({
  selector: 'candidate-details-container',
  imports: [
    MatTooltipModule,
    MatTabsModule,
    RouterModule,
    CandidateDetailsHeaderGQLComponent,
    DetailsTabRaisedVSpentComponent,
    ContributionsByOccupationTabComponent,
    ContributionsByLocationTabComponent
],
  templateUrl: './candidate-details-container.component.html',
  styles: [
    `
      .candidate-details {
        padding: 20px 20px;
        margin: 0em;

        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class CandidateDetailsContainerComponent {
  @Input() candidateId: string;
}
