import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartTitleComponent } from 'lib-ui-components';
import { ContributionsByOccupationGQLComponent } from 'src/app/graphql/contributions-by-occupation-gql/contributions-by-occupation-table-gql/contributions-by-occupation-table-gql.component';

@Component({
  selector: 'contributions-by-occupation-container',
  imports: [ChartTitleComponent, ContributionsByOccupationGQLComponent],
  template: `<div class="raised-by-group-container">
    <chart-title
      class="chart-title"
      [titleText]="title"
      [tooltipText]="tooltipText"
    ></chart-title>

    <gql-contributions-by-occupation-table
      [candidateId]="candidateId"
    ></gql-contributions-by-occupation-table>
  </div>`,
})
export class ContributionsByOccupationContainerComponent implements OnChanges {
  @Input() candidateId;

  title = 'Donations by Occupation';
  tooltipText =
    'Occupations of individuals whose occupation group contributed the most to the campaign.';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;

      if (!candidateId) {
        return;
      }
    }
  }
}
