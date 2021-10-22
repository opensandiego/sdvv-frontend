import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import type { RaisedVsSpent } from '../../vv-charts/interfaces/raisedVsSpent';
import type { DonationsByGroup } from '../../vv-charts/interfaces/donationsByGroup';
import type { RaisedInOut } from '../../vv-charts/interfaces/raisedInOut';
import type { OutsideMoney } from '../../vv-charts/interfaces/outsideMoney';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CandidateQuickViewService } from 'src/app/store/services/candidate.quickview.service';
import { CandidateQuickView } from 'src/app/store/interfaces/candidate.quickview';


@Component({
  selector: 'app-expanded-quick-view',
  templateUrl: './expanded-quick-view.component.html',
  styleUrls: ['./expanded-quick-view.component.scss']
})
export class ExpandedQuickViewComponent implements OnChanges {
  @Input() candidateId: string;
  @Output() isExpanded = new EventEmitter<boolean>();

  public raisedVsSpentData: RaisedVsSpent;
  public donationsByGroupData: DonationsByGroup;
  public raisedInOutData: RaisedInOut;
  public outsideMoneyData: OutsideMoney;

  faTimesCircle = faTimesCircle;

  constructor(
    private router: Router,
    private candidateQuickViewService: CandidateQuickViewService,
  ) { }
  
  private setQuickView(quickView: CandidateQuickView): void {
    this.raisedVsSpentData = {
      id: quickView.raisedVsSpent.id,
      raised: parseInt(quickView.raisedVsSpent.raised),
      spent: parseInt(quickView.raisedVsSpent.spent),
      averageDonation: parseInt(quickView.raisedVsSpent.averageDonation),
    };

    this.donationsByGroupData = {
      id: quickView.donationsByGroupData.id,
      groups: quickView.donationsByGroupData.groups.map(group => ({
        ...group,
        amount: parseInt(group.amount),
        percent: parseInt(group.percent),
      }))
    };
    
    this.raisedInOutData = {
      ...quickView.raisedInOut,
      inside: parseInt(quickView.raisedInOut.inside),
      outside: parseInt(quickView.raisedInOut.outside),
    };

    this.outsideMoneyData = {
      ...quickView.outsideMoney,
      support: parseInt(quickView.outsideMoney.support),
      oppose: parseInt(quickView.outsideMoney.oppose),
      scale: quickView.outsideMoney.scale ? parseInt(quickView.outsideMoney.scale) : 1,
    };
  }

  ngOnChanges(changes: SimpleChanges): void  {

    if (changes['candidateId'] && changes['candidateId'].currentValue) {
      let candidateId = changes['candidateId'].currentValue;

      this.candidateQuickViewService.getCandidate(candidateId)
        .subscribe( quickView => {
          this.setQuickView(quickView);
        });
    }
  }

  showFullDetailsClicked( candidateId ) {
    this.router.navigate([`/under-construction`]);
  }

  close() {
    this.isExpanded.emit(false);
  }

}
