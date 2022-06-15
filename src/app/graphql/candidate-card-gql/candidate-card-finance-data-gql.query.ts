import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface CandidateCardFinanceDataResponse {
  candidate: {
    id: string,
    committee: {
      name: string,
      contributions: {
        sum: number;
        count: number;
      };
      expenses: {
        sum: number;
      };
    };
    independentExpenditures: {
      sums: {
        support: number;
        oppose: number;
      }
    }
  };
}

@Injectable({
  providedIn: 'root',
})
export class CandidateCardFinanceDataGQL extends Query<Response> { 
  document = gql`
    query candidateInfo ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            sum
            count
          }
          expenses {
            sum
          }
        }
        independentExpenditures {
          sums {
            support
            oppose
          }
        }
      }
    }
  `;
}
