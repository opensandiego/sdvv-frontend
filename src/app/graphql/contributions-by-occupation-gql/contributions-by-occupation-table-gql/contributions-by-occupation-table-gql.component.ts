import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContributionsGroupedByOccupationGQL, ContributionsGroupedByOccupation } from './contributions-by-occupation-gql.query';

@Component({
  selector: 'gql-contributions-by-occupation-table',
  template: `
    <contributions-by-occupation-table
      [contributionGroups]="contributionsGroupedByOccupation"
    ></contributions-by-occupation-table>
  `,
})
export class ContributionsByOccupationGQLComponent implements OnChanges {
  @Input() candidateId;
  contributionsGroupedByOccupation;

  constructor(private contributionsGroupedByOccupationGQL: ContributionsGroupedByOccupationGQL) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;

      if (!candidateId) { return; }

      this.contributionsGroupedByOccupationGQL.watch({
        candidateId: candidateId,
      }, {
        // errorPolicy: 'all',
      }).valueChanges.subscribe( (result: any) => {
        const response: ContributionsGroupedByOccupation = result.data;

        const contributions = response?.candidate?.committee?.contributions?.groupBy.occupation;

        this.contributionsGroupedByOccupation = contributions ? contributions.slice(0, 5) : [];
      });      
    }
  }

}
