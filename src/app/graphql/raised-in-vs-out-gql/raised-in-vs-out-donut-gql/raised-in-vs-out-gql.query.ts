import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface RaisedInVsOut {
  candidate: {
    committee: {
      contributions: {
        categorizedBy: {
          jurisdiction: {
            inside: number;
            outside: number;
          }
        }
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class RaisedInVsOutGQL extends Query<Response> { 
  document = gql`
    query raisedVsSpent ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            categorizedBy {
              jurisdiction {
                inside
                outside
              }
            }
          }
        }
      }
    }
  `;
}
