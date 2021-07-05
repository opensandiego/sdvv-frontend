import { Component, OnInit, Input, } from '@angular/core';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { getCompactFormattedCurrency } from '../../shared/number-formatter'

@Component({
  selector: 'app-expanded-outside-money',
  templateUrl: './expanded-outside-money.component.html',
  styleUrls: ['./expanded-outside-money.component.scss']
})
export class ExpandedOutsideMoneyComponent implements OnInit {
  @Input() support: number;
  @Input() oppose: number;
  @Input() totalExpenditures: number;

  faQuestionCircle = faQuestionCircle;
  title = 'Outside Money';
  tooltipText = 'Amount of money raised and spent by independent expenditure committees spent in support or opposition of a candidate but not contributed directly to their campaign.';
  textColor = 'white';
  backgroundColor = '#2c2c2c';

  formattedCurrency = getCompactFormattedCurrency;

  constructor() { }

  ngOnInit(): void {  }

}
