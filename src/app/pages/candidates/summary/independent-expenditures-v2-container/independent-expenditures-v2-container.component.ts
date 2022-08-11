import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatDividerModule } from '@angular/material/divider';
import { ChartTitleModule } from "lib-ui-components";
import { GraphQLModule } from "src/app/graphql/graphql.module";
import { OutsideMoney, OutsideMoneyGQLQuery } from "./details-outside-money-gql.query";
import { IndependentCommittees, IndependentExpendituresV2Component } from "../independent-expenditures-v2/independent-expenditures-v2.component";
import { globals } from "src/app/globals";

@Component({
  standalone: true,
  selector: 'independent-expenditures-v2-container',
  imports: [
    MatDividerModule,
    ChartTitleModule,
    GraphQLModule,
    IndependentExpendituresV2Component,
  ],
  template: `
    <mat-divider></mat-divider>

    <div class="outside-money-container">
      <chart-title
        [titleText]="title"

        [tooltipText]="tooltipText"

      ></chart-title>

      <independent-expenditures-v2
        [oppositionCommittees]="oppositionCommittees"
        [supportCommittees]="supportCommittees"
      ></independent-expenditures-v2>
    </div>
  `,
  styleUrls: ['./independent-expenditures-v2-container.component.scss'],
})
export class IndependentExpendituresV2ContainerComponent implements OnChanges {
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

  title = 'Outside Money / Independent Expenditures';
  tooltipText = 'Amount of money spent by other committees to support or oppose a candidate.';
  textColor = 'white';
  backgroundColor = '#dcdcdc';

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
        color: `${this.supportShades[index % 2]}`,
      }));

      this.oppositionCommittees = committees.oppose?.map((committee, index) => ({
        id: `${committee.committee.id}${index}`,
        name: committee.committee.name,
        value: committee.sum,
        percent: committee.sum / opposeSum * 100.0,
        color: `${this.opposeShades[index % 2]}`,
      }));
    });
  }

}
