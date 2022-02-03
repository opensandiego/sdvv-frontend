import { Component, Input, OnInit } from '@angular/core';
import { RaisedVsSpentGQL, RaisedVsSpent } from './raised-vs-spent-gql.query';

@Component({
  selector: 'gql-raised-vs-spent',
  template: `
    <raised-vs-spent-bar [raised]="raised" [spent]="spent"></raised-vs-spent-bar>
  `,
})
export class RaisedVsSpentGQLComponent implements OnInit {
  @Input() candidateId: string;

  raised = 0;
  spent = 0;

  constructor(private raisedVsSpentGQL: RaisedVsSpentGQL) {}

  ngOnInit() {

    this.raisedVsSpentGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const raisedVsSpent: RaisedVsSpent = result.data;

      if (raisedVsSpent.candidate) {
        this.raised = raisedVsSpent.candidate.committee.contributions.sum;
        this.spent = raisedVsSpent.candidate.committee.expenses.sum;
      }
    });
  }
}
