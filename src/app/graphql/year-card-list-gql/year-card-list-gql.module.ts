import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { GraphQLModule } from '../graphql.module';
import { YearCardGQLModule } from '../year-card-gql/year-card-gql.module';
import { YearCardListGQLComponent } from './year-card-list-gql.component';
import { YearSelectorGQL } from './year-card-list-gql.query';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    YearCardGQLModule,
  ],
  declarations: [
    YearCardListGQLComponent,
  ],  
  providers: [ YearSelectorGQL ], 
  exports: [ YearCardListGQLComponent ],
  bootstrap: []
})
export class YearCardListGQLModule { }
