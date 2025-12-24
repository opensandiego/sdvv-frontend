import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

interface AmountsByCode {
  ind: number;
  com: number;
  oth: number;
  pty: number;
  scc: number;
}

export interface ContributionsByCode {
  candidate: {
    committee: {
      contributions: {
        categorizedBy: {
          method: {
            monetary?: AmountsByCode;
            nonMonetary?: AmountsByCode;
          };
        };
      };
    };
  };
}

export const CONTRIBUTIONS_BY_CODE_FRAGMENT = gql`
  fragment CodeFields on ContributionsSumByCode {
    ind
    com
    oth
    pty
    scc
  }
`;

export const GET_MONETARY_CONTRIBUTIONS_BY_CODE = gql`
  query monetaryContributionsByCode(
    $candidateId: String!
    $includeMonetary: Boolean!
    $includeNonMonetary: Boolean!
  ) {
    candidate(id: $candidateId) {
      committee {
        name
        contributions {
          categorizedBy {
            method {
              monetary @include(if: $includeMonetary) {
                ...CodeFields
              }
              nonMonetary @include(if: $includeNonMonetary) {
                ...CodeFields
              }
            }
          }
        }
      }
    }
  }
  ${CONTRIBUTIONS_BY_CODE_FRAGMENT}
`;

@Injectable({
  providedIn: 'root',
})
export class ContributionsByCodeGQL extends Query<Response> {
  document = GET_MONETARY_CONTRIBUTIONS_BY_CODE;
}
