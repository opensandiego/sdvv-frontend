import { Component, Input } from '@angular/core';
import { getCompactFormattedCurrency } from '../shared/number-formatter';

@Component({
  selector: 'total-expenditures',
  template: `<div class="expenditures-panel" [style.color]="textColor">
    <div class="expenditures">
      <div class="label">Total Expenditures</div>
      <div class="amount">{{ formattedCurrency(totalExpenditures, 1) }}</div>
    </div>
  </div>`,
  styleUrls: ['./total-expenditures.component.scss'],
})
export class TotalExpendituresComponent {
  @Input() totalExpenditures: number;
  @Input() textColor: string = 'white';

  formattedCurrency = getCompactFormattedCurrency;
}
