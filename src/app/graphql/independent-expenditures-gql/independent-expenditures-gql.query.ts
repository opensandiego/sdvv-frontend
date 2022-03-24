import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface IndependentExpenditures {
  candidate: {
    independentExpenditures: {
      sums: {
        support: number;
        oppose: number;
      }
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndependentExpendituresGQL extends Query<Response> { 
  document = gql`
    query independentExpenditures ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        independentExpenditures {
          candidateName
          electionYear
          sums {
            support
            oppose
          }
        }
      }
    }
  `;
}
