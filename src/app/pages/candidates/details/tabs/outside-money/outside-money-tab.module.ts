import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphQLModule } from 'src/app/graphql/graphql.module';
import { DetailsTabOutsideMoneyComponent } from './details-tab-outside-money/details-tab-outside-money.component';
import { DetailsContainerOutsideMoneyComponent } from './details-outside-money/details-container-outside-money.component';
import { OutsideMoneyStackedBarModule } from 'lib-ui-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopCategoriesTableComponent } from 'src/app/components/top-categories-table/top-categories-table.component';
import { DetailsTabTitleModule } from 'lib-ui-components';

@NgModule({
  declarations: [
    DetailsContainerOutsideMoneyComponent,
    DetailsTabOutsideMoneyComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    GraphQLModule,
    DetailsTabTitleModule,
    OutsideMoneyStackedBarModule,
    TopCategoriesTableComponent,
  ],
  exports: [
    DetailsTabOutsideMoneyComponent,
  ],
})
export class CandidateDetailsTabOutsideMoneyModule { }
