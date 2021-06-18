import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Candidate } from '../../candidate';

import { CandidateDataService } from '../../services/candidate-data.service';
import { RaisedVsSpent } from '../../vv-charts/interfaces/raisedVsSpent';
import { RaisedInOut } from '../../vv-charts/interfaces/raisedInOut';
import { OutsideMoney } from '../../vv-charts/interfaces/outsideMoney';

import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-candidate-card-expanded',
  templateUrl: './candidate-card-expanded.component.html',
  styleUrls: ['./candidate-card-expanded.component.scss']
})
export class CandidateCardExpandedComponent implements OnChanges {
  @Input() candidateImg: string;
  @Input() candidateId: string;
  @Input() set candidate(c: Candidate) {
    this._c = c;
  }
  get candidate() {
    return this._c;
  }
  @Output() isExpanded = new EventEmitter<boolean>();

  public _c: Candidate;
  
  public raisedVsSpentData: RaisedVsSpent;
  public raisedInOutData: RaisedInOut;
  public outsideMoneyData: OutsideMoney;

  faQuestionCircle = faQuestionCircle;
  faTimesCircle = faTimesCircle;

  constructor(
    private candidateDataService: CandidateDataService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['candidateId']) {
      let candidateId = changes['candidateId'].currentValue;

      this.candidateDataService.getRaisedVsSpentChart(candidateId)
        .subscribe( results => this.raisedVsSpentData = results);

      this.candidateDataService.getRaisedInOutChart(candidateId)
        .subscribe( results => this.raisedInOutData = results);

      this.candidateDataService.getOutsideMoneyChart(candidateId)
        .subscribe( results => this.outsideMoneyData = results);
    }
  }

  // Convert Currency String to Number
  currencyToNumber(currencyString: string) {
    return Number(currencyString.replace(/[^0-9\.-]+/g,""))
  }

  close() {
    this.isExpanded.emit(false);
  }
}
