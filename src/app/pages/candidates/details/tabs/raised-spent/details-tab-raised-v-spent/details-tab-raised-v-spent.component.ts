import { Component, Input } from '@angular/core';
import { DetailsRaisedSpentSummaryComponent } from '../components/details-raised-spent-summary/details-raised-spent-summary.component';
import { DetailsTotalRaisedComponent } from '../components/details-total-raised/details-total-raised.component';
import { DetailsTotalSpentComponent } from '../components/details-total-spent/details-total-spent.component';

@Component({
  selector: 'details-tab-raised-v-spent',
  imports: [
    DetailsTotalRaisedComponent,
    DetailsTotalSpentComponent,
    DetailsRaisedSpentSummaryComponent,
  ],
  templateUrl: './details-tab-raised-v-spent.component.html',
  styleUrls: ['./details-tab-raised-v-spent.component.scss'],
})
export class DetailsTabRaisedVSpentComponent {
  @Input() candidateId: string;
}
