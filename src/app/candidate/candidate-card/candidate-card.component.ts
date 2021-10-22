import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CandidateService } from 'src/app/store/services/candidate.service';
import { Candidate } from 'src/app/store/interfaces/candidate';

@Component({
  selector: 'candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})

export class CandidateCardComponent implements OnChanges {
  @Input() candidateId: string;
  @Input() inExpandedCard?: boolean;
  @Output() private emitCandidateId = new EventEmitter<any>();

  private defaultImagePath = 'assets/candidate-card/profile.png';

  candidateImg: string;
  firstName: string;
  lastName: string;
  fullName: string;
  description: string;
  raised: number;
  donors: number;
  website: string;

  buttonText: string;

  constructor(
    private candidateService: CandidateService,
  ) { }

  private setCandidate(candidate: Candidate): void {
    this.candidateImg = candidate.image_url 
      ? candidate.image_url
      : this.defaultImagePath;
    this.firstName = candidate.full_name.split(' ')[0];
    this.lastName = candidate.full_name.slice(this.firstName.length+1);
    this.fullName = candidate.full_name;
    this.description = candidate.description;
    this.raised = parseInt(candidate.total_contributions);
    this.donors = parseInt(candidate.contributor_count);
    this.website = candidate.website;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['candidateId']) {
      this.candidateService.getCandidate(changes['candidateId'].currentValue)
        .subscribe(candidate => this.setCandidate(candidate));
    }

    this.buttonText = (this.inExpandedCard) ? 'See Full Details' : 'See Details';
  }

  selectCandidate() {
    this.emitCandidateId.emit(this.candidateId);
  }
}
