import { Component, Input, OnInit } from '@angular/core';
import { AverageDonationGQL, AverageDonationResponse } from './average-donation-gql.query';

@Component({
  selector: 'gql-average-donation',
  template: `
    <average-donation 
      [average]="averageDonation"
    ></average-donation>
  `,
})
export class AverageDonationGQLComponent implements OnInit {
  @Input() candidateId: string;

  averageDonation = 0;

  constructor(private averageDonationGQL: AverageDonationGQL) {}

  ngOnInit() {

    this.averageDonationGQL.watch({
      candidateId: this.candidateId,
    }, {
      // errorPolicy: 'all',
    }).valueChanges.subscribe( (result: any) => {
      const response: AverageDonationResponse = result.data;

      const average = response?.candidate?.committee?.contributions?.average;
      this.averageDonation = average ? average : 0;
    });
  }
}
