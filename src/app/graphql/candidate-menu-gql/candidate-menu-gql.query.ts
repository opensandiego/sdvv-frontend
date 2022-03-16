import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface CandidateFragment {
  id: string;
  fullName: string;
  office: string;
  district: string;
  electionYear: string;
  inGeneralElection: boolean;
}

export interface OfficeFragment {
  title: string;
  electionYear: string;
  candidates: CandidateFragment;
}

export interface CandidateMenuResponse {
  officesByType: {
    mayor: OfficeFragment;
    cityCouncil: OfficeFragment;
    cityAttorney: OfficeFragment;
  };
}

export const CANDIDATE_FRAGMENT = gql`
  fragment CandidateFields on Candidate {
    id
    fullName
    office
    district
    electionYear
    inGeneralElection
  }
`;

export const OFFICE_FRAGMENT = gql`
  fragment OfficeFields on Office {
    title
    electionYear
    candidates {
      ...CandidateFields
    }
  }
  ${CANDIDATE_FRAGMENT}
`;

@Injectable({
  providedIn: 'root',
})
export class CandidateMenuGQL extends Query<Response> { 

  document = gql`
    query candidateMenu($year: String!) {
      electionYear(year: $year) {
        officesByType {
          mayor {
            ...OfficeFields
          }
          cityCouncil {
            ...OfficeFields
          }
          cityAttorney {
            ...OfficeFields
          }
        }
      }
    }
    ${OFFICE_FRAGMENT}
  `;
}
