import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface RaisedSpent {
  candidate: {
    committee: {
      contributions: {
        sum: number;
      };
      expenses: {
        sum: number;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class DetailsRaisedSpentGQLQuery extends Query<Response> { 
  document = gql`
    query raisedSpent ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            sum
          }
          expenses {
            sum
          }
        }
      }
    }
  `;
}
