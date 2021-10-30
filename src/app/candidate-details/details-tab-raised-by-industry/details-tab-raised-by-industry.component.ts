import { Component, Input, OnInit } from '@angular/core';

import { RaisedByIndustry } from '../../vv-charts/raised-by-industry-bar/raised-by-industry-bar.component';

@Component({
  selector: 'app-details-tab-raised-by-industry',
  templateUrl: './details-tab-raised-by-industry.component.html',
  styleUrls: ['./details-tab-raised-by-industry.component.scss']
})
export class DetailsTabRaisedByIndustryComponent implements OnInit {

  @Input() raisedByIndustries: RaisedByIndustry[];

  title = {
    top: 'Amount Raised',
    bottom: 'By Industry',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Industry!',
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
