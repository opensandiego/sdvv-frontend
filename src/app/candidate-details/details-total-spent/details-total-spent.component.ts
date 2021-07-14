import { Component, Input, OnChanges } from '@angular/core';

import { faMoneyBillWave, faHandHoldingUsd, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details-total-spent',
  templateUrl: './details-total-spent.component.html',
  styleUrls: ['./details-total-spent.component.scss']
})
export class DetailsTotalSpentComponent implements OnChanges {
  @Input() categoriesTable;
  @Input() totalSpent: number;
  @Input() cashInHand: number;
  @Input() loansAndDebts: number;

  title = "Total Spent";
  tooltipText = 'Placeholder tooltip text.';

  categoriesCombined;
  hoveredCategory: string = null;

  faMoneyBillWave = faMoneyBillWave;
  faHandHoldingUsd = faHandHoldingUsd;
  faQuestionCircle = faQuestionCircle;

  constructor() { }

  ngOnChanges(): void {
    let categories = this.categoriesTable;

    categories = this.sortCategories(categories);
    categories = this.generateHEXColors(categories);

    this.categoriesCombined = categories;
  }

  sortCategories(categories) {
    let raisedByIndustriesLocal = categories
    .sort((a, b) => (a.value - b.value) * -1);

    return [...raisedByIndustriesLocal];
  }

  generateHEXColors(categories: object[]) {
    const colors = ['#800000', '#b30000', '#cc0000', '#ff0000', '#ff9999'];

    return categories.map( (row, index) => ({
      ...row,
      color: `${colors[index]}`,
    }));
  }

  categoryHoveredOver(category){
    this.hoveredCategory = category;
  }

}
