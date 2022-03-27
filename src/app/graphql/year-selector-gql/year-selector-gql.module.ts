import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { YearSelectorModule } from 'lib-ui-components';
import { GraphQLModule } from '../graphql.module';
import { YearSelectorGQLComponent } from './year-selector-gql.component';
import { YearSelectorGQL } from './year-selector-gql.query';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    YearSelectorModule,
  ],
  declarations: [
    YearSelectorGQLComponent,
  ],  
  providers: [ YearSelectorGQL ], 
  exports: [ YearSelectorGQLComponent ],
  bootstrap: []
})
export class YearSelectorGQLModule { }
