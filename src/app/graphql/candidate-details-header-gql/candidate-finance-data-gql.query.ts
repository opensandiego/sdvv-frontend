import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface CandidateFinanceDataResponse {
  candidate: {
    id: string,
    committee: {
      name: string,
      contributions: {
        sum: number;
        count: number;
        average: number;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class CandidateFinanceDataGQL extends Query<Response> { 
  document = gql`
    query candidateInfo ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            sum
            count
            average
          }
        }
      }
    }
  `;
}
