import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from '../../candidate';

import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-candidate-card-expanded',
  templateUrl: './candidate-card-expanded.component.html',
  styleUrls: ['./candidate-card-expanded.component.scss']
})
export class CandidateCardExpandedComponent {
  @Input() candidateImg: string;
  @Output() isExpanded = new EventEmitter<boolean>();

  public _c: Candidate;
  faQuestionCircle = faQuestionCircle;
  faTimesCircle = faTimesCircle;

  constructor() { }

  get candidate() {
    return this._c;
  }

  @Input() set candidate(c: Candidate) {
    this._c = c;
  }

  // Convert Currency String to Number
  currencyToNumber(currencyString: string) {
    return Number(currencyString.replace(/[^0-9\.-]+/g,""))
  }

  close() {
    this.isExpanded.emit(false);
  }
}
