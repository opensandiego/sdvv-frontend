import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'details-tab-title',
  imports: [MatTooltipModule, FontAwesomeModule],
  templateUrl: './details-tab-title.component.html',
  styleUrls: ['./details-tab-title.component.scss'],
})
export class DetailsTabTitleComponent {
  @Input() smallTitleText: string;
  @Input() largeTitleText: string;
  @Input() tooltipText?: string = 'Placeholder tooltip text.';

  faQuestionCircle = faQuestionCircle;
}
