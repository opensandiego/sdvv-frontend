import { Component, Input } from '@angular/core';

@Component({
  selector: 'details-tab-raised-v-spent',
  templateUrl: './details-tab-raised-v-spent.component.html',
  styleUrls: ['./details-tab-raised-v-spent.component.scss']
})
export class DetailsTabRaisedVSpentComponent {
  @Input() candidateId: string;
}
