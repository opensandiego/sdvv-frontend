import { Component, Input, OnInit } from '@angular/core';
import { RaisedInVsOutGQL, RaisedInVsOut } from './raised-in-vs-out-gql.query';

@Component({
  selector: 'gql-in-vs-out-donut',
  template: `
    <raised-in-vs-out-donut
      [inside]="insideAmount"
      [outside]="outsideAmount"
    ></raised-in-vs-out-donut>
  `,
})
export class RaisedInVsOutDonutGQLComponent implements OnInit {
  @Input() candidateId: string;

  insideAmount = 0;
  outsideAmount = 0;

  constructor(private raisedInVsOutGQL: RaisedInVsOutGQL) {}

  ngOnInit() {

    this.raisedInVsOutGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: RaisedInVsOut = result.data;

      const insideAmount = response?.candidate?.committee?.contributions?.categorizedBy?.jurisdiction?.inside;
      this.insideAmount = insideAmount ? insideAmount : 0;

      const outsideAmount = response?.candidate?.committee?.contributions?.categorizedBy?.jurisdiction?.outside;
      this.outsideAmount = outsideAmount ? outsideAmount : 0;
    });
  }
}
