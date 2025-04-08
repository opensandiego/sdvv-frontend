import { Component, Input } from '@angular/core';
import { RaisedInVsOutDonutGQLComponent } from 'src/app/graphql/raised-in-vs-out-gql/raised-in-vs-out-donut-gql/raised-in-vs-out-donut-gql.component';
import { RaisedInVsOutTitleGQLComponent } from 'src/app/graphql/raised-in-vs-out-gql/raised-in-vs-out-title-gql/raised-in-vs-out-title-gql.component';

@Component({
  selector: 'raised-in-vs-out-container',
  imports: [RaisedInVsOutTitleGQLComponent, RaisedInVsOutDonutGQLComponent],
  template: `
    <div class="raised-in-vs-out-container">
      <gql-raised-in-vs-out-title
        class="title"
        [candidateId]="candidateId"
      ></gql-raised-in-vs-out-title>

      <gql-in-vs-out-donut
        class="chart"
        [candidateId]="candidateId"
      ></gql-in-vs-out-donut>
    </div>
  `,
  styles: [
    `
      .raised-in-vs-out-container {
        display: flex;
        flex-direction: column;

        .chart {
          height: 100%;
        }
      }
    `,
  ],
})
export class RaisedInVsOutComponent {
  @Input() candidateId: string;
}
