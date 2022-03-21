import { Component, Input } from '@angular/core';

@Component({
  selector: 'raised-in-vs-out-container',
  styleUrls: ['./raised-in-vs-out-container.component.scss'],
  template: `
    <div class="raised-in-vs-out-container">
      <gql-raised-in-vs-out-title class="title"
        [candidateId]="candidateId"
      ></gql-raised-in-vs-out-title>

      <gql-in-vs-out-donut class="chart"
        [candidateId]="candidateId"
      ></gql-in-vs-out-donut>
    </div>
  `,
})
export class RaisedInVsOutComponent {
  @Input() candidateId: string;

}
