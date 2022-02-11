import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { YearSelectorModule } from 'lib-ui-components';
import { GraphQLModule } from '../graphql.module';
import { YearSelectorGQLComponent } from './year-selector-gql.component';
import { YearSelectorGQL } from './year-selector-gql.query';

@NgModule({
  imports: [
    BrowserModule,
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
