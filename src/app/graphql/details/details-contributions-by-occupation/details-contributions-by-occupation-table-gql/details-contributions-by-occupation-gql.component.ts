import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RaisedByIndustry } from 'lib-ui-charts';
import { ContributionsGroupedByOccupation, ContributionsGroupedByOccupationGQLQuery } from './details-contributions-by-occupation-gql.query';

@Component({
  selector: 'details-contributions-by-occupation-gql',
  templateUrl: './details-contributions-by-occupation-gql.component.html',
  styleUrls: ['./details-contributions-by-occupation-gql.component.scss']
})
export class DetailsContributionsByOccupationGQLComponent implements OnChanges {
  @Input() candidateId;

  contributionsGroupedByOccupation: RaisedByIndustry[];

  constructor(private contributionsGroupedByOccupationGQL: ContributionsGroupedByOccupationGQLQuery) { }

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

      this.contributionsGroupedByOccupation = contributions ? contributions.slice(0, 20) : [];
      this.doSort();
    });
  }

  doSort(order: number = 1) {
    if (!this.contributionsGroupedByOccupation) return;

    this.contributionsGroupedByOccupation = this.contributionsGroupedByOccupation
      .sort((a, b) => (a.value - b.value) * order);

    this.contributionsGroupedByOccupation = [...this.contributionsGroupedByOccupation];
  }
}
