import { Component, Input, OnInit } from '@angular/core';

import { faSortAmountUp, faSortAmountDownAlt, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

import { RaisedByIndustry } from '../../vv-charts/raised-by-industry-bar/raised-by-industry-bar.component';

export enum SortOrder {
  High =  1,
  Low  = -1,
}

@Component({
  selector: 'app-details-raised-by-industry',
  templateUrl: './details-raised-by-industry.component.html',
  styleUrls: ['./details-raised-by-industry.component.scss']
})
export class DetailsRaisedByIndustryComponent implements OnInit {

  @Input() raisedByIndustriesLocal: RaisedByIndustry[];
  
  sortOrder: SortOrder = SortOrder.High;
  SortOrderType = SortOrder;

  title = {
    top: 'Amount Raised',
    bottom: 'By Industry',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Industry!',
  };

  faQuestionCircle = faQuestionCircle;

  sortButtons = [{
      text: 'HIGH',
      order: SortOrder.High,
      icon: faSortAmountUp,
    }, {
      text: 'LOW',
      order: SortOrder.Low,
      icon: faSortAmountDownAlt,
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.doSort();
  }

  doSort() {
    this.raisedByIndustriesLocal = this.raisedByIndustriesLocal
      .sort((a, b) => (a.value - b.value) * this.sortOrder);

    this.raisedByIndustriesLocal = [...this.raisedByIndustriesLocal];    
  }

  onSort(order: SortOrder) {
    this.sortOrder = order;
    this.doSort();
  }

}
