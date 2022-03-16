import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';

@Component({
  selector: 'candidate-card-list-routed',
  template: `
    <candidate-card-list-gql
      [year]="year"
      [office]="office"
      [district]="district"
    ></candidate-card-list-gql>
  `,
})
export class CandidateCardListRoutedComponent implements OnInit {
  year: string;
  office: string;
  district: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit(): void { 

    this.activatedRoute.paramMap.subscribe(params => {
      this.year = params.get('year')
      this.office = params.get('office_name').replace('-', ' ');
      const district =params.get('district_number')
      this.district = district != '0' ? district : null;

      const pageTitle = `Candidates for ${this.office} ${this.year} | ${globals.pageTitleSuffix}`;
      this.titleService.setTitle(pageTitle);
    })

  }
}
