import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';

@Component({
    imports: [],
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) { }

  caption = 'Where is this data sourced? All of our data is sourced directly from the City of San Diego public records.';

  ngOnInit() {
    const pageTitle = `Faq | ${globals.pageTitleSuffix}`;
    this.titleService.setTitle(pageTitle);
    this.metaService.addTags([
      {property: 'og:url', content: location.href},
      {property: 'og:title', content: pageTitle},
      {property: 'og:description', content: this.caption},
    ]);
  }

}
