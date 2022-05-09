import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartTitleModule } from 'lib-ui-components';
import { IndependentExpendituresGQLModule } from 'src/app/graphql/independent-expenditures-gql/independent-expenditures-gql.module';
import { IndependentExpendituresContainerComponent } from './independent-expenditures-container.component';

@NgModule({
  imports: [
    CommonModule,
    ChartTitleModule,
    IndependentExpendituresGQLModule,
  ],
  declarations: [
    IndependentExpendituresContainerComponent,
  ],  
  providers: [  ], 
  exports: [ IndependentExpendituresContainerComponent, ],
  bootstrap: []
})
export class IndependentExpendituresContainerModule { }
