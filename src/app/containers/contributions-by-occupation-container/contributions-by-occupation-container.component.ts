import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'contributions-by-occupation-container',
  templateUrl: './contributions-by-occupation-container.component.html',
})
export class ContributionsByOccupationContainerComponent implements OnChanges {
  @Input() candidateId;

  title = 'Donations by Occupation';
  tooltipText = "Total contributions from the five largest groups of campaign donors.  Groups are determined by the industry segment of each donor\'s employer.";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;

        if (!candidateId) { return; }
    }
  }

}
