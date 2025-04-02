import { Component, Input } from '@angular/core';

@Component({
    selector: 'contributions-by-location-tab',
    templateUrl: './contributions-by-location-tab.component.html',
    styleUrls: ['./contributions-by-location-tab.component.scss'],
    standalone: false
})
export class ContributionsByLocationTabComponent {
  @Input() candidateId: string;

  title = {
    top: 'Amount Raised',
    bottom: 'By Location',
    tooltipText: 'Placeholder tooltip text for Amount Raised by Location!',
  };
}
