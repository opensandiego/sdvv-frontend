import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../candidate';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {
  candidate: Candidate = {
    name: 'John Jones',
    title: 'Former Fire Fighter and Active Reservist',
    raised: 150000,
    donors: 3250
  }
  constructor() { }

  ngOnInit() {
  }

}
