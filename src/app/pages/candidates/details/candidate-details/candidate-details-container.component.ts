import { Component, Input } from '@angular/core';

@Component({
    selector: 'candidate-details-container',
    templateUrl: './candidate-details-container.component.html',
    styleUrls: ['./candidate-details-container.component.scss'],
    standalone: false
})
export class CandidateDetailsContainerComponent {
  @Input() candidateId: string;
}
