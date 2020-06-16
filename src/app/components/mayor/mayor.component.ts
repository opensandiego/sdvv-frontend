import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../candidate';
import { CandidateCardComponent } from '../candidate-card/candidate-card.component';

@Component({
  selector: 'app-mayor',
  templateUrl: './mayor.component.html',
  styleUrls: ['./mayor.component.scss']
})
export class MayorComponent implements OnInit {
  candidate: Candidate;
  isExpanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getCandidate(candidate: Candidate) {
    this.candidate = candidate;
    this.isExpanded = !this.isExpanded
  }

  onClose(event: boolean) {
    this.isExpanded = event;
  }

}
