import { Component, Input } from '@angular/core';
import { ChartTitleComponent } from 'lib-ui-components';
import { SupportOpposeBarGQLComponent } from 'src/app/graphql/independent-expenditures-gql/support-oppose-bar-gql/support-oppose-bar-gql.component';
import { TotalIndependentExpendituresGQLComponent } from 'src/app/graphql/independent-expenditures-gql/total-expenditures-gql/total-expenditures-gql.component';

@Component({
  selector: 'independent-expenditures-container',
  imports: [
    ChartTitleComponent,
    SupportOpposeBarGQLComponent,
    TotalIndependentExpendituresGQLComponent,
  ],
  templateUrl: './independent-expenditures-container.component.html',
  styleUrls: ['./independent-expenditures-container.component.scss'],
})
export class IndependentExpendituresContainerComponent {
  @Input() candidateId: string;

  title = 'Outside Money';
  tooltipText =
    'Amount of money spent by other committees to support or oppose a candidate.';
  textColor = 'white';
  backgroundColor = '#2c2c2c';
}
