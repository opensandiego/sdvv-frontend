import { Component, Input } from '@angular/core';
import { MoreInformationComponent } from '../more-information-icon/more-information-icon.component';

@Component({
  selector: 'details-tab-title',
  imports: [MoreInformationComponent],
  templateUrl: './details-tab-title.component.html',
  styleUrls: ['./details-tab-title.component.scss'],
})
export class DetailsTabTitleComponent {
  @Input() smallTitleText: string = '';
  @Input() largeTitleText: string = '';
  @Input() tooltipText?: string = '';
}
