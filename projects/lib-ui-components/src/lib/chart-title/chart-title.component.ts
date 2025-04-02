import { Component, Input, } from '@angular/core';

@Component({
    selector: 'chart-title',
    templateUrl: './chart-title.component.html',
    styleUrls: ['./chart-title.component.scss'],
    standalone: false
})
export class ChartTitleComponent {
  @Input() titleText: string = 'Title Text Here';
  @Input() textColor: string = '#244366';
  @Input() tooltipText: string = 'Placeholder text.';
  @Input() tooltipColor: string = '#707070';
  
  constructor() { }

}
