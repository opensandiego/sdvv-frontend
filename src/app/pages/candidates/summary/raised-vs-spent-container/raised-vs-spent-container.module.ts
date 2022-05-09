import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartTitleModule } from 'lib-ui-components';
import { RaisedVsSpentGQLModule } from 'src/app/graphql/raised-vs-spent-gql/raised-vs-spent-gql.module';
import { RaisedVsSpentContainerComponent } from './raised-vs-spent-container.component';

@NgModule({
  imports: [
    CommonModule,
    ChartTitleModule,
    RaisedVsSpentGQLModule,
  ],
  declarations: [
    RaisedVsSpentContainerComponent,
  ],  
  providers: [  ], 
  exports: [ RaisedVsSpentContainerComponent, ],
  bootstrap: []
})
export class RaisedVsSpentContainerModule { }
