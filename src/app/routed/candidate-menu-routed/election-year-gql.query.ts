import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface ElectionYearGQLResponse {
    electionYear: string;
}

@Injectable({
  providedIn: 'root',
})
export class ElectionYearGQL extends Query<ElectionYearGQLResponse> { 
  document = gql`
    query electionYear {
      electionYear @client
    }
  `;
}
