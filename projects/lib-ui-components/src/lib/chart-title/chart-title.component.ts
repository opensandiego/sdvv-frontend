import { Component, Input, } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'chart-title',
  templateUrl: './chart-title.component.html',
  styleUrls: ['./chart-title.component.scss'],
  imports: [MatTooltipModule, FontAwesomeModule],
})
export class ChartTitleComponent {
  @Input() titleText: string = 'Title Text Here';
  @Input() textColor: string = '#244366';
  @Input() tooltipText: string = 'Placeholder text.';
  @Input() tooltipColor: string = '#707070';

  faQuestionCircle = faQuestionCircle

  constructor() {}
}
