import { Component, input } from '@angular/core';
import {
  DistrictInput,
  DistrictLinksComponent,
} from './district-links/district-links.component';

@Component({
  selector: 'office-landing-route',
  standalone: true,
  imports: [DistrictLinksComponent],
  template: `
    <div class="landing-page-container">
      <div class="center-title">
        <h2 mat-card-title>{{ year() }} City Council Races on the Ballot</h2>
      </div>
      <div class="landing-page-section">Section 1</div>
      <div class="landing-page-section">
        <district-links />
      </div>
      <div class="landing-page-section">
        Wondering which district you are in? Use the city's
        <a
          href="https://sandiego.maps.arcgis.com/apps/instant/nearby/index.html?appid=0c54f0bab6b448e4aa8ec942fdb89b82"
          target="_blank"
          rel="noopener noreferrer nofollow"
          >Find my Council District</a
        >
        tool.
      </div>
    </div>
  `,
  styles: [
    `
      .center-title {
        text-align: center;
      }

      .landing-page-section {
        margin: 20px;
        padding: 15px 25px 15px 25px;
        background: #fff;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.21);
      }
    `,
  ],
})
export class OfficeLandingRoutedComponent {
  year = input<string>(''); // value is set from route
}
