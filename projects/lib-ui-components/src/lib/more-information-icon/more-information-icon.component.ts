import { Component, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'more-information-icon',
  imports: [MatTooltipModule, FontAwesomeModule],
  template: ` <fa-icon
    [icon]="faQuestionCircle"
    [matTooltip]="tooltipText()"
    matTooltipClass="tooltip-text"
    class="tooltip-icon"
    aria-label="More information"
    tabindex="0"
  >
  </fa-icon>`,
  styleUrls: ['./more-information-icon.component.scss'],
})
export class MoreInformationComponent {
  tooltipText = input<string>('');

  faQuestionCircle = faQuestionCircle;
}
