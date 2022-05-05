import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface ExpenseCode {
  code: string;
  sum: number;
  percent: number;
}

export interface DetailsTotalSpent {
  candidate: {
    committee: {
      expenses: {
        sum: number;
        groupBy: {
          expenseByCode: ExpenseCode[];
        }         
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class DetailsTotalSpentGQLQuery extends Query<Response> { 
  document = gql`
    query detailsTotalSpent ($candidateId: String!, $limit: Int) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          expenses {
            sum
            groupBy {
              expenseByCode(limit: $limit) {
                code
                sum
                percent
                # count
              }
            }
          }
        }
      }
    }
  `;
}
