import { Component, OnInit } from '@angular/core';
import { GraphQLModule } from '../graphql.module';
import { LastUpdateGQL, LastUpdateResponse } from './last-update-gql.query';

@Component({
  selector: 'last-updated',
  imports: [GraphQLModule],
  template: `
    <div class="updated">Data Last Updated {{ lastUpdatedDate }}</div>
  `,
  styles: `
    .updated {
      font-style: italic;
      font-size: 14px;
      padding: 10px;
    }
`,
})
export class LastUpdatedComponent implements OnInit {
  lastUpdatedDate: string;

  constructor(private lastUpdateGQL: LastUpdateGQL) {}

  ngOnInit(): void {
    this.update();
  }

  update() {
    this.lastUpdateGQL.watch().valueChanges.subscribe((result: any) => {
      const response: LastUpdateResponse = result.data;
      const dateTime = response.lastUpdate.dateTime;
      this.lastUpdatedDate = dateTime;
    });
  }
}
