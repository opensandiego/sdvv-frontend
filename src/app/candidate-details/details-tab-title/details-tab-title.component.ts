import { Component, Input, OnInit } from '@angular/core';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details-tab-title',
  templateUrl: './details-tab-title.component.html',
  styleUrls: ['./details-tab-title.component.scss']
})
export class DetailsTabTitleComponent implements OnInit {
  @Input() smallTitleText: string;
  @Input() largeTitleText: string;
  @Input() tooltipText?: string = 'Placeholder tooltip text.';

  faQuestionCircle = faQuestionCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
