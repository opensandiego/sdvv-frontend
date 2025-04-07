import { NgModule } from '@angular/core';

import { RaisedInVsOutTitleGQLComponent } from './raised-in-vs-out-title-gql/raised-in-vs-out-title-gql.component';
import { RaisedInVsOutDonutGQLComponent } from './raised-in-vs-out-donut-gql/raised-in-vs-out-donut-gql.component';

@NgModule({
  declarations: [],
  exports: [RaisedInVsOutTitleGQLComponent, RaisedInVsOutDonutGQLComponent],
  bootstrap: [],
  imports: [RaisedInVsOutTitleGQLComponent, RaisedInVsOutDonutGQLComponent],
})
export class RaisedInVsOutGQLModule {}
