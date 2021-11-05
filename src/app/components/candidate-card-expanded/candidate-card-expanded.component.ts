import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { CandidateDataService } from '../../services/candidate-data.service';
import type { RaisedVsSpent } from '../../vv-charts/interfaces/raisedVsSpent';
import type { DonationsByGroup } from '../../vv-charts/interfaces/donationsByGroup';
import type { RaisedInOut } from '../../vv-charts/interfaces/raisedInOut';
import type { OutsideMoney } from '../../vv-charts/interfaces/outsideMoney';
import type { CandidateCard } from '../../interfaces/candidateCard';

import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-candidate-card-expanded',
  templateUrl: './candidate-card-expanded.component.html',
  styleUrls: ['./candidate-card-expanded.component.scss']
})
export class CandidateCardExpandedComponent implements OnChanges {
  @Input() candidateId: string;
  @Output() isExpanded = new EventEmitter<boolean>();

  public raisedVsSpentData: RaisedVsSpent;
  public donationsByGroupData: DonationsByGroup;
  public raisedInOutData: RaisedInOut;
  public outsideMoneyData: OutsideMoney;
  public candidateCard: CandidateCard;

  faQuestionCircle = faQuestionCircle;
  faTimesCircle = faTimesCircle;

  constructor(
    private candidateDataService: CandidateDataService,
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['candidateId']) {
      let candidateId = changes['candidateId'].currentValue;

      this.candidateDataService.getRaisedVsSpentChart(candidateId)
        .subscribe( results => this.raisedVsSpentData = results);

      this.candidateDataService.getDonationsByGroupChart(candidateId)
        .subscribe( results => this.donationsByGroupData = results);  

      this.candidateDataService.getRaisedInOutChart(candidateId)
        .subscribe( results => this.raisedInOutData = results);

      this.candidateDataService.getOutsideMoneyChart(candidateId)
        .subscribe( results => this.outsideMoneyData = results);

      this.candidateDataService.getCandidateCard(candidateId)
        .subscribe( results => this.candidateCard = results);
    }
  }

  // Convert Currency String to Number
  currencyToNumber(currencyString: string) {
    return Number(currencyString.replace(/[^0-9\.-]+/g,""))
  }

  showFullDetailsClicked( candidateId ) {
    this.router.navigate([`/under-construction`]);
  }

  close() {
    this.isExpanded.emit(false);
  }
}
