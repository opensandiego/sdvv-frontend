import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export const GET_INDEPENDENT_EXPENDITURES_QUERY = gql`
  query independentExpenditures($candidateId: String!) {
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

export interface IndependentExpenditures {
  candidate: {
    independentExpenditures: {
      sums: {
        support: number;
        oppose: number;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndependentExpendituresGQL extends Query<any> {
  document = GET_INDEPENDENT_EXPENDITURES_QUERY;
}
