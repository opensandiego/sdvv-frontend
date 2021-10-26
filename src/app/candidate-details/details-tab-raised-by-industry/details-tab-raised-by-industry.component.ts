import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-tab-raised-by-industry',
  templateUrl: './details-tab-raised-by-industry.component.html',
  styleUrls: ['./details-tab-raised-by-industry.component.scss']
})
export class DetailsTabRaisedByIndustryComponent implements OnInit {

  title = {
    top: 'Amount Raised',
    bottom: 'By Industry',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Industry!',
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
