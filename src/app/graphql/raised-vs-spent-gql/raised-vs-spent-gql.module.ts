import { NgModule } from '@angular/core';

import { RaisedVsSpentBarGQLComponent } from './raised-vs-spent-bar-gql/raised-vs-spent-bar-gql.component';
import { AverageDonationGQLComponent } from './average-donation-gql/average-donation-gql.component';

@NgModule({
  declarations: [],
  exports: [RaisedVsSpentBarGQLComponent, AverageDonationGQLComponent],
  bootstrap: [],
  imports: [RaisedVsSpentBarGQLComponent, AverageDonationGQLComponent],
})
export class RaisedVsSpentGQLModule {}
