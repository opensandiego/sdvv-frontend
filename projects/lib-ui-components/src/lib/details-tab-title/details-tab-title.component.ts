import { Component, Input } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'details-tab-title',
    templateUrl: './details-tab-title.component.html',
    styleUrls: ['./details-tab-title.component.scss'],
    standalone: false
})
export class DetailsTabTitleComponent {
  @Input() smallTitleText: string;
  @Input() largeTitleText: string;
  @Input() tooltipText?: string = 'Placeholder tooltip text.';

  faQuestionCircle = faQuestionCircle;
}
