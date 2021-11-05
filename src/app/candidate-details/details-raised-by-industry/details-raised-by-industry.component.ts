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

  @Input() raisedByIndustries: RaisedByIndustry[];
  
  sortOrder: SortOrder = SortOrder.High;
  SortOrderType = SortOrder;

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
    this.raisedByIndustries = this.raisedByIndustries
      .sort((a, b) => (a.value - b.value) * this.sortOrder);

    this.raisedByIndustries = [...this.raisedByIndustries];
  }

  onSort(order: SortOrder) {
    this.sortOrder = order;
    this.doSort();
  }

}
