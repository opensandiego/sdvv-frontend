import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface ContributionsGroupedByLocation {
  candidate: {
    committee: {
      contributions: {
        categorizedBy: {
          location: {
            inDistrict: number;
            inCity: number;
            inCounty: number;
            inState: number;
            outOfState: number;
          }
        }
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ContributionsGroupedByLocationGQL extends Query<Response> { 
  document = gql`
    query contributionsByLocation ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            categorizedBy {
              location {
                inDistrict
                inCity
                inCounty
                inState
                outOfState
              }
            }
          }
        }
      }
    }
  `;
}
