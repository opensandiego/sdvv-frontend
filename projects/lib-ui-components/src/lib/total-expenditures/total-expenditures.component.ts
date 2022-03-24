import { Component, Input, } from '@angular/core';
import { getCompactFormattedCurrency } from '../shared/number-formatter'

@Component({
  selector: 'total-expenditures',
  templateUrl: './total-expenditures.component.html',
  styleUrls: ['./total-expenditures.component.scss']
})
export class TotalExpendituresComponent {
  @Input() totalExpenditures: number;
  @Input() textColor: string = 'white';

  formattedCurrency = getCompactFormattedCurrency;
}
