import { Component, Input, } from '@angular/core';

@Component({
  selector: 'independent-expenditures-container',
  templateUrl: './independent-expenditures-container.component.html',
  styleUrls: ['./independent-expenditures-container.component.scss']
})

export class IndependentExpendituresContainerComponent {
  @Input() candidateId: string;

  title = 'Outside Money';
  tooltipText = 'Amount of money spent by other committees to support or oppose a candidate.';
  textColor = 'white';
  backgroundColor = '#2c2c2c';
}
