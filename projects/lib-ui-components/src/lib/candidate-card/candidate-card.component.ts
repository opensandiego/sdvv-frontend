import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CandidateInfo, CommitteeData } from '../lib-ui-components.models';

@Component({
  selector: 'candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent {
  @Input()
  set candidateInfo(candidateInfo: CandidateInfo) {
    if (!candidateInfo) { return; }

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
    if (!committeeData) { return; }

    this.raised = committeeData?.raised;
    this.donors = committeeData?.donors;
  }

  @Input()
  set inExpandedCard(inExpandedCard: boolean) {
    this.buttonText = (inExpandedCard) ? 'See Full Details' : 'See Details';
  }

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

  buttonText: string;

  selectCandidate(id: string) {
    this.emitCandidateId.emit(id ? id : this.candidateId);
  }
}
