import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class OfficeCardGQLInfo extends Query<Response> { 
  document = gql`
    query office ($electionYear: String!, $title: String!) {
      office(electionYear: $electionYear, title: $title) {
        committeeCount
      }
    }
  `;
}
