import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface ContributionsByType {
  inKind: number;
  individual: number;
  other: number;
}

export interface DetailsTotalRaised {
  candidate: {
    committee: {
      contributions: {
        sum: number;
        categorizedBy: {
          method: ContributionsByType;
        }         
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class DetailsTotalRaisedGQLQuery extends Query<Response> { 
  document = gql`
    query detailsTotalRaised ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            sum
            categorizedBy {
              method {
                inKind
                individual
                other
              }
            }
          }
        }
      }
    }
  `;
}
