import { gql } from "@apollo/client";

export const GET_YEARS = gql`
  query electionYears {
    electionYears {
      year
    }
  }
`;
