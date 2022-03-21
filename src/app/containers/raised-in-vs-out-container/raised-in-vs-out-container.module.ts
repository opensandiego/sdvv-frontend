import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaisedInVsOutGQLModule } from 'src/app/graphql/raised-in-vs-out-gql/raised-in-vs-out-gql.module';
import { RaisedInVsOutComponent } from './raised-in-vs-out-container.component';

@NgModule({
  imports: [
    CommonModule,
    RaisedInVsOutGQLModule,
  ],
  declarations: [
    RaisedInVsOutComponent,
  ],  
  providers: [  ], 
  exports: [ RaisedInVsOutComponent, ],
  bootstrap: []
})
export class RaisedInVsOutContainerModule { }
