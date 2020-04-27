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
    donors: 3250,
    spent: 125000,
    donationAvg: 200,
    donationTech: 200000,
    donationFinance: 200000,
    donationEnergy: 200000,
    donationConstruction: 200000,
    donationOther: 200000,
    inDistrict: 500000,
    outDistrict: 1000,
    oppose: 5000,
    support: 200000,
  }
  
  constructor() { }

  ngOnInit() {
  }

  outputCandidateData() {
    this.emitCandidateData.emit(this.candidate);
  }

}
