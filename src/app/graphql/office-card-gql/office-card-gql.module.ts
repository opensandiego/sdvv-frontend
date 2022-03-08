import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeCardModule } from 'lib-ui-components';

import { GraphQLModule } from '../graphql.module';
import { OfficeCardGQLComponent } from './office-card-gql.component';
import { OfficeCardGQLInfo } from './office-card-gql-info.query';
import { OfficeCardGQLData } from './office-card-gql-data.query';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    OfficeCardModule,
  ],
  declarations: [
    OfficeCardGQLComponent,
  ],  
  providers: [ OfficeCardGQLInfo, OfficeCardGQLData ], 
  exports: [ OfficeCardGQLComponent ],
  bootstrap: []
})
export class OfficeCardGQLModule { }
