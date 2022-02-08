import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

export interface CandidateInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  description?: string;
  website?: string;
  imageUrl?: string;
}

export interface CommitteeData {
  raised?: number;
  donors?: number;
}

@Component({
  selector: 'candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnChanges {
  @Input()
  set candidateInfo(candidateInfo: CandidateInfo) {
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

  constructor( ) { }

  ngOnChanges(changes: SimpleChanges) { }

  selectCandidate(id: string) {
    this.emitCandidateId.emit(id ? id : this.candidateId);
  }
}
