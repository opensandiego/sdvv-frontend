import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { YearCardModule } from 'lib-ui-components';
import { GraphQLModule } from '../graphql.module';
import { YearCardGQLComponent } from './year-card-gql.component';
import { YearCardGQL } from './year-card-gql.query';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    YearCardModule,
  ],
  declarations: [
    YearCardGQLComponent,
  ],  
  providers: [ YearCardGQL ], 
  exports: [ YearCardGQLComponent ],
  bootstrap: []
})
export class YearCardGQLModule { }
