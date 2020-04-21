import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from '../../candidate';

@Component({
  selector: 'app-candidate-card-expanded',
  templateUrl: './candidate-card-expanded.component.html',
  styleUrls: ['./candidate-card-expanded.component.scss']
})
export class CandidateCardExpandedComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor() { }

  ngOnInit() {
    console.log(this.candidate)
  }

}
