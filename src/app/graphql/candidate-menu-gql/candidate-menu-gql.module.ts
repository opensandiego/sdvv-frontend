import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CandidateMenuModule } from 'lib-ui-components';
import { GraphQLModule } from '../graphql.module';
import { CandidateMenuGQLComponent } from './candidate-menu-gql.component';
import { CandidateMenuGQL } from './candidate-menu-gql.query';

@NgModule({
  imports: [
    CommonModule,
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
