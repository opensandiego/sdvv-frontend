import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { CandidateDataService } from '../../services/candidate-data.service';
import type { RaisedVsSpent } from '../../vv-charts/interfaces/raisedVsSpent';
import type { DonationsByGroup } from '../../vv-charts/interfaces/donationsByGroup';
import type { RaisedInOut } from '../../vv-charts/interfaces/raisedInOut';
import type { OutsideMoney } from '../../vv-charts/interfaces/outsideMoney';
import type { CandidateCard } from '../../interfaces/candidateCard';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CandidateQuickViewService } from 'src/app/store/services/candidate.quickview.service';


@Component({
  selector: 'app-expanded-quick-view',
  templateUrl: './expanded-quick-view.component.html',
  styleUrls: ['./expanded-quick-view.component.scss']
})
export class ExpandedQuickViewComponent implements OnChanges {
  @Input() candidateId: string;
  @Output() isExpanded = new EventEmitter<boolean>();

  public candidateCard: CandidateCard;
  public raisedVsSpentData: RaisedVsSpent;
  public donationsByGroupData: DonationsByGroup;
  public raisedInOutData: RaisedInOut;
  public outsideMoneyData: OutsideMoney;

  faTimesCircle = faTimesCircle;

  constructor(
    private candidateDataService: CandidateDataService,
    private router: Router,
    private candidateQuickViewService: CandidateQuickViewService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void  {

    if (changes['candidateId']) {
      let candidateId = changes['candidateId'].currentValue;

      this.candidateQuickViewService.getCandidate(candidateId)
        .subscribe( quickView => {
          console.log('quickView', quickView);

          this.raisedVsSpentData = {
            id: quickView.raisedVsSpent.id,
            raised: parseInt(quickView.raisedVsSpent.raised),
            spent: parseInt(quickView.raisedVsSpent.spent),
            averageDonation: parseInt(quickView.raisedVsSpent.averageDonation),
          }
        });
  
      // this.candidateDataService.getRaisedVsSpentChart(candidateId)
      //   .subscribe( results => this.raisedVsSpentData = results);

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

  showFullDetailsClicked( candidateId ) {
    this.router.navigate([`/under-construction`]);
  }

  close() {
    this.isExpanded.emit(false);
  }

}
