import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { globals } from 'src/app/globals';

@Component({
  imports: [RouterModule],
  selector: 'summary-item',
  template: `<div class="ftm">
    <h1>{{ title }}</h1>
    <h3>{{ subTitle }}</h3>
    <p class="ftm_caption">{{ caption }}</p>
    <router-outlet></router-outlet>
  </div> `,
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public title = globals.siteName;
  public subTitle = globals.siteSubTitle;
  public caption = globals.siteCaption;
}
