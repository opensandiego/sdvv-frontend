import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { globals } from 'src/app/globals';

@Component({
  selector: 'office-districts',
  templateUrl: './office-districts.component.html',
  styleUrls: ['./office-districts.component.scss'],
})
export class OfficeDistrictComponent implements OnInit {
  office: string;
  district: string;
  year: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
  ) { }

  ngOnInit(): void { 

    this.activatedRoute.paramMap.subscribe(params => {
      this.year = params.get('year')
      this.office = params.get('office_name').replace('-', ' ');
      const district = params.get('district_number')
      this.district = district != '0' ? district : null;
      this.setTitleMeta();
    })
  }

  onDeactivate(event) {
    this.setTitleMeta();
  }

  setTitleMeta() {
    const office = this.office.toUpperCase();
    const district = this.district ? `District ${this.district}` : ``;
    const pageTitle = `${office} ${district} Candidates ${this.year} | ${globals.pageTitleSuffix}`;
    this.titleService.setTitle(pageTitle);

    this.metaService.addTags([
      {property: 'og:url', content: location.href},
      {property: 'og:title', content: pageTitle},
      {property: 'og:image', content: `${location.origin}/assets/preview-images/candidates_preview.png`},
      // {property: 'og:description', content: ''},
    ]);    
  }
}
