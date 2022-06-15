import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faMoneyBillWave, faHandHoldingUsd, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DetailsTotalSpent, DetailsTotalSpentGQLQuery } from './details-total-spent-gql.query';
import { spendingCodes } from './spending-codes';
import { globals } from 'src/app/globals';

@Component({
  selector: 'details-total-spent',
  templateUrl: './details-total-spent.component.html',
  styleUrls: ['./details-total-spent.component.scss']
})
export class DetailsTotalSpentComponent implements OnInit, OnChanges {
  @Input() candidateId: string;

  title = "Total Spent";
  tooltipText = 'Placeholder tooltip text.';
  totalSpentTextColor = globals.expendituresInSupportColor;
  colors = [
    globals.expendituresInSupportColor,
    globals.expendituresInSupportAltColor,
    globals.expendituresInSupportAlt2Color,
  ];

  cashInHand: number = 0;
  loansAndDebts: number = 0;
  totalSpent: number;
  totalSpentFormatted: string;

  categoriesCombined: any[];
  hoveredCategory: string = null;

  faMoneyBillWave = faMoneyBillWave;
  faHandHoldingUsd = faHandHoldingUsd;
  faQuestionCircle = faQuestionCircle;

  spendingMap;

  constructor(
    private detailsTotalSpentGQLQuery: DetailsTotalSpentGQLQuery,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId);
    }
  }

  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) { return; }

    this.detailsTotalSpentGQLQuery.watch({
      candidateId: this.candidateId,
      limit: 5,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: DetailsTotalSpent = result.data;

      const expenses = response?.candidate?.committee?.expenses;
      const expenseCodes = expenses.groupBy.expenseByCode;

      /**
       * Determine the minimum number of colors to use in the donut chart so 
       * that two adjoining slices do not use the same color. If the length of
       * expenseCodes is even then use two colors otherwise use three. 
       */
      const minimumColorCount = expenseCodes.length % 2 === 0? 2: 3;

      this.categoriesCombined = expenseCodes.map((expense, i) => ({
        id: i.toString(),
        code: expense.code,
        name: expense.code ? this.getSpendingCodeDescription(expense.code) : 'not categorized',
        value: expense.sum,
        percent: expense.percent,
        color: this.colors[i % minimumColorCount],
      }));

      this.totalSpent = expenses.sum;
      this.totalSpentFormatted = this.totalSpent
        .toLocaleString('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0});

      // this.cashInHand = parseInt(response.cashOnHand);
      // this.loansAndDebts = parseInt(response.loansAndDebts);
    });
  }

  getSpendingCodeDescription(spendingCode: string): string {
    return `${spendingCode}: ` + this.spendingMap.get(spendingCode);
  }

  ngOnInit(): void {
    this.spendingMap = new Map(spendingCodes);
  }

  categoryHoveredOver(category){
    this.hoveredCategory = category;
  }

}
