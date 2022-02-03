import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RaisedVsSpentBarModule } from 'lib-ui-charts';
import { GraphQLModule } from '../graphql.module';
import { RaisedVsSpentGQLComponent } from './raised-vs-spent-gql.component';
import { RaisedVsSpentGQL } from './raised-vs-spent-gql.query';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    RaisedVsSpentBarModule,
  ],
  declarations: [
    RaisedVsSpentGQLComponent,
  ],  
  providers: [ RaisedVsSpentGQL ], 
  exports: [ RaisedVsSpentGQLComponent ],
  bootstrap: []
})
export class RaisedVsSpentGQLModule { }
