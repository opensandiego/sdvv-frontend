import { Component, Input } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'candidate-summary-container',
  templateUrl: './candidate-summary-container.component.html',
  styleUrls: ['./candidate-summary-container.component.scss']
})
export class CandidateSummaryContainerComponent {
  @Input() candidateId: string;

  faTimesCircle = faTimesCircle;
}
