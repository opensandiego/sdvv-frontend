import { Component, input } from '@angular/core';
import { DistrictLinksComponent } from './district-links/district-links.component';
import { SpendingByDistrictChartComponent } from '../components/charts/spending-by-city-council-district/spending-by-city-council-district.component';
import { SpendingByDistrictSummaryComponent } from '../components/spending-by-city-council-district-summary/spending-by-city-council-district-summary.component';
import { LastUpdateDateComponent } from '../components/last-updated/last-update-date.component';

@Component({
  selector: 'office-landing-route',
  standalone: true,
  imports: [
    SpendingByDistrictChartComponent,
    SpendingByDistrictSummaryComponent,
    DistrictLinksComponent,
    LastUpdateDateComponent,
  ],
  template: `
    <div class="landing-page-container">
      <div class="center-title">
        <h2 mat-card-title>{{ year() }} City Council Races on the Ballot</h2>
      </div>
      <div class="landing-page-section spending-by-district-section">
        <city-council-spending-by-district-comparison-chart [year]="year()" />

        <div class="section-1-footer">
          <city-council-spending-by-district-summary />
          <last-update-date />
        </div>
      </div>
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

      .spending-by-district-section {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }

      .section-1-footer {
        display: flex;
        flex-direction: column;
        gap: 15px;

        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    `,
  ],
})
export class OfficeLandingRoutedComponent {
  year = input<string>(''); // value is set from route
}
