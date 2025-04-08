import { Component, Input } from '@angular/core';
import { ChartTitleComponent } from 'lib-ui-components';
import { AverageDonationGQLComponent } from 'src/app/graphql/raised-vs-spent-gql/average-donation-gql/average-donation-gql.component';
import { RaisedVsSpentBarGQLComponent } from 'src/app/graphql/raised-vs-spent-gql/raised-vs-spent-bar-gql/raised-vs-spent-bar-gql.component';

@Component({
  selector: 'raised-vs-spent-container',
  imports: [
    ChartTitleComponent,
    RaisedVsSpentBarGQLComponent,
    AverageDonationGQLComponent,
  ],
  templateUrl: './raised-vs-spent-container.component.html',
  styleUrls: ['./raised-vs-spent-container.component.scss'],
})
export class RaisedVsSpentContainerComponent {
  @Input() candidateId: string;

  title = 'Raised v. Spent';
  tooltipText = 'Total campaign funds raised and spent by the candidate.';
}
