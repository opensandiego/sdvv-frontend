import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedPipesModule } from '../shared/shared-pipes.module';

@Component({
  selector: 'candidate-details-header',
  imports: [CommonModule, FontAwesomeModule, SharedPipesModule],
  templateUrl: './candidate-details-header.component.html',
  styleUrls: ['./candidate-details-header.component.scss'],
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
  @Input() donationsTextColor?: string = 'black';

  public defaultImagePath = 'assets/candidate-card/profile.png';

  faLink = faLink;

  constructor() {}
}
