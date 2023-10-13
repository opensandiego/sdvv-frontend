import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GraphQLModule } from 'src/app/graphql/graphql.module';
import { TotalRaisedBarModule, TotalSpentDonutModule } from 'lib-ui-charts';
import { DetailsTotalRaisedComponent } from './components/details-total-raised/details-total-raised.component';
import { DetailsTotalSpentComponent } from './components/details-total-spent/details-total-spent.component';
import { DetailsRaisedSpentSummaryComponent } from './components/details-raised-spent-summary/details-raised-spent-summary.component';
import { DetailsTabRaisedVSpentComponent } from './details-tab-raised-v-spent/details-tab-raised-v-spent.component';
import { TopCategoriesTableComponent } from 'src/app/components/top-categories-table/top-categories-table.component';

@NgModule({
  declarations: [
    DetailsTotalRaisedComponent,
    DetailsTotalSpentComponent,
    DetailsRaisedSpentSummaryComponent,
    DetailsTabRaisedVSpentComponent,
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatDividerModule,
    FontAwesomeModule,
    GraphQLModule,
    TotalRaisedBarModule,
    TotalSpentDonutModule,
    TopCategoriesTableComponent,
  ],
  exports: [
    DetailsTotalRaisedComponent,
    DetailsTotalSpentComponent,
    DetailsRaisedSpentSummaryComponent,
    DetailsTabRaisedVSpentComponent,
  ],
})
export class DetailsTabRaisedSpentModule { }
