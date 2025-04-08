import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CandidateInfo, CommitteeData } from '../lib-ui-components.models';

@Component({
  selector: 'candidate-card',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
  ],
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnChanges {
  @Input()
  set candidateInfo(candidateInfo: CandidateInfo) {
    if (!candidateInfo) {
      return;
    }

    this.candidateId = candidateInfo.id;
    this.candidateImg = candidateInfo.imageUrl
      ? candidateInfo.imageUrl
      : this.defaultImagePath;
    this.firstName = candidateInfo.firstName;
    this.lastName = candidateInfo.lastName;
    this.fullName = candidateInfo.fullName;
    this.description = candidateInfo.description;
    this.website = candidateInfo.website;
  }

  @Input()
  set committeeData(committeeData: CommitteeData) {
    if (!committeeData) {
      return;
    }

    this.raised = committeeData?.raised;
    this.donors = committeeData?.donors;

    this.inSupport = committeeData?.totalInSupport;
    this.inOpposition = committeeData?.totalInOpposition;
  }

  @Input() inExpandedCard: boolean = false;
  // @Input()
  // set inExpandedCard(inExpandedCard: boolean) {
  //   this._inExpandedCard = inExpandedCard;
  //   this.buttonText = (inExpandedCard) ? 'See Full Details' : 'See Details';
  //   this.buttonLink = (inExpandedCard) ? 'details' : this.candidateId;
  // }
  // get inExpandedCard(): boolean { return this._inExpandedCard; }
  // private _inExpandedCard = false;
  @Input() inSupportTextColor: string = 'black';
  @Input() inOppositionTextColor: string = 'black';

  @Output() private emitCandidateId = new EventEmitter<string>();

  private defaultImagePath = 'assets/candidate-card/profile.png';

  // Candidate info
  candidateId: string;
  candidateImg: string = '';
  firstName: string = '';
  lastName: string = '';
  fullName: string = '';
  description: string = '';
  website: string = '';

  // Finance data
  raised: number = 0;
  donors: number = 0;
  inSupport: number = 0;
  inOpposition: number = 0;

  buttonText: string = 'See Details';
  buttonLink: string = 'details';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inExpandedCard']) {
      this.inExpandedCard = changes['inExpandedCard'].currentValue;
      this.buttonText = this.inExpandedCard
        ? 'See Full Details'
        : 'See Details';
      // this.buttonLink = (this.inExpandedCard) ? 'details' : this.candidateId;
    }
  }

  selectCandidate(id: string) {
    // this.emitCandidateId.emit(id ? id : this.candidateId);
  }
}
