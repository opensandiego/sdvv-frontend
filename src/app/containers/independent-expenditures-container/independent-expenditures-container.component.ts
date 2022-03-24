import { Component, Input, } from '@angular/core';

@Component({
  selector: 'independent-expenditures-container',
  templateUrl: './independent-expenditures-container.component.html',
  styleUrls: ['./independent-expenditures-container.component.scss']
})

export class IndependentExpendituresContainerComponent {
  @Input() candidateId: string;

  title = 'Outside Money';
  tooltipText = 'Amount of money raised and spent by independent expenditure committees spent in support or opposition of a candidate but not contributed directly to their campaign.';
  textColor = 'white';
  backgroundColor = '#2c2c2c';
}
