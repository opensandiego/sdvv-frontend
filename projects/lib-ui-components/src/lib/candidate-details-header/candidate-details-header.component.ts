import { Component, Input } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'candidate-details-header',
  templateUrl: './candidate-details-header.component.html',
  styleUrls: ['./candidate-details-header.component.scss']
})
export class CandidateDetailsHeaderComponent {
  @Input() candidateId?: string;

  @Input() imageUrl: string;
  @Input() candidateName: string;
  @Input() description: string;
  @Input() website: string;

  @Input() raised: number;
  @Input() donors: number;
  @Input() averageDonation: number;

  public defaultImagePath = 'assets/candidate-card/profile.png';

  faLink = faLink;

  constructor(
  ) { }
}
