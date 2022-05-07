import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface CandidateCardInfoResponse {
  candidate: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CandidateCardInfoGQL extends Query<CandidateCardInfoResponse> { 
  document = gql`
    query candidateInfo ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        firstName
        lastName
        fullName
      }
    }
  `;
}
