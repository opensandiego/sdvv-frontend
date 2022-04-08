
import { gql } from "@apollo/client";

export interface RaisedVsSpent {
  candidate: {
    committee: {
      contributions: {
        sum: number;
      };
      expenses: {
        sum: number;
      };
    };
  };
}

export const GET_COMMITTEE_RAISED_SPENT = gql`
    query raisedVsSpent ($candidateId: String!) {
      candidate(id: $candidateId) {
        id
        committee {
          name
          contributions {
            sum
          }
          expenses {
            sum
          }
        }
      }
    }
`;

