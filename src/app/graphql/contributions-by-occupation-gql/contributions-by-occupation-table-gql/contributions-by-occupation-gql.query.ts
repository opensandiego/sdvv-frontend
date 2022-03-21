import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

interface OccupationGroup {
  name: string;
  sum: number;
  percent: number;
  count: number;
}

export interface ContributionsGroupedByOccupation {
  candidate: {
    committee: {
      contributions: {
        sum: number;
        groupBy: {
          occupation: OccupationGroup[];
        }
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ContributionsGroupedByOccupationGQL extends Query<Response> { 
  document = gql`
    query contributionsByOccupation ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            groupBy {
              occupation {
                name
                sum
                percent
                count
              }
            }
          }
        }
      }
    }
  `;
}
