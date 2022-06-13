import { Component, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { IndependentCommittees } from '../details-outside-money/details-container-outside-money.component';
import { OutsideMoney, OutsideMoneyGQLQuery } from './details-outside-money-gql.query';

@Component({
  selector: 'details-tab-outside-money',
  templateUrl: './details-tab-outside-money.component.html',
  styleUrls: ['./details-tab-outside-money.component.scss']
})
export class DetailsTabOutsideMoneyComponent implements OnChanges {
  @Input() candidateId: string;

  oppositionCommittees: IndependentCommittees[];
  supportCommittees: IndependentCommittees[];

  oppositionColor = '#6964AD';
  supportColor = '#3392FF';

  title = {
    top: 'Independent Expenditures',
    bottom: 'By Outside Money',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Outside Money!',
  };

  constructor(private outsideMoneyGQLQuery: OutsideMoneyGQLQuery) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId);
    }
  }

  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) { return; }

    this.outsideMoneyGQLQuery.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: OutsideMoney = result.data;
      const committees = response?.candidate?.independentExpenditures?.committees;
      const supportSum = response?.candidate?.independentExpenditures?.sums.support;
      const opposeSum = response?.candidate?.independentExpenditures?.sums.oppose;

      this.supportCommittees = committees.support?.map((committee, index) => ({
        id: `${committee.committee.id}${index}`,
        name: committee.committee.name,
        value: committee.sum,
        percent: committee.sum / supportSum * 100.0,
        color: this.supportColor,
      }));

      this.oppositionCommittees = committees.oppose?.map((committee, index) => ({
        id: `${committee.committee.id}${index}`,
        name: committee.committee.name,
        value: committee.sum,
        percent: committee.sum / opposeSum * 100.0,
        color: this.oppositionColor,
      }));
    });
  }
}
