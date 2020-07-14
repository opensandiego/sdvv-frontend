import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../candidate';
import { CandidateService } from '../../services/candidate.service';
import { CandidateCardComponent } from '../candidate-card/candidate-card.component';

@Component({
  selector: 'app-mayor',
  templateUrl: './mayor.component.html',
  styleUrls: ['./mayor.component.scss']
})
export class MayorComponent implements OnInit {
  candidate: Candidate;
  candidateImg: string;
  isExpanded: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getMayorData().subscribe(res => console.log(res))
  }

  getCandidate(candidate: Candidate) {
    this.candidate = candidate;
    this.isExpanded = true;
  }

  getCandidateImg(img: string) {
    this.candidateImg = img;
  }

  onClose(event: boolean) {
    this.isExpanded = event;
  }

}
