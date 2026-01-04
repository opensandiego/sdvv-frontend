import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphQLModule } from '../graphql.module';
import { IndependentExpendituresGQL } from './independent-expenditures-gql.query';
import { SupportOpposeBarGQLComponent } from './support-oppose-bar-gql/support-oppose-bar-gql.component';
import { TotalIndependentExpendituresGQLComponent } from './total-expenditures-gql/total-expenditures-gql.component';

@NgModule({
  imports: [
    CommonModule,
    GraphQLModule,
    SupportOpposeBarGQLComponent,
    TotalIndependentExpendituresGQLComponent,
  ],
  declarations: [],
  providers: [IndependentExpendituresGQL],
  exports: [
    SupportOpposeBarGQLComponent,
    TotalIndependentExpendituresGQLComponent,
  ],
  bootstrap: [],
})
export class IndependentExpendituresGQLModule {}
