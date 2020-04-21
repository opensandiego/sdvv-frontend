import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Candidate } from '../../candidate';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {
  @Output() private emitCandidateData = new EventEmitter<Candidate>();
  
  candidate: Candidate = {
    name: 'John Jones',
    title: 'Former Fire Fighter and Active Reservist',
    raised: 150000,
    donors: 3250
  }
  
  constructor() { }

  ngOnInit() {
  }

  outputCandidateData() {
    this.emitCandidateData.emit(this.candidate);
  }

}
