import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { globals } from 'src/app/globals';
import { LastUpdatedComponent } from 'src/app/graphql/last-updated/last-updated.component';

@Component({
  imports: [RouterModule, LastUpdatedComponent],
  selector: 'summary-item',
  template: `<div class="ftm">
    <h1>{{ title }}</h1>
    <h3>{{ subTitle }}</h3>
    <p class="ftm_caption">{{ caption }}</p>
    <router-outlet></router-outlet>
    <div class="sources">
      <p>
        All of our data is sourced directly from the
        <a href="https://efile.sandiego.gov/" target="_blank"
          >City of San Diego Electronic Filing System.</a
        >
      </p>
      <last-updated></last-updated>
    </div>
  </div> `,
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public title = globals.siteName;
  public subTitle = globals.siteSubTitle;
  public caption = globals.siteCaption;
}
