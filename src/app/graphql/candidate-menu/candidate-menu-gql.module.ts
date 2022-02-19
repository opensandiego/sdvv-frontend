import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CandidateMenuModule } from 'lib-ui-components';
import { GraphQLModule } from '../graphql.module';
import { CandidateMenuGQLComponent } from './candidate-menu-gql.component';
import { CandidateMenuGQL } from './candidate-menu-gql.query';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    CandidateMenuModule,
  ],
  declarations: [
    CandidateMenuGQLComponent,
  ],  
  providers: [ CandidateMenuGQL ], 
  exports: [ CandidateMenuGQLComponent ],
  bootstrap: []
})
export class CandidateMenuGQLModule { }
