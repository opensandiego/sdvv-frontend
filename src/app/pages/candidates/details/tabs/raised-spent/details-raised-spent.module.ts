import { NgModule } from '@angular/core';

import { DetailsTotalRaisedComponent } from './components/details-total-raised/details-total-raised.component';
import { DetailsTotalSpentComponent } from './components/details-total-spent/details-total-spent.component';
import { DetailsRaisedSpentSummaryComponent } from './components/details-raised-spent-summary/details-raised-spent-summary.component';
import { DetailsTabRaisedVSpentComponent } from './details-tab-raised-v-spent/details-tab-raised-v-spent.component';

@NgModule({
  declarations: [],
  imports: [
    DetailsTotalSpentComponent,
    DetailsTotalRaisedComponent,
    DetailsRaisedSpentSummaryComponent,
    DetailsTabRaisedVSpentComponent,
  ],
  exports: [
    DetailsTotalRaisedComponent,
    DetailsTotalSpentComponent,
    DetailsRaisedSpentSummaryComponent,
    DetailsTabRaisedVSpentComponent,
  ],
})
export class DetailsTabRaisedSpentModule {}
