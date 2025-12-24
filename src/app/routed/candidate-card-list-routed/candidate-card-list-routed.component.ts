import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CandidateCardListGQLModule } from 'src/app/graphql/candidate-card-list-gql/candidate-card-list-gql.module';

@Component({
  selector: 'candidate-card-list-routed',
  template: `
    <candidate-card-list-gql
      [year]="year"
      [office]="office"
      [district]="district"
    ></candidate-card-list-gql>
  `,
  imports: [CommonModule, RouterModule, CandidateCardListGQLModule],
})
export class CandidateCardListRoutedComponent implements OnInit {
  year: string;
  office: string;
  district: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.year = params.get('year');
      this.office = params.get('office_name').replace('-', ' ');
      const district = params.get('district_number');
      this.district = district != '0' ? district : null;
    });
  }
}
