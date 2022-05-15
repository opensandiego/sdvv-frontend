import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';


@Injectable({
  providedIn: 'root',
})
export class OfficeCardGQLData extends Query<Response> { 
  document = gql`
    query office ($electionYear: String!, $title: String!, $filters: CommitteeFilters) {
      office(electionYear: $electionYear, title: $title) {
        title
        electionYear
        totalContributions(filters: $filters)
      }
    }
  `;
}
