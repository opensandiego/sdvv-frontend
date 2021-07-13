import { Component, OnInit, Input, } from '@angular/core';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details-total-raised',
  templateUrl: './details-total-raised.component.html',
  styleUrls: ['./details-total-raised.component.scss']
})
export class DetailsTotalRaisedComponent implements OnInit {
  @Input() localRaisedCategories: object[];
  @Input() totalRaised: number;

  faQuestionCircle = faQuestionCircle;
  
  constructor() { }

  ngOnInit(): void {
  }

}
