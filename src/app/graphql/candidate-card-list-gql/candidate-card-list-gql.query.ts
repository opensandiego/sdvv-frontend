import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';


@Injectable({
  providedIn: 'root',
})
export class CandidateCardListInfoGQL extends Query<Response> { 
  document = gql`
    query candidateList ($year: String!, $filters: CandidateFilters) {
      candidates(year: $year, filters: $filters) {
        id
      }
    }
  `;
}
