import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TotalExpendituresModule } from 'lib-ui-components';
import { SupportOpposeBarModule } from 'lib-ui-charts';
import { GraphQLModule } from '../graphql.module';
import { IndependentExpendituresGQL } from './independent-expenditures-gql.query';
import { SupportOpposeBarGQLComponent } from './support-oppose-bar-gql/support-oppose-bar-gql.component';
import { TotalIndependentExpendituresGQLComponent } from './total-expenditures-gql/total-expenditures-gql.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    SupportOpposeBarModule,
    TotalExpendituresModule,
  ],
  declarations: [
    SupportOpposeBarGQLComponent,
    TotalIndependentExpendituresGQLComponent,
  ],  
  providers: [ IndependentExpendituresGQL ], 
  exports: [ SupportOpposeBarGQLComponent, TotalIndependentExpendituresGQLComponent ],
  bootstrap: []
})
export class IndependentExpendituresGQLModule { }
