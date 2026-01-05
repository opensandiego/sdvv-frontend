import { Component, OnInit } from '@angular/core';
import { GraphQLModule } from '../graphql.module';
import { LastUpdateGQL, LastUpdateResponse } from './last-update-gql.query';

@Component({
  selector: 'last-updated',
  imports: [GraphQLModule],
  template: `<div>
    <p class="updated">Data Last Updated {{ lastUpdatedDate }}</p>
  </div>`,
  styles: `
    @use "../../../styles/variables";

    .updated {
      color: variables.$vvgreen;
      font-style: italic;
      font-size: 14px;
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
