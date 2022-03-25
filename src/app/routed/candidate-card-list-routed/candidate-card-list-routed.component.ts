import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit(): void { 

    this.activatedRoute.paramMap.subscribe(params => {
      this.year = params.get('year')
      this.office = params.get('office_name').replace('-', ' ');
      const district = params.get('district_number')
      this.district = district != '0' ? district : null;
      this.setTitle();
    })

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setTitle();
      }
    });
  }

  setTitle() {
    const office = this.office.toUpperCase();
    const district = this.district ? `District ${this.district}` : ``;
    const pageTitle = `${office} ${district} Candidates ${this.year} | ${globals.pageTitleSuffix}`;
    this.titleService.setTitle(pageTitle);
  }
}
