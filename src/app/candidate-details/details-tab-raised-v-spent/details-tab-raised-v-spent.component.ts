import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-tab-raised-v-spent',
  templateUrl: './details-tab-raised-v-spent.component.html',
  styleUrls: ['./details-tab-raised-v-spent.component.scss']
})
export class DetailsTabRaisedVSpentComponent implements OnInit {
  @Input() raisedData;
  @Input() spentData;
  @Input() summaryData;

  constructor() { }

  ngOnInit(): void {
  }

}
