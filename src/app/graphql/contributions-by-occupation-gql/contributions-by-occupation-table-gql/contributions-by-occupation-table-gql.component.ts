import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContributionsGroupedByOccupationGQL, ContributionsGroupedByOccupation } from './contributions-by-occupation-gql.query';
import { globals } from 'src/app/globals';

@Component({
    selector: 'gql-contributions-by-occupation-table',
    template: `
    <contributions-by-occupation-table
      [contributionGroups]="contributionsGroupedByOccupation"
      [contributionColorShades]="contributionsColorShades"
    ></contributions-by-occupation-table>
  `,
    standalone: false
})
export class ContributionsByOccupationGQLComponent implements OnChanges {
  @Input() candidateId;

  contributionsColorShades = globals.contributionsColorShades;
  contributionsGroupedByOccupation;

  constructor(private contributionsGroupedByOccupationGQL: ContributionsGroupedByOccupationGQL) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidateId']) {
      const candidateId = changes['candidateId'].currentValue;
      this.update(candidateId); 
    }
  }

  update(candidateId: string) {
    this.candidateId = candidateId;

    if (!this.candidateId) { return; }

    this.contributionsGroupedByOccupationGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: ContributionsGroupedByOccupation = result.data;

      const contributions = response?.candidate?.committee?.contributions?.groupBy?.occupation;

      this.contributionsGroupedByOccupation = contributions ? contributions.slice(0, 5) : [];
    });
  }
}
