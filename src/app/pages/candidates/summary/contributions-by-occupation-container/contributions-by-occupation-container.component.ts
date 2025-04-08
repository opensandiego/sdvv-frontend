import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'contributions-by-occupation-container',
    templateUrl: './contributions-by-occupation-container.component.html',
    standalone: false
})
export class ContributionsByOccupationContainerComponent implements OnChanges {
  @Input() candidateId;

  title = 'Donations by Occupation';
  tooltipText = "Occupations of individuals whose occupation group contributed the most to the campaign.";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;

        if (!candidateId) { return; }
    }
  }

}
