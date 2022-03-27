import { Component, Input } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'candidate-details-container',
  templateUrl: './candidate-details-container.component.html',
  styleUrls: ['./candidate-details-container.component.scss']
})
export class CandidateDetailsContainerComponent {
  @Input() candidateId: string;

  faTimesCircle = faTimesCircle;
}
