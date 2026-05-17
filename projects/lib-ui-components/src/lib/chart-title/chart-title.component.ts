import { Component, Input } from '@angular/core';
import { MoreInformationComponent } from '../more-information-icon/more-information-icon.component';

@Component({
  selector: 'chart-title',
  styles: [
    `
      .title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .text {
          font-size: 18px;
          font-weight: bold;
        }
      }
    `,
  ],
  template: `
    <div class="title">
      <p>
        <span class="text" [style.color]="textColor">{{ titleText }}</span>

        <more-information-icon
          [tooltipText]="tooltipText"
        ></more-information-icon>
      </p>
    </div>
  `,

  imports: [MoreInformationComponent],
})
export class ChartTitleComponent {
  @Input() titleText: string = 'Title Text Here';
  @Input() textColor: string = '#244366';
  @Input() tooltipText: string = 'Placeholder text.';

  constructor() {}
}
