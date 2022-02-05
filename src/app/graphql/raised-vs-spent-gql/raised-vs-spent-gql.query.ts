import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface RaisedVsSpent {
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
export class RaisedVsSpentGQL extends Query<Response> { 
  document = gql`
    query raisedVsSpent ($candidateId: String!) {
      candidate(id: $candidateId) {
        committee {
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
