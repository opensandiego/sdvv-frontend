import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface CandidateCardFinanceDataResponse {
  candidate: {
    committee: {
      contributions: {
        sum: number;
        count: number;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class CandidateCardFinanceDataGQL extends Query<Response> { 
  document = gql`
    query candidateInfo ($candidateId: String!) {
      candidate(id: $candidateId) {
        committee {
          contributions {
            sum
            count
          }
        }
      }
    }
  `;
}
