import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface YearsResponse {
  electionYears: [
    {
      year: string;
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class YearSelectorGQL extends Query<Response> { 
  document = gql`
    query electionYears {
      electionYears {
        year
      }
    }
  `;
}
