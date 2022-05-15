import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

interface Office {
  title: string;
  electionYear: string;
  committeeCount: number;
}

export interface YearCardResponse {
  electionYear: {
    officesByType: {
      mayor: Office;
      cityCouncil: Office;
      cityAttorney: Office;
    };
  };
}

export const OFFICE_FRAGMENT = gql`
  fragment YearCardOfficeFields on Office {
    title
    electionYear
    committeeCount(filters: $filters)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class YearCardGQL extends Query<Response> { 
  document = gql`
    query electionYear($year: String!, $filters: CommitteeFilters) {
      electionYear(year: $year) {
        officesByType {
          mayor {
            ...YearCardOfficeFields
          }
          cityCouncil {
            ...YearCardOfficeFields
          }
          cityAttorney {
            ...YearCardOfficeFields
          }
        }
      }
    }
    ${OFFICE_FRAGMENT}
  `;
}
