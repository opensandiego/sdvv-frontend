import { Component, Input, } from '@angular/core';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-expanded-chart-title',
  templateUrl: './expanded-chart-title.component.html',
  styleUrls: ['./expanded-chart-title.component.scss']
})
export class ExpandedChartTitleComponent {
  @Input() titleText: string = 'Title Text Here';
  @Input() textColor: string = '#244366';
  @Input() tooltipText: string = 'Placeholder text.';
  @Input() tooltipColor: string = '#707070';
  
  faQuestionCircle = faQuestionCircle;

  constructor() { }

}
