import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

interface Committee {
  sum: number
  committee: {
    id: string;
    name: string;
  }
}

export interface OutsideMoney {
  candidate: {
    independentExpenditures: {
      sums: {
        support: number;
        oppose: number;
      };
      committees: {
        support: Committee[];
        oppose: Committee[];
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class OutsideMoneyGQLQuery extends Query<Response> { 
  document = gql`
    query outsideMoney ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        independentExpenditures {
          sums {
            support
            oppose
          }
          committees {
            support {
              sum
              committee {
                id
                name
              }
            }
            oppose {
              sum
              committee {
                id
                name
              }
            }
          }
        }
      }
    }
  `;
}
