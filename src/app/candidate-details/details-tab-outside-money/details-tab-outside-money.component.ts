import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-details-tab-outside-money',
  templateUrl: './details-tab-outside-money.component.html',
  styleUrls: ['./details-tab-outside-money.component.scss']
})
export class DetailsTabOutsideMoneyComponent implements OnInit {
  title = {
    top: 'Independent Expenditures',
    bottom: 'By Outside Money',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Outside Money!',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
