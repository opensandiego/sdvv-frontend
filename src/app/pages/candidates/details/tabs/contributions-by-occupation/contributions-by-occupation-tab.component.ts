import { Component, Input } from '@angular/core';
import { DetailsTabTitleComponent } from 'lib-ui-components';
import { DetailsContributionsByOccupationGQLComponent } from 'src/app/graphql/details/details-contributions-by-occupation/details-contributions-by-occupation-table-gql/details-contributions-by-occupation-gql.component';

@Component({
  selector: 'contributions-by-occupation-tab',
  imports: [
    DetailsContributionsByOccupationGQLComponent,
    DetailsTabTitleComponent,
  ],
  template: `<div class="tab-raised-by-industry">
    <details-tab-title
      [smallTitleText]="title.top"
      [largeTitleText]="title.bottom"
      [tooltipText]="title.tooltipText"
    ></details-tab-title>

    <details-contributions-by-occupation-gql
      [candidateId]="candidateId"
    ></details-contributions-by-occupation-gql>
  </div>`,
  styles: [
    `
      .tab-raised-by-industry {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 15px;
        margin: 10px;
      }
    `,
  ],
})
export class ContributionsByOccupationTabComponent {
  @Input() candidateId: string;

  title = {
    top: 'Amount Raised',
    bottom: 'By Occupation',
    tooltipText:
      'Total contributions to filer grouped by contributor occupation',
  };
}
