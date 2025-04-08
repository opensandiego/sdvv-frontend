import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  DetailsContainerOutsideMoneyComponent,
  IndependentCommittees,
} from '../details-outside-money/details-container-outside-money.component';
import {
  OutsideMoney,
  OutsideMoneyGQLQuery,
} from './details-outside-money-gql.query';
import { globals } from 'src/app/globals';
import { DetailsTabTitleComponent } from 'lib-ui-components';

@Component({
  selector: 'details-tab-outside-money',
  imports: [DetailsTabTitleComponent, DetailsContainerOutsideMoneyComponent],
  template: `
    <div class="tab-outside-money">
      <details-tab-title
        [smallTitleText]="title.top"
        [largeTitleText]="title.bottom"
        [tooltipText]="title.tooltipText"
      ></details-tab-title>

      <details-outside-money
        [oppositionCommittees]="oppositionCommittees"
        [supportCommittees]="supportCommittees"
      ></details-outside-money>
    </div>
  `,
  styles: [
    `
      .tab-outside-money {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 15px;
        margin: 10px;
      }
    `,
  ],
})
export class DetailsTabOutsideMoneyComponent implements OnChanges {
  @Input() candidateId: string;

  oppositionCommittees: IndependentCommittees[];
  supportCommittees: IndependentCommittees[];

  opposeShades = [
    globals.expendituresInOppositionColor,
    globals.expendituresInOppositionAltColor,
  ];

  supportShades = [
    globals.expendituresInSupportColor,
    globals.expendituresInSupportAltColor,
  ];

  title = {
    top: 'Independent Expenditures',
    bottom: 'By Outside Money',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Outside Money!',
  };

  constructor(private outsideMoneyGQLQuery: OutsideMoneyGQLQuery) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId);
    }
  }

  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) {
      return;
    }

    this.outsideMoneyGQLQuery
      .watch(
        {
          candidateId: this.candidateId,
        },
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const response: OutsideMoney = result.data;
        const committees =
          response?.candidate?.independentExpenditures?.committees;
        const supportSum =
          response?.candidate?.independentExpenditures?.sums.support;
        const opposeSum =
          response?.candidate?.independentExpenditures?.sums.oppose;

        this.supportCommittees = committees.support?.map(
          (committee, index) => ({
            id: `${committee.committee.id}${index}`,
            name: committee.committee.name,
            value: committee.sum,
            percent: (committee.sum / supportSum) * 100.0,
            color: `${this.supportShades[index % 2]}`,
          })
        );

        this.oppositionCommittees = committees.oppose?.map(
          (committee, index) => ({
            id: `${committee.committee.id}${index}`,
            name: committee.committee.name,
            value: committee.sum,
            percent: (committee.sum / opposeSum) * 100.0,
            color: `${this.opposeShades[index % 2]}`,
          })
        );
      });
  }
}
