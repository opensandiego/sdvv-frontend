import { gql } from "@apollo/client";

export const GET_CANDIDATE_INFO = gql`
  query candidateInfo ($candidateId: String!) {
    candidate(id: $candidateId) {
      id
      firstName
      lastName
      fullName
      description
      imageUrl
      website
      office
      district
      electionYear
    }
  }
`;
