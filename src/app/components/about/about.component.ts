import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { globals } from 'src/app/globals';
import { AboutVotersVoiceComponent } from '../about-voters-voice/about-voters-voice.component';

@Component({
    imports: [
        AboutVotersVoiceComponent,
    ],
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) { }

  caption = 'We are a coalition of non-partisan organizations working together to create transparency for campaign contributions and expenditures with local San Diego candidates.';

  ngOnInit() {
    const pageTitle = `About | ${globals.pageTitleSuffix}`;
    this.titleService.setTitle(pageTitle);
    this.metaService.addTags([
      {property: 'og:url', content: location.href},
      {property: 'og:title', content: pageTitle},
      {property: 'og:image', content: `${location.origin}/assets/about/VV_FooterBG-AboutUs.png`},
      {property: 'og:description', content: this.caption},
    ]);
  }

}
