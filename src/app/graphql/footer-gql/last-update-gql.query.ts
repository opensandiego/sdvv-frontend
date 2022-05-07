import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface LastUpdateResponse {
  lastUpdate: {
    dateTime: string;
  } 
}

@Injectable({
  providedIn: 'root',
})
export class LastUpdateGQL extends Query<LastUpdateResponse> {
  document = gql`
    query lastUpdate {
      lastUpdate {
        dateTime
      }
    }
  `;
}
