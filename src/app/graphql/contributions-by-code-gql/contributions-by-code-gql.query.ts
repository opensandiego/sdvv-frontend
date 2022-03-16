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
            monetary?: AmountsByCode
            nonMonetary?: AmountsByCode
          }
        }
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

@Injectable({
  providedIn: 'root',
})
export class ContributionsByCodeGQL extends Query<Response> { 
  document = gql`
    query monetaryContributionsByCode ($candidateId: String!, $includeMonetary: Boolean!, $includeNonMonetary: Boolean!) {
      candidate(id: $candidateId) {
        fullName
        committee {
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
}
