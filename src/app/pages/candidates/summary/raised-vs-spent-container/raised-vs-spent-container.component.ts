import { Component, Input, } from '@angular/core';

@Component({
    selector: 'raised-vs-spent-container',
    templateUrl: './raised-vs-spent-container.component.html',
    styleUrls: ['./raised-vs-spent-container.component.scss'],
    standalone: false
})
export class RaisedVsSpentContainerComponent {
  @Input() candidateId: number;

  title = 'Raised v. Spent';
  tooltipText = 'Total campaign funds raised and spent by the candidate.';

}
