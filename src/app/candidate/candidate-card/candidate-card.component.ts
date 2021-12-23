import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateCardService } from 'src/app/store/services/candidate.card.service';
import { CandidateCard } from 'src/app/store/interfaces/candidate.card';

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private candidateCardService: CandidateCardService,
  ) { }

  private setCandidate(candidate: CandidateCard): void {
    this.candidateImg = candidate.candidateImgURL 
      ? candidate.candidateImgURL
      : this.defaultImagePath;
    this.firstName = candidate.name.split(' ')[0];
    this.lastName = candidate.name.slice(this.firstName.length+1);
    this.fullName = candidate.name;
    this.description = candidate.description;
    this.raised = parseInt(candidate.raised);
    this.donors = parseInt(candidate.donors);
    this.website = candidate.website;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['candidateId']) {
      this.candidateCardService.getCandidateCard(changes['candidateId'].currentValue)
        .subscribe(candidate => this.setCandidate(candidate));
    }

    this.buttonText = (this.inExpandedCard) ? 'See Full Details' : 'See Details';
  }

  selectCandidate() {
    if (this.inExpandedCard) {
      this.router.navigate(['details'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([this.candidateId], { relativeTo: this.activatedRoute });
    }
  }
}
