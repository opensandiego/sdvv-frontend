import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface CandidateInfo {
  candidate: {
    agency: string;
    district: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CandidateInfoGQL extends Query<Response> { 
  document = gql`
    query candidateInfo ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        agency # Example: City of San Diego
        district
      }
    }
  `;
}
