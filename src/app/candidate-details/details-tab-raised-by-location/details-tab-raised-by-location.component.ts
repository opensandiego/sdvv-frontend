import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-tab-raised-by-location',
  templateUrl: './details-tab-raised-by-location.component.html',
  styleUrls: ['./details-tab-raised-by-location.component.scss']
})
export class DetailsTabRaisedByLocationComponent implements OnInit {

  @Input() raisedByLocations;

  title = {
    top: 'Amount Raised',
    bottom: 'By Location',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Location!',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
