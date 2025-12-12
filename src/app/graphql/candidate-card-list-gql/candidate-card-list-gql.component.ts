import { Component, Input, OnChanges } from '@angular/core';
import { CandidateCardListInfoGQL } from './candidate-card-list-gql.query';

import { GraphQLModule } from '../graphql.module';
import { CandidateCardGQLComponent } from '../candidate-card-gql/candidate-card-gql.component';

@Component({
  selector: 'candidate-card-list-gql',
  imports: [GraphQLModule, CandidateCardGQLComponent],
  styles: [
    `
      .candidate-cards {
        padding: 10px 20px;
        margin: 0em;
      }
    `,
  ],
  template: `
    <div class="candidate-cards grid justify-left nogutter">
      @for (id of candidateIds; track id) {
        <div>
          <gql-candidate-card [candidateId]="id"></gql-candidate-card>
        </div>
      }
    </div>
    `,
})
export class CandidateCardListGQLComponent implements OnChanges {
  @Input() year: string;
  @Input() office: string;
  @Input() district: string;

  candidateIds: string[];

  constructor(private candidateCardListInfoGQL: CandidateCardListInfoGQL) {}

  ngOnChanges() {
    const filters = {
      offices: this.office ? [this.office] : undefined,
      districts: this.district ? [this.district] : undefined,
      inPrimaryElection: this.year === '2022',
      // inGeneralElection: this.year !== '2022',
    };

    this.candidateCardListInfoGQL
      .watch(
        {
          year: this.year,
          filters: filters,
        },
        {
          // errorPolicy: 'all',
        }
      )
      .valueChanges.subscribe((result: any) => {
        const response = result.data;

        const candidates = response?.candidates;
        this.candidateIds = candidates
          ? candidates.map((candidate) => candidate.id)
          : [];
      });
  }
}
