import { Component, Input } from '@angular/core';
import { DetailsTabTitleComponent } from 'lib-ui-components';
import { DetailsContributionsByLocationComponent } from 'src/app/graphql/details/details-contributions-by-location/details-contributions-by-location-gql.component';

@Component({
  selector: 'contributions-by-location-tab',
  imports: [DetailsTabTitleComponent, DetailsContributionsByLocationComponent],
  template: `<div class="tab-raised-by-location">
    <details-tab-title
      [smallTitleText]="title.top"
      [largeTitleText]="title.bottom"
      [tooltipText]="title.tooltipText"
    ></details-tab-title>

    <details-contributions-by-location
      [candidateId]="candidateId"
    ></details-contributions-by-location>
  </div>`,
  styles: [
    `
      .tab-raised-by-location {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 15px;
        margin: 10px;
      }
    `,
  ],
})
export class ContributionsByLocationTabComponent {
  @Input() candidateId: string;

  title = {
    top: 'Amount Raised',
    bottom: 'By Location',
    tooltipText:
      'Total contributions to filer grouped using city, state, and zip code fields',
  };
}
