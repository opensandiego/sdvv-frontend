import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface AverageDonationResponse {
  candidate: {
    committee: {
      contributions: {
        average: number;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class AverageDonationGQL extends Query<Response> { 
  document = gql`
    query averageDonation ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            average
          }
        }
      }
    }
  `;
}
