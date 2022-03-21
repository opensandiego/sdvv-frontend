import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RaisedInVsOutDonutModule } from 'lib-ui-charts';
import { GraphQLModule } from '../graphql.module';
import { RaisedInVsOutGQL } from './raised-in-vs-out-donut-gql/raised-in-vs-out-gql.query';
import { RaisedInVsOutDonutGQLComponent } from './raised-in-vs-out-donut-gql/raised-in-vs-out-donut-gql.component';
import { CandidateInfoGQL } from './raised-in-vs-out-title-gql/candidate-info-gql.query';
import { ChartTitleModule } from 'lib-ui-components';
import { RaisedInVsOutTitleGQLComponent } from './raised-in-vs-out-title-gql/raised-in-vs-out-title-gql.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GraphQLModule,
    ChartTitleModule,
    RaisedInVsOutDonutModule,
  ],
  declarations: [
    RaisedInVsOutDonutGQLComponent,
    RaisedInVsOutTitleGQLComponent,
  ],
  providers: [ RaisedInVsOutGQL, CandidateInfoGQL ], 
  exports: [ RaisedInVsOutDonutGQLComponent, RaisedInVsOutTitleGQLComponent ],
  bootstrap: []
})
export class RaisedInVsOutGQLModule { }
