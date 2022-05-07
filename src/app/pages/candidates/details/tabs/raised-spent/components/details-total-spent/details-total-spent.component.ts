import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { faMoneyBillWave, faHandHoldingUsd, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { DetailsTotalSpent, DetailsTotalSpentGQLQuery } from './details-total-spent-gql.query';
import { spendingCodes } from './spending-codes';

@Component({
  selector: 'details-total-spent',
  templateUrl: './details-total-spent.component.html',
  styleUrls: ['./details-total-spent.component.scss']
})
export class DetailsTotalSpentComponent implements OnInit {
  @Input() candidateId: string;

  title = "Total Spent";
  tooltipText = 'Placeholder tooltip text.';
  colors = ['#800000', '#b30000', '#cc0000', '#ff0000', '#ff9999'];

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

      this.categoriesCombined = expenseCodes.map((expense, i) => ({
        id: i.toString(),
        code: expense.code,
        name: expense.code ? this.getSpendingCodeDescription(expense.code) : 'not categorized',
        value: expense.sum,
        percent: expense.percent,
        color: i < this.colors.length ? this.colors[i] : 'red',
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